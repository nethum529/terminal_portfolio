"use client";

import { motion } from "framer-motion";

function isSafeUrl(url: string): boolean {
  try {
    const { protocol } = new URL(url);
    return protocol === "https:" || protocol === "http:";
  } catch {
    return false;
  }
}

interface Project {
  id: string;
  name: string;
  description: string;
  url: string;
  type: "LIVE" | "REPO";
}

export function ProjectCard({ project, index }: { project: Project; index: number }) {
  const href = isSafeUrl(project.url) ? project.url : "#";

  return (
    <motion.a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="t-panel block group"
      initial={{ opacity: 0, y: 8 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.35, delay: index * 0.08 }}
    >
      <div className="t-header">
        <span className="mono-label">[{String(index + 1).padStart(2, "0")}] {project.type}</span>
      </div>
      <div className="p-3">
        <h3 className="text-xs text-bright tracking-[0.1em] uppercase mb-2 group-hover:text-white transition-colors">
          {project.name}
        </h3>
        <p className="text-xs text-sub leading-relaxed mb-3">{project.description}</p>
        <span className="mono-label group-hover:text-text transition-colors">ACCESS →</span>
      </div>
    </motion.a>
  );
}

export const PROJECTS: Project[] = [
  {
    id: "stamped",
    name: "STAMPED",
    description: "Live production web platform — usestamped.us",
    url: "https://usestamped.us",
    type: "LIVE",
  },
  {
    id: "merchant",
    name: "MERCHANT",
    description: "Open-source repository on GitHub.",
    url: "https://github.com/nethum529/Merchant",
    type: "REPO",
  },
  {
    id: "vero",
    name: "VERO",
    description: "Open-source repository on GitHub.",
    url: "https://github.com/nethum529/Vero",
    type: "REPO",
  },
];
