import ProjectCard from "./ProjectCard";
import { projects } from "@/data/projects";
import type { Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/dictionaries";

// Proyectos principales: el destacado en grande y el resto en tarjetas.
const main = projects.filter((p) => p.section === "main");
const featured = main.find((p) => p.featured);
const others = main.filter((p) => p !== featured);

export default function Projects({ lang, t }: { lang: Locale; t: Dictionary["projects"] }) {
  return (
    <section id="projects">
      <h1 className="subtitulo" data-reveal>
        {t.title}
      </h1>

      {featured && (
        <div className="featured-wrapper">
          <ProjectCard project={featured} lang={lang} t={t} featured />
        </div>
      )}

      <div className="proyectos">
        {others.map((project, i) => (
          <ProjectCard key={project.slug} project={project} lang={lang} t={t} index={i} />
        ))}
      </div>
    </section>
  );
}
