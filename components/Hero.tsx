"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { TypewriterText } from "./ui/TypewriterText";
import { GlistenEffect } from "./ui/GlistenEffect";

const BOOT_LINES = [
  "booting developer.profile...",
  "loading subject data...",
  "authenticating credentials...",
  "initializing terminal interface...",
  "access granted.",
];

const IDENT = [
  { k: "NAME",      v: "NETHUM WEERASINGHE" },
  { k: "EDUCATION", v: "TEXAS A&M — CS" },
  { k: "OPERATION", v: "SKETCH RECOGNITION LAB" },
  { k: "GITHUB",    v: "github.com/nethum529" },
  { k: "LINKEDIN",  v: "linkedin.com/in/nethum" },
];

export function Hero() {
  const [booted, setBooted] = useState(false);

  return (
    <motion.div
      className="t-panel t-panel-glow overflow-hidden"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
    >
      {/* Title bar */}
      <div className="t-header">
        <span className="t-dots">● ● ●</span>
        <span className="t-title">NETHUM.WEERASINGHE // DEVELOPER PROFILE</span>
        <span className="t-tag">SYS-001</span>
      </div>

      <div className="t-body grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Left: boot sequence */}
        <div>
          <p className="mono-label mb-2">BOOT SEQUENCE</p>
          <TypewriterText
            lines={BOOT_LINES}
            speed={22}
            lineDelay={180}
            onComplete={() => setBooted(true)}
          />
        </div>

        {/* Right: ident — appears after boot */}
        <div>
          <p className="mono-label mb-2">SUBJECT.IDENT</p>
          <AnimatePresence>
            {booted && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.4 }}
                className="space-y-0"
              >
                {IDENT.map(({ k, v }, i) => (
                  <motion.div
                    key={k}
                    className="row"
                    initial={{ opacity: 0, x: -4 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.22, delay: i * 0.07 }}
                  >
                    <span className="mono-label w-24 shrink-0">{k}</span>
                    <span className="text-xs" style={{ color: "#C8C8C8" }}>{v}</span>
                  </motion.div>
                ))}

                {/* Links */}
                <motion.div
                  className="flex gap-2 pt-3"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.3, delay: 0.5 }}
                >
                  {[
                    { label: "GITHUB",   href: "https://github.com/nethum529" },
                    { label: "LINKEDIN", href: "https://linkedin.com/in/nethum" },
                  ].map(({ label, href }) => (
                    <a
                      key={label}
                      href={href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mono-label border px-2.5 py-1 transition-all duration-150"
                      style={{ borderColor: "rgba(255,255,255,0.12)" }}
                      onMouseEnter={e => {
                        (e.currentTarget as HTMLElement).style.borderColor = "rgba(255,255,255,0.32)";
                        (e.currentTarget as HTMLElement).style.color = "#C8C8C8";
                      }}
                      onMouseLeave={e => {
                        (e.currentTarget as HTMLElement).style.borderColor = "rgba(255,255,255,0.12)";
                        (e.currentTarget as HTMLElement).style.color = "";
                      }}
                    >
                      {label}
                    </a>
                  ))}
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* Status bar */}
      <div className="flex items-center justify-between px-2.5 py-1" style={{ borderTop: "1px solid rgba(255,255,255,0.06)" }}>
        <span className="mono-label-dim">
          {booted ? "SYSTEM ONLINE" : "LOADING..."}
        </span>
        <span className="mono-label-dim">TEXAS A&M UNIVERSITY</span>
      </div>

      <GlistenEffect />
    </motion.div>
  );
}
