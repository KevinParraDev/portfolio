"use client";

import { useRef, type ReactNode } from "react";
import { SECRET_TAP_EVENT } from "./effects/KonamiCode";

const TAPS = 5;
const WINDOW_MS = 2000;

// Tocar 5 veces seguidas activa el mismo secreto que el código Konami (para celulares, sin teclado).
export default function SecretTap({ children }: { children: ReactNode }) {
  const taps = useRef<number[]>([]);

  const onClick = () => {
    const now = Date.now();
    taps.current = [...taps.current.filter((t) => now - t < WINDOW_MS), now];
    if (taps.current.length >= TAPS) {
      taps.current = [];
      window.dispatchEvent(new Event(SECRET_TAP_EVENT));
    }
  };

  return <span onClick={onClick}>{children}</span>;
}
