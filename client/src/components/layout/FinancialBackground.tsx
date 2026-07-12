import React from "react";

export default function FinancialBackground() {
  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden bg-[var(--color-background)] transition-colors duration-300">
      {/* 1. Subtle Stock-Chart Grid */}
      <svg className="absolute inset-0 w-full h-full opacity-10 dark:opacity-5" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <pattern id="grid" width="60" height="60" patternUnits="userSpaceOnUse">
            <path d="M 60 0 L 0 0 0 60" fill="none" stroke="currentColor" strokeWidth="1" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#grid)" className="text-[var(--color-panel-border)]" />
      </svg>

      {/* 2. Soft Gradient Lighting */}
      <div className="absolute top-[10%] right-[20%] w-[500px] h-[500px] rounded-full bg-[var(--color-judge-blue)] opacity-10 blur-[100px] animate-pulse" style={{ animationDuration: '8s' }} />
      <div className="absolute bottom-[20%] left-[10%] w-[600px] h-[600px] rounded-full bg-[var(--color-bull-green)] opacity-10 blur-[120px] animate-pulse" style={{ animationDuration: '12s' }} />

      {/* 3. Candlestick Patterns - increased opacity */}
      <svg className="absolute top-[20%] left-[15%] w-32 h-48 opacity-20 dark:opacity-10 animate-float" viewBox="0 0 128 192" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect x="8" y="50" width="12" height="60" rx="1" className="fill-[var(--color-bull-green)]" />
        <line x1="14" y1="30" x2="14" y2="50" className="stroke-[var(--color-bull-green)]" strokeWidth="2" />
        <line x1="14" y1="110" x2="14" y2="130" className="stroke-[var(--color-bull-green)]" strokeWidth="2" />
        
        <rect x="36" y="80" width="12" height="40" rx="1" className="fill-[var(--color-bear-red)]" />
        <line x1="42" y1="60" x2="42" y2="80" className="stroke-[var(--color-bear-red)]" strokeWidth="2" />
        <line x1="42" y1="120" x2="42" y2="140" className="stroke-[var(--color-bear-red)]" strokeWidth="2" />
        
        <rect x="64" y="40" width="12" height="80" rx="1" className="fill-[var(--color-bull-green)]" />
        <line x1="70" y1="20" x2="70" y2="40" className="stroke-[var(--color-bull-green)]" strokeWidth="2" />
        <line x1="70" y1="120" x2="70" y2="150" className="stroke-[var(--color-bull-green)]" strokeWidth="2" />
      </svg>

      <svg className="absolute bottom-[30%] right-[15%] w-40 h-60 opacity-20 dark:opacity-10 animate-float-slow" viewBox="0 0 160 240" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect x="20" y="100" width="16" height="50" rx="1" className="fill-[var(--color-bear-red)]" />
        <line x1="28" y1="80" x2="28" y2="100" className="stroke-[var(--color-bear-red)]" strokeWidth="2" />
        <line x1="28" y1="150" x2="28" y2="170" className="stroke-[var(--color-bear-red)]" strokeWidth="2" />
        
        <rect x="56" y="60" width="16" height="90" rx="1" className="fill-[var(--color-bull-green)]" />
        <line x1="64" y1="40" x2="64" y2="60" className="stroke-[var(--color-bull-green)]" strokeWidth="2" />
        
        <rect x="92" y="80" width="16" height="60" rx="1" className="fill-[var(--color-bear-red)]" />
        <line x1="100" y1="60" x2="100" y2="80" className="stroke-[var(--color-bear-red)]" strokeWidth="2" />
      </svg>

      {/* 4. Animated Data Lines - more visible */}
      <svg className="absolute top-[40%] left-0 w-full h-32 opacity-30 dark:opacity-20" viewBox="0 0 1440 120" fill="none" preserveAspectRatio="none">
        <path
          d="M0 60 Q 360 10, 720 60 T 1440 60"
          className="stroke-[var(--color-judge-blue)] animate-[dash_15s_linear_infinite]"
          strokeWidth="2"
          strokeDasharray="15 25"
        />
        <path
          d="M0 80 Q 360 120, 720 80 T 1440 80"
          className="stroke-[var(--color-bull-green)] animate-[dash_12s_linear_infinite_reverse]"
          strokeWidth="1.5"
          strokeDasharray="10 20"
        />
      </svg>

      {/* 5. Moving Particles - more visible */}
      <div className="absolute top-[15%] left-[25%] w-2 h-2 rounded-full bg-[var(--color-judge-blue)] opacity-40 animate-[ping_3s_cubic-bezier(0,0,0.2,1)_infinite]" />
      <div className="absolute top-[60%] right-[30%] w-3 h-3 rounded-full bg-[var(--color-bull-green)] opacity-40 animate-[ping_5s_cubic-bezier(0,0,0.2,1)_infinite]" />
      <div className="absolute bottom-[25%] left-[40%] w-2 h-2 rounded-full bg-[var(--color-bear-red)] opacity-40 animate-[ping_4s_cubic-bezier(0,0,0.2,1)_infinite]" />
    </div>
  );
}
