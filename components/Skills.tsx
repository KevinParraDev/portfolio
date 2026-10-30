import Image from "next/image";
import { abilities, projectsUsing, tools } from "@/data/skills";
import { tr, type Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/dictionaries";

// Las herramientas como casillas de un inventario de RPG; al pasar el mouse (o enfocar con teclado) sale el detalle.
export default function Skills({ lang, t }: { lang: Locale; t: Dictionary["skills"] }) {
  return (
    <section id="skills" className="skills-section">
      <h1 className="subtitulo" data-reveal>
        {t.title}
      </h1>

      <div className="inventory" data-reveal>
        <p className="inventory-label">{t.inventory}</p>
        <ul className="inventory-grid">
          {tools.map((tool, i) => {
            const usedIn = projectsUsing(tool);
            return (
              <li
                key={tool.name}
                className="inventory-slot"
                tabIndex={0}
                aria-label={tool.name}
                style={{ "--float-delay": `${i * -0.35}s` } as React.CSSProperties}
              >
                <Image src={tool.icon} alt="" className="inventory-icon" unoptimized />
                <span className="inventory-name">{tool.name}</span>
                <span className="inventory-tooltip" role="tooltip">
                  <strong>{tool.name}</strong>
                  <span className="inventory-tooltip-type">{t.categories[tool.category]}</span>
                  {usedIn.length > 0 && (
                    <span>
                      {t.usedIn}: {usedIn.join(", ")}
                    </span>
                  )}
                </span>
              </li>
            );
          })}
        </ul>
      </div>

      <div className="abilities" data-reveal>
        <p className="inventory-label">{t.abilities}</p>
        <ul className="ability-list">
          {abilities.map((ability) => (
            <li key={tr(ability, "en")} className="ability-badge">
              ✦ {tr(ability, lang)}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
