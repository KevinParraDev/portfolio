"use client";

import { useEffect } from "react";
import { prefersReducedMotion } from "./motion";

const COLORS = ["#efc0b9", "#f09a97", "#f7d58b", "#ffffff"];
const COUNT = 10;

// Cada clic suelta una pequeña explosión de cuadritos pixelados.
export default function ClickSparks() {
  useEffect(() => {
    if (prefersReducedMotion()) return;

    const onPointerDown = (e: PointerEvent) => {
      for (let i = 0; i < COUNT; i++) {
        const spark = document.createElement("span");
        spark.className = "spark";
        spark.style.left = `${e.clientX}px`;
        spark.style.top = `${e.clientY}px`;
        spark.style.background = COLORS[i % COLORS.length];
        document.body.appendChild(spark);

        const angle = (Math.PI * 2 * i) / COUNT + Math.random() * 0.4;
        const distance = 24 + Math.random() * 28;
        const dx = Math.cos(angle) * distance;
        const dy = Math.sin(angle) * distance;
        spark
          .animate(
            [
              { transform: "translate(-50%, -50%) scale(1)", opacity: 1 },
              // Los pasos cortos (steps) hacen que se mueva "a saltos", como pixel art.
              { transform: `translate(calc(-50% + ${dx}px), calc(-50% + ${dy + 12}px)) scale(0.4)`, opacity: 0 },
            ],
            { duration: 450 + Math.random() * 200, easing: "steps(6, end)" }
          )
          .finished.finally(() => spark.remove());
      }
    };

    window.addEventListener("pointerdown", onPointerDown);
    return () => window.removeEventListener("pointerdown", onPointerDown);
  }, []);

  return null;
}
