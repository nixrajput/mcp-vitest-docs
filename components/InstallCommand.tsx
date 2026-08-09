"use client";

import { useState } from "react";
import { INSTALL_CMD } from "@/lib/shared";

export function InstallCommand() {
  const [copied, setCopied] = useState(false);

  return (
    <button
      type="button"
      onClick={() => {
        void navigator.clipboard.writeText(INSTALL_CMD);
        setCopied(true);
        setTimeout(() => setCopied(false), 1500);
      }}
      className="border-fd-border bg-fd-card flex items-center gap-3 rounded-lg border px-4 py-3 font-mono text-sm"
    >
      <span className="text-fd-muted-foreground">$</span>
      <span>{INSTALL_CMD}</span>
      <span className="text-fd-muted-foreground ml-2 text-xs">{copied ? "copied" : "copy"}</span>
    </button>
  );
}
