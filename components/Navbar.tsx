"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { RESUME_URL, socials } from "@/data/site";
import { LOCALE_COOKIE, locales, switchLocalePath, type Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/dictionaries";

const SECTIONS = ["home", "projects", "arcade", "tv", "skills", "about"] as const;
type Section = (typeof SECTIONS)[number];

type Props = { lang: Locale; t: Dictionary["nav"] };

// Guarda el idioma elegido por un año, para que el proxy lo respete en la próxima visita.
function rememberLocale(lang: Locale) {
  document.cookie = `${LOCALE_COOKIE}=${lang}; path=/; max-age=31536000; samesite=lax`;
}

export default function Navbar({ lang, t }: Props) {
  const pathname = usePathname();
  const isHome = pathname === `/${lang}`;
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState<Section | null>(null);
  const [progress, setProgress] = useState(0);
  const firstMenuItem = useRef<HTMLAnchorElement>(null);

  // Fondo de la navbar al bajar + barra de XP con el avance del scroll.
  useEffect(() => {
    let frame = 0;
    const onScroll = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        setScrolled(window.scrollY > 50);
        const max = document.documentElement.scrollHeight - window.innerHeight;
        setProgress(max > 0 ? Math.min(window.scrollY / max, 1) : 0);
      });
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [pathname]);

  // Marca sola la sección que está en el centro de la pantalla (solo en el inicio).
  useEffect(() => {
    if (!isHome) return;
    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) if (entry.isIntersecting) setActive(entry.target.id as Section);
      },
      { rootMargin: "-45% 0px -50% 0px" }
    );
    SECTIONS.forEach((id) => {
      const el = document.getElementById(id);
      if (el) io.observe(el);
    });
    return () => io.disconnect();
  }, [isHome]);

  // Menú de pausa: bloquea el scroll de atrás, se cierra con Esc y enfoca la primera opción.
  useEffect(() => {
    if (!menuOpen) return;
    document.body.style.overflow = "hidden";
    firstMenuItem.current?.focus();
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setMenuOpen(false);
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [menuOpen]);

  const closeMenu = () => setMenuOpen(false);

  const sectionLinks = (inMenu: boolean) =>
    SECTIONS.map((id, i) => (
      <Link
        key={id}
        ref={inMenu && i === 0 ? firstMenuItem : undefined}
        href={`/${lang}#${id}`}
        className={isHome && active === id ? "nav-link active" : "nav-link"}
        aria-current={isHome && active === id ? "true" : undefined}
        onClick={closeMenu}
      >
        {t[id]}
      </Link>
    ));

  const languageSwitch = (
    <div className="lang-switch" role="group" aria-label={t.language}>
      {locales.map((l) => (
        <Link
          key={l}
          href={switchLocalePath(pathname, l)}
          className={l === lang ? "active" : ""}
          aria-current={l === lang ? "true" : undefined}
          hrefLang={l}
          onClick={() => {
            rememberLocale(l);
            closeMenu();
          }}
        >
          {l.toUpperCase()}
        </Link>
      ))}
    </div>
  );

  return (
    <>
      <header className={scrolled ? "navbar scrolled" : "navbar"}>
        <Link href={`/${lang}`} className="nav-logo" aria-label={t.homeLabel}>
          KP
        </Link>
        <nav className="nav-links" aria-label="Main">
          {sectionLinks(false)}
        </nav>
        <div className="nav-buttons">
          {socials.map(({ href, icon, label }) => (
            <a key={label} href={href} className="nav-icon" target="_blank" rel="noopener noreferrer">
              <Image src={icon} alt={label} className="nav-image" />
            </a>
          ))}
        </div>
        <div className="right-buttons">
          <a href={RESUME_URL} className="contactame" target="_blank" rel="noopener noreferrer">
            {t.resume.toUpperCase()}
          </a>
          <Link href={`/${lang}/gallery`} className="contactame">
            {t.gallery.toUpperCase()}
          </Link>
          {languageSwitch}
        </div>
        <button type="button" className="menu" onClick={() => setMenuOpen(true)} aria-expanded={menuOpen}>
          ❚❚ {t.menu}
        </button>

        {/* Barra de XP: se llena con el scroll */}
        <div className="xp-bar" aria-hidden>
          <div className="xp-fill" style={{ transform: `scaleX(${progress})` }} />
          <span className={progress > 0.995 ? "level-up show" : "level-up"}>{t.levelUp}</span>
        </div>
      </header>

      {/* Menú del celular, como la pantalla de pausa de un juego */}
      <div className={menuOpen ? "pause-menu open" : "pause-menu"} role="dialog" aria-modal="true" aria-label={t.paused} hidden={!menuOpen}>
        <p className="pause-title">{t.paused}</p>
        <nav className="pause-options">
          {sectionLinks(true)}
          <Link href={`/${lang}/gallery`} className="nav-link" onClick={closeMenu}>
            {t.gallery}
          </Link>
          <a href={RESUME_URL} className="nav-link" target="_blank" rel="noopener noreferrer">
            {t.resume}
          </a>
        </nav>
        {languageSwitch}
        <div className="pause-socials">
          {socials.map(({ href, icon, label }) => (
            <a key={label} href={href} target="_blank" rel="noopener noreferrer">
              <Image src={icon} alt={label} className="nav-image" />
            </a>
          ))}
        </div>
        <button type="button" className="pause-resume" onClick={closeMenu}>
          ▶ {t.resumeGame}
        </button>
      </div>
    </>
  );
}
