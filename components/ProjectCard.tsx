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
  tags: string[];
  status: "ACTIVE" | "ARCHIVED" | "WIP";
}

interface ProjectCardProps {
  project: Project;
  index: number;
}

const statusColors = {
  ACTIVE: "text-terminal-success",
  ARCHIVED: "text-terminal-muted",
  WIP: "text-terminal-warning",
};

export function ProjectCard({ project, index }: ProjectCardProps) {
  const safeUrl = isSafeUrl(project.url) ? project.url : "#";

  return (
    <motion.a
      href={safeUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="block panel-border panel-border-hover bg-terminal-panel p-5 group relative overflow-hidden"
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.12 }}
    >
      {/* Corner accent */}
      <div className="absolute top-0 right-0 w-12 h-12 overflow-hidden">
        <div className="absolute top-0 right-0 w-px h-8 bg-terminal-glow opacity-20 group-hover:opacity-60 transition-opacity duration-300" />
        <div className="absolute top-0 right-0 h-px w-8 bg-terminal-glow opacity-20 group-hover:opacity-60 transition-opacity duration-300" />
      </div>

      <div className="flex items-start justify-between mb-3">
        <div>
          <div className="text-xs text-terminal-muted tracking-widest mb-1">
            [{String(index + 1).padStart(2, "0")}] {project.type}
          </div>
          <h3 className="text-sm text-terminal-bright tracking-[0.15em] uppercase font-mono group-hover:text-terminal-glow group-hover:text-glow transition-all duration-200">
            {project.name}
          </h3>
        </div>
        <span
          className={`text-xs tracking-widest ${statusColors[project.status]}`}
        >
          {project.status}
        </span>
      </div>

      <p className="text-xs text-terminal-muted leading-relaxed mb-4">
        {project.description}
      </p>

      <div className="flex flex-wrap gap-2">
        {project.tags.map((tag) => (
          <span
            key={tag}
            className="text-xs text-terminal-muted border border-terminal-dim px-2 py-0.5 tracking-wider"
          >
            {tag}
          </span>
        ))}
      </div>

      <div className="mt-4 text-xs text-terminal-glow tracking-widest opacity-0 group-hover:opacity-100 transition-opacity duration-200">
        ACCESS →
      </div>
    </motion.a>
  );
}

export const PROJECTS: Project[] = [
  {
    id: "stamped",
    name: "STAMPED",
    description:
      "Web platform at usestamped.us — a live production application.",
    url: "https://usestamped.us",
    type: "LIVE",
    tags: ["PRODUCTION", "WEB"],
    status: "ACTIVE",
  },
  {
    id: "merchant",
    name: "MERCHANT",
    description:
      "Open-source project. Explore the repository for implementation details.",
    url: "https://github.com/nethum529/Merchant",
    type: "REPO",
    tags: ["OPEN SOURCE"],
    status: "ACTIVE",
  },
  {
    id: "vero",
    name: "VERO",
    description:
      "Open-source project. Explore the repository for implementation details.",
    url: "https://github.com/nethum529/Vero",
    type: "REPO",
    tags: ["OPEN SOURCE"],
    status: "ACTIVE",
  },
];
