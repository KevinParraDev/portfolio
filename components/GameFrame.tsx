"use client";

import { useEffect, useRef, useState } from "react";
import type { WebBuild } from "@/data/projects";

type Props = { build: WebBuild; title: string; labels: { fullscreen: string; exit: string }; onExit: () => void };

// Carga el juego a su tamaño original (ej. 960×600 de Unity) y lo escala para que quepa entero,
// tanto dentro de la máquina como en pantalla completa. Así no se ve recortado ni "con zoom".
export default function GameFrame({ build, title, labels, onExit }: Props) {
  const stageRef = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(1);

  useEffect(() => {
    const stage = stageRef.current!;
    const fit = () => setScale(Math.min(stage.clientWidth / build.width, stage.clientHeight / build.height));
    fit();
    const ro = new ResizeObserver(fit);
    ro.observe(stage);
    return () => ro.disconnect();
  }, [build.width, build.height]);

  // Pantalla completa real: el contenedor ocupa toda la pantalla y el juego se re-escala solo.
  const fullscreen = () => {
    const stage = stageRef.current!;
    if (document.fullscreenElement) document.exitFullscreen();
    else stage.requestFullscreen?.();
  };

  return (
    <>
      <div className="game-stage" ref={stageRef}>
        <iframe
          src={build.url}
          title={title}
          className="game-iframe"
          width={build.width}
          height={build.height}
          style={{ transform: `translate(-50%, -50%) scale(${scale})` }}
          allow="autoplay; fullscreen; gamepad"
          allowFullScreen
        />
      </div>
      <div className="arcade-game-bar">
        <span>{title}</span>
        <button type="button" onClick={fullscreen}>
          {labels.fullscreen}
        </button>
        <button type="button" onClick={onExit}>
          {labels.exit}
        </button>
      </div>
    </>
  );
}
