"use client";

import { motion } from "framer-motion";
import { TerminalWindow } from "./ui/TerminalWindow";

const CONTACTS = [
  {
    label: "GITHUB",
    display: "github.com/nethum529",
    href: "https://github.com/nethum529",
    sub: "Source code & projects",
  },
  {
    label: "LINKEDIN",
    display: "linkedin.com/in/nethum",
    href: "https://linkedin.com/in/nethum",
    sub: "Professional profile",
  },
  {
    label: "RESUME",
    display: "View / Download PDF",
    href: "/Don_Weerasinghe.pdf",
    sub: "B.S. Computer Science — Texas A&M",
  },
];

export function ContactSection() {
  return (
    <TerminalWindow title="CONTACT ME" glow delay={0.05}>
      <div className="flex flex-col gap-6 py-2">
        {/* Large link cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          {CONTACTS.map(({ label, display, href, sub }) => (
            <motion.a
              key={label}
              href={href}
              target={href.startsWith("http") ? "_blank" : "_self"}
              rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
              className="flex flex-col gap-3 p-6 transition-all duration-200"
              style={{
                border: "1px solid rgba(200,185,255,0.30)",
                background: "rgba(200,185,255,0.04)",
              }}
              whileHover={{
                scale: 1.02,
                transition: { duration: 0.15 },
              }}
              onMouseEnter={e => {
                const el = e.currentTarget as HTMLElement;
                el.style.borderColor = "rgba(200,185,255,0.70)";
                el.style.background = "rgba(200,185,255,0.10)";
                el.style.boxShadow = "0 0 20px rgba(175,155,255,0.18)";
              }}
              onMouseLeave={e => {
                const el = e.currentTarget as HTMLElement;
                el.style.borderColor = "rgba(200,185,255,0.30)";
                el.style.background = "rgba(200,185,255,0.04)";
                el.style.boxShadow = "";
              }}
            >
              <span className="mono-label" style={{ color: "#ffffff" }}>{label}</span>
              <span className="text-xl font-medium" style={{ color: "#ffffff", letterSpacing: "0.03em" }}>{display}</span>
              <span className="text-base" style={{ color: "#ffffff" }}>{sub}</span>
            </motion.a>
          ))}
        </div>

        {/* System status */}
        <div className="flex items-center gap-3 pt-1" style={{ borderTop: "1px solid rgba(255,255,255,0.08)" }}>
          <span className="mono-label-dim">SYSTEM MSG</span>
          <span style={{ color: "#ffffff", fontSize: "1.1rem", letterSpacing: "0.08em" }}>
            READY TO RECEIVE
            <motion.span
              className="ml-0.5"
              style={{ color: "#ffffff" }}
              animate={{ opacity: [1, 0, 1] }}
              transition={{ duration: 1.1, repeat: Infinity }}
            >_</motion.span>
          </span>
        </div>
      </div>
    </TerminalWindow>
  );
}
