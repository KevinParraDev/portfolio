"use client";

import { usePathname } from "next/navigation";
import { useLayoutEffect, useRef } from "react";
import { prefersReducedMotion } from "./motion";

const TILE = 28; // tamaño de cada "pixel" de la transición
const DURATION = 520;

// Al cambiar de página, la pantalla arranca cubierta y se va destapando en cuadros al azar,
// como un cambio de escena en un juego.
export default function PageTransition() {
  const pathname = usePathname();
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const firstRender = useRef(true);

  // useLayoutEffect: la pantalla se cubre antes de que el navegador pinte la página nueva.
  useLayoutEffect(() => {
    // En la primera carga no hay transición: solo al navegar entre páginas.
    if (firstRender.current) {
      firstRender.current = false;
      return;
    }
    if (prefersReducedMotion()) return;

    const canvas = canvasRef.current!;
    const ctx = canvas.getContext("2d")!;
    const width = window.innerWidth;
    const height = window.innerHeight;
    canvas.width = width;
    canvas.height = height;
    canvas.style.display = "block";

    const cols = Math.ceil(width / TILE);
    const rows = Math.ceil(height / TILE);
    // A cada cuadro se le asigna un momento al azar para desaparecer.
    const tiles = Array.from({ length: cols * rows }, (_, i) => ({ i, t: Math.random() }));

    ctx.fillStyle = "#150408";
    ctx.fillRect(0, 0, width, height);

    let frame = 0;
    const start = performance.now();
    const step = (now: number) => {
      const progress = (now - start) / DURATION;
      for (const tile of tiles) {
        if (tile.t <= progress) {
          ctx.clearRect((tile.i % cols) * TILE, Math.floor(tile.i / cols) * TILE, TILE, TILE);
          tile.t = Infinity;
        }
      }
      if (progress < 1) {
        frame = requestAnimationFrame(step);
      } else {
        canvas.style.display = "none";
      }
    };
    frame = requestAnimationFrame(step);
    return () => {
      cancelAnimationFrame(frame);
      canvas.style.display = "none";
    };
  }, [pathname]);

  return <canvas ref={canvasRef} className="page-transition" aria-hidden />;
}
