"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState, type KeyboardEvent } from "react";
import GameFrame from "./GameFrame";
import { projects, statusLabel } from "@/data/projects";
import { tr, type Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/dictionaries";

const games = projects.filter((p) => p.section === "arcade");

type Props = { lang: Locale; t: Dictionary["arcade"]; comingSoon: string };

// Máquina arcade retro en líneas de neón: se elige un juego del baúl y, si tiene versión web, se juega en la pantalla.
export default function Arcade({ lang, t, comingSoon }: Props) {
  const [index, setIndex] = useState(0);
  const [playing, setPlaying] = useState(false);
  const router = useRouter();
  const screenRef = useRef<HTMLDivElement>(null);
  const game = games[index];

  // Desde la página de un proyecto se llega con ?play=<slug>: se elige ese juego y arranca.
  useEffect(() => {
    const slug = new URLSearchParams(window.location.search).get("play");
    const i = games.findIndex((g) => g.slug === slug);
    if (i === -1) return;
    // Se aplaza un tick para no actualizar estado en medio del primer render.
    const id = setTimeout(() => {
      setIndex(i);
      setPlaying(Boolean(games[i].webBuild));
      screenRef.current?.scrollIntoView({ block: "center" });
    }, 0);
    return () => clearTimeout(id);
  }, []);

  const move = (step: number) => {
    if (playing) return;
    setIndex((i) => (i + step + games.length) % games.length);
  };

  const start = () => {
    if (game.webBuild) setPlaying(true);
  };

  const onKeyDown = (e: KeyboardEvent<HTMLDivElement>) => {
    // Mientras se juega, las teclas son del juego.
    if (playing) {
      if (e.key === "Escape" && !document.fullscreenElement) setPlaying(false);
      return;
    }
    if (e.key === "ArrowDown" || e.key === "ArrowRight") move(1);
    else if (e.key === "ArrowUp" || e.key === "ArrowLeft") move(-1);
    else if (e.key === "Enter" || e.key.toLowerCase() === "a") start();
    else if (e.key.toLowerCase() === "b") router.push(`/${lang}/projects/${game.slug}`);
    else return;
    e.preventDefault();
  };

  return (
    <section id="arcade" className="arcade-section">
      <h1 className="subtitulo" data-reveal>
        {t.title}
      </h1>
      <p className="section-intro" data-reveal>
        {t.intro}
      </p>

      <div className="cabinet" data-reveal>
        <div className="cabinet-marquee" aria-hidden>
          <span>{t.marquee}</span>
        </div>

        <div className="cabinet-bezel">
          <div
            className={playing ? "crt cabinet-screen playing" : "crt cabinet-screen"}
            ref={screenRef}
            tabIndex={0}
            onKeyDown={onKeyDown}
            role="application"
            aria-label={`${t.marquee}. ${t.help}`}
          >
            {playing && game.webBuild ? (
              <GameFrame
                key={game.slug}
                build={game.webBuild}
                title={game.title}
                labels={{ fullscreen: t.fullscreen, exit: t.exit, exitFullscreen: t.exitFullscreen }}
                hostUrl={game.links.play}
                onExit={() => setPlaying(false)}
              />
            ) : (
              <div className="arcade-select">
                <div className="arcade-list">
                  <p className="arcade-list-title">{t.select}</p>
                  <ul>
                    {games.map((g, i) => (
                      <li key={g.slug}>
                        <button
                          type="button"
                          className={i === index ? "active" : ""}
                          aria-pressed={i === index}
                          onClick={() => setIndex(i)}
                          onDoubleClick={() => g.webBuild && setPlaying(true)}
                        >
                          {g.title}
                          {g.webBuild && <span className="arcade-dot" aria-hidden />}
                        </button>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="arcade-preview" key={game.slug}>
                  <div className="arcade-cover">
                    {game.cover ? (
                      <Image src={game.cover} alt="" sizes="(max-width: 800px) 90vw, 40vw" />
                    ) : (
                      <span className="arcade-cover-empty">{comingSoon}</span>
                    )}
                  </div>
                  <p className="arcade-title">{game.title}</p>
                  <p className="arcade-meta">
                    {tr(game.genre, lang)} · {statusLabel(game, lang)}
                    {game.players && ` · ${t.players}: ${tr(game.players, lang)}`}
                  </p>
                  <p className={game.webBuild ? "arcade-tag playable" : "arcade-tag"}>
                    {game.webBuild ? `● ${t.playable}` : t.notPlayable}
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Tablero de control: joystick y botones dibujados en líneas de neón */}
        <div className="cabinet-panel">
          <div className="joystick" role="group" aria-label="Joystick">
            <button type="button" className="neon-key" onClick={() => move(-1)} aria-label="◀" disabled={playing}>
              ◀
            </button>
            <span className="joystick-stick" aria-hidden>
              <span />
            </span>
            <button type="button" className="neon-key" onClick={() => move(1)} aria-label="▶" disabled={playing}>
              ▶
            </button>
          </div>

          <div className="arcade-buttons">
            <div className="arcade-button-wrap">
              <button
                type="button"
                className="arcade-button a"
                onClick={start}
                disabled={!game.webBuild || playing}
                aria-label={`A: ${t.start}`}
              >
                A
              </button>
              <span>{t.start}</span>
            </div>
            <div className="arcade-button-wrap">
              <Link href={`/${lang}/projects/${game.slug}`} className="arcade-button b" aria-label={`B: ${t.info}`}>
                B
              </Link>
              <span>{t.info}</span>
            </div>
          </div>
        </div>

        <div className="cabinet-base" aria-hidden>
          <span className="coin-slot" />
          <span className="coin-text">{t.insertCoin}</span>
          <span className="coin-slot" />
        </div>
      </div>

      <p className="arcade-help">{t.help}</p>
      <p className="arcade-hint">{t.desktopHint}</p>
    </section>
  );
}
