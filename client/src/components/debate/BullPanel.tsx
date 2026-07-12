import React from "react";

import { TrendingUp, Check } from "lucide-react";

const argumentsList = [
  "Unprecedented demand for Hopper architecture GPUs continues to outstrip supply across every major cloud provider.",
  "CUDA software ecosystem creates a nearly insurmountable moat — 4M+ developers locked into the platform.",
  "Data center revenue is accelerating with massive hyperscaler capex commitments exceeding $200B collectively.",
];

const metrics = [
  { label: "Est. Forward P/E", value: "35x" },
  { label: "Revenue CAGR (3y)", value: "48%" },
  { label: "Market Share (AI GPU)", value: "84%" },
];

export default function BullPanel() {
  return (
    <div className="reveal flex flex-col bg-[var(--color-panel)] border border-[var(--color-panel-border)] rounded-3xl overflow-hidden shadow-sm hover-lift">
      <div className="h-1 w-full bg-[var(--color-bull-green)]" />

      {/* Image — Full visibility */}
      <div className="relative w-full h-64 bg-gradient-to-b from-[#0d1a0d] to-[#0a0a0a] overflow-hidden">
        <img
          src="/golden_bull_coin.png"
          alt="Golden Bull tossing a coin"
          className="absolute inset-0 w-full h-full object-contain object-center p-4 animate-bull-strike opacity-0 group-hover:scale-105 transition-transform duration-700"
        />
      </div>

      <div className="flex flex-col p-8 gap-6">
        <div>
          <div className="flex items-center gap-3 text-[var(--color-bull-green)] mb-1">
            <div className="p-2 bg-[var(--color-bull-green)]/10 rounded-xl">
              <TrendingUp className="w-5 h-5" />
            </div>
            <h2 className="text-xl font-bold uppercase tracking-tight">Bull Case</h2>
          </div>
          <span className="text-sm text-[var(--color-secondary-text)] ml-12">
            Agent Confidence: <strong className="text-[var(--color-bull-green)] font-mono">94%</strong>
          </span>
        </div>

        <ul className="space-y-5">
          {argumentsList.map((arg, idx) => (
            <li key={idx} className="flex items-start gap-3 leading-relaxed">
              <div className="mt-1 p-0.5 rounded-full bg-[var(--color-bull-green)]/10">
                <Check className="w-3.5 h-3.5 text-[var(--color-bull-green)]" />
              </div>
              <span className="text-sm text-[var(--color-primary-text)]">{arg}</span>
            </li>
          ))}
        </ul>

        <div className="pt-6 border-t border-[var(--color-panel-border)] flex flex-col gap-3">
          {metrics.map((m, idx) => (
            <div key={idx} className="flex justify-between items-center">
              <span className="text-sm text-[var(--color-secondary-text)]">{m.label}</span>
              <span className="font-mono text-sm font-bold text-[var(--color-bull-green)]">{m.value}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
