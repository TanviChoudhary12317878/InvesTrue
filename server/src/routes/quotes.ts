import { Router, Request, Response } from "express";
import yahooFinanceStatic from "yahoo-finance2";

const YF = (yahooFinanceStatic as any).default || yahooFinanceStatic;
const yahooFinance = typeof YF === "function" ? new YF() : YF;

const router = Router();

/**
 * GET /api/quotes
 * 
 * Fetches lightweight, live market quotes for a batch of symbols (e.g. for the marquee ticker tape).
 * Query Param: ?symbols=AAPL,MSFT,NVDA
 */
router.get("/", async (req: Request, res: Response): Promise<void> => {
  const symbolsParam = req.query.symbols as string;

  if (!symbolsParam) {
    res.status(400).json({ error: "No symbols provided" });
    return;
  }

  const symbols = symbolsParam.split(",").map(s => s.trim().toUpperCase());

  try {
    const results = await Promise.allSettled(
      symbols.map(async (symbol) => {
        const quote = await yahooFinance.quote(symbol);
        return {
          symbol,
          price: quote.regularMarketPrice ? `$${quote.regularMarketPrice.toFixed(2)}` : "N/A",
          change: quote.regularMarketChangePercent 
            ? `${quote.regularMarketChangePercent > 0 ? "+" : ""}${quote.regularMarketChangePercent.toFixed(2)}%`
            : "0.00%",
          up: (quote.regularMarketChangePercent || 0) >= 0,
        };
      })
    );

    const data = results
      .filter((r): r is PromiseFulfilledResult<any> => r.status === "fulfilled")
      .map(r => r.value);

    res.status(200).json(data);
  } catch (error: any) {
    console.error("[Backend] Failed to fetch quotes:", error);
    res.status(500).json({ error: "Failed to fetch quotes" });
  }
});

export default router;
