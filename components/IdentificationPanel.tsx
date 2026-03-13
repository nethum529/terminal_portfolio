"use client";

import { motion } from "framer-motion";
import { TerminalWindow } from "./ui/TerminalWindow";

export function IdentificationPanel() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
      <TerminalWindow title="BACKGROUND" className="md:col-span-2" delay={0.05} glisten>
        <div className="space-y-1 text-xs" style={{ color: "#888" }}>
          {[
            "Student researcher at Texas A&M University.",
            "Operating at Sketch Recognition Labs — HCI & gesture research.",
            "Building across full-stack web and systems engineering.",
          ].map((line, i) => (
            <motion.div
              key={i}
              className="flex gap-2 leading-4"
              initial={{ opacity: 0, x: -4 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.22, delay: 0.05 + i * 0.06 }}
            >
              <span style={{ color: "#333", userSelect: "none", flexShrink: 0 }}>›</span>
              <span>{line}</span>
            </motion.div>
          ))}
        </div>
      </TerminalWindow>

      <TerminalWindow title="LINKS" delay={0.1}>
        <div className="space-y-2 text-xs">
          {[
            { label: "GITHUB",   href: "https://github.com/nethum529",   display: "nethum529" },
            { label: "LINKEDIN", href: "https://linkedin.com/in/nethum",  display: "in/nethum" },
          ].map(({ label, href, display }) => (
            <a
              key={label}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-between pb-1.5 group"
              style={{ borderBottom: "1px solid rgba(255,255,255,0.05)" }}
            >
              <span className="mono-label">{label}</span>
              <span
                className="text-xs transition-colors duration-150"
                style={{ color: "#555" }}
                onMouseEnter={e => ((e.target as HTMLElement).style.color = "#C8C8C8")}
                onMouseLeave={e => ((e.target as HTMLElement).style.color = "#555")}
              >
                {display} →
              </span>
            </a>
          ))}
        </div>
      </TerminalWindow>
    </div>
  );
}
