import React from "react";
import { Brain, Clock, ShieldCheck, Cpu, Zap, GitBranch } from "lucide-react";

const agents = [
  { icon: Brain, name: "News Research Agent", status: "Completed", time: "1.2s", detail: "Scraped 847 articles from 12 sources" },
  { icon: Cpu, name: "Financial Analysis Agent", status: "Completed", time: "2.1s", detail: "Processed 10-K, 10-Q, earnings transcripts" },
  { icon: ShieldCheck, name: "Risk Assessment Agent", status: "Completed", time: "0.8s", detail: "Evaluated macro, sector, and company-level risks" },
  { icon: Zap, name: "Bull Thesis Agent", status: "Completed", time: "3.4s", detail: "Generated 3 core arguments with supporting metrics" },
  { icon: GitBranch, name: "Bear Thesis Agent", status: "Completed", time: "4.1s", detail: "Identified 3 risk factors and counter-arguments" },
  { icon: Clock, name: "Judge Synthesis Agent", status: "Completed", time: "2.5s", detail: "Synthesized consensus from all agent outputs" },
];

export default function AgentPipeline() {
  return (
    <div className="reveal w-full">
      <h3 className="text-xs font-semibold uppercase tracking-[0.2em] text-[var(--color-muted-text)] mb-6">
        AI Research Pipeline
      </h3>
      <div className="grid grid-cols-3 gap-4">
        {agents.map((a, i) => {
          const Icon = a.icon;
          return (
            <div
              key={i}
              className="flex items-start gap-4 p-5 bg-[var(--color-panel)] border border-[var(--color-panel-border)] rounded-2xl hover-lift"
            >
              <div className="w-10 h-10 rounded-xl bg-[var(--color-judge-blue)]/10 flex items-center justify-center shrink-0">
                <Icon className="w-5 h-5 text-[var(--color-judge-blue)]" />
              </div>
              <div className="flex flex-col gap-1 min-w-0">
                <div className="flex items-center gap-2">
                  <span className="text-sm font-semibold text-[var(--color-primary-text)]">{a.name}</span>
                  <span className="font-mono text-[10px] text-[var(--color-bull-green)] bg-[var(--color-bull-green)]/10 px-2 py-0.5 rounded-full">{a.status}</span>
                </div>
                <span className="text-xs text-[var(--color-secondary-text)]">{a.detail}</span>
                <span className="font-mono text-[10px] text-[var(--color-muted-text)]">Exec: {a.time}</span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
