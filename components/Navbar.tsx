"use client";

import { motion } from "framer-motion";
import { StatusDot } from "./ui/StatusDot";

const navItems = [
  { label: "IDENT", href: "#identity" },
  { label: "PROJECTS", href: "#projects" },
  { label: "SKILLS", href: "#skills" },
  { label: "CONTACT", href: "#contact" },
];

export function Navbar() {
  return (
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

        <nav className="flex items-center gap-6">
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

        <div className="text-xs text-terminal-muted tracking-wider">
          v1.0.0
        </div>
      </div>
    </motion.header>
  );
}
