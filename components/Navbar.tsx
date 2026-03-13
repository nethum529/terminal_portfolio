"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { StatusDot } from "./ui/StatusDot";

const navItems = [
  { label: "IDENT", href: "#identity" },
  { label: "PROJECTS", href: "#projects" },
  { label: "SKILLS", href: "#skills" },
  { label: "CONTACT", href: "#contact" },
];

export function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <>
      {/* Skip to content link for keyboard/screen reader users */}
      <a
        href="#identity"
        className="sr-only focus:not-sr-only focus:fixed focus:top-2 focus:left-2 focus:z-[60] focus:px-3 focus:py-1.5 focus:text-xs focus:bg-terminal-bg focus:border focus:border-terminal-glow focus:text-terminal-glow focus:tracking-widest"
      >
        SKIP TO CONTENT
      </a>

      <motion.header
        className="fixed top-0 left-0 right-0 z-50 border-b border-terminal-border bg-terminal-bg/90 backdrop-blur-sm"
        initial={{ opacity: 0, y: -16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="max-w-6xl mx-auto px-6 py-3 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <StatusDot status="active" />
            <span className="text-xs text-terminal-glow text-glow tracking-[0.3em] uppercase">
              NETHUM.SYS
            </span>
          </div>

          {/* Desktop nav */}
          <nav
            aria-label="Main navigation"
            className="hidden md:flex items-center gap-6"
          >
            {navItems.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="text-xs text-terminal-muted hover:text-terminal-glow tracking-widest uppercase transition-colors duration-200 hover:text-glow"
              >
                {item.label}
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-4">
            <div className="hidden md:block text-xs text-terminal-muted tracking-wider">
              v1.0.0
            </div>

            {/* Mobile menu toggle */}
            <button
              className="md:hidden text-xs text-terminal-muted hover:text-terminal-glow tracking-widest border border-terminal-border hover:border-terminal-glow px-2 py-1 transition-all duration-200"
              onClick={() => setMenuOpen((prev) => !prev)}
              aria-expanded={menuOpen}
              aria-controls="mobile-nav"
              aria-label="Toggle navigation menu"
            >
              {menuOpen ? "[X]" : "[=]"}
            </button>
          </div>
        </div>

        {/* Mobile dropdown */}
        <AnimatePresence>
          {menuOpen && (
            <motion.nav
              id="mobile-nav"
              aria-label="Mobile navigation"
              className="md:hidden border-t border-terminal-border bg-terminal-bg/95"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.2 }}
            >
              <div className="px-6 py-3 flex flex-col gap-3">
                {navItems.map((item) => (
                  <a
                    key={item.href}
                    href={item.href}
                    onClick={() => setMenuOpen(false)}
                    className="text-xs text-terminal-muted hover:text-terminal-glow tracking-widest uppercase transition-colors duration-200 py-1"
                  >
                    {">"} {item.label}
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
