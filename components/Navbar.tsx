"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

const NAV = [
  { label: "PROFILE",  href: "#profile" },
  { label: "PROJECTS", href: "#projects" },
  { label: "SKILLS",   href: "#skills" },
  { label: "CONTACT",  href: "#contact" },
];

export function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <a
        href="#profile"
        className="sr-only focus:not-sr-only focus:fixed focus:top-2 focus:left-2 focus:z-[200] focus:px-2 focus:py-1 focus:text-xs focus:border focus:border-white/20 focus:bg-black focus:tracking-widest"
        style={{ color: "#C8C8C8" }}
      >
        SKIP TO CONTENT
      </a>

      <header
        className="fixed top-0 left-0 right-0 z-50"
        style={{ borderBottom: "1px solid rgba(255,255,255,0.08)", background: "rgba(0,0,0,0.92)" }}
      >
        <div className="max-w-3xl mx-auto px-3 py-2 flex items-center justify-between">
          <span className="t-title" style={{ letterSpacing: "0.25em" }}>NETHUM.SYS</span>

          <nav aria-label="Main navigation" className="hidden md:flex items-center gap-6">
            {NAV.map(({ label, href }) => (
              <a
                key={href}
                href={href}
                className="mono-label transition-colors duration-150 hover:text-gray-400"
              >
                {label}
              </a>
            ))}
          </nav>

          <span className="hidden md:block mono-label-dim">v2.0</span>

          <button
            className="md:hidden mono-label border px-2 py-0.5 transition-colors duration-150"
            style={{ borderColor: "rgba(255,255,255,0.1)" }}
            onClick={() => setOpen(p => !p)}
            aria-expanded={open}
            aria-label="Toggle navigation"
          >
            {open ? "×" : "≡"}
          </button>
        </div>

        <AnimatePresence>
          {open && (
            <motion.nav
              aria-label="Mobile navigation"
              className="md:hidden"
              style={{ borderTop: "1px solid rgba(255,255,255,0.07)", background: "rgba(0,0,0,0.96)" }}
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.14 }}
            >
              <div className="px-3 py-2 flex flex-col gap-2">
                {NAV.map(({ label, href }) => (
                  <a
                    key={href}
                    href={href}
                    onClick={() => setOpen(false)}
                    className="mono-label py-1 transition-colors duration-150 hover:text-gray-400"
                  >
                    › {label}
                  </a>
                ))}
              </div>
            </motion.nav>
          )}
        </AnimatePresence>
      </header>
    </>
  );
}
