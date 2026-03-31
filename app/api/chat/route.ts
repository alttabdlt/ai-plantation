import { buildPlantationContext } from "@/lib/ai-context";

export async function POST(req: Request) {
  const { messages } = await req.json();

  const systemPrompt = buildPlantationContext();

  // Placeholder response until an AI provider is configured.
  // To enable real AI, install a provider (e.g., @ai-sdk/anthropic or @ai-sdk/openai)
  // and replace this with streamText() from the ai package.
  const lastMessage = messages[messages.length - 1]?.content ?? "";

  const response = generatePlaceholderResponse(lastMessage, systemPrompt);

  // Return AI SDK-compatible data stream format
  const encoder = new TextEncoder();
  const stream = new ReadableStream({
    start(controller) {
      // AI SDK data stream protocol
      controller.enqueue(encoder.encode(`0:${JSON.stringify(response)}\n`));
      controller.enqueue(
        encoder.encode(
          `e:${JSON.stringify({ finishReason: "stop", usage: { promptTokens: 0, completionTokens: 0 }, isContinued: false })}\n`
        )
      );
      controller.enqueue(
        encoder.encode(
          `d:${JSON.stringify({ finishReason: "stop", usage: { promptTokens: 0, completionTokens: 0 } })}\n`
        )
      );
      controller.close();
    },
  });

  return new Response(stream, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "X-Vercel-AI-Data-Stream": "v1",
    },
  });
}

function generatePlaceholderResponse(
  question: string,
  _systemPrompt: string
): string {
  const q = question.toLowerCase();

  if (q.includes("field d") || q.includes("catuai") || q.includes("stress")) {
    return "Catuai Ridge (Field D) is under stress for two reasons:\n\n1. **Soil moisture is critically low at 22%** — the optimal range for Catuai is 30-45%. This means the roots aren't getting enough water.\n\n2. **NDVI has been declining**, which suggests possible leaf rust infection. Our pest cameras detected a 73% probability of leaf rust.\n\n**What I recommend:**\n- Increase irrigation by 30% immediately\n- Apply copper-based fungicide within 48 hours\n- Monitor NDVI daily for the next 2 weeks\n\nWould you like me to run a simulation to see the projected recovery?";
  }

  if (q.includes("rain") || q.includes("weather") || q.includes("forecast")) {
    return "Heavy rain is expected **Tuesday and Wednesday** with 72-85% precipitation probability. Here's what you should do:\n\n1. **Prep drainage channels** in all fields, especially Gesha Garden which already has high moisture (58%)\n2. **Pause outdoor operations** — reschedule Tractor Unit 1's fertilizer application to Thursday\n3. **Reduce irrigation** in Gesha Garden now to prevent waterlogging\n\nThe good news: rain will help Catuai Ridge recover its moisture levels naturally. After the rain, we can reassess irrigation needs.";
  }

  if (q.includes("yield") || q.includes("improve") || q.includes("maximize")) {
    return "Current yield projection is **2,850 kg/ha** against a target of **3,200 kg/ha**. Here's how to close that gap:\n\n1. **Fix Catuai Ridge** (biggest opportunity) — it's dragging down the average. Addressing the moisture and leaf rust issues could add ~300 kg/ha from that field alone.\n\n2. **Optimize Gesha Garden** — reduce irrigation 20% to move moisture from 58% to optimal 42-45%. Healthier roots = better cherries.\n\n3. **Maintain healthy fields** — Bourbon Block and SL28 Slope are performing well. Keep current management.\n\nWith these changes, simulation projects **3,150 kg/ha** — a 10.5% improvement. Want to run the full simulation?";
  }

  if (q.includes("attention") || q.includes("which field") || q.includes("priority")) {
    return "**Two fields need your attention right now:**\n\n1. **Catuai Ridge (Field D)** — CRITICAL\n   - Moisture at 22% (should be 30-45%)\n   - Possible leaf rust detected\n   - Action: Irrigate + fungicide immediately\n\n2. **Gesha Garden (Field C)** — MODERATE\n   - Moisture at 58% (too high)\n   - Action: Reduce irrigation 20%\n\nThe other 4 fields (Bourbon Block, Typica Terrace, SL28 Slope, Caturra Flat) are all healthy and on track.";
  }

  return "I'm your CafePulse AI assistant with full access to your plantation data — 6 fields, 179 active sensors, weather forecasts, and soil analysis.\n\nYou can ask me things like:\n- \"Why is Field D stressed?\"\n- \"What should I do before the rain?\"\n- \"How can I improve yield?\"\n- \"Which fields need attention?\"\n\n**Quick status:** 4 of 6 fields are healthy. Catuai Ridge needs urgent attention (low moisture + possible leaf rust). Heavy rain expected Tue-Wed.\n\nTo enable live AI responses with a real language model, configure your AI provider API key in the environment variables.";
}
