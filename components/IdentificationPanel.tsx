"use client";

import { motion } from "framer-motion";
import { Panel } from "./ui/Panel";
import { TerminalLine } from "./ui/TerminalLine";
import { StatusDot } from "./ui/StatusDot";

export function IdentificationPanel() {
  return (
    <section id="identity" className="max-w-6xl mx-auto px-6 py-16">
      <motion.div
        className="text-xs text-terminal-muted tracking-[0.4em] uppercase mb-8 flex items-center gap-4"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
      >
        <span>// IDENTIFICATION</span>
        <div className="flex-1 h-px bg-terminal-border" />
        <span>SEC.01</span>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* Bio panel */}
        <Panel title="BIO" tag="SUBJECT" className="lg:col-span-2" delay={0.1}>
          <div className="space-y-3">
            <TerminalLine
              prompt=">"
              text="Student researcher at Texas A&M University"
              delay={0.2}
            />
            <TerminalLine
              prompt=">"
              text="Currently operating at Sketch Recognition Labs"
              delay={0.3}
            />
            <TerminalLine
              prompt=">"
              text="Focus: HCI, gesture recognition, intelligent interfaces"
              delay={0.4}
            />
            <TerminalLine
              prompt=">"
              text="Primary language: C++ — preferred for performance-critical systems"
              delay={0.5}
            />
            <TerminalLine
              prompt=">"
              text="Building across full-stack web and systems domains"
              delay={0.6}
            />
          </div>
        </Panel>

        {/* Status panel */}
        <Panel title="SYSTEM STATUS" tag="LIVE" delay={0.2}>
          <div className="space-y-4">
            <div className="flex justify-between items-center text-xs border-b border-terminal-dim/30 pb-2">
              <span className="text-terminal-muted">NODE</span>
              <StatusDot status="active" label="ONLINE" />
            </div>
            <div className="flex justify-between items-center text-xs border-b border-terminal-dim/30 pb-2">
              <span className="text-terminal-muted">RESEARCH</span>
              <StatusDot status="active" label="RUNNING" />
            </div>
            <div className="flex justify-between items-center text-xs border-b border-terminal-dim/30 pb-2">
              <span className="text-terminal-muted">PROJECTS</span>
              <StatusDot status="active" label="ACTIVE" />
            </div>
            <div className="flex justify-between items-center text-xs">
              <span className="text-terminal-muted">AVAILABILITY</span>
              <StatusDot status="active" label="OPEN" />
            </div>

            <div className="mt-4 pt-3 border-t border-terminal-border">
              <div className="text-xs text-terminal-muted mb-2 tracking-wider">
                UPTIME
              </div>
              <motion.div
                className="h-1 bg-terminal-dim rounded-full overflow-hidden"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
              >
                <motion.div
                  className="h-full bg-terminal-glow"
                  initial={{ width: "0%" }}
                  whileInView={{ width: "92%" }}
                  viewport={{ once: true }}
                  transition={{ duration: 1, delay: 0.5, ease: "easeOut" }}
                />
              </motion.div>
              <div className="text-xs text-terminal-glow mt-1">92%</div>
            </div>
          </div>
        </Panel>
      </div>
    </section>
  );
}
