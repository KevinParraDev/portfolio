import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import CoverPlaceholder from "@/components/CoverPlaceholder";
import ProjectMedia from "@/components/ProjectMedia";
import VideoEmbed from "@/components/VideoEmbed";
import { categoryLabels, getProject, playStore, projects, statusLabel } from "@/data/projects";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return projects.map(({ slug }) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const project = getProject((await params).slug);
  if (!project) return {};
  return {
    title: project.title,
    description: project.description[0],
    openGraph: project.cover ? { images: [project.cover.src] } : undefined,
  };
}

export default async function ProjectPage({ params }: Props) {
  const project = getProject((await params).slug);
  if (!project) notFound();

  const { title, genre, category, video, media, links, description, roles } = project;
  const { studio, players, platforms, tools, context, duration, credits } = project;

  const index = projects.indexOf(project);
  const prev = projects[(index - 1 + projects.length) % projects.length];
  const next = projects[(index + 1) % projects.length];

  const facts: { label: string; value: React.ReactNode }[] = [
    { label: "Status", value: statusLabel(project) },
    { label: "Type", value: `${categoryLabels[category]} · ${genre}` },
    {
      label: "Studio",
      value: studio?.url ? (
        <a href={studio.url} target="_blank" rel="noopener noreferrer" className="fact-link">
          {studio.name}
        </a>
      ) : (
        studio?.name
      ),
    },
    { label: "Made for", value: context },
    { label: "Players", value: players },
    { label: "Dev time", value: duration },
    { label: "Platforms", value: platforms?.join(", ") },
    { label: "Tools", value: tools?.join(", ") },
    { label: "Credits", value: credits?.join(", ") },
  ].filter((fact) => Boolean(fact.value));

  return (
    <div className="game">
      <Link href="/#projects" className="back-link">
        ← All projects
      </Link>
      <h1>{title}</h1>
      <h2>{genre}</h2>
      <div className="game-box">
        {video ? (
          <div>
            <div className="video">
              <VideoEmbed video={video} title={title} />
            </div>
          </div>
        ) : media.length > 0 ? (
          <ProjectMedia media={media} title={title} />
        ) : (
          <div>
            <CoverPlaceholder title={title} />
          </div>
        )}
        <div>
          {(links.play || links.github) && (
            <div className="project-buttons">
              {links.play && (
                <a className="play-button play-button-primary" href={links.play} target="_blank" rel="noopener noreferrer">
                  ▶ PLAY
                  <span className="play-button-store">on {playStore(links.play)}</span>
                </a>
              )}
              {links.alsoOn?.map((url) => (
                <a key={url} className="play-button" href={url} target="_blank" rel="noopener noreferrer">
                  {playStore(url)}
                </a>
              ))}
              {links.github && (
                <a className="play-button" href={links.github} target="_blank" rel="noopener noreferrer">
                  GitHub
                </a>
              )}
            </div>
          )}

          <dl className="project-facts">
            {facts.map(({ label, value }) => (
              <div key={label}>
                <dt>{label}</dt>
                <dd>{value}</dd>
              </div>
            ))}
          </dl>

          <h2>Description</h2>
          {description.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
          <h2>My role</h2>
          <ul className="bullet-list">
            {roles.map((role) => (
              <li key={role}>{role}</li>
            ))}
          </ul>
        </div>
      </div>

      <nav className="project-pager" aria-label="More projects">
        <Link href={`/projects/${prev.slug}`}>← {prev.title}</Link>
        <Link href={`/projects/${next.slug}`}>{next.title} →</Link>
      </nav>
    </div>
  );
}
