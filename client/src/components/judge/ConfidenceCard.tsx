import React from "react";

export default function ConfidenceCard() {
  const confidence = 82;
  const segments = 5;
  const activeSegments = Math.round((confidence / 100) * segments);

  return (
    <div className="flex flex-col gap-3 p-4 bg-[var(--color-panel)] border border-[var(--color-panel-border)] rounded-lg shadow-sm mt-4">
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-semibold text-[var(--color-primary-text)] uppercase tracking-wider">
          Committee Confidence
        </h3>
        <span className="font-mono text-2xl font-bold text-[var(--color-judge-blue)]">
          {confidence}%
        </span>
      </div>

      <div className="flex gap-1 w-full h-2">
        {Array.from({ length: segments }).map((_, i) => (
          <div
            key={i}
            className={`flex-1 rounded-sm ${
              i < activeSegments ? "bg-[var(--color-judge-blue)]" : "bg-[var(--color-panel-border)]"
            }`}
          />
        ))}
      </div>

      <p className="text-sm text-[var(--color-secondary-text)] leading-snug">
        <span className="typing-effect inline-block">
          Strong alignment across growth, profitability, and risk-adjusted factors.
        </span>
      </p>
    </div>
  );
}
