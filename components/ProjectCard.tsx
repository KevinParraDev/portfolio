import Link from "next/link";
import Image from "next/image";
import CoverPlaceholder from "./CoverPlaceholder";
import TiltCard from "./TiltCard";
import { categoryLabels, playStore, statusLabel, type Project } from "@/data/projects";
import { tr, type Locale } from "@/i18n/config";
import { fmt, type Dictionary } from "@/i18n/dictionaries";

type Props = { project: Project; lang: Locale; t: Dictionary["projects"]; featured?: boolean; index?: number };

export default function ProjectCard({ project, lang, t, featured = false, index = 0 }: Props) {
  const { slug, title, genre, category, cover, links, description, status } = project;
  const href = `/${lang}/projects/${slug}`;
  const label = statusLabel(project, lang);

  return (
    <TiltCard
      className={featured ? "project-card project-card-featured" : "project-card"}
      // Las tarjetas aparecen una tras otra, en cascada por columnas.
      style={{ "--reveal-delay": `${(index % 3) * 90}ms` } as React.CSSProperties}
    >
      <Link href={href} className="project-card-image" tabIndex={-1} aria-hidden>
        {cover ? (
          <Image src={cover} alt="" sizes={featured ? "(max-width: 800px) 100vw, 55vw" : "(max-width: 800px) 100vw, 33vw"} />
        ) : (
          <CoverPlaceholder title={title} note={t.comingSoon} />
        )}
        {label && <span className={status === "released" ? "badge" : "badge badge-progress"}>{label}</span>}
      </Link>
      <div className="project-card-body">
        {featured && <p className="project-card-eyebrow">{t.featured}</p>}
        <h3>
          <Link href={href}>{title}</Link>
        </h3>
        <p className="project-card-genre">
          {categoryLabels[category][lang]} · {tr(genre, lang)}
        </p>
        {featured && <p className="project-card-summary">{description[lang][0]}</p>}
        <div className="project-card-actions">
          <Link href={href} className="card-button">
            {t.details}
          </Link>
          {links.play && (
            <a
              href={links.play}
              className="card-button card-button-primary"
              target="_blank"
              rel="noopener noreferrer"
              aria-label={fmt(t.playOn, { title, store: playStore(links.play) })}
            >
              {t.play}
            </a>
          )}
        </div>
      </div>
      <span className="card-glare" aria-hidden />
    </TiltCard>
  );
}
