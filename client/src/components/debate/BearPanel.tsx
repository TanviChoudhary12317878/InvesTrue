import React from "react";

import { TrendingDown, X } from "lucide-react";

const argumentsList = [
  "Gross margins may have peaked as TSMC raises wafer prices by 8% and AMD MI300X gains traction.",
  "Over-reliance on top 4 hyperscaler customers creates concentrated revenue risk — 60% of total revenue.",
  "Geopolitical export controls risk cutting off $8B+ in emerging market AI revenue streams.",
];

const metrics = [
  { label: "Price / Sales", value: "32x" },
  { label: "Insider Selling (3m)", value: "$1.2B" },
  { label: "Customer Concentration", value: "60%" },
];

export default function BearPanel() {
  return (
    <div className="reveal flex flex-col bg-[var(--color-panel)] border border-[var(--color-panel-border)] rounded-3xl overflow-hidden shadow-sm hover-lift">
      <div className="h-1 w-full bg-[var(--color-bear-red)]" />

      {/* Image — Full visibility */}
      <div className="relative w-full h-64 bg-gradient-to-b from-[#1a0d0d] to-[#0a0a0a] overflow-hidden">
        <img
          src="/metallic_bear_coin.png"
          alt="Metallic Bear pressing a coin down"
          className="absolute inset-0 w-full h-full object-contain object-center p-4 animate-bear-strike opacity-0 group-hover:scale-105 transition-transform duration-700"
        />
      </div>

      <div className="flex flex-col p-8 gap-6">
        <div>
          <div className="flex items-center gap-3 text-[var(--color-bear-red)] mb-1">
            <div className="p-2 bg-[var(--color-bear-red)]/10 rounded-xl">
              <TrendingDown className="w-5 h-5" />
            </div>
            <h2 className="text-xl font-bold uppercase tracking-tight">Bear Case</h2>
          </div>
          <span className="text-sm text-[var(--color-secondary-text)] ml-12">
            Agent Confidence: <strong className="text-[var(--color-bear-red)] font-mono">41%</strong>
          </span>
        </div>

        <ul className="space-y-5">
          {argumentsList.map((arg, idx) => (
            <li key={idx} className="flex items-start gap-3 leading-relaxed">
              <div className="mt-1 p-0.5 rounded-full bg-[var(--color-bear-red)]/10">
                <X className="w-3.5 h-3.5 text-[var(--color-bear-red)]" />
              </div>
              <span className="text-sm text-[var(--color-primary-text)]">{arg}</span>
            </li>
          ))}
        </ul>

        <div className="pt-6 border-t border-[var(--color-panel-border)] flex flex-col gap-3">
          {metrics.map((m, idx) => (
            <div key={idx} className="flex justify-between items-center">
              <span className="text-sm text-[var(--color-secondary-text)]">{m.label}</span>
              <span className="font-mono text-sm font-bold text-[var(--color-bear-red)]">{m.value}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
