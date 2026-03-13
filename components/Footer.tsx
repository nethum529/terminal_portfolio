"use client";

import { motion } from "framer-motion";

const YEAR = new Date().getFullYear();

export function Footer() {
  return (
    <motion.footer
      className="border-t border-terminal-border bg-terminal-bg py-6"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
    >
      <div className="max-w-6xl mx-auto px-6 flex items-center justify-between text-xs text-terminal-muted">
        <span className="tracking-widest">NETHUM.WEERASINGHE // SYS</span>
        <span className="tracking-wider" suppressHydrationWarning>
          {YEAR} // ALL SYSTEMS OPERATIONAL
        </span>
      </div>
    </motion.footer>
  );
}
