"use client";

import { motion } from "framer-motion";
import { Panel } from "./ui/Panel";

export function ContactSection() {
  return (
    <section id="contact" className="max-w-6xl mx-auto px-6 py-16">
      <motion.div
        className="text-xs text-terminal-muted tracking-[0.4em] uppercase mb-8 flex items-center gap-4"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
      >
        <span>// CONTACT INTERFACE</span>
        <div className="flex-1 h-px bg-terminal-border" />
        <span>SEC.04</span>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Panel title="CHANNELS" tag="OPEN" delay={0.1}>
          <div className="space-y-4">
            <a
              href="https://github.com/nethum529"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-between text-xs group border-b border-terminal-dim/30 pb-3"
            >
              <span className="text-terminal-muted tracking-wider">GITHUB</span>
              <span className="text-terminal-text group-hover:text-terminal-glow transition-colors tracking-wider">
                github.com/nethum529 →
              </span>
            </a>
            <a
              href="https://linkedin.com/in/nethum"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-between text-xs group border-b border-terminal-dim/30 pb-3"
            >
              <span className="text-terminal-muted tracking-wider">
                LINKEDIN
              </span>
              <span className="text-terminal-text group-hover:text-terminal-glow transition-colors tracking-wider">
                linkedin.com/in/nethum →
              </span>
            </a>
            <div className="flex items-center justify-between text-xs pb-1">
              <span className="text-terminal-muted tracking-wider">
                INSTITUTION
              </span>
              <span className="text-terminal-text tracking-wider">
                TEXAS A&M UNIVERSITY
              </span>
            </div>
          </div>
        </Panel>

        <Panel title="TRANSMISSION" tag="READY" delay={0.2}>
          <div className="space-y-3">
            <div className="text-xs text-terminal-muted leading-relaxed">
              <span className="text-terminal-glow">{">"}</span> Open to
              collaboration, research opportunities, and engineering roles.
            </div>
            <div className="text-xs text-terminal-muted leading-relaxed">
              <span className="text-terminal-glow">{">"}</span> Reach out via
              LinkedIn or GitHub for inquiries.
            </div>
            <div className="mt-6 border border-terminal-border p-3 bg-terminal-bg">
              <div className="text-xs text-terminal-muted tracking-widest mb-1">
                SYSTEM MSG
              </div>
              <div className="text-xs text-terminal-text tracking-wider">
                READY TO RECEIVE TRANSMISSIONS
                <motion.span
                  className="inline-block ml-1 text-terminal-glow"
                  animate={{ opacity: [1, 0, 1] }}
                  transition={{ duration: 1.2, repeat: Infinity }}
                >
                  _
                </motion.span>
              </div>
            </div>
          </div>
        </Panel>
      </div>
    </section>
  );
}
