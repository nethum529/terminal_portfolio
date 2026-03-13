"use client";

import { motion } from "framer-motion";
import { Panel } from "./ui/Panel";
import { SectionHeader } from "./IdentificationPanel";

export function ContactSection() {
  return (
    <section id="contact" className="max-w-4xl mx-auto px-4 py-8">
      <SectionHeader label="// CONTACT INTERFACE" index="04" />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        <Panel title="CHANNELS" delay={0.05}>
          <div className="space-y-2 text-xs">
            {[
              { label: "GITHUB",   href: "https://github.com/nethum529",  display: "github.com/nethum529" },
              { label: "LINKEDIN", href: "https://linkedin.com/in/nethum", display: "linkedin.com/in/nethum" },
            ].map(({ label, href, display }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-between border-b border-white/5 pb-2 group"
              >
                <span className="mono-label">{label}</span>
                <span className="text-sub group-hover:text-bright transition-colors">{display} →</span>
              </a>
            ))}
          </div>
        </Panel>

        <Panel title="TRANSMISSION" delay={0.1}>
          <div className="space-y-2 text-xs text-text">
            <div className="flex gap-2">
              <span className="text-muted shrink-0">›</span>
              <span>Open to research collaboration and engineering roles.</span>
            </div>
            <div className="flex gap-2">
              <span className="text-muted shrink-0">›</span>
              <span>Reach out via GitHub or LinkedIn.</span>
            </div>
            <div className="mt-3 border border-white/8 p-2.5 bg-black/30">
              <p className="mono-label mb-1">SYSTEM MSG</p>
              <p className="text-sub tracking-wider">
                READY TO RECEIVE
                <motion.span
                  className="inline-block ml-0.5 text-text"
                  animate={{ opacity: [1, 0, 1] }}
                  transition={{ duration: 1.1, repeat: Infinity }}
                >
                  _
                </motion.span>
              </p>
            </div>
          </div>
        </Panel>
      </div>
    </section>
  );
}
