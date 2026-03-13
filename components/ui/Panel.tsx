"use client";

import { motion } from "framer-motion";
import { ReactNode } from "react";

interface PanelProps {
  title?: string;
  tag?: string;
  children: ReactNode;
  className?: string;
  animate?: boolean;
  delay?: number;
}

export function Panel({
  title,
  tag,
  children,
  className = "",
  animate = true,
  delay = 0,
}: PanelProps) {
  const content = (
    <div
      className={`
        relative bg-terminal-panel panel-border panel-border-hover
        ${className}
      `}
    >
      {title && (
        <div className="flex items-center justify-between border-b border-terminal-border px-4 py-2">
          <span className="text-xs text-terminal-glow text-glow tracking-widest uppercase">
            {title}
          </span>
          {tag && (
            <span className="text-xs text-terminal-muted tracking-wider">
              [{tag}]
            </span>
          )}
        </div>
      )}
      <div className="p-4">{children}</div>
    </div>
  );

  if (!animate) return content;

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay, ease: "easeOut" }}
    >
      {content}
    </motion.div>
  );
}
