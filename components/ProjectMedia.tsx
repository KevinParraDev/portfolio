"use client";

import Image from "next/image";
import { useState } from "react";
import VideoEmbed from "./VideoEmbed";
import type { Media } from "@/data/projects";
import { fmt, type Dictionary } from "@/i18n/dictionaries";

type Props = { media: Media[]; title: string; t: Dictionary["project"] };

export default function ProjectMedia({ media, title, t }: Props) {
  const [active, setActive] = useState(0);
  const current = media[active];

  return (
    <div>
      {current.type === "video" ? (
        <div className="video">
          <VideoEmbed video={current.video} title={`${title} ${t.trailer}`} />
        </div>
      ) : (
        <Image
          src={current.src}
          alt={fmt(t.screenshot, { title, n: active })}
          quality={100}
          className="image-project"
          sizes="(max-width: 800px) 100vw, 50vw"
          priority
        />
      )}
      {media.length > 1 && (
        <div className="carrusel-lista">
          {media.map((item, i) => (
            <button
              key={i}
              type="button"
              className="screenshot-button"
              onClick={() => setActive(i)}
              aria-label={item.type === "video" ? t.showTrailer : fmt(t.showScreenshot, { n: i })}
              aria-pressed={active === i}
            >
              <Image
                src={item.type === "video" ? item.thumbnail : item.src}
                alt=""
                className={active === i ? "screenshot-active" : "screenshot"}
                sizes="12vw"
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
