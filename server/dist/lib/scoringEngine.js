"use strict";
/**
 * Custom Deterministic Scoring Engine
 *
 * INTERVIEW NOTE: The AI never touches this file! The recommendation (BUY/SELL)
 * and confidence scores are computed entirely from math using live market data.
 * This prevents the AI from "hallucinating" a buy rating on a terrible stock.
 *
 * Factors & Weights (Total 100%):
 *   1. Momentum (52W Position)   – 30% (Price relative to yearly high/low)
 *   2. Market Cap Stability      – 25% (Bigger company = more stable)
 *   3. Daily Trend               – 20% (Today's percentage change)
 *   4. Volatility (Beta)         – 15% (How wild the price swings are)
 *   5. Sector Strength           – 10% (Tech vs Utilities, etc.)
 *
 * Each factor is scored 0.0 to 5.0. The weighted sum is then normalized to 0–100.
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.runScoringEngine = runScoringEngine;
// Sectors ranked by historical stability/growth (0–5 scale)
const SECTOR_SCORES = {
    "Technology": 4.5,
    "Consumer Cyclical": 3.8,
    "Financial Services": 3.5,
    "Healthcare": 4.0,
    "Communication Services": 3.7,
    "Industrials": 3.2,
    "Consumer Defensive": 3.4,
    "Energy": 2.8,
    "Utilities": 2.5,
    "Real Estate": 2.6,
    "Basic Materials": 2.7,
};
function clamp(val, min, max) {
    return Math.max(min, Math.min(max, val));
}
/**
 * Factor 1: Momentum (30%)
 * Where is the current price in its 52W range?
 * Near 52W high → bullish momentum. Near 52W low → bearish.
 */
function scoreMomentum(currentPrice, low52w, high52w) {
    if (high52w <= low52w || currentPrice <= 0)
        return 2.5; // neutral fallback
    const range = high52w - low52w;
    const position = (currentPrice - low52w) / range; // 0 to 1
    return clamp(position * 5, 0, 5);
}
/**
 * Factor 2: Market Cap Stability (25%)
 * Mega cap (>200B) = max stability. Micro cap (<1B) = high risk.
 */
function scoreMarketCap(marketCapRaw) {
    if (!marketCapRaw || marketCapRaw <= 0)
        return 2.5;
    const B = 1_000_000_000;
    if (marketCapRaw >= 200 * B)
        return 5.0;
    if (marketCapRaw >= 100 * B)
        return 4.5;
    if (marketCapRaw >= 50 * B)
        return 4.0;
    if (marketCapRaw >= 10 * B)
        return 3.0;
    if (marketCapRaw >= 1 * B)
        return 2.0;
    return 1.0;
}
/**
 * Factor 3: Daily Trend (20%)
 * Based on today's price change percentage.
 * Strong positive day → bullish signal. Crash day → bearish.
 */
function scoreDailyTrend(changePercent) {
    if (changePercent >= 5)
        return 5.0;
    if (changePercent >= 3)
        return 4.5;
    if (changePercent >= 1)
        return 4.0;
    if (changePercent >= 0)
        return 3.0;
    if (changePercent >= -1)
        return 2.5;
    if (changePercent >= -3)
        return 1.5;
    if (changePercent >= -5)
        return 1.0;
    return 0.5;
}
/**
 * Factor 4: Volatility / Beta (15%)
 * Low beta = stable, predictable. High beta = risky.
 */
function scoreVolatility(beta) {
    if (!beta || beta <= 0)
        return 2.5;
    if (beta <= 0.5)
        return 5.0;
    if (beta <= 0.8)
        return 4.5;
    if (beta <= 1.0)
        return 4.0;
    if (beta <= 1.3)
        return 3.0;
    if (beta <= 1.7)
        return 2.0;
    if (beta <= 2.0)
        return 1.5;
    return 1.0;
}
/**
 * Factor 5: Sector Strength (10%)
 * Based on historical performance of the sector.
 */
function scoreSector(sector) {
    return SECTOR_SCORES[sector] ?? 3.0; // default to neutral
}
/**
 * Convert a weighted 0–100 score to a recommendation label.
 */
function scoreToRecommendation(score) {
    if (score >= 80)
        return "STRONG BUY";
    if (score >= 65)
        return "BUY";
    if (score >= 50)
        return "HOLD";
    return "AVOID";
}
/**
 * Calculate a confidence score (0–100) based on:
 * - How extreme the score is (further from 50 = more confident)
 * - Data completeness
 */
function calculateConfidence(score, hasAllData) {
    const distanceFromNeutral = Math.abs(score - 50);
    // Base confidence: 50 + distance from neutral (max 100)
    const rawConfidence = clamp(50 + distanceFromNeutral * 1.0, 40, 97);
    const confidence = hasAllData
        ? Math.round(rawConfidence)
        : Math.round(rawConfidence * 0.85);
    // Bull/Bear confidence are inverse of each other, offset from total
    const bullConfidence = clamp(Math.round(score * 0.95), 10, 97);
    const bearConfidence = clamp(Math.round((100 - score) * 0.85), 10, 90);
    return { confidence, bullConfidence, bearConfidence };
}
function runScoringEngine(input) {
    const weights = {
        momentum: 0.30,
        marketCapStability: 0.25,
        dailyTrend: 0.20,
        volatility: 0.15,
        sectorStrength: 0.10,
    };
    const momentum = scoreMomentum(input.currentPrice, input.fiftyTwoWeekLow, input.fiftyTwoWeekHigh);
    const marketCapStability = scoreMarketCap(input.marketCapRaw);
    const dailyTrend = scoreDailyTrend(input.regularMarketChangePercent);
    const volatility = scoreVolatility(input.beta);
    const sectorStrength = scoreSector(input.sector);
    // Weighted sum → normalize from [0,5] to [0,100]
    const weightedRaw = momentum * weights.momentum +
        marketCapStability * weights.marketCapStability +
        dailyTrend * weights.dailyTrend +
        volatility * weights.volatility +
        sectorStrength * weights.sectorStrength;
    const total = clamp(Math.round((weightedRaw / 5) * 100), 0, 100);
    const recommendation = scoreToRecommendation(total);
    const hasAllData = input.currentPrice > 0 &&
        input.fiftyTwoWeekLow > 0 &&
        input.fiftyTwoWeekHigh > 0 &&
        input.marketCapRaw > 0 &&
        input.beta > 0;
    const { confidence, bullConfidence, bearConfidence } = calculateConfidence(total, hasAllData);
    return {
        recommendation,
        confidence,
        bullConfidence,
        bearConfidence,
        scoreBreakdown: {
            momentum: Math.round(momentum * 10) / 10,
            marketCapStability: Math.round(marketCapStability * 10) / 10,
            dailyTrend: Math.round(dailyTrend * 10) / 10,
            volatility: Math.round(volatility * 10) / 10,
            sectorStrength: Math.round(sectorStrength * 10) / 10,
            total,
        },
    };
}
