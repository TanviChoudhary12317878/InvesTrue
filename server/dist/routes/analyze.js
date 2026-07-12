"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const yahooFinance_1 = require("../lib/yahooFinance");
const scoringEngine_1 = require("../lib/scoringEngine");
const geminiClient_1 = require("../lib/geminiClient");
const mockData_1 = require("../lib/mockData");
const router = (0, express_1.Router)();
/**
 * GET /api/analyze/:ticker
 *
 * This is the main backend route that generates an AI analysis for a given stock ticker.
 * It follows a clear 4-step pipeline so the frontend can receive a unified JSON response.
 */
router.get("/:ticker", async (req, res) => {
    const ticker = String(req.params.ticker).toUpperCase().trim();
    try {
        // ── Step 1: Fetch Live Data from Yahoo Finance ──
        // We get real-time price, market cap, beta (volatility), and sector.
        const quote = await (0, yahooFinance_1.fetchYahooQuote)(ticker);
        // ── Step 2: Run the Deterministic Scoring Engine ──
        // Before we ask the AI, we calculate a hard math-based score (0-100) based on momentum and stability.
        // This prevents the AI from hallucinating a "BUY" on a terrible stock.
        const scoring = (0, scoringEngine_1.runScoringEngine)({
            currentPrice: quote.regularMarketPrice,
            fiftyTwoWeekLow: quote.fiftyTwoWeekLow,
            fiftyTwoWeekHigh: quote.fiftyTwoWeekHigh,
            marketCapRaw: quote.marketCapRaw,
            regularMarketChangePercent: quote.regularMarketChangePercent,
            beta: quote.beta,
            sector: quote.sector,
        });
        // ── Step 3: Fetch the AI Analysis from Gemini ──
        // We pass the live data and the calculated score to the AI, asking it to generate
        // Bull arguments, Bear arguments, and a final Judge summary.
        let geminiData = {
            bullArgs: [
                "AI analysis is temporarily unavailable due to high demand — please try again shortly.",
                "The scoring engine is fully operational and has calculated the recommendation above.",
                "All live market data, price feeds, and quantitative scores are still fully active.",
            ],
            bearArgs: [
                "AI-generated bear thesis is temporarily unavailable — the scoring engine is still running.",
                "Quantitative risk factors are incorporated into the confidence scores shown above.",
                "This is a graceful fallback — all live market data and scores are fully live.",
            ],
            judgeSummary: "The AI committee synthesis is temporarily unavailable due to high demand. The recommendation and confidence scores above are fully calculated by our deterministic scoring engine using live Yahoo Finance data. Please refresh in a few minutes.",
        };
        try {
            geminiData = await (0, geminiClient_1.callGemini)({
                ticker,
                name: quote.name,
                price: quote.regularMarketPrice,
                changePercent: quote.regularMarketChangePercent,
                marketCap: quote.marketStats.marketCap,
                fiftyTwoWeekLow: quote.fiftyTwoWeekLow,
                fiftyTwoWeekHigh: quote.fiftyTwoWeekHigh,
                beta: quote.beta,
                sector: quote.sector,
                industry: quote.industry,
                scoreTotal: scoring.scoreBreakdown.total,
            });
        }
        catch (geminiError) {
            console.warn("[Backend] Gemini unavailable:", geminiError.message);
            // If Gemini fails (e.g. invalid API key), we gracefully fall back to the placeholder text.
            // The quantitative scoring and live prices will still be sent to the frontend!
        }
        // ── Step 4: Format and Return the Data to the Frontend ──
        const price = `$${quote.regularMarketPrice.toFixed(2)}`;
        const changeAbs = quote.regularMarketChange;
        const changePct = quote.regularMarketChangePercent;
        const isPositive = changePct >= 0;
        const changeStr = `${isPositive ? "+" : ""}$${Math.abs(changeAbs).toFixed(2)}`;
        const changePctStr = `${isPositive ? "+" : ""}${changePct.toFixed(2)}%`;
        const result = {
            symbol: ticker,
            name: quote.name,
            price,
            change: changeStr,
            changePercent: changePctStr,
            isPositive,
            recommendation: scoring.recommendation,
            confidence: scoring.confidence,
            bullConfidence: scoring.bullConfidence,
            bearConfidence: scoring.bearConfidence,
            bullArgs: geminiData.bullArgs,
            bearArgs: geminiData.bearArgs,
            judgeSummary: geminiData.judgeSummary,
            marketStats: {
                marketCap: quote.marketStats.marketCap,
                range: quote.marketStats.range,
                volume: quote.marketStats.volume,
                beta: quote.beta > 0 ? quote.beta.toFixed(2) : "N/A",
                instOwnership: "N/A",
                sector: quote.sector,
            },
            scoreBreakdown: scoring.scoreBreakdown,
            dataSource: "live",
            lastUpdated: Date.now(),
        };
        res.status(200).json(result);
    }
    catch (err) {
        console.error(`[Backend] Analysis failed for ${ticker}:`, err);
        // Fallback: If Yahoo Finance fails (e.g. invalid ticker or network error), return mock data if it exists.
        const mock = mockData_1.mockTickerData[ticker];
        if (mock) {
            const fallback = {
                symbol: mock.symbol,
                name: mock.name,
                price: mock.price,
                change: mock.change,
                changePercent: mock.changePercent,
                isPositive: mock.isPositive,
                recommendation: mock.recommendation,
                confidence: mock.confidence,
                bullConfidence: mock.bullConfidence,
                bearConfidence: mock.bearConfidence,
                bullArgs: mock.bullArgs,
                bearArgs: mock.bearArgs,
                judgeSummary: "Live data is temporarily unavailable. Displaying cached research data.",
                marketStats: {
                    marketCap: mock.marketStats.marketCap,
                    range: mock.marketStats.range,
                    volume: mock.marketStats.volume,
                    beta: "N/A",
                    instOwnership: mock.marketStats.instOwnership,
                    sector: "N/A",
                },
                scoreBreakdown: {
                    momentum: 0, marketCapStability: 0, dailyTrend: 0,
                    volatility: 0, sectorStrength: 0, total: mock.confidence,
                },
                dataSource: "fallback",
                lastUpdated: Date.now(),
            };
            res.status(200).json(fallback);
            return;
        }
        res.status(404).json({ error: `Unable to fetch data for ticker "${ticker}". Please check the symbol and try again.` });
    }
});
exports.default = router;
