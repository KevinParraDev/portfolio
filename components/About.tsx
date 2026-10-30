import Image from "next/image";
import profileBack from "@/public/img/Perfil_D.png";
import profileFront from "@/public/img/Perfil_R.jpg";
import { projects } from "@/data/projects";
import { RESUME_URL } from "@/data/site";
import { fmt, type Dictionary } from "@/i18n/dictionaries";

const games = projects.filter((p) => p.category === "game").length;
const animations = projects.filter((p) => p.category === "animation").length;

export default function About({ t }: { t: Dictionary["about"] }) {
  const sheet = [
    { label: t.stats.class, value: t.stats.classValue },
    { label: t.stats.guilds, value: "Indie Level Studio · Monte Estudio" },
    { label: t.stats.education, value: t.stats.educationValue },
    { label: t.stats.quests, value: fmt(t.stats.questsValue, { games, animations }) },
  ];

  return (
    <section id="about">
      <h1 className="subtitulo" data-reveal>
        {t.title}
      </h1>
      <div className="about-container" data-reveal>
        <div className="about-portrait">
          <div className="image-profile-container" title={t.flip}>
            <div className="profile-card">
              <Image src={profileFront} alt="Kevin Parra" className="face profile-image" />
              <Image src={profileBack} alt="" className="face profile-image-back" />
            </div>
          </div>
          <dl className="character-sheet" aria-label={t.sheet}>
            <p className="character-sheet-title">{t.sheet}</p>
            {sheet.map(({ label, value }) => (
              <div key={label}>
                <dt>{label}</dt>
                <dd>{value}</dd>
              </div>
            ))}
          </dl>
        </div>
        <div className="about-text">
          {t.paragraphs.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
          <a href={RESUME_URL} className="about-resume" target="_blank" rel="noopener noreferrer">
            ▶ {t.resume}
          </a>
        </div>
      </div>
    </section>
  );
}
