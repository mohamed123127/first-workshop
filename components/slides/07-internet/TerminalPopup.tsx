"use client";

import React, { useState } from "react";
import { Terminal, Copy, Check, TerminalSquare, Info, Network } from "lucide-react";

export interface TerminalPopupProps {
  publicIp: string;
  sentence1: string;
  command: string;
  output: string;
}

export function TerminalPopup({
  publicIp,
  sentence1,
  command,
  output,
}: TerminalPopupProps) {
  const [copied, setCopied] = useState<boolean>(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(command);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="w-[330px] sm:w-[380px] rounded-2xl bg-[#030712]/95 border-2 border-emerald-500/50 shadow-[0_20px_60px_rgba(0,0,0,0.9)] overflow-hidden text-left font-mono">
      {/* Title bar */}
      <div className="px-4 py-2.5 bg-[#0B1220] border-b border-slate-800 flex items-center justify-between">
        <div className="flex items-center gap-2">

          <span className="text-[11px] text-slate-300 font-bold flex items-center gap-1.5 ml-1">
            <Network className="w-3.5 h-3.5 text-emerald-400" />
            What is an IP Address?
          </span>
        </div>
      </div>

      <div className="p-4 space-y-3">
        {/* 2-Sentence Explanation */}
        <div className="p-3 rounded-xl bg-[#090F1E] border border-slate-800/90 text-xs leading-relaxed space-y-1.5">
          <p className="text-slate-200">
            {sentence1}
          </p>

        </div>

        {/* Command to know the IP address: curl ifconfig.me */}
        <div>
          <div className="flex items-center justify-between mb-1.5 text-[10px] text-slate-400 font-bold uppercase tracking-wider">
            <span>Terminal Command to find your IP:</span>
            <span className="text-emerald-400">Bash / Shell</span>
          </div>

          <div className="rounded-xl p-3 bg-[#0B1120] border border-slate-800 flex flex-col gap-2">
            <div className="flex items-center justify-between gap-2">
              <div className="flex items-center gap-2 text-cyan-300 font-bold text-xs">
                <span className="text-slate-500 select-none">$</span>
                <span>{command}</span>
              </div>
              <button
                type="button"
                onClick={handleCopy}
                title="Copy command"
                className="flex items-center gap-1 px-2 py-1 rounded-md bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition-colors cursor-pointer text-[10px]"
              >
                {copied ? (
                  <>
                    <Check className="w-3 h-3 text-emerald-400" />
                    <span className="text-emerald-300 font-bold">Copied</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3 h-3 text-slate-400" />
                    <span>Copy</span>
                  </>
                )}
              </button>
            </div>

            {/* Output */}
            <div className="pt-2 border-t border-slate-800/80 flex items-center justify-between text-[11px]">
              <span className="text-slate-500 text-[10px]">Output:</span>
              <span className="px-2 py-0.5 rounded bg-emerald-500/15 border border-emerald-500/30 text-emerald-300 font-bold">
                {output}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
