import React, { useRef } from "react";
import { motion, useInView } from "framer-motion";

import { TrendingUp, TrendingDown, Check, X } from "lucide-react";
import { useTicker } from "@/context/TickerContext";

const bullArguments = [
  "Unprecedented demand for Hopper architecture GPUs continues to outstrip supply across every major cloud provider.",
  "CUDA software ecosystem creates a nearly insurmountable moat — 4M+ developers locked into the platform.",
  "Data center revenue is accelerating with massive hyperscaler capex commitments exceeding $200B collectively.",
];

const bearArguments = [
  "Gross margins may have peaked as TSMC raises wafer prices by 8% and AMD MI300X gains traction.",
  "Over-reliance on top 4 hyperscaler customers creates concentrated revenue risk — 60% of total revenue.",
  "Geopolitical export controls risk cutting off $8B+ in emerging market AI revenue streams.",
];

export default function BullBearDebateSection() {
  const containerRef = useRef(null);
  const isInView = useInView(containerRef, { once: true, margin: "-100px 0px" });
  const { tickerData } = useTicker();

  return (
    <div ref={containerRef} className="w-full relative py-10 overflow-hidden">
      
      {/* Central 3D Animation Arena */}
      <div className="relative w-full h-[400px] mb-8 bg-[#0a1120] border border-[var(--color-panel-border)] rounded-3xl overflow-hidden shadow-xl flex items-center justify-center">
        
        {/* Arena Background Glow */}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/80 z-10" />
        <div className="absolute w-full h-[1px] top-1/2 bg-gradient-to-r from-transparent via-[#2563EB]/30 to-transparent" />
        
        {/* The Golden Coin (Static Center, fades in) */}
        <motion.div
          initial={{ opacity: 0, scale: 0.5, y: 50 }}
          animate={isInView ? { opacity: 1, scale: 1, y: 0 } : {}}
          transition={{ duration: 1, delay: 0.2, ease: "easeOut" }}
          className="absolute z-20 w-48 h-48 drop-shadow-[0_0_30px_rgba(251,191,36,0.3)] mix-blend-screen"
        >
          <img src="/animated_coin.png" alt="Golden Coin" className="absolute inset-0 w-full h-full object-contain" />
        </motion.div>

        {/* The Bull (Charges in from left) */}
        <motion.div
          initial={{ x: -600, y: 20, opacity: 0, scale: 0.9 }}
          animate={isInView ? { x: -120, y: -20, opacity: 1, scale: 1, rotate: 5 } : {}}
          transition={{ duration: 0.8, delay: 0.5, type: "spring", bounce: 0.3 }}
          className="absolute left-1/2 -ml-[300px] z-30 w-[400px] h-[300px] mix-blend-screen"
        >
          <img src="/animated_bull.png" alt="Bull" className="absolute inset-0 w-full h-full object-contain" />
        </motion.div>

        {/* The Bear (Swipes in from right) */}
        <motion.div
          initial={{ x: 600, y: -40, opacity: 0, scale: 0.9 }}
          animate={isInView ? { x: 120, y: 10, opacity: 1, scale: 1, rotate: -5 } : {}}
          transition={{ duration: 0.8, delay: 0.7, type: "spring", bounce: 0.3 }}
          className="absolute right-1/2 -mr-[300px] z-30 w-[400px] h-[300px] mix-blend-screen"
        >
          <img src="/animated_bear.png" alt="Bear" className="absolute inset-0 w-full h-full object-contain" />
        </motion.div>
        
        {/* Flash Effect on Impact */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: [0, 0.8, 0] } : {}}
          transition={{ duration: 0.5, delay: 1.1, times: [0, 0.2, 1] }}
          className="absolute inset-0 bg-[#FCD34D] mix-blend-overlay z-40 pointer-events-none"
        />

        {/* Floating text labels inside arena */}
        <div className="absolute top-6 left-8 z-20">
          <span className="px-3 py-1 bg-[var(--color-bull-green)]/20 text-[var(--color-bull-green)] border border-[var(--color-bull-green)]/30 rounded-full text-xs font-bold uppercase tracking-widest backdrop-blur-md">
            Bull Thesis
          </span>
        </div>
        <div className="absolute top-6 right-8 z-20">
          <span className="px-3 py-1 bg-[var(--color-bear-red)]/20 text-[var(--color-bear-red)] border border-[var(--color-bear-red)]/30 rounded-full text-xs font-bold uppercase tracking-widest backdrop-blur-md">
            Bear Thesis
          </span>
        </div>
      </div>

      {/* Details Panels */}
      <div className="grid grid-cols-2 gap-6 relative z-10">
        
        {/* Bull Panel */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 1 }}
          className="bg-[var(--color-panel)] border border-[var(--color-panel-border)] rounded-3xl p-8 shadow-sm hover-lift"
        >
          <div className="flex items-center gap-3 text-[var(--color-bull-green)] mb-6">
            <div className="p-2 bg-[var(--color-bull-green)]/10 rounded-xl">
              <TrendingUp className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-xl font-bold uppercase tracking-tight leading-none">Bull Case</h2>
              <span className="text-xs text-[var(--color-secondary-text)]">Confidence: <strong className="text-[var(--color-bull-green)] font-mono">{tickerData.bullConfidence}%</strong></span>
            </div>
          </div>
          <ul className="space-y-5">
            {tickerData.bullArgs.map((arg, idx) => (
              <li key={idx} className="flex items-start gap-3 leading-relaxed">
                <div className="mt-1 p-0.5 rounded-full bg-[var(--color-bull-green)]/10 shrink-0">
                  <Check className="w-3.5 h-3.5 text-[var(--color-bull-green)]" />
                </div>
                <span className="text-[13px] text-[var(--color-primary-text)]">{arg}</span>
              </li>
            ))}
          </ul>
        </motion.div>

        {/* Bear Panel */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 1.2 }}
          className="bg-[var(--color-panel)] border border-[var(--color-panel-border)] rounded-3xl p-8 shadow-sm hover-lift"
        >
          <div className="flex items-center gap-3 text-[var(--color-bear-red)] mb-6">
            <div className="p-2 bg-[var(--color-bear-red)]/10 rounded-xl">
              <TrendingDown className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-xl font-bold uppercase tracking-tight leading-none">Bear Case</h2>
              <span className="text-xs text-[var(--color-secondary-text)]">Confidence: <strong className="text-[var(--color-bear-red)] font-mono">{tickerData.bearConfidence}%</strong></span>
            </div>
          </div>
          <ul className="space-y-5">
            {tickerData.bearArgs.map((arg, idx) => (
              <li key={idx} className="flex items-start gap-3 leading-relaxed">
                <div className="mt-1 p-0.5 rounded-full bg-[var(--color-bear-red)]/10 shrink-0">
                  <X className="w-3.5 h-3.5 text-[var(--color-bear-red)]" />
                </div>
                <span className="text-[13px] text-[var(--color-primary-text)]">{arg}</span>
              </li>
            ))}
          </ul>
        </motion.div>

      </div>
    </div>
  );
}
