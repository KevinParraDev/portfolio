import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import CoverPlaceholder from "@/components/CoverPlaceholder";
import ProjectMedia from "@/components/ProjectMedia";
import VideoEmbed from "@/components/VideoEmbed";
import { categoryLabels, getProject, playStore, projects, statusLabel } from "@/data/projects";
import { locales, tr, type Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";

type Props = PageProps<"/[lang]/projects/[slug]">;

export function generateStaticParams() {
  return locales.flatMap((lang) => projects.map(({ slug }) => ({ lang, slug })));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { lang, slug } = await params;
  const project = getProject(slug);
  if (!project) return {};
  return {
    title: project.title,
    description: project.description[lang as Locale][0],
    alternates: { languages: { en: `/en/projects/${slug}`, es: `/es/projects/${slug}` } },
    openGraph: project.cover ? { images: [project.cover.src] } : undefined,
  };
}

export default async function ProjectPage({ params }: Props) {
  const { lang: rawLang, slug } = await params;
  const lang = rawLang as Locale;
  const project = getProject(slug);
  if (!project) notFound();
  const dict = getDictionary(lang);
  const t = dict.project;

  const { title, genre, category, video, media, links, description, roles } = project;
  const { studio, players, platforms, tools, context, duration, credits } = project;

  const index = projects.indexOf(project);
  const prev = projects[(index - 1 + projects.length) % projects.length];
  const next = projects[(index + 1) % projects.length];

  const facts: { label: string; value: React.ReactNode }[] = [
    { label: t.facts.status, value: statusLabel(project, lang) },
    { label: t.facts.type, value: `${categoryLabels[category][lang]} · ${tr(genre, lang)}` },
    {
      label: t.facts.studio,
      value: studio?.url ? (
        <a href={studio.url} target="_blank" rel="noopener noreferrer" className="fact-link">
          {studio.name}
        </a>
      ) : (
        studio?.name
      ),
    },
    { label: t.facts.madeFor, value: context && tr(context, lang) },
    { label: t.facts.players, value: players && tr(players, lang) },
    { label: t.facts.devTime, value: duration && tr(duration, lang) },
    { label: t.facts.platforms, value: platforms?.map((p) => tr(p, lang)).join(", ") },
    { label: t.facts.tools, value: tools?.join(", ") },
    { label: t.facts.credits, value: credits?.map((c) => tr(c, lang)).join(", ") },
  ].filter((fact) => Boolean(fact.value));

  return (
    <div className="game">
      <Link href={`/${lang}#projects`} className="back-link">
        {t.back}
      </Link>
      <h1>{title}</h1>
      <h2>{tr(genre, lang)}</h2>
      <div className="game-box">
        {video ? (
          <div>
            <div className="video">
              <VideoEmbed video={video} title={title} />
            </div>
          </div>
        ) : media.length > 0 ? (
          <ProjectMedia media={media} title={title} t={t} />
        ) : (
          <div>
            <CoverPlaceholder title={title} note={dict.projects.comingSoon} />
          </div>
        )}
        <div>
          {(links.play || links.github) && (
            <div className="project-buttons">
              {links.play && (
                <a className="play-button play-button-primary" href={links.play} target="_blank" rel="noopener noreferrer">
                  {t.play}
                  <span className="play-button-store">
                    {t.on} {playStore(links.play)}
                  </span>
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

          <dl className="project-facts" data-reveal>
            {facts.map(({ label, value }) => (
              <div key={label}>
                <dt>{label}</dt>
                <dd>{value}</dd>
              </div>
            ))}
          </dl>

          <h2>{t.description}</h2>
          {description[lang].map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
          <h2>{t.role}</h2>
          <ul className="bullet-list">
            {roles.map((r) => (
              <li key={tr(r, "en")}>{tr(r, lang)}</li>
            ))}
          </ul>
        </div>
      </div>

      <nav className="project-pager" aria-label={t.more} data-reveal>
        <Link href={`/${lang}/projects/${prev.slug}`}>← {prev.title}</Link>
        <Link href={`/${lang}/projects/${next.slug}`}>{next.title} →</Link>
      </nav>
    </div>
  );
}
