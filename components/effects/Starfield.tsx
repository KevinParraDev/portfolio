"use client";

import { useEffect, useRef } from "react";
import { prefersReducedMotion } from "./motion";

type Star = { x: number; y: number; size: number; layer: number; phase: number; speed: number; color: string };
type Meteor = { x: number; y: number; vx: number; vy: number; life: number };

const COLORS = ["#efc0b9", "#f09a97", "#ffffff", "#f7d58b"];
// Cada capa se mueve distinto con el scroll: las lejanas casi nada, las cercanas más.
const LAYER_PARALLAX = [0.05, 0.15, 0.3];

// Estrellas pixeladas que titilan sobre el fondo, con parallax y estrellas fugaces ocasionales.
export default function Starfield() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current!;
    const ctx = canvas.getContext("2d")!;
    const reduced = prefersReducedMotion();
    let stars: Star[] = [];
    let meteors: Meteor[] = [];
    let width = 0;
    let height = 0;
    let frame = 0;
    let nextMeteor = performance.now() + 3000;

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.imageSmoothingEnabled = false;
      const count = Math.round((width * height) / 9000);
      stars = Array.from({ length: count }, () => ({
        x: Math.random() * width,
        y: Math.random() * height,
        size: Math.random() < 0.15 ? 3 : 2,
        layer: Math.floor(Math.random() * LAYER_PARALLAX.length),
        phase: Math.random() * Math.PI * 2,
        speed: 0.5 + Math.random() * 1.5,
        color: COLORS[Math.floor(Math.random() * COLORS.length)],
      }));
    };

    const draw = (time: number) => {
      ctx.clearRect(0, 0, width, height);
      const scroll = window.scrollY;

      for (const star of stars) {
        const y = (((star.y - scroll * LAYER_PARALLAX[star.layer]) % height) + height) % height;
        const twinkle = reduced ? 0.8 : 0.35 + 0.65 * Math.abs(Math.sin(time / 1000 * star.speed + star.phase));
        ctx.globalAlpha = twinkle;
        ctx.fillStyle = star.color;
        ctx.fillRect(Math.round(star.x), Math.round(y), star.size, star.size);
      }

      if (!reduced) {
        if (time > nextMeteor) {
          meteors.push({ x: Math.random() * width * 0.8, y: Math.random() * height * 0.4, vx: 7, vy: 3.5, life: 1 });
          nextMeteor = time + 6000 + Math.random() * 9000;
        }
        for (const m of meteors) {
          // La estela es una fila de cuadritos que se van desvaneciendo.
          for (let i = 0; i < 12; i++) {
            ctx.globalAlpha = m.life * (1 - i / 12);
            ctx.fillStyle = i < 2 ? "#ffffff" : "#efc0b9";
            ctx.fillRect(Math.round(m.x - m.vx * i * 0.6), Math.round(m.y - m.vy * i * 0.6), 3, 3);
          }
          m.x += m.vx;
          m.y += m.vy;
          m.life -= 0.012;
        }
        meteors = meteors.filter((m) => m.life > 0 && m.x < width + 50);
      }
      ctx.globalAlpha = 1;
    };

    const loop = (time: number) => {
      draw(time);
      frame = requestAnimationFrame(loop);
    };

    resize();
    window.addEventListener("resize", resize);
    if (reduced) {
      // Sin animación: se dibuja una vez y solo se redibuja con el scroll.
      draw(0);
      const onScroll = () => draw(0);
      window.addEventListener("scroll", onScroll, { passive: true });
      return () => {
        window.removeEventListener("resize", resize);
        window.removeEventListener("scroll", onScroll);
      };
    }
    frame = requestAnimationFrame(loop);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return <canvas ref={canvasRef} className="starfield" aria-hidden />;
}
