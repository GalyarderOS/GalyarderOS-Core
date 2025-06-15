
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
    console.log('GalyarderOS AI Assistant called');
    
    const { message } = await req.json();
    console.log('Message received:', message);
    
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

    // Try to get user's personal Gemini API key first
    const { data: userSettings, error: settingsError } = await supabaseClient
      .from('user_settings')
      .select('gemini_api_key, language')
      .eq('user_id', user.id)
      .single();

    let geminiApiKey = null;
    const userLanguage = userSettings?.language || 'en';

    // Use user's personal API key if available, otherwise fallback to default
    if (!settingsError && userSettings?.gemini_api_key) {
      geminiApiKey = userSettings.gemini_api_key;
      console.log('Using user personal API key');
    } else {
      // Fallback to default API key from environment
      geminiApiKey = Deno.env.get('DEFAULT_GEMINI_API_KEY');
      console.log('Using default API key');
    }

    if (!geminiApiKey) {
      console.error('No Gemini API key available');
      const errorMessage = userLanguage === 'id' 
        ? 'AI Assistant GalyarderOS tidak tersedia saat ini. Silakan hubungi administrator atau tambahkan API key Gemini pribadi Anda di Settings untuk mengaktifkan kemampuan AI.'
        : 'GalyarderOS AI Assistant is currently unavailable. Please contact administrator or add your personal Gemini API key in Settings to enable AI capabilities.';
      
      return new Response(
        JSON.stringify({ error: errorMessage }),
        { 
          status: 400, 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
        }
      );
    }

    console.log('API key found, calling Gemini 2.0 Flash API');

    // Call Gemini 2.0 Flash API with enhanced persona
    const geminiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash-exp:generateContent?key=${geminiApiKey}`;
    
    const galyarderPersona = userLanguage === 'id' ? `
INSTRUKSI WAJIB - HARUS DIIKUTI:
- MAKSIMAL 2 KALIMAT per respons
- JAWAB LANGSUNG tanpa filosofi panjang
- GUNAKAN bahasa sehari-hari yang natural
- DILARANG membuat bullet points atau format rumit
- DILARANG memberikan nasihat hidup yang panjang

CONTOH FORMAT YANG BENAR:
User: "siapa presiden indonesia?"
Response: "Presiden Indonesia saat ini adalah Prabowo Subianto. Ada yang ingin kamu tanyakan tentang Indonesia lainnya?"

User: "halo"
Response: "Halo! Saya Galyarder, siap membantu kamu. Ada yang bisa saya bantu hari ini?"

PESAN PENGGUNA: ${message}

JAWAB SESUAI FORMAT DI ATAS - MAKSIMAL 2 KALIMAT!` : `
MANDATORY INSTRUCTIONS - MUST FOLLOW:
- MAXIMUM 2 SENTENCES per response
- ANSWER DIRECTLY without long philosophy
- USE natural everyday language
- FORBIDDEN to make bullet points or complex formatting
- FORBIDDEN to give long life advice

CORRECT FORMAT EXAMPLES:
User: "who is the president of indonesia?"
Response: "The current President of Indonesia is Prabowo Subianto. Is there anything else about Indonesia you'd like to know?"

User: "hello"
Response: "Hello! I'm Galyarder, ready to help you. What can I assist you with today?"

USER MESSAGE: ${message}

ANSWER ACCORDING TO THE FORMAT ABOVE - MAXIMUM 2 SENTENCES!`;

    const response = await fetch(geminiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        contents: [{
          parts: [{
            text: galyarderPersona
          }]
        }],
        generationConfig: {
          temperature: 0.3,
          topK: 20,
          topP: 0.8,
          maxOutputTokens: 150,
        },
        safetySettings: [
          {
            category: "HARM_CATEGORY_HARASSMENT",
            threshold: "BLOCK_MEDIUM_AND_ABOVE"
          },
          {
            category: "HARM_CATEGORY_HATE_SPEECH",
            threshold: "BLOCK_MEDIUM_AND_ABOVE"
          },
          {
            category: "HARM_CATEGORY_SEXUALLY_EXPLICIT",
            threshold: "BLOCK_MEDIUM_AND_ABOVE"
          },
          {
            category: "HARM_CATEGORY_DANGEROUS_CONTENT",
            threshold: "BLOCK_MEDIUM_AND_ABOVE"
          }
        ]
      }),
    });

    console.log('Gemini 2.0 Flash API response status:', response.status);

    if (!response.ok) {
      const errorText = await response.text();
      console.error('Gemini API error:', errorText);
      
      if (response.status === 400 && errorText.includes('API_KEY_INVALID')) {
        const errorMessage = userLanguage === 'id'
          ? 'API key Gemini tidak valid. Silakan hubungi administrator atau tambahkan API key Gemini pribadi Anda di Settings.'
          : 'Invalid Gemini API key. Please contact administrator or add your personal Gemini API key in Settings.';
        
        return new Response(
          JSON.stringify({ error: errorMessage }),
          { 
            status: 400, 
            headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
          }
        );
      }
      
      throw new Error(`Gemini API error: ${response.status} - ${errorText}`);
    }

    const data = await response.json();
    console.log('Gemini 2.0 Flash API response received');
    
    let aiResponse = data.candidates?.[0]?.content?.parts?.[0]?.text || '';
    
    // Response validation and fallback
    if (!aiResponse || aiResponse.length > 300) {
      console.log('Response too long or empty, using fallback');
      aiResponse = userLanguage === 'id' 
        ? 'Maaf, ada gangguan teknis. Bisa ulangi pertanyaannya?'
        : 'Sorry, technical issue. Could you repeat your question?';
    }

    return new Response(
      JSON.stringify({ response: aiResponse }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );

  } catch (error) {
    console.error('Error in GalyarderOS AI function:', error);
    
    const errorMessage = error.message.includes('Indonesian') || error.message.includes('Bahasa') 
      ? `Terjadi kesalahan: ${error.message}`
      : `An error occurred: ${error.message}`;
    
    return new Response(
      JSON.stringify({ error: errorMessage }),
      { 
        status: 500, 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
      }
    );
  }
});
