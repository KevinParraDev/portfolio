"use client";

import { useState } from "react";
import ProjectCard from "./ProjectCard";
import { categoryLabels, projects, type Category } from "@/data/projects";
import type { Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/dictionaries";

type Filter = Category | "all" | "playable";

const featured = projects.find((p) => p.featured);

type Props = { lang: Locale; t: Dictionary["projects"] };

export default function Projects({ lang, t }: Props) {
  const [filter, setFilter] = useState<Filter>("all");

  const filters: { value: Filter; label: string }[] = [
    { value: "all", label: t.all },
    ...(Object.keys(categoryLabels) as Category[]).map((value) => ({ value, label: categoryLabels[value][lang] })),
    { value: "playable", label: t.playable },
  ];

  const visible = projects.filter((p) => {
    if (filter === "all") return p !== featured;
    if (filter === "playable") return Boolean(p.links.play);
    return p.category === filter;
  });

  return (
    <section id="projects">
      <h1 className="subtitulo" data-reveal>
        {t.title}
      </h1>

      {featured && filter === "all" && (
        <div className="featured-wrapper">
          <ProjectCard project={featured} lang={lang} t={t} featured />
        </div>
      )}

      <div className="project-filters" role="group" aria-label={t.filtersLabel}>
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
        {visible.map((project, i) => (
          <ProjectCard key={project.slug} project={project} lang={lang} t={t} index={i} />
        ))}
      </div>
      <br />
      <br />
    </section>
  );
}
