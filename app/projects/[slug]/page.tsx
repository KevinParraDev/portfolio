import type { Metadata } from "next";
import { notFound } from "next/navigation";
import ProjectMedia from "@/components/ProjectMedia";
import VideoEmbed from "@/components/VideoEmbed";
import { getProject, projects } from "@/data/projects";

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
    openGraph: { images: [project.cover.src] },
  };
}

export default async function ProjectPage({ params }: Props) {
  const project = getProject((await params).slug);
  if (!project) notFound();

  const { title, genre, year, video, media, links, description, roles, tools } = project;

  return (
    <div className="game">
      <h1>
        {title}
        {year === "in progress" && " (in progress)"}
      </h1>
      <h2>{genre}</h2>
      <div className="game-box">
        {video ? (
          <div>
            <div className="video">
              <VideoEmbed video={video} title={title} />
            </div>
          </div>
        ) : (
          <ProjectMedia media={media} title={title} />
        )}
        <div>
          {(links.play || links.github) && (
            <div className="project-buttons">
              {links.play && (
                <a className="play-button" href={links.play} target="_blank" rel="noopener noreferrer">
                  PLAY
                </a>
              )}
              {links.github && (
                <a className="play-button" href={links.github} target="_blank" rel="noopener noreferrer">
                  GitHub
                </a>
              )}
            </div>
          )}

          <h2>Description</h2>
          {description.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
          <h2>Roles</h2>
          <ul className="bullet-list">
            {roles.map((role) => (
              <li key={role}>{role}</li>
            ))}
          </ul>
          {tools && (
            <>
              <h2>Tools and languages</h2>
              <ul className="bullet-list">
                {tools.map((tool) => (
                  <li key={tool}>{tool}</li>
                ))}
              </ul>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
