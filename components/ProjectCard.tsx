"use client";

import { motion } from "framer-motion";

function isSafeUrl(url: string): boolean {
  try {
    const parsed = new URL(url);
    return parsed.protocol === "https:" || parsed.protocol === "http:";
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

interface ProjectCardProps {
  project: Project;
  index: number;
}

export function ProjectCard({ project, index }: ProjectCardProps) {
  const safeUrl = isSafeUrl(project.url) ? project.url : "#";

  return (
    <motion.a
      href={safeUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="block panel group relative overflow-hidden"
      initial={{ opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, delay: index * 0.1 }}
      whileHover={{
        boxShadow: "0 8px 40px rgba(0,0,0,0.95), 0 0 0 1px rgba(255,255,255,0.2)",
        y: -3,
        transition: { duration: 0.18 },
      }}
    >
      {/* Corner accent */}
      <div className="absolute top-0 right-0 w-8 h-px bg-white/20 group-hover:bg-white/40 transition-colors duration-200" />
      <div className="absolute top-0 right-0 h-8 w-px bg-white/20 group-hover:bg-white/40 transition-colors duration-200" />

      <div className="panel-header flex items-center justify-between">
        <span className="label">
          [{String(index + 1).padStart(2, "0")}] {project.type}
        </span>
      </div>

      <div className="p-4">
        <h3 className="text-sm text-mono-bright tracking-[0.12em] uppercase mb-2 group-hover:text-white transition-colors">
          {project.name}
        </h3>
        <p className="text-xs text-mono-muted leading-relaxed mb-4">
          {project.description}
        </p>
        <span className="text-xs text-mono-dim group-hover:text-mono-muted tracking-widest transition-colors">
          ACCESS →
        </span>
      </div>
    </motion.a>
  );
}

export const PROJECTS: Project[] = [
  {
    id: "stamped",
    name: "STAMPED",
    description: "Live production web platform.",
    url: "https://usestamped.us",
    type: "LIVE",
  },
  {
    id: "merchant",
    name: "MERCHANT",
    description: "Open-source repository.",
    url: "https://github.com/nethum529/Merchant",
    type: "REPO",
  },
  {
    id: "vero",
    name: "VERO",
    description: "Open-source repository.",
    url: "https://github.com/nethum529/Vero",
    type: "REPO",
  },
];
