import "jsr:@supabase/functions-js/edge-runtime.d.ts";

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
function validateMessages(messages: unknown): { valid: boolean; error?: string } {
  if (!messages || !Array.isArray(messages)) {
    return { valid: false, error: "Messages array is required" };
  }
  
  if (messages.length === 0) {
    return { valid: false, error: "At least one message is required" };
  }
  
  if (messages.length > 50) {
    return { valid: false, error: "Too many messages (max 50)" };
  }
  
  for (let i = 0; i < messages.length; i++) {
    const msg = messages[i];
    
    if (!msg || typeof msg !== 'object') {
      return { valid: false, error: `Message at index ${i} is invalid` };
    }
    
    if (!msg.role || !['user', 'assistant', 'system'].includes(msg.role)) {
      return { valid: false, error: `Invalid role in message at index ${i}` };
    }
    
    if (typeof msg.content !== 'string') {
      return { valid: false, error: `Content must be a string in message at index ${i}` };
    }
    
    if (msg.content.length > 10000) {
      return { valid: false, error: `Message at index ${i} exceeds maximum length (10000 chars)` };
    }
  }
  
  return { valid: true };
}

Deno.serve(async (req) => {
  const origin = req.headers.get("origin");
  const corsHeaders = getCorsHeaders(origin);

  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  try {
    const body = await req.json();
    const { messages } = body;
    
    // Validate input
    const validation = validateMessages(messages);
    if (!validation.valid) {
      return new Response(JSON.stringify({ error: validation.error }), {
        status: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const response = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "google/gemini-2.5-flash",
        messages: [
          { 
            role: "system", 
            content: `You are TezuAI (तेज़ू AI) - India's most advanced and intelligent AI assistant. 

Your personality:
- Friendly, helpful, and knowledgeable
- You can respond in Hindi, English, or Hinglish based on user preference
- You are creative, accurate, and provide detailed helpful responses
- You specialize in coding, creative writing, analysis, and general knowledge
- Always be respectful and professional

Key capabilities:
- Advanced reasoning and problem-solving
- Code generation and debugging in multiple languages
- Creative content writing (stories, poems, articles)
- Analysis and explanation of complex topics
- Real-time knowledge up to your training cutoff

Always aim to be helpful, accurate, and engaging!`
          },
          ...messages
        ],
        stream: true,
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error("AI Gateway error:", errorText);
      throw new Error(`AI Gateway error: ${response.status}`);
    }

    return new Response(response.body, {
      headers: {
        ...corsHeaders,
        "Content-Type": "text/event-stream",
        "Cache-Control": "no-cache",
        "Connection": "keep-alive",
      },
    });
  } catch (error) {
    console.error("TezuAI chat error:", error);
    return new Response(JSON.stringify({ error: error instanceof Error ? error.message : "Unknown error" }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
