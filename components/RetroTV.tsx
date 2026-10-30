"use client";

import Image, { type StaticImageData } from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import VideoEmbed from "./VideoEmbed";
import { projects, statusLabel, type Video } from "@/data/projects";
import { tr, type Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/dictionaries";
import { prefersReducedMotion } from "./effects/motion";

type Tape = { id: string; title: string; subtitle: string; text: string; video: Video; cover?: StaticImageData; href?: string };

const STATIC_MS = 450;

type Props = { lang: Locale; t: Dictionary["tv"] };

// Televisor en líneas de neón con una casetera debajo y una repisa de casetes:
// cada casete muestra la portada y datos del video, y al elegirlo "entra" en la casetera y se ve en la tele.
export default function RetroTV({ lang, t }: Props) {
  // Casete 1: reel de videojuegos. Los demás: cada animación que tenga video.
  const tapes: Tape[] = [
    {
      id: "reel",
      title: t.gameDevReel,
      subtitle: "Showreel",
      text: t.gameDevReelText,
      video: { provider: "vimeo", id: "999400663" },
    },
    ...projects
      .filter((p) => p.section === "tv" && p.video)
      .map((p) => ({
        id: p.slug,
        title: p.title,
        subtitle: `${tr(p.genre, lang)} · ${statusLabel(p, lang)}`,
        text: p.description[lang][0],
        video: p.video!,
        cover: p.cover,
        href: `/${lang}/projects/${p.slug}`,
      })),
  ];

  const [current, setCurrent] = useState(0);
  const [switching, setSwitching] = useState(false);
  const [inserting, setInserting] = useState<number | null>(null);
  const noiseRef = useRef<HTMLCanvasElement>(null);
  const timers = useRef<ReturnType<typeof setTimeout>[]>([]);
  const tape = tapes[current];

  const play = (i: number) => {
    if (i === current) return;
    timers.current.forEach(clearTimeout);
    timers.current.length = 0;
    if (prefersReducedMotion()) {
      setCurrent(i);
      return;
    }
    // El casete se mete en la casetera, sale estática y luego el video nuevo.
    setInserting(i);
    setSwitching(true);
    timers.current.push(setTimeout(() => setCurrent(i), 150));
    timers.current.push(setTimeout(() => setSwitching(false), STATIC_MS));
    timers.current.push(setTimeout(() => setInserting(null), 600));
  };

  useEffect(() => {
    const pending = timers.current;
    return () => pending.forEach(clearTimeout);
  }, []);

  // Estática: pixeles grises al azar mientras cambia de casete.
  useEffect(() => {
    if (!switching) return;
    const canvas = noiseRef.current!;
    const ctx = canvas.getContext("2d")!;
    const { width, height } = canvas;
    const img = ctx.createImageData(width, height);
    let frame = 0;
    const draw = () => {
      for (let i = 0; i < img.data.length; i += 4) {
        const v = Math.random() * 255;
        img.data[i] = img.data[i + 1] = img.data[i + 2] = v;
        img.data[i + 3] = 255;
      }
      ctx.putImageData(img, 0, 0);
      frame = requestAnimationFrame(draw);
    };
    draw();
    return () => cancelAnimationFrame(frame);
  }, [switching]);

  const number = String(current + 1).padStart(2, "0");

  return (
    <section id="tv" className="tv-section">
      <h1 className="subtitulo" data-reveal>
        {t.title}
      </h1>
      <p className="section-intro" data-reveal>
        {t.intro}
      </p>

      <div className="tv-layout" data-reveal>
        <div className="tv-stack">
          <div className="tv">
            <div className="tv-antenna" aria-hidden>
              <span />
              <span />
            </div>
            <div className="crt tv-screen">
              <div className="tv-video">
                <VideoEmbed key={tape.id} video={tape.video} title={tape.title} />
              </div>
              <canvas
                ref={noiseRef}
                width={160}
                height={90}
                className={switching ? "tv-static on" : "tv-static"}
                aria-hidden
              />
              <span className="tv-osd" key={`osd-${tape.id}`} aria-hidden>
                {t.channel} {number}
              </span>
            </div>
            <div className="tv-brand" aria-hidden>
              <span>KP·TV</span>
              <span className="tv-led" />
            </div>
          </div>

          {/* Casetera: ranura, pantallita con lo que suena y botones para pasar de casete */}
          <div className={inserting !== null ? "vcr loading" : "vcr"}>
            <span className="vcr-slot" aria-hidden />
            <p className="vcr-display" aria-live="polite">
              ▶ {t.nowPlaying}: {tape.title}
            </p>
            <div className="vcr-buttons">
              <button type="button" onClick={() => play((current - 1 + tapes.length) % tapes.length)} aria-label={t.prev}>
                ◀◀
              </button>
              <button type="button" onClick={() => play((current + 1) % tapes.length)} aria-label={t.next}>
                ▶▶
              </button>
            </div>
          </div>

          <div className="tv-info">
            <p className="tv-info-channel">
              {t.channel} {number}
            </p>
            <h2>{tape.title}</h2>
            <p>{tape.text}</p>
            {tape.href && (
              <Link href={tape.href} className="tv-info-link">
                {t.details}
              </Link>
            )}
          </div>
        </div>

        <div className="tape-shelf">
          <p className="tape-shelf-title">{t.shelf}</p>
          <ul>
            {tapes.map((item, i) => (
              <li key={item.id}>
                <button
                  type="button"
                  className={[
                    "tape",
                    i === current ? "active" : "",
                    i === inserting ? "inserting" : "",
                  ].join(" ")}
                  onClick={() => play(i)}
                  aria-pressed={i === current}
                  aria-label={`${t.insert}: ${item.title}`}
                >
                  <span className="tape-label">
                    {item.cover ? (
                      <Image src={item.cover} alt="" sizes="220px" className="tape-cover" />
                    ) : (
                      // El reel no tiene portada: etiqueta pixel con Zeri corriendo
                      <span className="tape-cover tape-cover-reel">
                        {/* eslint-disable-next-line @next/next/no-img-element -- GIF animado decorativo */}
                        <img src="/img/galery/za2.gif" alt="" width={64} height={64} />
                        <span>{t.reelLabel}</span>
                      </span>
                    )}
                    <span className="tape-text">
                      <span className="tape-title">{item.title}</span>
                      <span className="tape-subtitle">{item.subtitle}</span>
                    </span>
                  </span>
                  <span className="tape-window" aria-hidden>
                    <span className="tape-reel" />
                    <span className="tape-reel" />
                  </span>
                  {i === current && <span className="tape-playing">▶ {t.nowPlaying}</span>}
                </button>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
