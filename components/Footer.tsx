import Link from "next/link";
import { EMAIL, RESUME_URL, socials } from "@/data/site";
import type { Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/dictionaries";

type Props = { lang: Locale; t: Dictionary["footer"]; nav: Dictionary["nav"] };

export default function Footer({ lang, t, nav }: Props) {
  const links = [
    { href: `/${lang}#projects`, label: nav.projects },
    { href: `/${lang}#arcade`, label: nav.arcade },
    { href: `/${lang}#tv`, label: nav.tv },
    { href: `/${lang}#skills`, label: nav.skills },
    { href: `/${lang}#about`, label: nav.about },
    { href: `/${lang}/gallery`, label: nav.gallery },
  ];

  return (
    <footer id="footer">
      <div className="footer-grid">
        <div className="footer-brand">
          <Link href={`/${lang}`} className="nav-logo" aria-label={nav.homeLabel}>
            KP
          </Link>
          <p>{t.tagline}</p>
        </div>

        <nav className="footer-col" aria-label={t.navigate}>
          <p className="footer-heading">{t.navigate}</p>
          {links.map(({ href, label }) => (
            <Link key={href} href={href}>
              {label}
            </Link>
          ))}
        </nav>

        <div className="footer-col">
          <p className="footer-heading">{t.contact}</p>
          <a href={`mailto:${EMAIL}`}>{EMAIL}</a>
          <a href={RESUME_URL} target="_blank" rel="noopener noreferrer">
            {nav.resume}
          </a>
          <div className="footer-socials">
            {socials.map(({ href, label }) => (
              <a key={label} href={href} target="_blank" rel="noopener noreferrer">
                {label}
              </a>
            ))}
          </div>
        </div>
      </div>

      <div className="footer-bottom">
        <span>
          © {new Date().getFullYear()} Kevin Parra. {t.rights}
        </span>
        <a href="#" className="back-to-top">
          {t.backToTop}
        </a>
      </div>

      {/* Zeri cruza el footer corriendo de vez en cuando (solo decoración). */}
      {/* eslint-disable-next-line @next/next/no-img-element -- GIF animado, no necesita optimización */}
      <img src="/img/galery/za2.gif" alt="" aria-hidden className="footer-walker" width={120} height={120} />
    </footer>
  );
}
