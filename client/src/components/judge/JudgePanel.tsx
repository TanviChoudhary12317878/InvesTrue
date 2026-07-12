import React from "react";

import InvalidationMatrix from "./InvalidationMatrix";
import { Scale, CheckCircle2 } from "lucide-react";

export default function JudgePanel() {
  return (
    <div className="reveal w-full flex gap-6">
      {/* Main Judge Card */}
      <div className="flex-1 bg-[var(--color-panel)] border border-[var(--color-judge-blue)]/20 rounded-3xl p-10 shadow-sm hover-lift relative overflow-hidden">
        <div className="absolute top-0 left-0 w-1.5 h-full bg-[var(--color-judge-blue)]" />
        <div className="absolute top-0 right-0 w-64 h-64 bg-[var(--color-judge-blue)]/[0.03] rounded-full blur-3xl -translate-y-1/3 translate-x-1/3" />

        <div className="flex items-center justify-between mb-10 relative z-10">
          <div className="flex items-center gap-3 text-[var(--color-judge-blue)]">
            <div className="p-2.5 bg-[var(--color-judge-blue)]/10 rounded-xl">
              <Scale className="w-6 h-6" />
            </div>
            <h2 className="text-2xl font-bold tracking-tight uppercase">
              Judge&apos;s Final Decision
            </h2>
          </div>
          <div className="flex items-center gap-2 px-4 py-2 bg-[var(--color-judge-blue)]/5 border border-[var(--color-judge-blue)]/20 rounded-full animate-glow">
            <div className="h-2 w-2 rounded-full bg-[var(--color-judge-blue)]" />
            <span className="text-xs font-mono text-[var(--color-judge-blue)] uppercase tracking-widest">
              Consensus Reached
            </span>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-10 relative z-10">
          <div className="col-span-2 flex flex-col gap-8">
            <div>
              <h3 className="text-xs font-semibold text-[var(--color-secondary-text)] uppercase tracking-wider mb-4">
                Key Investment Insights
              </h3>
              <ul className="space-y-5">
                <li className="flex items-start gap-4">
                  <div className="mt-0.5 p-1 rounded-full bg-[var(--color-judge-blue)]/10">
                    <CheckCircle2 className="w-4 h-4 text-[var(--color-judge-blue)]" />
                  </div>
                  <span className="text-[15px] text-[var(--color-primary-text)] leading-relaxed">
                    Dominant market share in AI accelerators drives sustained margin expansion, outweighing near-term valuation concerns.
                  </span>
                </li>
                <li className="flex items-start gap-4">
                  <div className="mt-0.5 p-1 rounded-full bg-[var(--color-judge-blue)]/10">
                    <CheckCircle2 className="w-4 h-4 text-[var(--color-judge-blue)]" />
                  </div>
                  <span className="text-[15px] text-[var(--color-primary-text)] leading-relaxed">
                    Software ecosystem (CUDA) provides a significant structural moat against hardware competitors, ensuring long-term developer retention.
                  </span>
                </li>
                <li className="flex items-start gap-4">
                  <div className="mt-0.5 p-1 rounded-full bg-[var(--color-judge-blue)]/10">
                    <CheckCircle2 className="w-4 h-4 text-[var(--color-judge-blue)]" />
                  </div>
                  <span className="text-[15px] text-[var(--color-primary-text)] leading-relaxed">
                    Forward earnings revisions are unprecedented — consensus EPS estimates revised up 3x in the last 12 months.
                  </span>
                </li>
              </ul>
            </div>

            <div className="p-6 bg-[var(--color-judge-blue)]/5 border-l-4 border-[var(--color-judge-blue)] rounded-r-2xl">
              <span className="font-semibold text-[var(--color-judge-blue)] block mb-2 text-sm uppercase tracking-wide">Summary Verdict</span>
              <p className="text-[15px] text-[var(--color-primary-text)] leading-relaxed">
                The committee strongly recommends a long position. The bullish factors around structural AI demand and dominant market positioning significantly outweigh the bearish arguments regarding valuation and geopolitical risks. The risk-reward profile remains highly attractive for a 12–18 month horizon.
              </p>
            </div>
          </div>

          <div className="col-span-1 flex flex-col justify-between gap-6">
            <InvalidationMatrix />
            <div className="bg-[var(--color-background)] border border-[var(--color-panel-border)] rounded-2xl overflow-hidden">
              <div className="relative h-36">
                <img
                  src="/data_center_ai.png"
                  alt="AI Data Center"
                  className="absolute inset-0 w-full h-full object-cover"
                />
              </div>
              <div className="p-3">
                <p className="text-[10px] font-mono text-[var(--color-muted-text)]">
                  NODE: Infrastructure Analysis · VALIDATED
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
