"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

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
      <a
        href="#identity"
        className="sr-only focus:not-sr-only focus:fixed focus:top-2 focus:left-2 focus:z-[60] focus:px-3 focus:py-1 focus:text-xs focus:border focus:border-white/30 focus:text-mono-text focus:bg-mono-bg focus:tracking-widest"
      >
        SKIP TO CONTENT
      </a>

      <motion.header
        className="fixed top-0 left-0 right-0 z-50 border-b border-white/10 bg-black/90 backdrop-blur-sm"
        initial={{ opacity: 0, y: -12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
      >
        <div className="max-w-5xl mx-auto px-5 py-2.5 flex items-center justify-between">
          <span className="text-xs text-mono-text tracking-[0.3em] uppercase">
            NETHUM.SYS
          </span>

          {/* Desktop */}
          <nav aria-label="Main navigation" className="hidden md:flex items-center gap-8">
            {navItems.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="text-xs text-mono-muted hover:text-mono-text tracking-widest uppercase transition-colors duration-150"
              >
                {item.label}
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-4">
            <span className="hidden md:block text-xs text-mono-dim tracking-wider">
              v1.0
            </span>
            <button
              className="md:hidden text-xs text-mono-muted hover:text-mono-text tracking-widest px-2 py-1 border border-white/10 hover:border-white/25 transition-all duration-150"
              onClick={() => setMenuOpen((p) => !p)}
              aria-expanded={menuOpen}
              aria-controls="mobile-nav"
              aria-label="Toggle navigation"
            >
              {menuOpen ? "[X]" : "[≡]"}
            </button>
          </div>
        </div>

        <AnimatePresence>
          {menuOpen && (
            <motion.nav
              id="mobile-nav"
              aria-label="Mobile navigation"
              className="md:hidden border-t border-white/10 bg-black/95"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.18 }}
            >
              <div className="px-5 py-3 flex flex-col gap-2.5">
                {navItems.map((item) => (
                  <a
                    key={item.href}
                    href={item.href}
                    onClick={() => setMenuOpen(false)}
                    className="text-xs text-mono-muted hover:text-mono-text tracking-widest uppercase transition-colors py-0.5"
                  >
                    › {item.label}
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
