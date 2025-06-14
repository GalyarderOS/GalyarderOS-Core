
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

    // Get default Notion token
    const notionToken = Deno.env.get('DEFAULT_NOTION_TOKEN');
    if (!notionToken) {
      console.error('No Notion token available');
      return new Response(
        JSON.stringify({ 
          error: 'Notion AI tidak tersedia saat ini. Silakan hubungi administrator.' 
        }),
        { 
          status: 400, 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
        }
      );
    }

    console.log('Notion token found, calling Notion API');

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
        error: `Terjadi kesalahan: ${error.message}. Silakan coba lagi.` 
      }),
      { 
        status: 500, 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
      }
    );
  }
});

async function listPages(token: string) {
  console.log('Listing pages from Notion');
  
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
    console.error('Notion API error:', errorText);
    throw new Error(`Notion API error: ${response.status} - ${errorText}`);
  }

  const data = await response.json();
  
  const pages = data.results.map((page: any) => ({
    id: page.id,
    title: page.properties?.title?.title?.[0]?.plain_text || 
           page.properties?.Name?.title?.[0]?.plain_text ||
           'Untitled',
    created_time: page.created_time,
    last_edited_time: page.last_edited_time
  }));

  return { pages };
}

async function createPage(token: string, data: any) {
  console.log('Creating page in Notion:', data);
  
  const { title, content } = data;
  
  const response = await fetch('https://api.notion.com/v1/pages', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json',
      'Notion-Version': '2022-06-28',
    },
    body: JSON.stringify({
      parent: {
        type: 'page_id',
        page_id: Deno.env.get('NOTION_PARENT_PAGE_ID') || 'your-parent-page-id'
      },
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
    }),
  });

  if (!response.ok) {
    const errorText = await response.text();
    console.error('Notion API error:', errorText);
    throw new Error(`Notion API error: ${response.status} - ${errorText}`);
  }

  const result = await response.json();
  return { page: result };
}

async function deletePage(token: string, data: any) {
  console.log('Deleting page from Notion:', data);
  
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
    console.error('Notion API error:', errorText);
    throw new Error(`Notion API error: ${response.status} - ${errorText}`);
  }

  const result = await response.json();
  return { success: true };
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
    console.error('Notion API error:', errorText);
    throw new Error(`Notion API error: ${response.status} - ${errorText}`);
  }

  const apiData = await response.json();
  
  const pages = apiData.results.map((page: any) => ({
    id: page.id,
    title: page.properties?.title?.title?.[0]?.plain_text || 
           page.properties?.Name?.title?.[0]?.plain_text ||
           'Untitled',
    created_time: page.created_time,
    last_edited_time: page.last_edited_time
  }));

  return { pages };
}
