"use client";

import { motion } from "framer-motion";
import { Panel } from "./ui/Panel";

export function IdentificationPanel() {
  return (
    <section id="identity" className="max-w-5xl mx-auto px-5 py-10">
      <SectionHeader label="// IDENTIFICATION" index="01" />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <Panel title="BACKGROUND" className="lg:col-span-2" delay={0.1}>
          <div className="space-y-2.5 text-xs text-mono-muted leading-relaxed">
            {[
              "Student researcher at Texas A&M University",
              "Operating at Sketch Recognition Labs — HCI & gesture research",
              "Building across full-stack web and systems engineering",
              "Eligible to work in the U.S. with no restrictions",
            ].map((line, i) => (
              <motion.div
                key={i}
                className="flex gap-2.5"
                initial={{ opacity: 0, x: -6 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3, delay: 0.15 + i * 0.07 }}
              >
                <span className="text-mono-dim select-none shrink-0">›</span>
                <span>{line}</span>
              </motion.div>
            ))}
          </div>
        </Panel>

        <Panel title="LINKS" delay={0.2}>
          <div className="space-y-3 text-xs">
            {[
              { label: "GITHUB",   href: "https://github.com/nethum529",    display: "nethum529" },
              { label: "LINKEDIN", href: "https://linkedin.com/in/nethum",  display: "in/nethum" },
            ].map(({ label, href, display }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-between border-b border-white/5 pb-2.5 group"
              >
                <span className="label">{label}</span>
                <span className="text-mono-muted group-hover:text-mono-text transition-colors">
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

export function SectionHeader({ label, index }: { label: string; index: string }) {
  return (
    <motion.div
      className="flex items-center gap-4 mb-5"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
    >
      <span className="label">{label}</span>
      <div className="flex-1 h-px bg-white/8" />
      <span className="label">SEC.{index}</span>
    </motion.div>
  );
}
