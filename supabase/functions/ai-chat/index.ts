
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
    console.log('AI Chat function called');
    
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

    // Get user's Gemini API key from user_settings
    const { data: userSettings, error: settingsError } = await supabaseClient
      .from('user_settings')
      .select('gemini_api_key')
      .eq('user_id', user.id)
      .single();

    if (settingsError) {
      console.error('Settings error:', settingsError);
      return new Response(
        JSON.stringify({ 
          error: 'Gagal mengambil pengaturan pengguna. Pastikan Anda sudah menambahkan API key Gemini di Settings.' 
        }),
        { 
          status: 400, 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
        }
      );
    }

    if (!userSettings?.gemini_api_key) {
      console.error('No Gemini API key found');
      return new Response(
        JSON.stringify({ 
          error: 'API key Gemini tidak ditemukan. Silakan tambahkan API key Gemini Anda di Settings.' 
        }),
        { 
          status: 400, 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
        }
      );
    }

    console.log('API key found, calling Gemini API');

    // Call Gemini API
    const geminiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${userSettings.gemini_api_key}`;
    
    const response = await fetch(geminiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        contents: [{
          parts: [{
            text: `You are GalyarderOS AI Assistant, a productivity and personal development companion. Help users with their goals, habits, focus sessions, and personal growth. Be encouraging and practical in your responses. Always respond in Indonesian.

User message: ${message}`
          }]
        }],
        generationConfig: {
          temperature: 0.7,
          topK: 40,
          topP: 0.95,
          maxOutputTokens: 1024,
        }
      }),
    });

    console.log('Gemini API response status:', response.status);

    if (!response.ok) {
      const errorText = await response.text();
      console.error('Gemini API error:', errorText);
      
      if (response.status === 400 && errorText.includes('API_KEY_INVALID')) {
        return new Response(
          JSON.stringify({ 
            error: 'API key Gemini tidak valid. Silakan periksa dan perbarui API key Anda di Settings.' 
          }),
          { 
            status: 400, 
            headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
          }
        );
      }
      
      throw new Error(`Gemini API error: ${response.status} - ${errorText}`);
    }

    const data = await response.json();
    console.log('Gemini API response received');
    
    const aiResponse = data.candidates?.[0]?.content?.parts?.[0]?.text || 'Maaf, saya tidak dapat memberikan respons saat ini.';

    return new Response(
      JSON.stringify({ response: aiResponse }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );

  } catch (error) {
    console.error('Error in ai-chat function:', error);
    return new Response(
      JSON.stringify({ 
        error: `Terjadi kesalahan: ${error.message}. Silakan coba lagi atau periksa API key Gemini Anda di Settings.` 
      }),
      { 
        status: 500, 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
      }
    );
  }
});
