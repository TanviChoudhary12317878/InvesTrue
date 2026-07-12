/**
 * Yahoo Finance data fetcher using yahoo-finance2.
 * All calls happen server-side only — this file must never be imported
 * in client components.
 */

import yahooFinanceStatic from "yahoo-finance2";
import type { MarketStats } from "../types/analysis";

// In yahoo-finance2 v4, the default export is a class that must be instantiated
const yahooFinance = new (yahooFinanceStatic as any)();

function formatLargeNumber(n: number): string {
  if (!n || n <= 0) return "N/A";
  if (n >= 1_000_000_000_000) return `$${(n / 1_000_000_000_000).toFixed(2)}T`;
  if (n >= 1_000_000_000)     return `$${(n / 1_000_000_000).toFixed(2)}B`;
  if (n >= 1_000_000)         return `$${(n / 1_000_000).toFixed(1)}M`;
  return `$${n.toLocaleString()}`;
}

function formatVolume(n: number): string {
  if (!n || n <= 0) return "N/A";
  if (n >= 1_000_000_000) return `${(n / 1_000_000_000).toFixed(1)}B`;
  if (n >= 1_000_000)     return `${(n / 1_000_000).toFixed(1)}M`;
  if (n >= 1_000)         return `${(n / 1_000).toFixed(0)}K`;
  return String(n);
}

export interface YahooQuote {
  symbol: string;
  name: string;
  regularMarketPrice: number;
  regularMarketChange: number;
  regularMarketChangePercent: number;
  marketCapRaw: number;
  fiftyTwoWeekLow: number;
  fiftyTwoWeekHigh: number;
  beta: number;
  averageVolume: number;
  sector: string;
  industry: string;
  marketStats: MarketStats;
}

export async function fetchYahooQuote(query: string): Promise<YahooQuote> {
  // 1. Resolve company name / query to an actual ticker symbol
  const searchRes = await yahooFinance.search(query);
  const bestMatch = searchRes.quotes.find((q: any) => q.isYahooFinance === true || q.quoteType === "EQUITY" || q.quoteType === "ETF") || searchRes.quotes[0];
  
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

  const regularMarketPrice        = (q as any)?.regularMarketPrice ?? 0;
  const regularMarketChange       = (q as any)?.regularMarketChange ?? 0;
  const regularMarketChangePercent = (q as any)?.regularMarketChangePercent ?? 0;
  const marketCapRaw              = (q as any)?.marketCap ?? 0;
  const fiftyTwoWeekLow           = (q as any)?.fiftyTwoWeekLow ?? 0;
  const fiftyTwoWeekHigh          = (q as any)?.fiftyTwoWeekHigh ?? 0;
  const averageVolume             = (q as any)?.averageDailyVolume3Month ?? (q as any)?.averageVolume ?? 0;
  const beta                      = (p as any)?.summaryDetail?.beta ?? 0;
  const sector                    = (p as any)?.assetProfile?.sector ?? "Unknown";
  const industry                  = (p as any)?.assetProfile?.industry ?? "Unknown";
  const name                      = (q as any)?.longName ?? (q as any)?.shortName ?? ticker.toUpperCase();

  const marketStats: MarketStats = {
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
