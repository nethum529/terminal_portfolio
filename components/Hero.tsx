"use client";

import { motion } from "framer-motion";

export function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-12">
      {/* Corner marks */}
      <div className="absolute top-16 left-5 w-6 h-6 border-l border-t border-white/20" />
      <div className="absolute top-16 right-5 w-6 h-6 border-r border-t border-white/20" />
      <div className="absolute bottom-5 left-5 w-6 h-6 border-l border-b border-white/20" />
      <div className="absolute bottom-5 right-5 w-6 h-6 border-r border-b border-white/20" />

      <div className="max-w-5xl mx-auto px-5 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-6 items-center">

          {/* Left — identity */}
          <div className="lg:col-span-3">
            <motion.p
              className="label mb-3"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.15 }}
            >
              DEVELOPER // PROFILE
            </motion.p>

            <motion.h1
              className="text-5xl lg:text-7xl font-mono text-mono-bright tracking-tight leading-none mb-1"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.25 }}
            >
              NETHUM
            </motion.h1>

            <motion.h2
              className="text-2xl lg:text-3xl font-mono text-mono-muted tracking-[0.1em] mb-6"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.35 }}
            >
              WEERASINGHE
            </motion.h2>

            <motion.p
              className="text-sm text-mono-muted leading-relaxed max-w-sm border-l border-white/15 pl-3"
              initial={{ opacity: 0, x: -8 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.5 }}
            >
              CS researcher at Sketch Recognition Labs, Texas A&M University.
            </motion.p>

            <motion.div
              className="flex gap-3 mt-6"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.65 }}
            >
              <a
                href="https://github.com/nethum529"
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs text-mono-muted hover:text-mono-text tracking-widest border border-white/15 hover:border-white/35 px-3 py-1.5 transition-all duration-150"
              >
                GITHUB
              </a>
              <a
                href="https://linkedin.com/in/nethum"
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs text-mono-muted hover:text-mono-text tracking-widest border border-white/15 hover:border-white/35 px-3 py-1.5 transition-all duration-150"
              >
                LINKEDIN
              </a>
            </motion.div>
          </div>

          {/* Right — dossier panel */}
          <motion.div
            className="lg:col-span-2 panel"
            initial={{ opacity: 0, x: 16 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            style={{ perspective: 800 }}
            whileHover={{
              boxShadow: "0 12px 48px rgba(0,0,0,1), 0 0 0 1px rgba(255,255,255,0.14)",
              y: -3,
              transition: { duration: 0.2 },
            }}
          >
            <div className="panel-header flex items-center justify-between">
              <span className="label-bright">IDENT RECORD</span>
              <span className="label">SYS-001</span>
            </div>
            <div className="p-4 space-y-2.5">
              {[
                { k: "NAME",        v: "NETHUM WEERASINGHE" },
                { k: "INSTITUTION", v: "TEXAS A&M UNIV." },
                { k: "FIELD",       v: "COMPUTER SCIENCE" },
                { k: "CURRENT OP",  v: "SKETCH RECOG. LAB" },
                { k: "ELIGIBILITY", v: "U.S. — NO RESTRICT." },
              ].map(({ k, v }) => (
                <div key={k} className="flex justify-between items-baseline text-xs border-b border-white/5 pb-2">
                  <span className="label w-28 shrink-0">{k}</span>
                  <span className="text-mono-text text-right">{v}</span>
                </div>
              ))}
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
