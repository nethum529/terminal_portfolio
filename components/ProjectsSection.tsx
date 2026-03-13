"use client";

import { motion } from "framer-motion";
import { ProjectCard, PROJECTS } from "./ProjectCard";

export function ProjectsSection() {
  return (
    <section id="projects" className="max-w-6xl mx-auto px-6 py-16">
      <motion.div
        className="text-xs text-terminal-muted tracking-[0.4em] uppercase mb-8 flex items-center gap-4"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
      >
        <span>// PROJECT MODULES</span>
        <div className="flex-1 h-px bg-terminal-border" />
        <span>SEC.02</span>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {PROJECTS.map((project, i) => (
          <ProjectCard key={project.id} project={project} index={i} />
        ))}
      </div>
    </section>
  );
}
