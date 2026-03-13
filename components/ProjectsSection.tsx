"use client";

import { ProjectCard, PROJECTS } from "./ProjectCard";
import { SectionHeader } from "./IdentificationPanel";

export function ProjectsSection() {
  return (
    <section id="projects" className="max-w-5xl mx-auto px-5 py-10">
      <SectionHeader label="// PROJECT MODULES" index="02" />
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {PROJECTS.map((project, i) => (
          <ProjectCard key={project.id} project={project} index={i} />
        ))}
      </div>
    </section>
  );
}
