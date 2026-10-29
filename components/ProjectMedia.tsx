"use client";

import Image from "next/image";
import { useState } from "react";
import VideoEmbed from "./VideoEmbed";
import type { Media } from "@/data/projects";

export default function ProjectMedia({ media, title }: { media: Media[]; title: string }) {
  const [active, setActive] = useState(0);
  const current = media[active];

  return (
    <div>
      {current.type === "video" ? (
        <div className="video">
          <VideoEmbed video={current.video} title={`${title} trailer`} />
        </div>
      ) : (
        <Image
          src={current.src}
          alt={`${title} screenshot ${active}`}
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
              aria-label={item.type === "video" ? "Show trailer" : `Show screenshot ${i}`}
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
