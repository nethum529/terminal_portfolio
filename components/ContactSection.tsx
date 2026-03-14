"use client";

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
];

export function ContactSection() {
  return (
    <TerminalWindow title="CONTACT ME" glow delay={0.05}>
      <div className="flex flex-col gap-6 py-2">
        {/* Large link cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {CONTACTS.map(({ label, display, href, sub }) => (
            <a
              key={label}
              href={href}
              target={href.startsWith("http") ? "_blank" : "_self"}
              rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
              className="flex flex-col gap-3 p-6"
              style={{
                border: "1px solid rgba(255,255,255,0.22)",
                background: "rgba(255,255,255,0.03)",
              }}
            >
              <span className="mono-label" style={{ color: "#ffffff" }}>{label}</span>
              <span className="text-xl font-medium" style={{ color: "#ffffff", letterSpacing: "0.03em" }}>{display}</span>
              <span className="text-base" style={{ color: "#ffffff" }}>{sub}</span>
            </a>
          ))}
        </div>

      </div>
    </TerminalWindow>
  );
}
