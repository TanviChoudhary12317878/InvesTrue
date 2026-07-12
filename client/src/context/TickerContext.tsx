/**
 * TickerContext.tsx — Global state for the currently selected stock.
 *
 * This React Context shares the analysis data across ALL components.
 * When a user searches for a ticker, `fetchTicker` is called, which:
 *   1. Checks localStorage cache (5 min TTL)
 *   2. Calls our Express backend API at /api/analyze/:ticker
 *   3. Falls back to mock data if the API is down
 *
 * Any component can access the data via the `useTicker()` hook.
 */

import React, { createContext, useContext, useState, useCallback, useEffect } from "react";
import type { AnalysisResult } from "@/types/analysis";
import { mockTickerData } from "@/lib/mockData";

// The backend Express server URL
const API_BASE = import.meta.env.VITE_API_URL || "http://localhost:5000";

const CACHE_TTL_MS = 5 * 60 * 1000; // 5 minutes
const CACHE_PREFIX = "investrue_cache_";

interface TickerContextType {
  currentTicker: string;
  tickerData: AnalysisResult;
  isLoading: boolean;
  error: string | null;
  fetchTicker: (symbol: string) => Promise<void>;
  refreshTicker: () => Promise<void>;
}

const TickerContext = createContext<TickerContextType | undefined>(undefined);

// ── Cache helpers ──────────────────────────────────────────────
function readCache(symbol: string): AnalysisResult | null {
  try {
    const raw = localStorage.getItem(CACHE_PREFIX + symbol);
    if (!raw) return null;
    const parsed: AnalysisResult = JSON.parse(raw);
    const age = Date.now() - (parsed.lastUpdated ?? 0);
    if (age > CACHE_TTL_MS) return null; // expired
    return { ...parsed, dataSource: "cached" };
  } catch {
    return null;
  }
}

function writeCache(data: AnalysisResult) {
  try {
    localStorage.setItem(CACHE_PREFIX + data.symbol, JSON.stringify(data));
  } catch {
    // localStorage unavailable — silently ignore
  }
}

// ── Provider ──────────────────────────────────────────────────
export function TickerProvider({ children }: { children: React.ReactNode }) {
  const [currentTicker, setCurrentTicker] = useState("NVDA");
  const [tickerData, setTickerData] = useState<AnalysisResult>(mockTickerData["NVDA"]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchTicker = useCallback(async (symbol: string, bypassCache = false) => {
    const upper = symbol.toUpperCase().trim();
    if (!upper) return;

    setCurrentTicker(upper);
    setError(null);

    // 1. Try cache first
    if (!bypassCache) {
      const cached = readCache(upper);
      if (cached) {
        setTickerData(cached);
        setIsLoading(false);
        return;
      }
    }

    // 2. Fetch from API
    setIsLoading(true);
    try {
      const res = await fetch(`${API_BASE}/api/analyze/${upper}`);
      if (!res.ok) {
        const body = await res.json().catch(() => ({}));
        throw new Error(body.error ?? `HTTP ${res.status}`);
      }
      const data: AnalysisResult = await res.json();
      writeCache(data);
      setTickerData(data);
    } catch (err) {
      const msg = (err as Error).message ?? "Unknown error";
      console.warn(`[InvesTrue] Fetch failed for ${upper}: ${msg}`);
      setError(msg);

      // 3. Fall back to mock data
      const fallback = mockTickerData[upper];
      if (fallback) {
        setTickerData({ ...fallback, dataSource: "fallback" });
      }
      // If no mock either, keep previous data
    } finally {
      setIsLoading(false);
    }
  }, []);

  const refreshTicker = useCallback(async () => {
    await fetchTicker(currentTicker, true); // bypass cache
  }, [currentTicker, fetchTicker]);

  // Legacy setTicker compatibility (used by some components)
  const setTicker = useCallback((symbol: string) => {
    fetchTicker(symbol);
  }, [fetchTicker]);

  // Expose setTicker on context (added below in value)
  return (
    <TickerContext.Provider
      value={{ currentTicker, tickerData, isLoading, error, fetchTicker, refreshTicker }}
    >
      {children}
    </TickerContext.Provider>
  );
}

export function useTicker() {
  const ctx = useContext(TickerContext);
  if (!ctx) throw new Error("useTicker must be used inside <TickerProvider>");
  return ctx;
}
