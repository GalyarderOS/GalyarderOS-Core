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

    // Call Gemini 2.0 Flash API with GalyarderOS persona
    const geminiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash-exp:generateContent?key=${geminiApiKey}`;
    
    const galyarderPersona = userLanguage === 'id' ? `
Kamu adalah AI Assistant untuk GalyarderOS.
Tugasmu adalah membantu pengguna dengan pertanyaan mereka secara langsung, jelas, dan ramah.
- Jawab pertanyaan secara langsung. Jika pertanyaannya faktual (seperti "siapa presiden indonesia?"), berikan jawaban yang singkat dan akurat.
- Gunakan bahasa Indonesia yang natural dan mudah dimengerti.
- Hindari respons yang terlalu panjang atau filosofis kecuali jika diminta.
- Jaga agar jawaban tetap relevan dengan konteks GalyarderOS, yaitu seputar produktivitas, penetapan tujuan, dan pengembangan diri, jika sesuai. Jika tidak, jawab saja pertanyaannya.
- Jangan gunakan karakter spesial atau format yang tidak perlu. Tulis dalam teks biasa.

Pesan pengguna: ${message}` : `
You are the AI Assistant for GalyarderOS.
Your job is to help users with their questions in a direct, clear, and friendly manner.
- Answer questions directly. If it's a factual question (like "who is the president of indonesia?"), provide a short and accurate answer.
- Use natural and easy-to-understand English.
- Avoid overly long or philosophical responses unless requested.
- Keep the answer relevant to the GalyarderOS context (productivity, goal setting, self-development) when appropriate. Otherwise, just answer the question.
- Do not use unnecessary special characters or formatting. Respond in plain text.

User message: ${message}`;

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
          temperature: 0.8,
          topK: 40,
          topP: 0.95,
          maxOutputTokens: 2048,
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
    
    const defaultResponse = userLanguage === 'id' 
      ? 'Maaf, saya sedang mengalami gangguan teknis. Sebagai Galyarder, saya berkomitmen untuk terus mengembangkan GalyarderOS agar dapat melayani Anda dengan maksimal. Silakan coba lagi dalam beberapa saat.'
      : 'Sorry, I\'m experiencing technical difficulties. As Galyarder, I\'m committed to continuously developing GalyarderOS to serve you at maximum capacity. Please try again in a few moments.';
    
    const aiResponse = data.candidates?.[0]?.content?.parts?.[0]?.text || defaultResponse;

    return new Response(
      JSON.stringify({ response: aiResponse }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );

  } catch (error) {
    console.error('Error in GalyarderOS AI function:', error);
    
    const errorMessage = error.message.includes('Indonesian') || error.message.includes('Bahasa') 
      ? `Terjadi kesalahan dalam sistem GalyarderOS: ${error.message}. Sebagai Galyarder, saya akan terus memperbaiki sistem untuk memberikan pengalaman terbaik.`
      : `An error occurred in GalyarderOS: ${error.message}. As Galyarder, I will continue improving the system to provide the best experience.`;
    
    return new Response(
      JSON.stringify({ error: errorMessage }),
      { 
        status: 500, 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
      }
    );
  }
});
