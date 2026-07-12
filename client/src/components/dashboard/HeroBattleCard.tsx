import React from "react";
import { useTicker } from "@/context/TickerContext";

export default function HeroBattleCard() {
  const { tickerData } = useTicker();

  const getAiSignal = () => {
    switch(tickerData.recommendation) {
      case "STRONG BUY": return "Aggressive Buy";
      case "BUY": return "Accumulate";
      case "HOLD": return "Monitor";
      case "AVOID": return "Divest";
      default: return "Monitor";
    }
  };

  const getRiskLevel = () => {
    const beta = parseFloat(tickerData.marketStats.beta);
    if (isNaN(beta)) return "Moderate";
    if (beta > 1.3) return "High";
    if (beta < 0.8) return "Low";
    return "Moderate";
  };

  const signals = [
    { label: "AI Signal", value: getAiSignal(), accent: "text-[var(--color-judge-blue)]" },
    { label: "Risk Level", value: getRiskLevel(), accent: "text-[var(--color-warning-amber)]" },
    { label: "Horizon", value: "12–18 mo", accent: "text-[var(--color-secondary-text)]" },
    { label: "Sector", value: tickerData.marketStats.sector || "Unknown", accent: "text-[var(--color-primary-text)]" },
  ];

  return (
    <section className="relative w-full rounded-[2.5rem] p-10 overflow-hidden bg-[var(--color-panel)] border border-[var(--color-panel-border)] shadow-2xl isolate">
      
      {/* Dynamic Recommendation Glow */}
      <div className={`absolute top-0 left-1/2 -translate-x-1/2 w-full h-1/2 blur-[120px] -z-10 rounded-full ${
        tickerData.recommendation === "STRONG BUY" ? "bg-[var(--color-judge-blue)]/20" :
        tickerData.recommendation === "BUY" ? "bg-[var(--color-bull-green)]/15" :
        tickerData.recommendation === "HOLD" ? "bg-[var(--color-warning-amber)]/15" :
        "bg-[var(--color-bear-red)]/15"
      }`} />
      
      <div className="flex flex-col items-center justify-center text-center max-w-4xl mx-auto gap-8">
        
        {/* Ticker Badge */}
        <div className="inline-flex items-center gap-3 px-4 py-2 rounded-full bg-[var(--color-panel-border)]/50 border border-[var(--color-panel-border)]">
          <span className="font-mono text-xs font-bold text-[var(--color-judge-blue)] tracking-wider">NASDAQ: {tickerData.symbol}</span>
          <span className="w-1 h-1 rounded-full bg-[var(--color-muted-text)]" />
          <span className="text-xs font-medium text-[var(--color-secondary-text)]">{tickerData.name}</span>
        </div>

        {/* AI Recommendation */}
        <h2 className={`text-7xl md:text-[7rem] font-black tracking-tighter leading-none ${
          tickerData.recommendation === "STRONG BUY" ? "text-transparent bg-clip-text bg-gradient-to-b from-[var(--color-judge-blue)] to-[#1E3A8A]" :
          tickerData.recommendation === "BUY" ? "text-transparent bg-clip-text bg-gradient-to-b from-[var(--color-bull-green)] to-[#065F46]" :
          tickerData.recommendation === "HOLD" ? "text-transparent bg-clip-text bg-gradient-to-b from-[var(--color-warning-amber)] to-[#78350F]" :
          "text-transparent bg-clip-text bg-gradient-to-b from-[var(--color-bear-red)] to-[#7F1D1D]"
        }`}>
          {tickerData.recommendation}
        </h2>

        {/* Confidence ring */}
        <div className="flex items-center gap-6">
          <div className="flex items-center justify-center w-28 h-28 rounded-full relative">
            {/* Confidence Arc */}
            <svg viewBox="0 0 112 112" className="absolute inset-0 w-full h-full">
              <circle cx="56" cy="56" r="52" fill="transparent" stroke="var(--color-panel-border)" strokeWidth="8" />
              <circle cx="56" cy="56" r="52" fill="transparent" stroke="var(--color-judge-blue)" strokeWidth="8" strokeDasharray={`${(tickerData.confidence / 100) * 326.7} 326.7`} strokeLinecap="round" transform="rotate(-90 56 56)" />
            </svg>
            <div className="flex flex-col items-center">
              <span className="text-2xl font-bold text-[var(--color-primary-text)] leading-none">{tickerData.confidence}%</span>
              <span className="text-[9px] font-bold text-[var(--color-muted-text)] uppercase tracking-wider mt-1">Conf.</span>
            </div>
          </div>
            
          <div className="text-left flex flex-col gap-1">
            <p className="text-sm font-medium text-[var(--color-primary-text)]">Committee consensus reached across all 3 AI agents.</p>
            <p className="text-xs text-[var(--color-muted-text)] font-mono">Bull {tickerData.bullConfidence}% · Bear {tickerData.bearConfidence}% · Judge synthesis complete</p>
          </div>
        </div>

        {/* Signal pills */}
        <div className="flex items-center gap-0 border border-[var(--color-panel-border)] rounded-2xl overflow-hidden">
          {signals.map((s, i) => (
            <div
              key={i}
              className={`flex flex-col items-center px-8 py-4 ${
                i < signals.length - 1 ? "border-r border-[var(--color-panel-border)]" : ""
              } bg-[var(--color-background)]/50`}
            >
              <span className="text-[10px] uppercase tracking-widest text-[var(--color-muted-text)] font-semibold mb-1">
                {s.label}
              </span>
              <span className={`font-mono font-bold text-sm ${s.accent}`}>{s.value}</span>
            </div>
          ))}
        </div>

        <p className="text-xs text-[var(--color-muted-text)]">
          Synthesized by AI Investment Committee · Updated 2 min ago
        </p>
      </div>
    </section>
  );
}
