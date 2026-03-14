"use client";

import { motion } from "framer-motion";
import { TerminalWindow } from "./ui/TerminalWindow";

export function IdentificationPanel() {
  return (
    <div className="flex flex-col gap-4">
      <TerminalWindow title="ABOUT ME" delay={0.05} glisten>
        <div className="space-y-3 text-lg" style={{ color: "#ffffff" }}>
          {[
            "Student researcher at Texas A&M University.",
            "Operating at Sketch Recognition Labs — HCI & gesture research.",
            "Building across full-stack web and systems engineering.",
          ].map((line, i) => (
            <motion.div key={i} className="flex gap-2 leading-5"
              initial={{ opacity: 0, x: -4 }} whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }} transition={{ duration: 0.22, delay: 0.05 + i * 0.07 }}
            >
              <span style={{ color: "#ffffff", userSelect: "none", flexShrink: 0 }}>›</span>
              <span>{line}</span>
            </motion.div>
          ))}
        </div>
      </TerminalWindow>

      {/* Resume — full width, prominent */}
      <TerminalWindow title="RESUME // CV" delay={0.15}>
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <p className="text-lg" style={{ color: "#ffffff", letterSpacing: "0.05em" }}>
              Nethum Weerasinghe — Software Engineer
            </p>
            <p className="mono-label mt-1.5">B.S. Computer Science · Texas A&amp;M University · Sketch Recognition Labs</p>
          </div>
          <a
            href="/Don_Weerasinghe.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="shrink-0 px-8 py-4 text-lg font-medium tracking-widest transition-all duration-200"
            style={{
              border: "1px solid rgba(200,185,255,0.55)",
              color: "#ffffff",
              background: "rgba(200,185,255,0.08)",
              letterSpacing: "0.18em",
            }}
            onMouseEnter={e => {
              const el = e.currentTarget as HTMLElement;
              el.style.background = "rgba(200,185,255,0.20)";
              el.style.borderColor = "rgba(200,185,255,0.85)";
              el.style.boxShadow = "0 0 18px rgba(175,155,255,0.30)";
            }}
            onMouseLeave={e => {
              const el = e.currentTarget as HTMLElement;
              el.style.background = "rgba(200,185,255,0.08)";
              el.style.borderColor = "rgba(200,185,255,0.55)";
              el.style.boxShadow = "";
            }}
          >
            GET RESUME ↗
          </a>
        </div>
      </TerminalWindow>
    </div>
  );
}
