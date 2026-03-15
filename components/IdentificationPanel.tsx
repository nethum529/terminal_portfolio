"use client";

import { motion } from "framer-motion";
import { TerminalWindow } from "./ui/TerminalWindow";

export function IdentificationPanel() {
  return (
    <div className="flex flex-col gap-4">
      <TerminalWindow title="ABOUT ME" delay={0.05} glisten>
        <motion.p
          className="text-xl leading-relaxed"
          style={{ color: "#ffffff" }}
          initial={{ opacity: 0, x: -4 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.3, delay: 0.05 }}
        >
          Hello! I&apos;m a Computer Science student at Texas A&amp;M. I&apos;m currently researching uncertainty quantification of medical image segmentation at Sketch Recognition Labs. I&apos;m very interested in Computer Vision and Machine Learning and working towards impactful research in these fields. I also love applicable software and building products that solve real problems.
        </motion.p>
      </TerminalWindow>

      {/* Resume — full width, prominent */}
      <TerminalWindow title="RESUME // CV" delay={0.15}>
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <p className="text-xl" style={{ color: "#ffffff", letterSpacing: "0.05em" }}>
              Nethum Weerasinghe — Software Engineer
            </p>
            <p className="mono-label mt-1.5">B.S. Computer Science · Texas A&amp;M University · Sketch Recognition Labs</p>
          </div>
          <a
            href="/Don_Weerasinghe.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="shrink-0 px-10 py-5 text-xl font-medium tracking-widest"
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
