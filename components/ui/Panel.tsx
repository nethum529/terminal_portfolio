"use client";

import { motion } from "framer-motion";
import { ReactNode } from "react";

interface PanelProps {
  title?: string;
  tag?: string;
  children: ReactNode;
  className?: string;
  delay?: number;
}

export function Panel({ title, tag, children, className = "", delay = 0 }: PanelProps) {
  return (
    <motion.div
      className={`t-panel ${className}`}
      initial={{ opacity: 0, y: 8 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, delay, ease: "easeOut" }}
    >
      {title && (
        <div className="t-header">
          <span className="mono-label-bright">{title}</span>
          {tag && <span className="mono-label">{tag}</span>}
        </div>
      )}
      <div className="p-3">{children}</div>
    </motion.div>
  );
}
