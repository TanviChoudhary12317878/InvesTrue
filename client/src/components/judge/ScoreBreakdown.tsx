import React from "react";

export default function ScoreBreakdown() {
  const factors = [
    { name: "Growth", score: 4.8, percent: 96, color: "var(--color-bull-green)" },
    { name: "Profitability", score: 4.5, percent: 90, color: "var(--color-bull-green)" },
    { name: "Valuation", score: 2.1, percent: 42, color: "var(--color-bear-red)" },
    { name: "Balance Sheet", score: 4.2, percent: 84, color: "var(--color-judge-blue)" },
    { name: "News & Risk", score: 3.5, percent: 70, color: "var(--color-warning-amber)" },
  ];

  return (
    <div className="flex flex-col gap-4 p-4 bg-[var(--color-panel)] border border-[var(--color-panel-border)] rounded-lg shadow-sm mt-4">
      <h3 className="text-sm font-semibold text-[var(--color-primary-text)] uppercase tracking-wider">
        Factor Score Breakdown
      </h3>
      
      <div className="flex flex-col gap-3">
        {factors.map((factor) => (
          <div key={factor.name} className="flex flex-col gap-1">
            <div className="flex justify-between items-center text-xs">
              <span className="text-[var(--color-secondary-text)]">{factor.name}</span>
              <div className="flex items-center gap-2">
                <span className="font-mono text-[var(--color-primary-text)]">{factor.score.toFixed(1)}/5.0</span>
              </div>
            </div>
            <div className="w-full h-1.5 bg-[var(--color-panel-border)] rounded-full overflow-hidden">
              <div 
                className="h-full rounded-full transition-all duration-1000 ease-out"
                style={{ width: `${factor.percent}%`, backgroundColor: factor.color }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
