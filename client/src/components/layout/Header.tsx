import React, { useState, useEffect, useRef } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Search, Moon, Sun } from "lucide-react";
import { mockTickerData } from "@/lib/mockData";

export default function Header() {
  const [isDark, setIsDark] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [showSearchDropdown, setShowSearchDropdown] = useState(false);

  const searchRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();
  const location = useLocation();

  // Only show search in header on non-home pages (i.e., analysis page)
  const isAnalysisPage = location.pathname?.startsWith("/analyze");

  useEffect(() => {
    if (isDark) document.documentElement.classList.add("dark");
    else document.documentElement.classList.remove("dark");
  }, [isDark]);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(e.target as Node))
        setShowSearchDropdown(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const allTickers = Object.values(mockTickerData);
  const filteredTickers = allTickers.filter(
    (t) =>
      t.symbol.toLowerCase().includes(searchQuery.toLowerCase()) ||
      t.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleSelectTicker = (symbol: string) => {
    if (!symbol.trim()) return;
    setShowSearchDropdown(false);
    setSearchQuery("");
    navigate(`/analyze/${symbol.trim().toUpperCase()}`);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && searchQuery.trim()) {
      handleSelectTicker(searchQuery);
    }
  };

  return (
    <header
      className={`sticky top-0 z-50 transition-all duration-300 border-b ${
        scrolled
          ? "bg-[var(--color-panel)]/95 backdrop-blur-xl border-[var(--color-panel-border)] shadow-lg"
          : "bg-transparent border-transparent"
      }`}
    >
      <div className="max-w-[1440px] mx-auto flex items-center justify-between px-8 py-3">
        {/* Logo */}
        <button
          onClick={() => navigate("/")}
          className="flex items-center gap-3 hover:opacity-80 transition-opacity"
        >
          {/* Exact image from user - adjusted to a perfectly balanced medium size */}
          <div className="w-16 h-16 flex items-center justify-center shrink-0">
            <img src="/logo1.png" alt="InvesTrue Logo" className="w-full h-full object-contain" />
          </div>
          <div className="flex flex-col leading-none">
            <div className="text-[22px] tracking-tight leading-none flex items-baseline">
              <span style={{ fontFamily: '"Montserrat", sans-serif', fontWeight: 900 }} className="text-[var(--judge-blue)]">Inves</span>
              <span style={{ fontFamily: '"Playfair Display", serif', fontWeight: 700 }} className="text-[var(--warning-amber)] tracking-wide">True</span>
            </div>
            <span className="text-[8px] uppercase tracking-[0.2em] text-[var(--color-muted-text)] font-semibold mt-0.5">
              Intelligence · Discovery · Growth
            </span>
          </div>
        </button>

        {/* Right side */}
        <div className="flex items-center gap-3">
          {/* Search — only shown on analysis page */}
          {isAnalysisPage && (
            <div className="relative hidden sm:block" ref={searchRef}>
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-[var(--color-muted-text)]" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => { setSearchQuery(e.target.value); setShowSearchDropdown(true); }}
                onFocus={() => setShowSearchDropdown(true)}
                onKeyDown={handleKeyDown}
                className="w-52 pl-9 pr-3 py-2 border border-[var(--color-panel-border)] rounded-xl text-sm bg-[var(--color-background)] text-[var(--color-primary-text)] placeholder-[var(--color-muted-text)] focus:outline-none focus:ring-2 focus:ring-[var(--color-judge-blue)]/40 focus:border-[var(--color-judge-blue)] transition-all"
                placeholder="Switch ticker…"
              />
              {showSearchDropdown && (searchQuery || filteredTickers.length > 0) && (
                <div className="absolute top-full mt-2 w-full bg-[var(--color-panel)] border border-[var(--color-panel-border)] rounded-xl shadow-xl overflow-hidden py-1 z-50">
                  {filteredTickers.length > 0 ? (
                    filteredTickers.map((t) => (
                      <button
                        key={t.symbol}
                        onClick={() => handleSelectTicker(t.symbol)}
                        className="w-full text-left px-4 py-2.5 hover:bg-[var(--color-panel-border)]/30 flex justify-between items-center transition-colors"
                      >
                        <div>
                          <span className="font-mono text-xs font-bold text-[var(--color-primary-text)]">{t.symbol}</span>
                          <p className="text-[10px] text-[var(--color-secondary-text)]">{t.name}</p>
                        </div>
                        <span className="font-mono text-xs text-[var(--color-secondary-text)]">{t.price}</span>
                      </button>
                    ))
                  ) : (
                    <button
                      onClick={() => handleSelectTicker(searchQuery)}
                      className="w-full text-left px-4 py-2.5 hover:bg-[var(--color-judge-blue)]/10 flex justify-between items-center transition-colors text-[var(--color-judge-blue)]"
                    >
                      <span className="text-xs font-medium">Search for "{searchQuery}"</span>
                    </button>
                  )}
                </div>
              )}
            </div>
          )}

          {/* Theme toggle */}
          <button
            onClick={() => setIsDark(!isDark)}
            className="p-2 rounded-xl text-[var(--color-secondary-text)] hover:bg-[var(--color-panel-border)]/50 transition-colors"
            aria-label="Toggle theme"
          >
            {isDark ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
          </button>
        </div>
      </div>
    </header>
  );
}
