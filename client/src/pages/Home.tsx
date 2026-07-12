import React, { useState, useCallback, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { Search, ChevronRight, BrainCircuit, Scale, TrendingUp, Sparkles, ArrowRight } from "lucide-react";
import { mockTickerData } from "@/lib/mockData";
import Header from "@/components/layout/Header";
import FinancialBackground from "@/components/layout/FinancialBackground";
import Footer from "@/components/layout/Footer";
import TickerStrip from "@/components/dashboard/TickerStrip";

const HOW_IT_WORKS = [
  {
    step: "01",
    icon: Search,
    title: "Search Any Ticker",
    desc: "Type in any publicly traded stock symbol — NVDA, AAPL, TSLA. InvesTrue instantly fetches the latest data and initializes the AI committee.",
    color: "var(--color-judge-blue)",
    bg: "bg-[var(--color-judge-blue)]/10",
  },
  {
    step: "02",
    icon: BrainCircuit,
    title: "AI Agents Debate",
    desc: "Two specialized AI agents — Bull and Bear — independently build the strongest possible case for and against the investment, drawing on financials, macro, and sentiment.",
    color: "var(--color-bull-green)",
    bg: "bg-[var(--color-bull-green)]/10",
  },
  {
    step: "03",
    icon: Scale,
    title: "Judge Synthesizes",
    desc: "An impartial Judge AI reads both arguments, weighs the evidence, assigns a confidence score, and delivers a final unbiased investment recommendation.",
    color: "var(--color-warning-amber)",
    bg: "bg-[var(--color-warning-amber)]/10",
  },
  {
    step: "04",
    icon: TrendingUp,
    title: "You Decide",
    desc: "Read the full thesis: the bull case, the bear case, the judge's verdict. All reasoning is transparent. You get institutional-grade insight — and the final call is yours.",
    color: "var(--color-bear-red)",
    bg: "bg-[var(--color-bear-red)]/10",
  },
];

const ABOUT_POINTS = [
  {
    title: "Unbiased AI Committee",
    desc: "Unlike generic AI chatbots, InvesTrue uses a structured multi-agent debate format — forcing both bullish and bearish cases to be argued rigorously before a verdict is reached.",
  },
  {
    title: "Transparent Reasoning",
    desc: "Every recommendation comes with the full argument chain. You can see exactly why the AI committee reached its conclusion — no black box, just clear, structured thinking.",
  },
  {
    title: "Institutional Quality",
    desc: "The analysis framework mirrors how professional investment committees operate — presenting opposing views, stress-testing assumptions, and arriving at a consensus.",
  },
];

export default function Home() {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [showDropdown, setShowDropdown] = useState(false);
  const searchRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const allTickers = Object.values(mockTickerData);
  const filtered = searchQuery.trim()
    ? allTickers.filter(
        (t) =>
          t.symbol.toLowerCase().includes(searchQuery.toLowerCase()) ||
          t.name.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : allTickers;

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(e.target as Node)) {
        setShowDropdown(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const handleSelect = useCallback(
    (symbol: string) => {
      if (!symbol.trim()) return;
      setShowDropdown(false);
      setSearchQuery("");
      navigate(`/analyze/${symbol.trim().toUpperCase()}`);
    },
    [navigate]
  );

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && searchQuery.trim()) {
      handleSelect(searchQuery);
    }
  };

  const hour = new Date().getHours();
  const greeting = hour < 12 ? "Good Morning" : hour < 17 ? "Good Afternoon" : "Good Evening";

  return (
    <div className="min-h-screen flex flex-col bg-[var(--color-background)] relative">
      <FinancialBackground />

      <div className="relative z-10 flex flex-col min-h-screen">
        <Header />
        <TickerStrip />

        <main className="flex-1 flex flex-col">

          {/* ─── Hero Search Section ─── */}
          <section className="flex flex-col items-center justify-center text-center pt-20 pb-28 px-6 relative">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] bg-[var(--color-judge-blue)]/10 rounded-full blur-[120px] pointer-events-none" />

            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-[var(--color-judge-blue)]/30 bg-[var(--color-judge-blue)]/8 mb-8 animate-fade-scale">
              <Sparkles className="w-3.5 h-3.5 text-[var(--color-judge-blue)]" />
              <span className="text-xs font-semibold tracking-widest uppercase text-[var(--color-judge-blue)]">
                AI-Powered Investment Committee
              </span>
            </div>

            <h1 className="text-5xl md:text-6xl font-black tracking-tight text-[var(--color-primary-text)] mb-3">
              {greeting}, <span className="text-[var(--color-judge-blue)]">Investor</span>
            </h1>
            <p className="text-lg text-[var(--color-secondary-text)] mb-12 max-w-lg">
              Search any stock ticker to get a full AI committee analysis — bull case, bear case, and a synthesized verdict.
            </p>

            {/* ── Spotlight Search Bar ── */}
            <div ref={searchRef} className="relative w-full max-w-2xl">
              <div className="flex items-center gap-3 px-5 py-4 rounded-2xl bg-[var(--color-panel)] border-2 border-[var(--color-panel-border)] shadow-2xl focus-within:border-[var(--color-judge-blue)] transition-colors duration-300">
                <Search className="w-5 h-5 text-[var(--color-muted-text)] shrink-0" />
                <input
                  ref={inputRef}
                  type="text"
                  value={searchQuery}
                  onChange={(e) => { setSearchQuery(e.target.value); setShowDropdown(true); }}
                  onFocus={() => setShowDropdown(true)}
                  onKeyDown={handleKeyDown}
                  placeholder="Search ticker or company name… e.g. NVDA, Apple, Tesla"
                  className="flex-1 bg-transparent text-base text-[var(--color-primary-text)] placeholder-[var(--color-muted-text)] focus:outline-none"
                />
                {searchQuery && (
                  <button
                    onClick={() => handleSelect(searchQuery)}
                    className="shrink-0 flex items-center gap-1.5 px-4 py-1.5 rounded-xl bg-[var(--color-judge-blue)] text-white text-sm font-semibold hover:bg-[var(--color-judge-blue)]/90 transition-colors"
                  >
                    Analyze <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                )}
              </div>

              {showDropdown && (
                <div className="absolute top-full mt-3 w-full bg-[var(--color-panel)] border border-[var(--color-panel-border)] rounded-2xl shadow-2xl overflow-hidden z-50 animate-fade-scale origin-top">
                  <div className="px-4 py-2.5 border-b border-[var(--color-panel-border)] bg-[var(--color-background)]/40">
                    <span className="text-[10px] font-bold uppercase tracking-widest text-[var(--color-muted-text)]">
                      {searchQuery ? "Results" : "Supported Tickers"}
                    </span>
                  </div>
                  {filtered.length > 0 ? (
                    filtered.map((t) => (
                      <button
                        key={t.symbol}
                        onClick={() => handleSelect(t.symbol)}
                        className="w-full flex items-center justify-between px-5 py-3.5 hover:bg-[var(--color-judge-blue)]/8 transition-colors group"
                      >
                        <div className="flex items-center gap-4">
                          <div className="w-10 h-10 rounded-xl bg-[var(--color-judge-blue)]/10 flex items-center justify-center">
                            <span className="text-xs font-black text-[var(--color-judge-blue)] font-mono">{t.symbol.slice(0, 2)}</span>
                          </div>
                          <div className="text-left">
                            <p className="text-sm font-bold text-[var(--color-primary-text)] font-mono">{t.symbol}</p>
                            <p className="text-xs text-[var(--color-secondary-text)]">{t.name}</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-4">
                          <div className="text-right">
                            <p className="text-sm font-mono font-semibold text-[var(--color-primary-text)]">{t.price}</p>
                            <p className={`text-xs font-mono font-semibold ${t.isPositive ? "text-[var(--color-bull-green)]" : "text-[var(--color-bear-red)]"}`}>{t.changePercent}</p>
                          </div>
                          <span className={`hidden group-hover:flex items-center gap-1 text-xs font-semibold px-2.5 py-1 rounded-lg ${
                            t.recommendation === "STRONG BUY" ? "bg-[var(--color-judge-blue)]/10 text-[var(--color-judge-blue)]" :
                            t.recommendation === "BUY" ? "bg-[var(--color-bull-green)]/10 text-[var(--color-bull-green)]" :
                            t.recommendation === "HOLD" ? "bg-[var(--color-warning-amber)]/10 text-[var(--color-warning-amber)]" :
                            "bg-[var(--color-bear-red)]/10 text-[var(--color-bear-red)]"
                          }`}>
                            {t.recommendation} <ChevronRight className="w-3 h-3" />
                          </span>
                        </div>
                      </button>
                    ))
                  ) : searchQuery ? (
                    <button
                      onClick={() => handleSelect(searchQuery)}
                      className="w-full text-center px-5 py-4 text-sm font-medium text-[var(--color-judge-blue)] hover:bg-[var(--color-judge-blue)]/10 transition-colors"
                    >
                      Search for "{searchQuery}" <ArrowRight className="inline-block w-4 h-4 ml-1" />
                    </button>
                  ) : (
                    <div className="px-5 py-6 text-center text-sm text-[var(--color-muted-text)]">Type a ticker to search</div>
                  )}
                </div>
              )}
            </div>

            <p className="mt-5 text-xs text-[var(--color-muted-text)]">Try: NVDA · AAPL · TSLA · JPM</p>
          </section>

          {/* ─── What is InvesTrue? ─── */}
          <section className="max-w-[1200px] mx-auto w-full px-8 pb-24">
            <div className="text-center mb-14">
              <span className="text-xs font-bold uppercase tracking-widest text-[var(--color-muted-text)]">The Platform</span>
              <h2 className="text-4xl font-black tracking-tight text-[var(--color-primary-text)] mt-3 mb-4">What is InvesTrue?</h2>
              <p className="text-base text-[var(--color-secondary-text)] max-w-2xl mx-auto">
                InvesTrue is an AI-powered investment research platform that uses a multi-agent debate framework to deliver transparent, institutional-grade stock analysis — for free.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-6">
              {ABOUT_POINTS.map((p, i) => (
                <div
                  key={i}
                  className="flex flex-col p-7 bg-[var(--color-panel)] border border-[var(--color-panel-border)] rounded-3xl hover-lift transition-all"
                >
                  <div className="w-8 h-1 rounded-full bg-[var(--color-judge-blue)] mb-6" />
                  <h3 className="text-lg font-bold text-[var(--color-primary-text)] mb-3">{p.title}</h3>
                  <p className="text-sm text-[var(--color-secondary-text)] leading-relaxed">{p.desc}</p>
                </div>
              ))}
            </div>
          </section>

          {/* ─── How It Works ─── */}
          <section className="w-full bg-[var(--color-panel)]/60 border-y border-[var(--color-panel-border)] py-24 px-8">
            <div className="max-w-[1200px] mx-auto">
              <div className="text-center mb-16">
                <span className="text-xs font-bold uppercase tracking-widest text-[var(--color-muted-text)]">The Process</span>
                <h2 className="text-4xl font-black tracking-tight text-[var(--color-primary-text)] mt-3">How It Works</h2>
              </div>

              <div className="grid md:grid-cols-4 gap-6 relative">
                <div className="absolute top-10 left-[12.5%] right-[12.5%] h-px bg-gradient-to-r from-[var(--color-judge-blue)]/20 via-[var(--color-judge-blue)]/60 to-[var(--color-judge-blue)]/20 hidden md:block" />

                {HOW_IT_WORKS.map((step, i) => {
                  const Icon = step.icon;
                  return (
                    <div key={i} className="flex flex-col items-center text-center relative">
                      <div
                        className={`w-20 h-20 rounded-2xl ${step.bg} border border-[var(--color-panel-border)] flex items-center justify-center mb-5 shadow-sm relative z-10`}
                      >
                        <Icon className="w-8 h-8" style={{ color: step.color }} />
                      </div>
                      <span className="text-[10px] font-black tracking-[0.3em] text-[var(--color-muted-text)] mb-2">{step.step}</span>
                      <h3 className="text-base font-bold text-[var(--color-primary-text)] mb-2">{step.title}</h3>
                      <p className="text-sm text-[var(--color-secondary-text)] leading-relaxed">{step.desc}</p>
                    </div>
                  );
                })}
              </div>

              <div className="flex justify-center mt-16">
                <button
                  onClick={() => inputRef.current?.focus()}
                  className="flex items-center gap-2.5 px-8 py-4 rounded-2xl bg-[var(--color-judge-blue)] text-white font-bold text-base hover:bg-[var(--color-judge-blue)]/90 hover:-translate-y-0.5 transition-all shadow-lg"
                >
                  Start Analyzing <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </section>
        </main>

        <Footer />
      </div>
    </div>
  );
}
