"use client";

import { useEffect, useState } from "react";
import { prefersReducedMotion } from "./effects/motion";

// Escribe el texto letra por letra. El texto completo siempre está en la página (oculto),
// así que no se mueve el diseño y Google y los lectores de pantalla lo leen entero.
export default function Typewriter({ text, delay = 300, speed = 85 }: { text: string; delay?: number; speed?: number }) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    // Con "reducir movimiento" no se anima: el CSS muestra el texto completo de una vez.
    if (prefersReducedMotion()) return;
    let i = 0;
    let interval: ReturnType<typeof setInterval>;
    const start = setTimeout(() => {
      interval = setInterval(() => {
        i += 1;
        setCount(i);
        if (i >= text.length) clearInterval(interval);
      }, speed);
    }, delay);
    return () => {
      clearTimeout(start);
      clearInterval(interval);
    };
  }, [text, delay, speed]);

  return (
    <span>
      <span className="sr-only">{text}</span>
      <span aria-hidden>{text.slice(0, count)}</span>
      <span aria-hidden className="typewriter-cursor" />
      <span aria-hidden className="typewriter-rest">
        {text.slice(count)}
      </span>
    </span>
  );
}
