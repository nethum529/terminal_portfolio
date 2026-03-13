"use client";

import { motion } from "framer-motion";
import { TerminalWindow } from "./ui/TerminalWindow";

const LINKS = [
  { label: "GITHUB",   href: "https://github.com/nethum529",          display: "github.com/nethum529" },
  { label: "LINKEDIN", href: "https://linkedin.com/in/nethum",         display: "linkedin.com/in/nethum" },
  { label: "RESUME",   href: "/Don_Weerasinghe.pdf",                   display: "view resume ↗" },
];

export function ContactSection() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
      <TerminalWindow title="CHANNELS" delay={0.05} glisten float floatDuration={4.5} floatDelay={0.3}>
        <div className="space-y-2 text-xs">
          {LINKS.map(({ label, href, display }) => (
            <a key={label} href={href}
              target={href.startsWith("http") ? "_blank" : "_self"}
              rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
              className="flex items-center justify-between pb-1.5"
              style={{ borderBottom: "1px solid rgba(255,255,255,0.06)" }}
            >
              <span className="mono-label">{label}</span>
              <span className="text-xs transition-colors duration-150" style={{ color: "#555" }}
                onMouseEnter={e => ((e.target as HTMLElement).style.color = "#D4D4D4")}
                onMouseLeave={e => ((e.target as HTMLElement).style.color = "#555")}
              >{display}</span>
            </a>
          ))}
        </div>
      </TerminalWindow>

      <TerminalWindow title="CONTACT ME" delay={0.1} float floatDuration={3.9} floatDelay={1.1}>
        <div className="space-y-1.5 text-xs" style={{ color: "#666" }}>
          {["Open to research collaboration and engineering roles.", "Reach out via GitHub or LinkedIn."].map((line, i) => (
            <div key={i} className="flex gap-2 leading-5">
              <span style={{ color: "#333", flexShrink: 0 }}>›</span>
              <span>{line}</span>
            </div>
          ))}
          <div className="mt-2.5 p-2.5" style={{ border: "1px solid rgba(255,255,255,0.08)", background: "rgba(0,0,0,0.35)" }}>
            <p className="mono-label mb-1">SYSTEM MSG</p>
            <p style={{ color: "#585858", fontSize: "0.7rem", letterSpacing: "0.08em" }}>
              READY TO RECEIVE
              <motion.span className="cursor-blink ml-0.5" style={{ color: "#888" }}
                animate={{ opacity: [1, 0, 1] }} transition={{ duration: 1.1, repeat: Infinity }}
              >_</motion.span>
            </p>
          </div>
        </div>
      </TerminalWindow>
    </div>
  );
}
