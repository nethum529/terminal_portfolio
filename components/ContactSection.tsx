"use client";

import { motion } from "framer-motion";
import { TerminalWindow } from "./ui/TerminalWindow";

export function ContactSection() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
      <TerminalWindow title="CHANNELS" delay={0.05} glisten>
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
              className="flex items-center justify-between pb-1.5"
              style={{ borderBottom: "1px solid rgba(255,255,255,0.05)" }}
            >
              <span className="mono-label">{label}</span>
              <span
                className="text-xs transition-colors duration-150"
                style={{ color: "#4a4a4a" }}
                onMouseEnter={e => ((e.target as HTMLElement).style.color = "#C8C8C8")}
                onMouseLeave={e => ((e.target as HTMLElement).style.color = "#4a4a4a")}
              >
                {display} →
              </span>
            </a>
          ))}
        </div>
      </TerminalWindow>

      <TerminalWindow title="TRANSMISSION" delay={0.1}>
        <div className="space-y-1.5 text-xs" style={{ color: "#666" }}>
          {[
            "Open to research collaboration and engineering roles.",
            "Reach out via GitHub or LinkedIn.",
          ].map((line, i) => (
            <div key={i} className="flex gap-2 leading-4">
              <span style={{ color: "#2e2e2e", flexShrink: 0 }}>›</span>
              <span>{line}</span>
            </div>
          ))}
          <div className="mt-2 p-2" style={{ border: "1px solid rgba(255,255,255,0.07)", background: "rgba(0,0,0,0.4)" }}>
            <p className="mono-label mb-1">SYSTEM MSG</p>
            <p style={{ color: "#555", fontSize: "0.68rem", letterSpacing: "0.1em" }}>
              READY TO RECEIVE
              <motion.span
                className="cursor-blink ml-0.5"
                style={{ color: "#888" }}
                animate={{ opacity: [1, 0, 1] }}
                transition={{ duration: 1.1, repeat: Infinity }}
              >_</motion.span>
            </p>
          </div>
        </div>
      </TerminalWindow>
    </div>
  );
}
