import React from "react";
import { Brain, Star, TrendingUp, Sparkles } from "lucide-react";
import { useTicker } from "@/context/TickerContext";

export default function WelcomeStrip() {
  const { tickerData } = useTicker();
  const hour = new Date().getHours();
  const greeting = hour < 12 ? "Good Morning" : hour < 17 ? "Good Afternoon" : hour < 21 ? "Good Evening" : "Good Night";
  return (
    <div className="relative w-full py-10 px-8">
      <div className="max-w-[1440px] mx-auto flex items-center justify-between">
        <div className="flex flex-col gap-2">
          <div className="flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-[var(--color-warning-amber)] animate-float" />
            <span className="text-xs font-semibold uppercase tracking-[0.2em] text-[var(--color-muted-text)]">
              AI-Powered Analysis
            </span>
          </div>
          <h2 className="text-4xl font-light text-[var(--color-primary-text)] tracking-tight">
             {greeting}, <span className="font-semibold">Investor</span>
          </h2>
          <p className="text-base text-[var(--color-secondary-text)] max-w-md">
            AI Investment Committee has synthesized a thesis for <strong className="text-[var(--color-primary-text)]">{tickerData.name}</strong>
          </p>
        </div>

        <div className="flex items-center gap-6">
          <div className="flex items-center gap-4 p-4 bg-[var(--color-panel)] border border-[var(--color-panel-border)] rounded-2xl shadow-sm hover-lift">
            <div className="p-2.5 bg-[var(--color-judge-blue)]/10 rounded-xl">
              <Brain className="w-5 h-5 text-[var(--color-judge-blue)]" />
            </div>
            <div className="flex flex-col">
              <span className="font-mono text-xl font-bold text-[var(--color-primary-text)]">12</span>
              <span className="text-[10px] text-[var(--color-muted-text)] uppercase tracking-wider font-semibold">AI Agents</span>
            </div>
          </div>

          <div className="flex items-center gap-4 p-4 bg-[var(--color-panel)] border border-[var(--color-panel-border)] rounded-2xl shadow-sm hover-lift">
            <div className="p-2.5 bg-[var(--color-warning-amber)]/10 rounded-xl">
              <Star className="w-5 h-5 text-[var(--color-warning-amber)]" />
            </div>
            <div className="flex flex-col">
              <span className="font-mono text-xl font-bold text-[var(--color-primary-text)]">4</span>
              <span className="text-[10px] text-[var(--color-muted-text)] uppercase tracking-wider font-semibold">Watchlist</span>
            </div>
          </div>

          <div className="flex items-center gap-4 p-4 bg-[var(--color-panel)] border border-[var(--color-panel-border)] rounded-2xl shadow-sm hover-lift">
            <div className="p-2.5 bg-[var(--color-bull-green)]/10 rounded-xl">
              <TrendingUp className="w-5 h-5 text-[var(--color-bull-green)]" />
            </div>
            <div className="flex flex-col">
              <span className="font-mono text-base font-bold text-[var(--color-bull-green)]">Bullish</span>
              <span className="text-[10px] text-[var(--color-muted-text)] uppercase tracking-wider font-semibold">Market Trend</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
