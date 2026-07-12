import React, { useEffect, useState } from "react";
import SearchPanel from "./SearchPanel";
import { Activity } from "lucide-react";

export type NodeStatus = "pending" | "active" | "completed";

export interface TelemetryNode {
  id: string;
  name: string;
  status: NodeStatus;
  executionTime: string;
  stateLabel: string;
}

export default function TelemetrySidebar({
  nodes,
}: {
  nodes: TelemetryNode[];
}) {
  return (
    <div className="w-1/5 h-full bg-[var(--color-panel)] border-r border-[var(--color-panel-border)] flex flex-col p-4">
      {/* Branding */}
      <div className="mb-6">
        <h1 className="text-xl font-bold text-[var(--color-primary-text)] tracking-tight">
          InvesTrue
        </h1>
        <p className="text-xs text-[var(--color-secondary-text)] uppercase tracking-wider font-semibold mt-1">
          AI Investment Committee
        </p>
      </div>

      {/* Search Section */}
      <div className="mb-8">
        <SearchPanel />
      </div>

      {/* Telemetry Pipeline */}
      <div className="flex flex-col flex-1 overflow-y-auto">
        <div className="flex items-center gap-2 mb-4">
          <Activity className="w-4 h-4 text-[var(--color-judge-blue)]" />
          <h2 className="text-sm font-semibold text-[var(--color-primary-text)] uppercase tracking-wider">
            Research Pipeline
          </h2>
        </div>
        
        <div className="flex flex-col gap-3 relative before:absolute before:inset-y-0 before:left-[11px] before:w-[2px] before:bg-[var(--color-panel-border)]">
          {nodes.map((node, index) => (
            <div key={node.id} className="relative flex items-start gap-4">
              <div className="relative z-10 flex items-center justify-center w-6 h-6 bg-[var(--color-panel)] pt-0.5">
                <div
                  className={`w-2.5 h-2.5 rounded-full ${
                    node.status === "completed"
                      ? "bg-[var(--color-judge-blue)]"
                      : node.status === "active"
                      ? "bg-[var(--color-warning-amber)] animate-pulse shadow-[0_0_8px_rgba(180,83,9,0.8)]"
                      : "bg-[var(--color-panel-border)]"
                  }`}
                />
              </div>
              
              <div className={`flex flex-col flex-1 p-2 rounded-md border transition-colors ${
                node.status === "active" 
                  ? "border-[var(--color-warning-amber)]/50 bg-[var(--color-warning-amber)]/5" 
                  : "border-transparent hover:bg-[var(--color-panel-border)]/20"
              }`}>
                <div className="flex items-center justify-between">
                  <span className={`text-sm font-medium ${
                    node.status === "pending" ? "text-[var(--color-muted-text)]" : "text-[var(--color-primary-text)]"
                  }`}>
                    {node.name}
                  </span>
                  {node.status !== "pending" && (
                    <span className="font-mono text-[10px] text-[var(--color-secondary-text)]">
                      {node.executionTime}
                    </span>
                  )}
                </div>
                {node.status !== "pending" && (
                  <span className={`text-xs mt-1 ${
                    node.status === "active" ? "text-[var(--color-warning-amber)] typing-effect inline-block" : "text-[var(--color-secondary-text)]"
                  }`}>
                    {node.stateLabel}
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
