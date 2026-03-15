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
  { k: "EDUCATION", v: "TEXAS A&M" },
  { k: "CURRENTLY AT", v: "SKETCH RECOGNITION LAB" },
  { k: "EMAIL",     v: "NETHUMWEERASINGHE.NW@GMAIL.COM" },
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
        <span className="t-title">DEVELOPER PROFILE</span>
        <span className="t-tag">SYS-001</span>
      </div>

      <div className="t-body flex flex-col gap-8">
        {/* Greeting — full width */}
        <div>
          <p className="text-5xl font-medium tracking-wide phosphor-glow" style={{ color: "#ffffff", letterSpacing: "0.04em" }}>
            Hey, I&apos;m Nethum Weerasinghe
          </p>
          <p className="text-2xl mt-3 phosphor-glow" style={{ color: "#ffffff", letterSpacing: "0.12em" }}>
            SOFTWARE ENGINEER // CS @ TEXAS A&amp;M
          </p>
        </div>

        {/* Two columns: boot + ident */}
        <div className="grid grid-cols-1 md:grid-cols-[2fr_3fr] gap-4">
          {/* Left: boot sequence */}
          <div>
            <p className="mono-label mb-2">BOOT SEQUENCE</p>
            <TypewriterText
              lines={BOOT_LINES}
              speed={8}
              lineDelay={60}
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
                      <span className="mono-label shrink-0 whitespace-nowrap">{k}</span>
                      <span className="text-base ml-4" style={{ color: "#ffffff" }}>{v}</span>
                    </motion.div>
                  ))}


                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>

      {/* Status bar */}
      <div className="flex items-center justify-between px-7 py-4" style={{ borderTop: "1px solid rgba(255,255,255,0.06)" }}>
        <span className="mono-label-dim">
          {booted ? "SYSTEM ONLINE" : "LOADING..."}
        </span>
        <span className="mono-label-dim">TEXAS A&M UNIVERSITY</span>
      </div>

      <GlistenEffect />
    </motion.div>
  );
}
