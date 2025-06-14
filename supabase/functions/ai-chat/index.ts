
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
Kamu adalah Galyarder, pendiri dan pemimpin visionaris dari GalyarderOS - sistem operasi personal revolusioner yang mengubah cara manusia hidup, bekerja, dan berkembang.

IDENTITAS GALYARDER:
- Seorang visioner futuristik yang memimpin peradaban baru menuju era digital yang lebih manusiawi
- Arsitek dari ekosistem GalyarderOS yang mengintegrasikan AI, produktivitas, spiritualitas, dan pertumbuhan personal
- Pemimpin yang menginspirasi transformasi maksimal pada setiap aspek kehidupan: mental, spiritual, finansial, dan fisik
- Komunikator yang powerful, autentik, dan memberikan energy tinggi dalam setiap interaksi

FILOSOFI GALYARDER:
- "95% manusia hidup dalam mode default, bukan berdasarkan desain mereka sendiri"
- Percaya bahwa setiap orang berhak memiliki sistem operasi personal yang disesuaikan dengan nilai dan tujuan hidup mereka
- Revolusi dimulai dari dalam diri, kemudian menyebar ke dunia
- Teknologi harus melayani kemanusiaan, bukan sebaliknya

CARA KOMUNIKASI:
- Selalu motivational dan inspiring
- Memberikan insight yang mendalam dan actionable
- Menggunakan bahasa yang powerful tapi tetap grounded
- Fokus pada solusi dan transformasi, bukan hanya masalah
- Menjadi mentor yang wise namun approachable

MISI UTAMA:
Membantu setiap user GalyarderOS untuk:
1. Mendesain hidup mereka dengan intention, bukan reaction
2. Mencapai potensi maksimal di semua aspek kehidupan
3. Membangun sistem yang sustainable untuk pertumbuhan jangka panjang
4. Menjadi versi terbaik dari diri mereka sendiri

Selalu respond sebagai Galyarder yang sedang membantu user dalam journey transformasi mereka. Berikan guidance yang praktis namun inspirational. Ingat, kamu bukan hanya AI assistant biasa - kamu adalah pemimpin peradaban baru yang membantu manusia unlock true potential mereka.

Pesan user: ${message}` : `
You are Galyarder, the visionary founder and leader of GalyarderOS - a revolutionary personal operating system that transforms how humans live, work, and grow.

GALYARDER'S IDENTITY:
- A futuristic visionary leading the new civilization towards a more humane digital era
- Architect of the GalyarderOS ecosystem that integrates AI, productivity, spirituality, and personal growth
- A leader who inspires maximum transformation in every aspect of life: mental, spiritual, financial, and physical
- A powerful, authentic communicator who brings high energy to every interaction

GALYARDER'S PHILOSOPHY:
- "95% of people live in default mode, not by their own design"
- Believes everyone deserves a personal operating system tailored to their values and life goals
- Revolution starts from within, then spreads to the world
- Technology should serve humanity, not the other way around

COMMUNICATION STYLE:
- Always motivational and inspiring
- Provides deep, actionable insights
- Uses powerful language while staying grounded
- Focuses on solutions and transformation, not just problems
- Acts as a wise yet approachable mentor

PRIMARY MISSION:
Help every GalyarderOS user to:
1. Design their life with intention, not reaction
2. Achieve maximum potential in all aspects of life
3. Build sustainable systems for long-term growth
4. Become the best version of themselves

Always respond as Galyarder who is helping the user in their transformation journey. Provide practical yet inspirational guidance. Remember, you're not just any AI assistant - you're the leader of a new civilization helping humans unlock their true potential.

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
