import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

// Allowed origins for CORS
const ALLOWED_ORIGINS = [
  'https://tezuai.lovable.app',
  'https://cgqpfsojhmqytjnvzzqe.lovable.app',
  'http://localhost:5173',
  'http://localhost:3000'
];

function getCorsHeaders(origin: string | null) {
  const allowedOrigin = origin && ALLOWED_ORIGINS.includes(origin) ? origin : ALLOWED_ORIGINS[0];
  return {
    "Access-Control-Allow-Origin": allowedOrigin,
    "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
    "Access-Control-Allow-Methods": "POST, OPTIONS",
  };
}

// Input validation
function validateInput(body: unknown): { valid: boolean; error?: string; data?: { prompt: string; type: string; style?: string; mood?: string } } {
  if (!body || typeof body !== 'object') {
    return { valid: false, error: "Request body is required" };
  }
  
  const { prompt, type, style, mood } = body as Record<string, unknown>;
  
  if (!prompt || typeof prompt !== 'string') {
    return { valid: false, error: "Prompt is required and must be a string" };
  }
  
  if (prompt.length > 5000) {
    return { valid: false, error: "Prompt exceeds maximum length (5000 chars)" };
  }
  
  const validTypes = ['story', 'lyrics', 'poem'];
  const contentType = typeof type === 'string' && validTypes.includes(type) ? type : 'story';
  
  // Validate style and mood if provided
  const sanitizedStyle = typeof style === 'string' ? style.slice(0, 100) : undefined;
  const sanitizedMood = typeof mood === 'string' ? mood.slice(0, 100) : undefined;
  
  return { 
    valid: true, 
    data: { 
      prompt: prompt.slice(0, 5000), 
      type: contentType,
      style: sanitizedStyle,
      mood: sanitizedMood
    } 
  };
}

serve(async (req) => {
  const origin = req.headers.get("origin");
  const corsHeaders = getCorsHeaders(origin);

  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const body = await req.json();
    
    // Validate input - note: systemPrompt is intentionally NOT accepted from user input
    const validation = validateInput(body);
    if (!validation.valid) {
      return new Response(JSON.stringify({ error: validation.error }), {
        status: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }
    
    const { prompt, type, style, mood } = validation.data!;

    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    if (!LOVABLE_API_KEY) {
      throw new Error("LOVABLE_API_KEY is not configured");
    }

    // Build the user prompt with context
    let fullPrompt = prompt;
    if (style) fullPrompt += ` (Style: ${style})`;
    if (mood) fullPrompt += ` (Mood: ${mood})`;

    console.log(`Generating ${type} content`);

    // Use hardcoded system prompt - never accept from user input
    const systemPrompt = `आप Zentara AI हैं - एक प्रसिद्ध हिंदी लेखक और कवि। 
आप ${type === 'story' ? 'कहानियां' : type === 'lyrics' ? 'गीत' : 'कविताएं'} लिखने में माहिर हैं।
हमेशा हिंदी में लिखें। Content creative, emotional और high quality होना चाहिए।`;

    const response = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${LOVABLE_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "google/gemini-2.5-flash",
        messages: [
          { role: "system", content: systemPrompt },
          { role: "user", content: fullPrompt }
        ],
      }),
    });

    if (!response.ok) {
      if (response.status === 429) {
        return new Response(
          JSON.stringify({ error: "Rate limit exceeded. कुछ देर बाद try करें।" }),
          { status: 429, headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }
      if (response.status === 402) {
        return new Response(
          JSON.stringify({ error: "Credits exhausted. Credits add करें।" }),
          { status: 402, headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }
      const errorText = await response.text();
      console.error("AI gateway error:", response.status, errorText);
      throw new Error(`AI gateway error: ${response.status}`);
    }

    const data = await response.json();
    const content = data.choices?.[0]?.message?.content || "";

    console.log("Creative content generated successfully");

    return new Response(
      JSON.stringify({ content, type, style, mood }),
      { headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );

  } catch (error) {
    console.error("Error generating creative content:", error);
    return new Response(
      JSON.stringify({ error: error instanceof Error ? error.message : "Failed to generate content" }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
