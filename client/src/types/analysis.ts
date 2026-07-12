// ─── Shared types used by both mock data and live API responses ───

export type Recommendation = "STRONG BUY" | "BUY" | "HOLD" | "AVOID";

export interface MarketStats {
  marketCap: string;
  marketCapRaw: number;
  range: string;
  fiftyTwoWeekLow: number;
  fiftyTwoWeekHigh: number;
  volume: string;
  beta: number;
  instOwnership: string;
  sector: string;
  industry: string;
  regularMarketPrice: number;
  regularMarketChangePercent: number;
  regularMarketChange: number;
}

export interface ScoringResult {
  recommendation: Recommendation;
  confidence: number;         // 0–100
  bullConfidence: number;     // 0–100
  bearConfidence: number;     // 0–100
  scoreBreakdown: {
    momentum: number;
    marketCapStability: number;
    dailyTrend: number;
    volatility: number;
    sectorStrength: number;
    total: number;            // weighted 0–100
  };
}

export interface GeminiAnalysis {
  bullArgs: string[];   // 3 points
  bearArgs: string[];   // 3 points
  judgeSummary: string; // 2–3 sentences
}

export interface AnalysisResult {
  symbol: string;
  name: string;
  price: string;
  change: string;
  changePercent: string;
  isPositive: boolean;
  recommendation: Recommendation;
  confidence: number;
  bullConfidence: number;
  bearConfidence: number;
  bullArgs: string[];
  bearArgs: string[];
  judgeSummary: string;
  marketStats: {
    marketCap: string;
    range: string;
    volume: string;
    beta: string;
    instOwnership: string;
    sector: string;
  };
  scoreBreakdown: ScoringResult["scoreBreakdown"];
  dataSource: "live" | "cached" | "fallback";
  lastUpdated: number; // Unix timestamp ms
}
