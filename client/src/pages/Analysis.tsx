import React, { useEffect, useState, useCallback, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useTicker } from "@/context/TickerContext";
import { ArrowLeft, RefreshCw, Wifi, WifiOff, Clock } from "lucide-react";

import Header from "@/components/layout/Header";
import FinancialBackground from "@/components/layout/FinancialBackground";

import WelcomeStrip from "@/components/dashboard/WelcomeStrip";
import HeroBattleCard from "@/components/dashboard/HeroBattleCard";
import MarketStats from "@/components/dashboard/MarketStats";
import AgentPipeline from "@/components/dashboard/AgentPipeline";
import MarketInsights from "@/components/dashboard/MarketInsights";
import JudgePanel from "@/components/judge/JudgePanel";
import BullBearDebateSection from "@/components/debate/BullBearDebateSection";

export default function AnalysisPage() {
  const { ticker: tickerParam } = useParams<{ ticker: string }>();
  const navigate = useNavigate();
  const { fetchTicker, tickerData, isLoading, error, refreshTicker } = useTicker();
  const [isLoaded, setIsLoaded] = useState(false);
  const mainRef = useRef<HTMLDivElement>(null);

  const observerCallback = useCallback((entries: IntersectionObserverEntry[]) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) entry.target.classList.add("visible");
    });
  }, []);

  useEffect(() => {
    if (!isLoaded) return;
    
    let observer: IntersectionObserver;
    
    const timer = setTimeout(() => {
      observer = new IntersectionObserver(observerCallback, {
        threshold: 0.1,
        rootMargin: "0px 0px -40px 0px",
      });
      const reveals = document.querySelectorAll(".reveal");
      reveals.forEach((el) => observer.observe(el));
    }, 100); // Small delay to ensure all child components have mounted their DOM nodes

    return () => {
      clearTimeout(timer);
      if (observer) observer.disconnect();
    };
  }, [isLoaded, observerCallback]);

  useEffect(() => {
    const tickerSymbol = tickerParam?.toUpperCase() ?? "NVDA";
    fetchTicker(tickerSymbol).then(() => {
      const timer = setTimeout(() => setIsLoaded(true), 400);
      return () => clearTimeout(timer);
    });
  }, [tickerParam, fetchTicker]);

  return (
    <div className="min-h-screen flex flex-col bg-[var(--color-background)] relative">
      <FinancialBackground />

      <div className="relative z-10 flex flex-col min-h-screen">
        <Header />

        <main ref={mainRef} className="flex-1 max-w-[1440px] w-full mx-auto px-8 pb-32">
          <div className="py-5 flex items-center justify-between">
            <button
              onClick={() => navigate("/")}
              className="flex items-center gap-2 text-sm text-[var(--color-secondary-text)] hover:text-[var(--color-primary-text)] transition-colors group"
            >
              <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
              Back to Search
            </button>

            <div className="flex items-center gap-3">
              {tickerData.dataSource === "live" && (
                <span className="flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-wider text-[var(--color-bull-green)] bg-[var(--color-bull-green)]/10 px-2.5 py-1 rounded-full">
                  <Wifi className="w-3 h-3" /> Live
                </span>
              )}
              {tickerData.dataSource === "cached" && (
                <span className="flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-wider text-[var(--color-warning-amber)] bg-[var(--color-warning-amber)]/10 px-2.5 py-1 rounded-full">
                  <Clock className="w-3 h-3" /> Cached
                </span>
              )}
              {tickerData.dataSource === "fallback" && (
                <span className="flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-wider text-[var(--color-bear-red)] bg-[var(--color-bear-red)]/10 px-2.5 py-1 rounded-full">
                  <WifiOff className="w-3 h-3" /> Offline
                </span>
              )}
              <button
                onClick={refreshTicker}
                disabled={isLoading}
                className="flex items-center gap-1.5 text-xs text-[var(--color-secondary-text)] hover:text-[var(--color-primary-text)] disabled:opacity-40 transition-all"
              >
                <RefreshCw className={`w-3.5 h-3.5 ${isLoading ? "animate-spin" : ""}`} />
                Refresh
              </button>
            </div>
          </div>

          <WelcomeStrip />

          {!isLoaded ? (
            <div className="flex items-center justify-center h-64">
              <div className="flex gap-2">
                {[0, 1, 2].map((i) => (
                  <div
                    key={i}
                    className="w-2 h-2 rounded-full bg-[var(--color-judge-blue)] animate-bounce"
                    style={{ animationDelay: `${i * 0.15}s` }}
                  />
                ))}
              </div>
            </div>
          ) : error && tickerData.symbol !== tickerParam ? (
            <div className="flex flex-col items-center justify-center h-96 text-center mt-6 animate-fade-scale">
              <div className="w-16 h-16 rounded-2xl bg-[var(--color-bear-red)]/10 flex items-center justify-center mb-6">
                <WifiOff className="w-8 h-8 text-[var(--color-bear-red)]" />
              </div>
              <h2 className="text-2xl font-black text-[var(--color-primary-text)] mb-3">Analysis Unavailable</h2>
              <p className="text-[var(--color-secondary-text)] max-w-md mx-auto leading-relaxed">
                {error}
              </p>
              <button
                onClick={() => navigate("/")}
                className="mt-8 px-6 py-3 rounded-xl bg-[var(--color-panel-border)] hover:bg-[var(--color-judge-blue)]/10 hover:text-[var(--color-judge-blue)] text-[var(--color-primary-text)] font-semibold transition-colors"
              >
                Return to Search
              </button>
            </div>
          ) : (
            <div className="flex flex-col gap-12 animate-fade-scale mt-6">
              <HeroBattleCard />
              <MarketStats />
              <JudgePanel />
              <div>
                <h3 className="reveal text-xs font-semibold uppercase tracking-[0.2em] text-[var(--color-muted-text)] mb-2">
                  Agent Analysis
                </h3>
                <BullBearDebateSection />
              </div>
              <AgentPipeline />
              <MarketInsights />
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
