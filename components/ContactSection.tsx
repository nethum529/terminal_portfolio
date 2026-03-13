"use client";

import { motion } from "framer-motion";
import { Panel } from "./ui/Panel";
import { SectionHeader } from "./IdentificationPanel";

export function ContactSection() {
  return (
    <section id="contact" className="max-w-5xl mx-auto px-5 py-10">
      <SectionHeader label="// CONTACT INTERFACE" index="04" />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Panel title="CHANNELS" delay={0.1}>
          <div className="space-y-3 text-xs">
            {[
              { label: "GITHUB",   href: "https://github.com/nethum529",   display: "github.com/nethum529" },
              { label: "LINKEDIN", href: "https://linkedin.com/in/nethum", display: "linkedin.com/in/nethum" },
            ].map(({ label, href, display }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-between border-b border-white/5 pb-3 group"
              >
                <span className="label">{label}</span>
                <span className="text-mono-muted group-hover:text-mono-text tracking-wide transition-colors">
                  {display} →
                </span>
              </a>
            ))}
          </div>
        </Panel>

        <Panel title="TRANSMISSION" delay={0.2}>
          <div className="space-y-2.5 text-xs text-mono-muted leading-relaxed">
            <div className="flex gap-2">
              <span className="text-mono-dim shrink-0">›</span>
              <span>Open to research collaboration and engineering roles.</span>
            </div>
            <div className="flex gap-2">
              <span className="text-mono-dim shrink-0">›</span>
              <span>Reach out via GitHub or LinkedIn.</span>
            </div>
            <div className="mt-4 border border-white/8 p-3 bg-black/40">
              <span className="label block mb-1">SYSTEM MSG</span>
              <span className="text-mono-muted tracking-wider">
                READY TO RECEIVE
                <motion.span
                  className="inline-block ml-0.5 text-mono-text"
                  animate={{ opacity: [1, 0, 1] }}
                  transition={{ duration: 1.1, repeat: Infinity }}
                >
                  _
                </motion.span>
              </span>
            </div>
          </div>
        </Panel>
      </div>
    </section>
  );
}
