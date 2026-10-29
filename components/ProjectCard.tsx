import Link from "next/link";
import Image from "next/image";
import CoverPlaceholder from "./CoverPlaceholder";
import { categoryLabels, playStore, statusLabel, type Project } from "@/data/projects";

export default function ProjectCard({ project, featured = false }: { project: Project; featured?: boolean }) {
  const { slug, title, genre, category, cover, links, description, status } = project;
  const href = `/projects/${slug}`;
  const label = statusLabel(project);

  return (
    <article className={featured ? "project-card project-card-featured" : "project-card"}>
      <Link href={href} className="project-card-image" tabIndex={-1} aria-hidden>
        {cover ? (
          <Image src={cover} alt="" sizes={featured ? "(max-width: 800px) 100vw, 55vw" : "(max-width: 800px) 100vw, 33vw"} />
        ) : (
          <CoverPlaceholder title={title} />
        )}
        {label && <span className={status === "released" ? "badge" : "badge badge-progress"}>{label}</span>}
      </Link>
      <div className="project-card-body">
        {featured && <p className="project-card-eyebrow">Featured project</p>}
        <h3>
          <Link href={href}>{title}</Link>
        </h3>
        <p className="project-card-genre">
          {categoryLabels[category]} · {genre}
        </p>
        {featured && <p className="project-card-summary">{description[0]}</p>}
        <div className="project-card-actions">
          <Link href={href} className="card-button">
            Details
          </Link>
          {links.play && (
            <a
              href={links.play}
              className="card-button card-button-primary"
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`Play ${title} on ${playStore(links.play)}`}
            >
              ▶ Play
            </a>
          )}
        </div>
      </div>
    </article>
  );
}
