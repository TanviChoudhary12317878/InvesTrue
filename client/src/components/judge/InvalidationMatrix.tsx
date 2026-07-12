import React from "react";
import { AlertOctagon } from "lucide-react";

const conditions = [
  { metric: "Revenue growth", condition: "falls below", threshold: "12%" },
  { metric: "Gross margin", condition: "falls below", threshold: "42%" },
  { metric: "Debt-to-equity", condition: "rises above", threshold: "1.2x" },
];

export default function InvalidationMatrix() {
  return (
    <div className="flex flex-col gap-4 p-6 bg-[var(--color-background)] border border-[var(--color-panel-border)] rounded-2xl">
      <div className="flex items-center gap-2 text-[var(--color-warning-amber)]">
        <AlertOctagon className="w-4 h-4" />
        <h3 className="text-xs font-semibold uppercase tracking-wider">
          Invalidation Triggers
        </h3>
      </div>

      <div className="flex flex-col gap-4">
        {conditions.map((item, idx) => (
          <div key={idx} className="flex items-center justify-between">
            <span className="text-sm text-[var(--color-secondary-text)]">
              {item.metric} {item.condition}
            </span>
            <span className="font-mono text-sm font-bold text-[var(--color-warning-amber)]">
              {item.threshold}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
