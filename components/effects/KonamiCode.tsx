"use client";

import { useEffect, useState } from "react";
import { prefersReducedMotion } from "./motion";
import type { Dictionary } from "@/i18n/dictionaries";

const SEQUENCE = ["ArrowUp", "ArrowUp", "ArrowDown", "ArrowDown", "ArrowLeft", "ArrowRight", "ArrowLeft", "ArrowRight", "b", "a"];

const SPRITES = [
  "/img/galery/za1.gif",
  "/img/galery/za2.gif",
  "/img/galery/za3.gif",
  "/img/galery/kio (1).gif",
  "/img/galery/kio (2).gif",
  "/img/galery/kio (3).gif",
  "/img/galery/ht1.gif",
  "/img/galery/ht2.gif",
  "/img/galery/ht3.gif",
  "/img/galery/zae1.gif",
];

/** En celular no hay teclado: tocar 5 veces el título del banner también activa el secreto. */
export const SECRET_TAP_EVENT = "portfolio:secret";

// ↑↑↓↓←→←→ B A: lluvia de personajes y un logro desbloqueado.
export default function KonamiCode({ t }: { t: Dictionary["achievement"] }) {
  const [unlocked, setUnlocked] = useState(false);

  useEffect(() => {
    let position = 0;

    const trigger = () => {
      setUnlocked(true);
      if (!prefersReducedMotion()) rainSprites();
      setTimeout(() => setUnlocked(false), 5000);
    };

    const onKey = (e: KeyboardEvent) => {
      const key = e.key.length === 1 ? e.key.toLowerCase() : e.key;
      position = key === SEQUENCE[position] ? position + 1 : key === SEQUENCE[0] ? 1 : 0;
      if (position === SEQUENCE.length) {
        position = 0;
        trigger();
      }
    };

    window.addEventListener("keydown", onKey);
    window.addEventListener(SECRET_TAP_EVENT, trigger);
    return () => {
      window.removeEventListener("keydown", onKey);
      window.removeEventListener(SECRET_TAP_EVENT, trigger);
    };
  }, []);

  return (
    <div className={unlocked ? "achievement show" : "achievement"} role="status" aria-live="polite">
      {unlocked && (
        <>
          <span className="achievement-icon" aria-hidden>
            🏆
          </span>
          <span>
            <strong>{t.title}</strong>
            <br />
            {t.text}
          </span>
        </>
      )}
    </div>
  );
}

function rainSprites() {
  const width = window.innerWidth;
  for (let i = 0; i < 28; i++) {
    const img = document.createElement("img");
    img.src = SPRITES[i % SPRITES.length];
    img.alt = "";
    img.className = "sprite-rain";
    const size = 70 + Math.random() * 60;
    img.style.width = `${size}px`;
    img.style.left = `${Math.random() * (width - size)}px`;
    document.body.appendChild(img);
    img
      .animate(
        [
          { transform: `translateY(-${size}px) rotate(0deg)` },
          { transform: `translateY(${window.innerHeight + size}px) rotate(${Math.random() * 60 - 30}deg)` },
        ],
        { duration: 2200 + Math.random() * 1800, delay: Math.random() * 1500, easing: "ease-in", fill: "backwards" }
      )
      .finished.finally(() => img.remove());
  }
}
