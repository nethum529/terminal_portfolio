"use client";

import { motion } from "framer-motion";

const IDENT = [
  { k: "NAME",        v: "NETHUM WEERASINGHE" },
  { k: "INSTITUTION", v: "TEXAS A&M UNIVERSITY" },
  { k: "FIELD",       v: "COMPUTER SCIENCE" },
  { k: "OPERATION",   v: "SKETCH RECOGNITION LAB" },
  { k: "ELIGIBILITY", v: "U.S. — NO RESTRICTIONS" },
];

const LINKS = [
  { label: "GITHUB",   href: "https://github.com/nethum529" },
  { label: "LINKEDIN", href: "https://linkedin.com/in/nethum" },
];

export function Hero() {
  return (
    <section className="relative flex items-center justify-center min-h-screen pt-10">
      {/* Corner brackets */}
      <div className="absolute top-12 left-4 w-5 h-5 border-l border-t border-white/15" />
      <div className="absolute top-12 right-4 w-5 h-5 border-r border-t border-white/15" />
      <div className="absolute bottom-4 left-4 w-5 h-5 border-l border-b border-white/15" />
      <div className="absolute bottom-4 right-4 w-5 h-5 border-r border-b border-white/15" />

      <div className="w-full max-w-4xl mx-auto px-4">
        <motion.div
          className="t-panel"
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
        >
          {/* Terminal title bar */}
          <div className="t-header">
            <span className="mono-label-bright tracking-[0.2em]">NETHUM.WEERASINGHE // DEVELOPER PROFILE</span>
            <span className="mono-label">SYS-001</span>
          </div>

          <div className="p-4 grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Left: ident table */}
            <div>
              <p className="mono-label mb-3">SUBJECT.IDENT</p>
              <div className="space-y-2">
                {IDENT.map(({ k, v }, i) => (
                  <motion.div
                    key={k}
                    className="row"
                    initial={{ opacity: 0, x: -6 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.25, delay: 0.3 + i * 0.06 }}
                  >
                    <span className="mono-label w-28 shrink-0">{k}</span>
                    <span className="text-bright text-xs">{v}</span>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Right: description + links */}
            <div className="flex flex-col justify-between">
              <div>
                <p className="mono-label mb-3">DESCRIPTION</p>
                <motion.p
                  className="text-xs text-text leading-relaxed border-l border-white/10 pl-3"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.4, delay: 0.55 }}
                >
                  CS researcher at Sketch Recognition Labs, Texas A&M University.
                  Building systems at the intersection of HCI and machine intelligence.
                </motion.p>
              </div>

              <motion.div
                className="mt-5"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.4, delay: 0.7 }}
              >
                <p className="mono-label mb-2">CHANNELS</p>
                <div className="flex gap-3">
                  {LINKS.map(({ label, href }) => (
                    <a
                      key={label}
                      href={href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mono-label hover:text-bright border border-white/12 hover:border-white/30 px-3 py-1.5 transition-all duration-150"
                    >
                      {label}
                    </a>
                  ))}
                </div>
              </motion.div>
            </div>
          </div>

          {/* Bottom status bar */}
          <div className="border-t border-white/6 px-4 py-1.5 flex items-center justify-between">
            <span className="mono-label">SYSTEM ONLINE</span>
            <span className="mono-label">
              TEXAS A&M // 2025
            </span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
