"use client";

import { motion } from "framer-motion";
import { GlistenEffect } from "./ui/GlistenEffect";

function isSafeUrl(url: string): boolean {
  try { const { protocol } = new URL(url); return protocol === "https:" || protocol === "http:"; }
  catch { return false; }
}

interface Project {
  id: string;
  name: string;
  description: string;
  siteUrl?: string;
  repoUrl?: string;
}

export function ProjectCard({ project, index }: { project: Project; index: number }) {
  const links = [
    project.siteUrl && isSafeUrl(project.siteUrl) ? { label: "SITE →", href: project.siteUrl } : null,
    project.repoUrl && isSafeUrl(project.repoUrl) ? { label: "REPO →", href: project.repoUrl } : null,
  ].filter(Boolean) as { label: string; href: string }[];

  return (
    <motion.div
      className="t-panel block overflow-hidden"
      initial={{ opacity: 0, y: 8 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.35, delay: index * 0.08 }}
    >
      <div className="t-header">
        <span className="t-dots">● ● ●</span>
        <span className="t-title">{project.name}</span>
        <span className="t-tag">[{String(index + 1).padStart(2, "0")}]</span>
      </div>
      <div className="t-body flex flex-col gap-4">
        <p className="text-lg leading-8" style={{ color: "#ffffff", minHeight: "4rem" }}>
          {project.description}
        </p>
        <div className="flex gap-4">
          {links.map(({ label, href }) => (
            <a
              key={label}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              className="mono-label"
            >
              {label}
            </a>
          ))}
        </div>
      </div>
      <GlistenEffect />
    </motion.div>
  );
}

export const PROJECTS: Project[] = [
  {
    id: "stamped",
    name: "STAMPED — PROJECT",
    description: "A client/vendor onboarding platform for financial institutions. Utilizes intuitive design and ai-powered risk assessment to optimize workflow of employees.",
    siteUrl: "https://usestamped.us",
    repoUrl: "https://github.com/nethum529/stamped",
  },
  {
    id: "merchant",
    name: "MERCHANT — PROJECT",
    description: "A credit card optimization platform. Helps users maximize their credit potential by informing the best cards to use at a certain location with a simple notification.",
    repoUrl: "https://github.com/nethum529/Merchant",
  },
  {
    id: "vero",
    name: "VERO — PROJECT",
    description: "A drug-interaction checker, helps medical professionals and patients ensure that they are not taking conflicting medicine.",
    siteUrl: "https://tryvero.netlify.app/",
    repoUrl: "https://github.com/nethum529/Vero",
  },
];
