"use client";

import { motion } from "framer-motion";
import { TerminalWindow } from "./ui/TerminalWindow";

export function IdentificationPanel() {
  return (
    <div className="flex flex-col gap-4">
      <TerminalWindow title="ABOUT ME" delay={0.05} glisten>
        <div className="space-y-3 text-lg" style={{ color: "#ffffff" }}>
          {[
            "Computer Science student at Texas A&M University.",
            "Researching uncertainty quantification of medical image segmentation at Sketch Recognition Labs.",
            "Interested in Computer Vision and Machine Learning — working towards impactful research in these fields.",
            "Love building applicable software and products that solve real problems.",
          ].map((line, i) => (
            <motion.div key={i} className="flex gap-2 leading-5"
              initial={{ opacity: 0, x: -4 }} whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }} transition={{ duration: 0.22, delay: 0.05 + i * 0.07 }}
            >
              <span style={{ color: "#ffffff", userSelect: "none", flexShrink: 0 }}>›</span>
              <span>{line}</span>
            </motion.div>
          ))}
        </div>
      </TerminalWindow>

      {/* Resume — full width, prominent */}
      <TerminalWindow title="RESUME // CV" delay={0.15}>
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <p className="text-lg" style={{ color: "#ffffff", letterSpacing: "0.05em" }}>
              Nethum Weerasinghe — Software Engineer
            </p>
            <p className="mono-label mt-1.5">B.S. Computer Science · Texas A&amp;M University · Sketch Recognition Labs</p>
          </div>
          <a
            href="/Don_Weerasinghe.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="shrink-0 px-8 py-4 text-lg font-medium tracking-widest"
            style={{
              border: "1px solid rgba(255,255,255,0.40)",
              color: "#ffffff",
              background: "rgba(255,255,255,0.05)",
              letterSpacing: "0.18em",
            }}
          >
            GET RESUME ↗
          </a>
        </div>
      </TerminalWindow>
    </div>
  );
}
