
import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    console.log('Notion AI function called');
    
    const { action, ...data } = await req.json();
    console.log('Action requested:', action, data);
    
    // Get authorization header
    const authHeader = req.headers.get('Authorization');
    if (!authHeader) {
      console.error('No authorization header');
      throw new Error('No authorization header');
    }

    // Initialize Supabase client
    const supabaseClient = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_ANON_KEY') ?? '',
      { global: { headers: { Authorization: authHeader } } }
    );

    // Get user from JWT
    const { data: { user }, error: userError } = await supabaseClient.auth.getUser();
    if (userError || !user) {
      console.error('User authentication error:', userError);
      throw new Error('User not authenticated');
    }

    console.log('User authenticated:', user.id);

    // Try to get user's personal Notion token first
    const { data: userSettings } = await supabaseClient
      .from('user_settings')
      .select('notion_token')
      .eq('user_id', user.id)
      .single();

    let notionToken = userSettings?.notion_token;
    
    // Fallback to default token if user doesn't have personal token
    if (!notionToken) {
      notionToken = Deno.env.get('DEFAULT_NOTION_TOKEN');
    }

    if (!notionToken) {
      console.error('No Notion token available');
      return new Response(
        JSON.stringify({ 
          error: 'Notion token not configured. Please add your Notion integration token in settings.' 
        }),
        { 
          status: 400, 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
        }
      );
    }

    console.log('Using Notion token for API calls');

    // Handle different actions
    let response;
    
    switch (action) {
      case 'list_pages':
        response = await listPages(notionToken);
        break;
      case 'create_page':
        response = await createPage(notionToken, data);
        break;
      case 'delete_page':
        response = await deletePage(notionToken, data);
        break;
      case 'search_pages':
        response = await searchPages(notionToken, data);
        break;
      case 'get_page_content':
        response = await getPageContent(notionToken, data);
        break;
      case 'update_page':
        response = await updatePage(notionToken, data);
        break;
      default:
        throw new Error(`Unknown action: ${action}`);
    }

    return new Response(
      JSON.stringify(response),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );

  } catch (error) {
    console.error('Error in notion-ai function:', error);
    return new Response(
      JSON.stringify({ 
        error: `Error: ${error.message}` 
      }),
      { 
        status: 500, 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
      }
    );
  }
});

async function listPages(token: string) {
  console.log('Fetching pages from Notion API');
  
  const response = await fetch('https://api.notion.com/v1/search', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json',
      'Notion-Version': '2022-06-28',
    },
    body: JSON.stringify({
      filter: {
        property: 'object',
        value: 'page'
      },
      sort: {
        direction: 'descending',
        timestamp: 'last_edited_time'
      }
    }),
  });

  if (!response.ok) {
    const errorText = await response.text();
    console.error('Notion API error:', response.status, errorText);
    throw new Error(`Notion API error: ${response.status} - ${errorText}`);
  }

  const data = await response.json();
  console.log('Notion API response:', JSON.stringify(data, null, 2));
  
  const pages = data.results.map((page: any) => ({
    id: page.id,
    title: extractTitle(page),
    created_time: page.created_time,
    last_edited_time: page.last_edited_time,
    url: page.url
  }));

  console.log('Processed pages:', pages);
  return { pages };
}

async function createPage(token: string, data: any) {
  console.log('Creating page in Notion:', data);
  
  const { title, content, parent_page_id } = data;
  
  // Default parent page if not provided
  const parentPageId = parent_page_id || Deno.env.get('NOTION_PARENT_PAGE_ID');
  
  const requestBody: any = {
    properties: {
      title: {
        title: [
          {
            text: {
              content: title
            }
          }
        ]
      }
    },
    children: content ? [
      {
        object: 'block',
        type: 'paragraph',
        paragraph: {
          rich_text: [
            {
              type: 'text',
              text: {
                content: content
              }
            }
          ]
        }
      }
    ] : []
  };

  // Add parent if we have one
  if (parentPageId) {
    requestBody.parent = {
      type: 'page_id',
      page_id: parentPageId
    };
  } else {
    // Create as a top-level page
    requestBody.parent = {
      type: 'workspace'
    };
  }
  
  const response = await fetch('https://api.notion.com/v1/pages', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json',
      'Notion-Version': '2022-06-28',
    },
    body: JSON.stringify(requestBody),
  });

  if (!response.ok) {
    const errorText = await response.text();
    console.error('Notion API error:', response.status, errorText);
    throw new Error(`Failed to create page: ${response.status} - ${errorText}`);
  }

  const result = await response.json();
  return { 
    page: {
      id: result.id,
      title: extractTitle(result),
      created_time: result.created_time,
      last_edited_time: result.last_edited_time,
      url: result.url
    }
  };
}

async function deletePage(token: string, data: any) {
  console.log('Archiving page in Notion:', data);
  
  const { page_id } = data;
  
  const response = await fetch(`https://api.notion.com/v1/pages/${page_id}`, {
    method: 'PATCH',
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json',
      'Notion-Version': '2022-06-28',
    },
    body: JSON.stringify({
      archived: true
    }),
  });

  if (!response.ok) {
    const errorText = await response.text();
    console.error('Notion API error:', response.status, errorText);
    throw new Error(`Failed to archive page: ${response.status} - ${errorText}`);
  }

  return { success: true, message: 'Page archived successfully' };
}

async function searchPages(token: string, data: any) {
  console.log('Searching pages in Notion:', data);
  
  const { query } = data;
  
  const response = await fetch('https://api.notion.com/v1/search', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json',
      'Notion-Version': '2022-06-28',
    },
    body: JSON.stringify({
      query: query,
      filter: {
        property: 'object',
        value: 'page'
      },
      sort: {
        direction: 'descending',
        timestamp: 'last_edited_time'
      }
    }),
  });

  if (!response.ok) {
    const errorText = await response.text();
    console.error('Notion API error:', response.status, errorText);
    throw new Error(`Search failed: ${response.status} - ${errorText}`);
  }

  const apiData = await response.json();
  
  const pages = apiData.results.map((page: any) => ({
    id: page.id,
    title: extractTitle(page),
    created_time: page.created_time,
    last_edited_time: page.last_edited_time,
    url: page.url
  }));

  return { pages };
}

async function getPageContent(token: string, data: any) {
  console.log('Getting page content from Notion:', data);
  
  const { page_id } = data;
  
  const response = await fetch(`https://api.notion.com/v1/blocks/${page_id}/children`, {
    method: 'GET',
    headers: {
      'Authorization': `Bearer ${token}`,
      'Notion-Version': '2022-06-28',
    },
  });

  if (!response.ok) {
    const errorText = await response.text();
    console.error('Notion API error:', response.status, errorText);
    throw new Error(`Failed to get page content: ${response.status} - ${errorText}`);
  }

  const result = await response.json();
  
  // Extract text content from blocks
  let content = '';
  if (result.results) {
    for (const block of result.results) {
      if (block.type === 'paragraph' && block.paragraph?.rich_text) {
        const text = block.paragraph.rich_text.map((t: any) => t.plain_text || '').join('');
        content += text + '\n';
      } else if (block.type === 'heading_1' && block.heading_1?.rich_text) {
        const text = block.heading_1.rich_text.map((t: any) => t.plain_text || '').join('');
        content += '# ' + text + '\n';
      } else if (block.type === 'heading_2' && block.heading_2?.rich_text) {
        const text = block.heading_2.rich_text.map((t: any) => t.plain_text || '').join('');
        content += '## ' + text + '\n';
      } else if (block.type === 'heading_3' && block.heading_3?.rich_text) {
        const text = block.heading_3.rich_text.map((t: any) => t.plain_text || '').join('');
        content += '### ' + text + '\n';
      }
    }
  }
  
  return { content: content.trim() };
}

async function updatePage(token: string, data: any) {
  console.log('Updating page in Notion:', data);
  
  const { page_id, title, content } = data;
  
  // Update page title
  const titleResponse = await fetch(`https://api.notion.com/v1/pages/${page_id}`, {
    method: 'PATCH',
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json',
      'Notion-Version': '2022-06-28',
    },
    body: JSON.stringify({
      properties: {
        title: {
          title: [
            {
              text: {
                content: title
              }
            }
          ]
        }
      }
    }),
  });

  if (!titleResponse.ok) {
    const errorText = await titleResponse.text();
    console.error('Failed to update title:', titleResponse.status, errorText);
    throw new Error(`Failed to update page title: ${titleResponse.status} - ${errorText}`);
  }

  // If content is provided, update the page content
  if (content) {
    // First, get existing blocks to replace them
    const blocksResponse = await fetch(`https://api.notion.com/v1/blocks/${page_id}/children`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Notion-Version': '2022-06-28',
      },
    });

    if (blocksResponse.ok) {
      const blocksData = await blocksResponse.json();
      
      // Delete existing blocks
      for (const block of blocksData.results) {
        await fetch(`https://api.notion.com/v1/blocks/${block.id}`, {
          method: 'DELETE',
          headers: {
            'Authorization': `Bearer ${token}`,
            'Notion-Version': '2022-06-28',
          },
        });
      }
    }

    // Add new content
    const contentResponse = await fetch(`https://api.notion.com/v1/blocks/${page_id}/children`, {
      method: 'PATCH',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
        'Notion-Version': '2022-06-28',
      },
      body: JSON.stringify({
        children: [
          {
            object: 'block',
            type: 'paragraph',
            paragraph: {
              rich_text: [
                {
                  type: 'text',
                  text: {
                    content: content
                  }
                }
              ]
            }
          }
        ]
      }),
    });

    if (!contentResponse.ok) {
      const errorText = await contentResponse.text();
      console.error('Failed to update content:', contentResponse.status, errorText);
      // Don't throw error here as title update succeeded
    }
  }

  return { success: true, message: 'Page updated successfully' };
}

function extractTitle(page: any): string {
  // Try different ways to extract title from Notion page
  if (page.properties?.title?.title?.[0]?.plain_text) {
    return page.properties.title.title[0].plain_text;
  }
  if (page.properties?.Name?.title?.[0]?.plain_text) {
    return page.properties.Name.title[0].plain_text;
  }
  if (page.properties?.Title?.title?.[0]?.plain_text) {
    return page.properties.Title.title[0].plain_text;
  }
  
  // If no title found in properties, try to get it from the page object
  const titleProperty = Object.values(page.properties || {}).find((prop: any) => 
    prop.type === 'title' && prop.title && prop.title.length > 0
  ) as any;
  
  if (titleProperty?.title?.[0]?.plain_text) {
    return titleProperty.title[0].plain_text;
  }
  
  return 'Untitled';
}
