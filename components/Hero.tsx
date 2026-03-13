"use client";

import { motion } from "framer-motion";
import { StatusDot } from "./ui/StatusDot";

export function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center grid-bg overflow-hidden pt-16">
      {/* Corner decorations */}
      <div className="absolute top-20 left-6 w-8 h-8 border-l border-t border-terminal-glow opacity-40" />
      <div className="absolute top-20 right-6 w-8 h-8 border-r border-t border-terminal-glow opacity-40" />
      <div className="absolute bottom-6 left-6 w-8 h-8 border-l border-b border-terminal-glow opacity-40" />
      <div className="absolute bottom-6 right-6 w-8 h-8 border-r border-b border-terminal-glow opacity-40" />

      <div className="max-w-6xl mx-auto px-6 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
          {/* Left: Main identity */}
          <div>
            <motion.div
              className="text-xs text-terminal-muted tracking-[0.4em] uppercase mb-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              SUBJECT // DEVELOPER PROFILE
            </motion.div>

            <motion.h1
              className="text-4xl lg:text-6xl font-mono text-terminal-bright text-glow-accent mb-2 tracking-tight"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.3 }}
            >
              NETHUM
            </motion.h1>
            <motion.h2
              className="text-xl lg:text-2xl font-mono text-terminal-glow text-glow mb-6 tracking-[0.15em]"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.4 }}
            >
              WEERASINGHE
            </motion.h2>

            <motion.div
              className="flex items-center gap-3 mb-8"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.55 }}
            >
              <StatusDot status="active" />
              <span className="text-xs text-terminal-muted tracking-widest uppercase">
                SYSTEM ONLINE
              </span>
              <span className="text-terminal-dim mx-2">|</span>
              <span className="text-xs text-terminal-muted tracking-widest">
                CS @ TEXAS A&M
              </span>
            </motion.div>

            <motion.p
              className="text-sm text-terminal-text leading-relaxed max-w-md border-l-2 border-terminal-dim pl-4"
              initial={{ opacity: 0, x: -12 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.65 }}
            >
              Computer Science researcher at Sketch Recognition Labs, Texas A&M
              University. Building systems at the intersection of HCI and
              machine intelligence.
            </motion.p>
          </div>

          {/* Right: System readout */}
          <motion.div
            className="panel-border bg-terminal-panel p-6 font-mono"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 0.5 }}
          >
            <div className="text-xs text-terminal-glow tracking-widest mb-4 border-b border-terminal-border pb-2">
              SYSTEM READOUT
            </div>
            <div className="space-y-3">
              {[
                { label: "DESIGNATION", value: "NETHUM WEERASINGHE" },
                { label: "INSTITUTION", value: "TEXAS A&M UNIVERSITY" },
                { label: "FIELD", value: "COMPUTER SCIENCE" },
                { label: "CURRENT OP", value: "SKETCH RECOGNITION LAB" },
                { label: "PRIMARY LANG", value: "C++" },
                { label: "STATUS", value: "ACTIVE" },
              ].map(({ label, value }, i) => (
                <motion.div
                  key={label}
                  className="flex justify-between items-center text-xs py-1 border-b border-terminal-dim/30"
                  initial={{ opacity: 0, x: 8 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3, delay: 0.7 + i * 0.08 }}
                >
                  <span className="text-terminal-muted tracking-wider">
                    {label}
                  </span>
                  <span
                    className={`text-terminal-bright ${label === "STATUS" ? "text-terminal-success" : ""}`}
                  >
                    {value}
                  </span>
                </motion.div>
              ))}
            </div>

            <div className="mt-6 flex gap-4">
              <a
                href="https://github.com/nethum529"
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs text-terminal-muted hover:text-terminal-glow tracking-widest border border-terminal-border hover:border-terminal-glow px-3 py-1.5 transition-all duration-200"
              >
                [GITHUB]
              </a>
              <a
                href="https://linkedin.com/in/nethum"
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs text-terminal-muted hover:text-terminal-glow tracking-widest border border-terminal-border hover:border-terminal-glow px-3 py-1.5 transition-all duration-200"
              >
                [LINKEDIN]
              </a>
            </div>
          </motion.div>
        </div>

        {/* Bottom scroll hint */}
        <motion.div
          className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 1.2 }}
        >
          <span className="text-xs text-terminal-muted tracking-widest">
            SCROLL TO EXPLORE
          </span>
          <motion.div
            className="w-px h-8 bg-terminal-glow opacity-50"
            animate={{ scaleY: [0, 1, 0] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
          />
        </motion.div>
      </div>
    </section>
  );
}
