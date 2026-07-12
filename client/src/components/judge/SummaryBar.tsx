import React from "react";
import { TrendingUp, TrendingDown } from "lucide-react";

export default function SummaryBar() {
  const isPositive = true;

  return (
    <div className="flex items-center justify-between p-4 bg-[var(--color-panel)] border border-[var(--color-panel-border)] rounded-lg shadow-sm">
      <div className="flex flex-col">
        <div className="flex items-baseline gap-2">
          <h2 className="text-2xl font-mono font-bold text-[var(--color-primary-text)]">NVDA</h2>
          <span className="text-sm text-[var(--color-secondary-text)]">NVIDIA Corporation</span>
        </div>
      </div>
      
      <div className="flex items-center gap-6">
        <div className="flex flex-col items-end">
          <span className="font-mono text-xl text-[var(--color-primary-text)]">$132.45</span>
          <div className={`flex items-center gap-1 font-mono text-sm ${isPositive ? 'text-[var(--color-bull-green)]' : 'text-[var(--color-bear-red)]'}`}>
            {isPositive ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />}
            <span>+2.14%</span>
          </div>
        </div>

        <div className="h-10 w-[1px] bg-[var(--color-panel-border)]"></div>

        <div className="flex flex-col items-end">
          <span className="text-xs text-[var(--color-secondary-text)] uppercase tracking-wider font-semibold mb-1">
            Verdict
          </span>
          <div className="flex items-center gap-2">
            <span className="px-2 py-0.5 rounded text-xs font-bold bg-[var(--color-judge-blue)] text-white tracking-widest">
              INVEST
            </span>
            <span className="font-mono text-lg text-[var(--color-judge-blue)] font-bold">
              82%
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
