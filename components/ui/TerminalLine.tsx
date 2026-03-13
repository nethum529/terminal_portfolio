"use client";

import { motion } from "framer-motion";

interface TerminalLineProps {
  prompt?: string;
  text: string;
  delay?: number;
  dim?: boolean;
}

export function TerminalLine({
  prompt = ">",
  text,
  delay = 0,
  dim = false,
}: TerminalLineProps) {
  return (
    <motion.div
      className={`flex gap-3 text-sm font-mono ${dim ? "text-terminal-muted" : "text-terminal-text"}`}
      initial={{ opacity: 0, x: -8 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, delay }}
    >
      <span className="text-terminal-glow select-none">{prompt}</span>
      <span>{text}</span>
    </motion.div>
  );
}
