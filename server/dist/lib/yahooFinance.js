"use strict";
/**
 * Yahoo Finance data fetcher using yahoo-finance2.
 * All calls happen server-side only — this file must never be imported
 * in client components.
 */
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.fetchYahooQuote = fetchYahooQuote;
const yahoo_finance2_1 = __importDefault(require("yahoo-finance2"));
// In yahoo-finance2 v4, the default export is a class that must be instantiated
const yahooFinance = new yahoo_finance2_1.default();
function formatLargeNumber(n) {
    if (!n || n <= 0)
        return "N/A";
    if (n >= 1_000_000_000_000)
        return `$${(n / 1_000_000_000_000).toFixed(2)}T`;
    if (n >= 1_000_000_000)
        return `$${(n / 1_000_000_000).toFixed(2)}B`;
    if (n >= 1_000_000)
        return `$${(n / 1_000_000).toFixed(1)}M`;
    return `$${n.toLocaleString()}`;
}
function formatVolume(n) {
    if (!n || n <= 0)
        return "N/A";
    if (n >= 1_000_000_000)
        return `${(n / 1_000_000_000).toFixed(1)}B`;
    if (n >= 1_000_000)
        return `${(n / 1_000_000).toFixed(1)}M`;
    if (n >= 1_000)
        return `${(n / 1_000).toFixed(0)}K`;
    return String(n);
}
async function fetchYahooQuote(query) {
    // 1. Resolve company name / query to an actual ticker symbol
    const searchRes = await yahooFinance.search(query);
    const bestMatch = searchRes.quotes.find((q) => q.isYahooFinance === true || q.quoteType === "EQUITY" || q.quoteType === "ETF") || searchRes.quotes[0];
    if (!bestMatch || !bestMatch.symbol) {
        throw new Error(`Could not find a valid stock ticker for "${query}"`);
    }
    const ticker = bestMatch.symbol;
    // 2. Fetch data using the resolved ticker
    const [quote, profile] = await Promise.allSettled([
        yahooFinance.quote(ticker),
        yahooFinance.quoteSummary(ticker, {
            modules: ["assetProfile", "summaryDetail"],
        }),
    ]);
    const q = quote.status === "fulfilled" ? quote.value : null;
    const p = profile.status === "fulfilled" ? profile.value : null;
    const regularMarketPrice = q?.regularMarketPrice ?? 0;
    const regularMarketChange = q?.regularMarketChange ?? 0;
    const regularMarketChangePercent = q?.regularMarketChangePercent ?? 0;
    const marketCapRaw = q?.marketCap ?? 0;
    const fiftyTwoWeekLow = q?.fiftyTwoWeekLow ?? 0;
    const fiftyTwoWeekHigh = q?.fiftyTwoWeekHigh ?? 0;
    const averageVolume = q?.averageDailyVolume3Month ?? q?.averageVolume ?? 0;
    const beta = p?.summaryDetail?.beta ?? 0;
    const sector = p?.assetProfile?.sector ?? "Unknown";
    const industry = p?.assetProfile?.industry ?? "Unknown";
    const name = q?.longName ?? q?.shortName ?? ticker.toUpperCase();
    const marketStats = {
        marketCap: formatLargeNumber(marketCapRaw),
        marketCapRaw,
        range: `$${fiftyTwoWeekLow.toFixed(2)} – $${fiftyTwoWeekHigh.toFixed(2)}`,
        fiftyTwoWeekLow,
        fiftyTwoWeekHigh,
        volume: formatVolume(averageVolume),
        beta,
        instOwnership: "N/A", // not in free yahoo-finance2 data
        sector,
        industry,
        regularMarketPrice,
        regularMarketChangePercent,
        regularMarketChange,
    };
    return {
        symbol: ticker.toUpperCase(),
        name,
        regularMarketPrice,
        regularMarketChange,
        regularMarketChangePercent,
        marketCapRaw,
        fiftyTwoWeekLow,
        fiftyTwoWeekHigh,
        beta,
        averageVolume,
        sector,
        industry,
        marketStats,
    };
}
