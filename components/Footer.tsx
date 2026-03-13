"use client";

import { motion } from "framer-motion";

const YEAR = new Date().getFullYear();

export function Footer() {
  return (
    <motion.footer
      className="border-t border-white/8 py-5 mt-6"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
    >
      <div className="max-w-5xl mx-auto px-5 flex items-center justify-between">
        <span className="label">NETHUM.WEERASINGHE</span>
        <span className="label" suppressHydrationWarning>{YEAR}</span>
      </div>
    </motion.footer>
  );
}
