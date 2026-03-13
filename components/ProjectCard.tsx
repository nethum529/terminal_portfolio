"use client";

import { motion } from "framer-motion";
import { GlistenEffect } from "./ui/GlistenEffect";

function isSafeUrl(url: string): boolean {
  try {
    const { protocol } = new URL(url);
    return protocol === "https:" || protocol === "http:";
  } catch { return false; }
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
      className="t-panel block overflow-hidden group"
      initial={{ opacity: 0, y: 7 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.32, delay: index * 0.07 }}
    >
      <div className="t-header">
        <span className="t-dots">● ● ●</span>
        <span className="t-tag">[{String(index + 1).padStart(2, "0")}] {project.type}</span>
      </div>
      <div className="t-body">
        <h3
          className="text-xs tracking-wide uppercase mb-1.5 transition-colors duration-150"
          style={{ color: "#CACACA", letterSpacing: "0.1em" }}
        >
          {project.name}
        </h3>
        <p className="text-xs leading-4 mb-2.5" style={{ color: "#4a4a4a" }}>
          {project.description}
        </p>
        <span className="mono-label transition-colors duration-150 group-hover:text-gray-400">
          ACCESS →
        </span>
      </div>
      <GlistenEffect />
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
