"use client";

import { ProjectCard, PROJECTS } from "./ProjectCard";

export function ProjectsSection() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
      {PROJECTS.map((p, i) => <ProjectCard key={p.id} project={p} index={i} />)}
    </div>
  );
}
