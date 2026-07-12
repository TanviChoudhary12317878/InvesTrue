/**
 * Gemini API client — server-side only.
 * 
 * Sends real market data to Gemini and gets back:
 *   - 3 bull thesis points
 *   - 3 bear thesis points  
 *   - A judge summary (describes data, NO recommendation)
 * 
 * The AI is explicitly instructed NOT to output a recommendation.
 * That is handled entirely by the scoring engine.
 */

import { GoogleGenerativeAI } from "@google/generative-ai";
import type { GeminiAnalysis } from "../types/analysis";

function buildPrompt(data: {
  ticker: string;
  name: string;
  price: number;
  changePercent: number;
  marketCap: string;
  fiftyTwoWeekLow: number;
  fiftyTwoWeekHigh: number;
  beta: number;
  sector: string;
  industry: string;
  scoreTotal: number;
}): string {
  const direction = data.changePercent >= 0 ? "up" : "down";
  const pct = Math.abs(data.changePercent).toFixed(2);
  const position52w = (
    ((data.price - data.fiftyTwoWeekLow) /
      (data.fiftyTwoWeekHigh - data.fiftyTwoWeekLow)) *
    100
  ).toFixed(0);

  return `You are an institutional equity analyst AI. Your job is to write structured investment analysis — not to make a recommendation. A separate deterministic scoring engine handles the final verdict.

STOCK DATA:
- Ticker: ${data.ticker} (${data.name})
- Sector: ${data.sector} / ${data.industry}
- Current Price: $${data.price.toFixed(2)} (${direction} ${pct}% today)
- Market Cap: ${data.marketCap}
- 52-Week Range: $${data.fiftyTwoWeekLow.toFixed(2)} – $${data.fiftyTwoWeekHigh.toFixed(2)}
- Current 52W Position: ${position52w}% of its range
- Beta: ${data.beta.toFixed(2)}
- Internal Score (0–100): ${data.scoreTotal}

INSTRUCTIONS:
1. Write exactly 3 BULL THESIS POINTS. Each must be 1 sentence, data-driven, specific to this stock's metrics above. No generic statements. Use exact numbers from the data.
2. Write exactly 3 BEAR THESIS POINTS. Same rules — data-driven, specific, use real numbers.
3. Write a JUDGE SUMMARY of 2–3 sentences that explains what the data reveals about this stock, balancing both perspectives objectively. Do NOT use the words "buy", "sell", "hold", "recommend", or any rating language.

OUTPUT FORMAT (strict JSON, no markdown, no extra text):
{
  "bullArgs": ["point 1", "point 2", "point 3"],
  "bearArgs": ["point 1", "point 2", "point 3"],
  "judgeSummary": "2-3 sentence balanced data summary here."
}`;
}

export async function callGemini(data: Parameters<typeof buildPrompt>[0]): Promise<GeminiAnalysis> {
  const apiKey = process.env.GEMINI_API_KEY;
  
  if (!apiKey || apiKey === "PASTE_YOUR_GEMINI_API_KEY_HERE" || apiKey.trim() === "") {
    throw new Error("GEMINI_API_KEY not configured in .env.local");
  }

  const genAI = new GoogleGenerativeAI(apiKey);
  const model = genAI.getGenerativeModel({ model: "gemini-3.5-flash" });

  const result = await model.generateContent(buildPrompt(data));
  const text = result.response.text().trim();

  // Strip any accidental markdown code fences
  const cleaned = text.replace(/^```json\s*/i, "").replace(/\s*```$/i, "").trim();

  let parsed: GeminiAnalysis;
  try {
    parsed = JSON.parse(cleaned);
  } catch {
    throw new Error(`Gemini returned invalid JSON: ${cleaned.slice(0, 200)}`);
  }

  // Validate structure
  if (
    !Array.isArray(parsed.bullArgs) ||
    !Array.isArray(parsed.bearArgs) ||
    typeof parsed.judgeSummary !== "string" ||
    parsed.bullArgs.length < 3 ||
    parsed.bearArgs.length < 3
  ) {
    throw new Error("Gemini response has unexpected structure");
  }

  return {
    bullArgs: parsed.bullArgs.slice(0, 3),
    bearArgs: parsed.bearArgs.slice(0, 3),
    judgeSummary: parsed.judgeSummary,
  };
}
