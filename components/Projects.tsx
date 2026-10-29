"use client";

import { useState } from "react";
import ProjectCard from "./ProjectCard";
import { categoryLabels, projects, type Category } from "@/data/projects";

type Filter = Category | "all" | "playable";

const filters: { value: Filter; label: string }[] = [
  { value: "all", label: "All" },
  ...(Object.keys(categoryLabels) as Category[]).map((value) => ({ value, label: categoryLabels[value] })),
  { value: "playable", label: "Playable" },
];

const featured = projects.find((p) => p.featured);

export default function Projects() {
  const [filter, setFilter] = useState<Filter>("all");

  const visible = projects.filter((p) => {
    if (filter === "all") return p !== featured;
    if (filter === "playable") return Boolean(p.links.play);
    return p.category === filter;
  });

  return (
    <section id="projects">
      <h1 className="subtitulo">Projects</h1>

      {featured && filter === "all" && (
        <div className="featured-wrapper">
          <ProjectCard project={featured} featured />
        </div>
      )}

      <div className="project-filters" role="group" aria-label="Filter projects">
        {filters.map(({ value, label }) => (
          <button
            key={value}
            type="button"
            className={filter === value ? "filter-button active" : "filter-button"}
            aria-pressed={filter === value}
            onClick={() => setFilter(value)}
          >
            {label}
          </button>
        ))}
      </div>

      <div className="proyectos">
        {visible.map((project) => (
          <ProjectCard key={project.slug} project={project} />
        ))}
      </div>
      <br />
      <br />
    </section>
  );
}
