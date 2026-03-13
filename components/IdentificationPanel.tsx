"use client";

import { motion } from "framer-motion";
import { Panel } from "./ui/Panel";

export function SectionHeader({ label, index }: { label: string; index: string }) {
  return (
    <motion.div
      className="flex items-center gap-3 mb-4"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.3 }}
    >
      <span className="mono-label">{label}</span>
      <div className="flex-1 h-px bg-white/8" />
      <span className="mono-label">SEC.{index}</span>
    </motion.div>
  );
}

export function IdentificationPanel() {
  return (
    <section id="identity" className="max-w-4xl mx-auto px-4 py-8">
      <SectionHeader label="// IDENTIFICATION" index="01" />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-3">
        <Panel title="BACKGROUND" className="lg:col-span-2" delay={0.05}>
          <div className="space-y-2 text-xs text-text">
            {[
              "Student researcher at Texas A&M University",
              "Operating at Sketch Recognition Labs — HCI & gesture research",
              "Building across full-stack web and systems engineering",
              "Eligible to work in the U.S. with no restrictions",
            ].map((line, i) => (
              <motion.div
                key={i}
                className="flex gap-2"
                initial={{ opacity: 0, x: -4 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.25, delay: 0.1 + i * 0.06 }}
              >
                <span className="text-muted shrink-0 select-none">›</span>
                <span className="leading-relaxed">{line}</span>
              </motion.div>
            ))}
          </div>
        </Panel>

        <Panel title="LINKS" delay={0.1}>
          <div className="space-y-2 text-xs">
            {[
              { label: "GITHUB",   href: "https://github.com/nethum529",   display: "nethum529" },
              { label: "LINKEDIN", href: "https://linkedin.com/in/nethum",  display: "in/nethum" },
            ].map(({ label, href, display }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-between border-b border-white/5 pb-2 group"
              >
                <span className="mono-label">{label}</span>
                <span className="text-sub group-hover:text-bright transition-colors">
                  {display} →
                </span>
              </a>
            ))}
          </div>
        </Panel>
      </div>
    </section>
  );
}
