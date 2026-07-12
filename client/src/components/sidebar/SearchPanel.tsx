import React from "react";
import { Search, Clock } from "lucide-react";

export default function SearchPanel() {
  const recentSearches = [
    { ticker: "NVDA", name: "NVIDIA Corp.", time: "10m ago" },
    { ticker: "TSLA", name: "Tesla Inc.", time: "1h ago" },
    { ticker: "AMD", name: "Advanced Micro Devices", time: "2h ago" },
  ];

  return (
    <div className="flex flex-col gap-4">
      <div className="relative">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <Search className="h-4 w-4 text-[var(--color-muted-text)]" />
        </div>
        <input
          type="text"
          className="block w-full pl-10 pr-3 py-2 border border-[var(--color-panel-border)] rounded-md leading-5 bg-[var(--color-panel)] text-[var(--color-primary-text)] placeholder-[var(--color-muted-text)] focus:outline-none focus:ring-1 focus:ring-[var(--color-judge-blue)] focus:border-[var(--color-judge-blue)] sm:text-sm transition-colors"
          placeholder="Search company or ticker"
        />
      </div>
      
      <div className="flex flex-col gap-2">
        <h3 className="text-xs font-semibold text-[var(--color-secondary-text)] uppercase tracking-wider mb-1">
          Recent Searches
        </h3>
        {recentSearches.map((search, idx) => (
          <div
            key={idx}
            className="flex items-center justify-between p-2 rounded-md hover:bg-[var(--color-panel-border)]/50 cursor-pointer transition-colors border border-transparent hover:border-[var(--color-panel-border)]"
          >
            <div className="flex items-center gap-2">
              <span className="font-mono text-sm font-medium text-[var(--color-primary-text)]">
                {search.ticker}
              </span>
              <span className="text-xs text-[var(--color-secondary-text)] truncate max-w-[100px]">
                {search.name}
              </span>
            </div>
            <div className="flex items-center gap-1 text-[var(--color-muted-text)]">
              <Clock className="w-3 h-3" />
              <span className="text-[10px]">{search.time}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
