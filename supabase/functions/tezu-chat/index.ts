import "jsr:@supabase/functions-js/edge-runtime.d.ts";

// CORS
// Allow Lovable preview domains + production lovable.app + localhost.
function isAllowedOrigin(origin: string | null) {
  if (!origin) return false;
  try {
    const url = new URL(origin);
    const host = url.hostname;

    if (host === "localhost" || host === "127.0.0.1") return true;
    if (host.endsWith(".lovableproject.com")) return true; // preview domains
    if (host.endsWith(".lovable.app")) return true; // production domains

    // Optional explicit allowlist (custom domains)
    const explicit = new Set<string>([
      "tezuai.lovable.app",
      "cgqpfsojhmqytjnvzzqe.lovable.app",
    ]);
    return explicit.has(host);
  } catch {
    return false;
  }
}

function getCorsHeaders(origin: string | null) {
  const allowOrigin = isAllowedOrigin(origin) ? origin! : "*";
  return {
    "Access-Control-Allow-Origin": allowOrigin,
    "Vary": "Origin",
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

    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    if (!LOVABLE_API_KEY) {
      console.error("LOVABLE_API_KEY is not configured");
      return new Response(JSON.stringify({ error: "AI is not configured yet. Please try again later." }), {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const response = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${LOVABLE_API_KEY}`,
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

Always aim to be helpful, accurate, and engaging!`,
          },
          ...messages,
        ],
        stream: true,
      }),
    });

    if (!response.ok) {
      const t = await response.text().catch(() => "");
      console.error("AI gateway error:", response.status, t);

      if (response.status === 429) {
        return new Response(JSON.stringify({ error: "Rate limit लग गया है — थोड़ी देर बाद फिर try करें." }), {
          status: 429,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }

      if (response.status === 402) {
        return new Response(JSON.stringify({ error: "AI credits खत्म हो गए हैं — workspace में credits add करें." }), {
          status: 402,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }

      return new Response(JSON.stringify({ error: "AI service error — कृपया फिर से कोशिश करें." }), {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
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
