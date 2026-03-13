"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const NAV = [
  { label: "IDENT",    href: "#identity" },
  { label: "PROJECTS", href: "#projects" },
  { label: "SKILLS",   href: "#skills" },
  { label: "CONTACT",  href: "#contact" },
];

export function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <a
        href="#identity"
        className="sr-only focus:not-sr-only focus:fixed focus:top-2 focus:left-2 focus:z-[200] focus:px-3 focus:py-1 focus:text-xs focus:border focus:border-white/20 focus:bg-black focus:text-bright focus:tracking-widest"
      >
        SKIP TO CONTENT
      </a>

      <motion.header
        className="fixed top-0 left-0 right-0 z-50 border-b border-white/10 bg-black/95"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3 }}
        style={{ backdropFilter: "none" }}
      >
        <div className="max-w-4xl mx-auto px-4 py-2 flex items-center justify-between">
          <span className="mono-label-bright tracking-[0.25em]">NETHUM.SYS</span>

          <nav aria-label="Main navigation" className="hidden md:flex items-center gap-7">
            {NAV.map(({ label, href }) => (
              <a
                key={href}
                href={href}
                className="mono-label hover:text-bright transition-colors duration-150"
              >
                {label}
              </a>
            ))}
          </nav>

          <span className="hidden md:block mono-label">v1.0</span>

          <button
            className="md:hidden mono-label hover:text-bright border border-white/10 px-2 py-0.5"
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
              className="md:hidden border-t border-white/8 bg-black/98"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.15 }}
            >
              <div className="px-4 py-2 flex flex-col gap-2">
                {NAV.map(({ label, href }) => (
                  <a
                    key={href}
                    href={href}
                    onClick={() => setOpen(false)}
                    className="mono-label hover:text-bright transition-colors py-1"
                  >
                    › {label}
                  </a>
                ))}
              </div>
            </motion.nav>
          )}
        </AnimatePresence>
      </motion.header>
    </>
  );
}
