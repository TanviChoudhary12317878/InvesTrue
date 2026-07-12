import React from "react";
import { TrendingUp, TrendingDown, Clock, Newspaper } from "lucide-react";

const INSIGHTS = [
  {
    id: 1,
    title: "Geopolitical Export Controls Stabilizing",
    excerpt: "Recent policy adjustments suggest a stabilization in AI chip export controls to emerging markets, potentially securing $8B+ in previously at-risk revenue streams for top semiconductor firms.",
    sentiment: "Bullish",
    time: "45m ago",
    source: "Macro Desk"
  },
  {
    id: 2,
    title: "Hyperscaler Capex Reaches Record Highs",
    excerpt: "Q3 earnings transcripts reveal that the top 4 cloud providers have collectively increased their AI infrastructure capex guidance by 15%, ensuring sustained demand for next-gen accelerators.",
    sentiment: "Bullish",
    time: "2h ago",
    source: "Earnings Analysis"
  },
  {
    id: 3,
    title: "Supply Chain Bottlenecks Easing",
    excerpt: "Advanced packaging (CoWoS) capacity at TSMC is reportedly expanding faster than anticipated, which may alleviate the current 40-week lead times for flagship GPU orders by early next year.",
    sentiment: "Neutral",
    time: "4h ago",
    source: "Supply Chain"
  }
];

export default function MarketInsights() {
  return (
    <section className="w-full mt-20 mb-10 reveal">
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-3">
          <div className="p-2.5 bg-[var(--color-judge-blue)]/10 rounded-xl">
            <Newspaper className="w-5 h-5 text-[var(--color-judge-blue)]" />
          </div>
          <div>
            <h2 className="text-xl font-bold tracking-tight text-[var(--color-primary-text)]">Latest Market Insights</h2>
            <p className="text-xs text-[var(--color-muted-text)] mt-1">Real-time AI-generated analysis from global financial data</p>
          </div>
        </div>
        <button className="text-sm font-medium text-[var(--color-judge-blue)] hover:underline">
          View All Insights
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {INSIGHTS.map((insight) => (
          <div 
            key={insight.id} 
            className="flex flex-col bg-[var(--color-panel)] border border-[var(--color-panel-border)] rounded-2xl p-6 shadow-sm hover-lift group cursor-pointer transition-colors hover:border-[var(--color-panel-border)]/80"
          >
            <div className="flex items-center justify-between mb-4">
              <span className={`px-2.5 py-1 rounded-md text-[10px] font-bold uppercase tracking-wider ${
                insight.sentiment === "Bullish" ? "bg-[var(--color-bull-green)]/10 text-[var(--color-bull-green)]" :
                insight.sentiment === "Bearish" ? "bg-[var(--color-bear-red)]/10 text-[var(--color-bear-red)]" :
                "bg-[var(--color-warning-amber)]/10 text-[var(--color-warning-amber)]"
              }`}>
                {insight.sentiment}
              </span>
              <div className="flex items-center gap-1.5 text-[var(--color-muted-text)]">
                <Clock className="w-3.5 h-3.5" />
                <span className="text-[10px] font-medium">{insight.time}</span>
              </div>
            </div>
            
            <h3 className="text-[15px] font-bold text-[var(--color-primary-text)] mb-3 leading-snug group-hover:text-[var(--color-judge-blue)] transition-colors">
              {insight.title}
            </h3>
            
            <p className="text-[13px] text-[var(--color-secondary-text)] leading-relaxed flex-grow">
              {insight.excerpt}
            </p>
            
            <div className="mt-5 pt-4 border-t border-[var(--color-panel-border)]/50 flex items-center justify-between">
              <span className="text-[11px] font-semibold text-[var(--color-muted-text)] uppercase tracking-wider">
                {insight.source}
              </span>
              {insight.sentiment === "Bullish" ? (
                <TrendingUp className="w-4 h-4 text-[var(--color-bull-green)] opacity-70" />
              ) : insight.sentiment === "Bearish" ? (
                <TrendingDown className="w-4 h-4 text-[var(--color-bear-red)] opacity-70" />
              ) : null}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
