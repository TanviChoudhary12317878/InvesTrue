"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const yahoo_finance2_1 = __importDefault(require("yahoo-finance2"));
const YF = yahoo_finance2_1.default.default || yahoo_finance2_1.default;
const yahooFinance = typeof YF === "function" ? new YF() : YF;
const router = (0, express_1.Router)();
/**
 * GET /api/quotes
 *
 * Fetches lightweight, live market quotes for a batch of symbols (e.g. for the marquee ticker tape).
 * Query Param: ?symbols=AAPL,MSFT,NVDA
 */
router.get("/", async (req, res) => {
    const symbolsParam = req.query.symbols;
    if (!symbolsParam) {
        res.status(400).json({ error: "No symbols provided" });
        return;
    }
    const symbols = symbolsParam.split(",").map(s => s.trim().toUpperCase());
    try {
        const results = await Promise.allSettled(symbols.map(async (symbol) => {
            const quote = await yahooFinance.quote(symbol);
            return {
                symbol,
                price: quote.regularMarketPrice ? `$${quote.regularMarketPrice.toFixed(2)}` : "N/A",
                change: quote.regularMarketChangePercent
                    ? `${quote.regularMarketChangePercent > 0 ? "+" : ""}${quote.regularMarketChangePercent.toFixed(2)}%`
                    : "0.00%",
                up: (quote.regularMarketChangePercent || 0) >= 0,
            };
        }));
        const data = results
            .filter((r) => r.status === "fulfilled")
            .map(r => r.value);
        res.status(200).json(data);
    }
    catch (error) {
        console.error("[Backend] Failed to fetch quotes:", error);
        res.status(500).json({ error: "Failed to fetch quotes" });
    }
});
exports.default = router;
