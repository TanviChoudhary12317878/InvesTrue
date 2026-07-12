import React from "react";
import { Activity, DollarSign, BarChart3, Layers, PieChart } from "lucide-react";
import { useTicker } from "@/context/TickerContext";

export default function MarketStats() {
  const { tickerData } = useTicker();
  const { marketStats } = tickerData;
  
  const stats = [
    { icon: DollarSign, label: "Market Cap", value: marketStats.marketCap, sub: "Mega Cap", color: "text-[var(--color-judge-blue)]", bg: "bg-[var(--color-judge-blue)]/10" },
    { icon: Activity, label: "52W Range", value: marketStats.range, sub: "High volatility", color: "text-[var(--color-bull-green)]", bg: "bg-[var(--color-bull-green)]/10" },
    { icon: BarChart3, label: "Avg Volume", value: marketStats.volume, sub: "30-day average", color: "text-[var(--color-warning-amber)]", bg: "bg-[var(--color-warning-amber)]/10" },
    { icon: Layers, label: "Beta", value: marketStats.beta, sub: "Systematic risk", color: "text-[var(--color-bear-red)]", bg: "bg-[var(--color-bear-red)]/10" },
    { icon: PieChart, label: "Inst. Ownership", value: marketStats.instOwnership, sub: "Vanguard, BlackRock", color: "text-[var(--color-judge-blue)]", bg: "bg-[var(--color-judge-blue)]/10" },
  ];
  return (
    <div className="reveal w-full">
      <h3 className="text-xs font-semibold uppercase tracking-[0.2em] text-[var(--color-muted-text)] mb-6">
        Market Overview
      </h3>
      <div className="grid grid-cols-5 gap-4">
        {stats.map((s, i) => {
          const Icon = s.icon;
          return (
            <div
              key={i}
              className="flex flex-col gap-3 p-5 bg-[var(--color-panel)] border border-[var(--color-panel-border)] rounded-2xl hover-lift"
            >
              <div className={`w-10 h-10 rounded-xl ${s.bg} flex items-center justify-center`}>
                <Icon className={`w-5 h-5 ${s.color}`} />
              </div>
              <div>
                <span className="font-mono text-2xl font-bold text-[var(--color-primary-text)]">{s.value}</span>
                <p className="text-xs text-[var(--color-muted-text)] mt-0.5">{s.label}</p>
              </div>
              <span className="text-[10px] text-[var(--color-secondary-text)]">{s.sub}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
