"use client";

import { motion } from "framer-motion";

type Status = "active" | "idle" | "warning";

interface StatusDotProps {
  status?: Status;
  label?: string;
}

const statusColors: Record<Status, string> = {
  active: "bg-terminal-success",
  idle: "bg-terminal-muted",
  warning: "bg-terminal-warning",
};

const glowColors: Record<Status, string> = {
  active: "rgba(0, 255, 136, 0.6)",
  idle: "rgba(74, 122, 155, 0.4)",
  warning: "rgba(255, 170, 0, 0.6)",
};

export function StatusDot({ status = "active", label }: StatusDotProps) {
  return (
    <div className="flex items-center gap-2">
      <motion.span
        className={`inline-block w-2 h-2 rounded-full ${statusColors[status]}`}
        animate={{ opacity: [0.6, 1, 0.6] }}
        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        style={{ boxShadow: `0 0 6px ${glowColors[status]}` }}
      />
      {label && (
        <span className="text-xs text-terminal-muted tracking-wider uppercase">
          {label}
        </span>
      )}
    </div>
  );
}
