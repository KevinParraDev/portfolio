import Link from "next/link";
import Image from "next/image";
import { projects } from "@/data/projects";

export default function Projects() {
  return (
    <div>
      <h1 className="subtitulo" id="projects">
        Projects
      </h1>
      <div className="proyectos">
        {projects.map(({ slug, title, year, cover }) => (
          <Link key={slug} href={`/projects/${slug}`} className="proyectos-cards">
            <Image src={cover} alt={title} className="image-project" sizes="(max-width: 800px) 100vw, 33vw" />
            <p>{title}</p>
            <p className="project-target-year">{year}</p>
          </Link>
        ))}
      </div>
      <br />
      <br />
    </div>
  );
}
