import React from "react";
import { BarChart3, Mail, Shield, Globe, MapPin } from "lucide-react";

export default function Footer() {
  return (
    <footer className="relative mt-24 bg-[var(--color-background)] border-t border-[var(--color-panel-border)] overflow-hidden transition-colors duration-300">
      
      {/* Main footer */}
      <div className="max-w-[1440px] mx-auto px-8 pt-16 pb-12">
        {/* Top section */}
        <div className="flex flex-col md:flex-row items-center justify-between mb-16 gap-8 text-center md:text-left">
          <div className="max-w-md">
            <div className="flex items-center justify-center md:justify-start gap-3 mb-5 hover:opacity-80 transition-opacity cursor-pointer">
              <div className="w-10 h-10 rounded-xl bg-[var(--color-judge-blue)] flex items-center justify-center shadow-sm">
                <BarChart3 className="w-5 h-5 text-white" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-[var(--color-primary-text)] tracking-tight">InvesTrue</h3>
                <span className="text-[10px] uppercase tracking-[0.25em] text-[var(--color-muted-text)] font-semibold">AI Investment Committee</span>
              </div>
            </div>
            
            <p className="text-sm leading-relaxed text-[var(--color-secondary-text)] mb-8">
              Institutional-grade AI investment research. Our multi-agent committee synthesizes bullish and bearish theses to deliver transparent, data-driven investment recommendations.
            </p>
          </div>

          <div className="space-y-4 max-w-sm">
            <div className="flex items-start gap-3 group bg-[var(--color-panel)] p-4 rounded-xl border border-[var(--color-panel-border)] shadow-sm">
              <Mail className="w-5 h-5 text-[var(--color-judge-blue)] shrink-0 mt-0.5" />
              <div className="flex flex-col text-left">
                <span className="text-[10px] font-bold uppercase tracking-wider text-[var(--color-muted-text)]">Email Us</span>
                <a href="mailto:tc12317878@gmail.com" className="text-sm font-medium text-[var(--color-primary-text)] hover:text-[var(--color-judge-blue)] transition-colors">
                  tc12317878@gmail.com
                </a>
              </div>
            </div>
            
            <div className="flex items-start gap-3 group bg-[var(--color-panel)] p-4 rounded-xl border border-[var(--color-panel-border)] shadow-sm">
              <MapPin className="w-5 h-5 text-[var(--color-judge-blue)] shrink-0 mt-0.5" />
              <div className="flex flex-col text-left">
                <span className="text-[10px] font-bold uppercase tracking-wider text-[var(--color-muted-text)]">Location</span>
                <address className="text-sm font-medium text-[var(--color-primary-text)] not-italic leading-tight mt-1">
                  Lovely Professional University<br />
                  Phagwara, Punjab, India - 144411
                </address>
              </div>
            </div>
          </div>
        </div>

        {/* Trust badges */}
        <div className="flex flex-wrap items-center justify-center md:justify-start gap-4 mb-10">
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-md bg-[var(--color-panel)] border border-[var(--color-panel-border)] shadow-sm">
            <Shield className="w-4 h-4 text-[var(--color-judge-blue)]" />
            <span className="text-xs text-[var(--color-secondary-text)] font-medium">SOC 2 Compliant</span>
          </div>
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-md bg-[var(--color-panel)] border border-[var(--color-panel-border)] shadow-sm">
            <Globe className="w-4 h-4 text-[var(--color-judge-blue)]" />
            <span className="text-xs text-[var(--color-secondary-text)] font-medium">256-bit Encryption</span>
          </div>
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-md bg-[var(--color-panel)] border border-[var(--color-panel-border)] shadow-sm">
            <Shield className="w-4 h-4 text-[var(--color-judge-blue)]" />
            <span className="text-xs text-[var(--color-secondary-text)] font-medium">GDPR Ready</span>
          </div>
          <div className="md:ml-auto text-xs text-[var(--color-muted-text)] font-mono font-semibold">
            Built with Next.js + AI-assisted research workflow
          </div>
        </div>

        {/* Bottom bar */}
        <div className="flex flex-col md:flex-row items-center justify-between pt-6 border-t border-[var(--color-panel-border)] gap-4 text-center md:text-left">
          <span className="text-xs font-medium text-[var(--color-muted-text)]">© 2026 InvesTrue. All rights reserved.</span>
          <span className="text-xs text-[var(--color-muted-text)] max-w-2xl leading-relaxed">
            Market Disclaimer: Data provided for educational and research purposes only. Not financial advice. 
            AI-generated recommendations should be independently verified. Past performance does not guarantee future results.
          </span>
        </div>
      </div>

      {/* Giant watermark */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 select-none pointer-events-none opacity-5 dark:opacity-10">
        <span className="text-[180px] md:text-[280px] font-black tracking-tighter text-[var(--color-primary-text)] leading-none block -mb-10 md:-mb-20">
          InvesTrue
        </span>
      </div>
    </footer>
  );
}
