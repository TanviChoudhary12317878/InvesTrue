

import React from "react";

const tickers = [
  { symbol: "NVDA", price: "$132.45", change: "+2.14%", up: true },
  { symbol: "AAPL", price: "$198.11", change: "+0.82%", up: true },
  { symbol: "TSLA", price: "$248.90", change: "-1.47%", up: false },
  { symbol: "MSFT", price: "$441.06", change: "+1.23%", up: true },
  { symbol: "AMD", price: "$167.34", change: "+3.06%", up: true },
  { symbol: "GOOG", price: "$178.22", change: "-0.34%", up: false },
  { symbol: "AMZN", price: "$192.45", change: "+1.85%", up: true },
  { symbol: "META", price: "$512.78", change: "+0.95%", up: true },
  { symbol: "JPM", price: "$201.90", change: "+0.44%", up: true },
  { symbol: "V", price: "$281.32", change: "-0.12%", up: false },
];

export default function TickerStrip() {
  const [liveTickers, setLiveTickers] = React.useState(tickers);

  React.useEffect(() => {
    const fetchQuotes = async () => {
      try {
        const symbols = tickers.map(t => t.symbol).join(",");
        const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:5000';
        const res = await fetch(`${API_BASE}/api/quotes?symbols=${symbols}`);
        if (res.ok) {
          const data = await res.json();
          if (data && data.length > 0) {
            setLiveTickers(data);
          }
        }
      } catch (error) {
        console.error("Failed to fetch live ticker tape:", error);
      }
    };
    fetchQuotes();
    
    // Refresh every 60 seconds
    const interval = setInterval(fetchQuotes, 60000);
    return () => clearInterval(interval);
  }, []);

  const items = [...liveTickers, ...liveTickers]; // duplicate for seamless loop

  return (
    <div className="w-full overflow-hidden border-b border-[var(--color-panel-border)] bg-[var(--color-panel)]/60 backdrop-blur-sm">
      <div className="animate-ticker py-2">
        {items.map((t, i) => (
          <div key={i} className="flex items-center gap-2 px-6 whitespace-nowrap">
            <span className="font-mono text-xs font-bold text-[var(--color-primary-text)]">{t.symbol}</span>
            <span className="font-mono text-xs text-[var(--color-secondary-text)]">{t.price}</span>
            <span className={`font-mono text-xs font-semibold ${t.up ? "text-[var(--color-bull-green)]" : "text-[var(--color-bear-red)]"}`}>
              {t.change}
            </span>
            <span className="text-[var(--color-panel-border)] text-xs">│</span>
          </div>
        ))}
      </div>
    </div>
  );
}
