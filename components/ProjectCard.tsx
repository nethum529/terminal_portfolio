"use client";

import { motion } from "framer-motion";
import { GlistenEffect } from "./ui/GlistenEffect";
import { LoopingTypewriter } from "./ui/LoopingTypewriter";

function isSafeUrl(url: string): boolean {
  try { const { protocol } = new URL(url); return protocol === "https:" || protocol === "http:"; }
  catch { return false; }
}

interface Project { id: string; name: string; description: string; url: string; type: "LIVE" | "REPO"; }

export function ProjectCard({ project, index }: { project: Project; index: number }) {
  const href = isSafeUrl(project.url) ? project.url : "#";
  return (
    <motion.div
      animate={{ y: [0, -5, 0] }}
      transition={{ duration: 3.8 + index * 0.4, repeat: Infinity, ease: "easeInOut", delay: index * 0.7 }}
    >
      <motion.a
        href={href} target="_blank" rel="noopener noreferrer"
        className="t-panel block overflow-hidden group"
        initial={{ opacity: 0, y: 8 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.35, delay: index * 0.08 }}
      >
        <div className="t-header">
          <span className="t-dots">● ● ●</span>
          <span className="t-title">{project.name}</span>
          <span className="t-tag">[{String(index + 1).padStart(2, "0")}] {project.type}</span>
        </div>
        <div className="t-body">
          <p className="text-xs leading-5 mb-3" style={{ color: "#555", minHeight: "3.2rem" }}>
            <LoopingTypewriter text={project.description} speed={32} pause={3000} />
          </p>
          <span className="mono-label group-hover:text-gray-400 transition-colors duration-150">ACCESS →</span>
        </div>
        <GlistenEffect />
      </motion.a>
    </motion.div>
  );
}

export const PROJECTS: Project[] = [
  {
    id: "stamped", name: "STAMPED",
    description: "A client/vendor onboarding platform for financial institutions. Utilizes intuitive design and ai-powered risk assessment to optimize workflow of employees.",
    url: "https://usestamped.us", type: "LIVE",
  },
  {
    id: "merchant", name: "MERCHANT",
    description: "A credit card optimization platform. Helps users maximize their credit potential by informing the best cards to use at a certain location with a simple notification.",
    url: "https://github.com/nethum529/Merchant", type: "REPO",
  },
  {
    id: "vero", name: "VERO",
    description: "A drug-interaction checker, helps medical professionals and patients ensure that they are not taking conflicting medicine.",
    url: "https://github.com/nethum529/Vero", type: "REPO",
  },
];
