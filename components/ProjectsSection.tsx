"use client";

import { ProjectCard, PROJECTS } from "./ProjectCard";
import { SectionHeader } from "./IdentificationPanel";

export function ProjectsSection() {
  return (
    <section id="projects" className="max-w-4xl mx-auto px-4 py-8">
      <SectionHeader label="// PROJECT MODULES" index="02" />
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
        {PROJECTS.map((p, i) => (
          <ProjectCard key={p.id} project={p} index={i} />
        ))}
      </div>
    </section>
  );
}
