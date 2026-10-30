"use client";

import { useEffect, useRef, useState } from "react";
import type { WebBuild } from "@/data/projects";

type Props = {
  build: WebBuild;
  title: string;
  labels: { fullscreen: string; exit: string; exitFullscreen: string };
  /** Página del juego donde está alojado (ej. itch.io), para dar crédito ya que su barra queda recortada. */
  hostUrl?: string;
  onExit: () => void;
};

// La plantilla de Unity, en celulares, oculta su barra inferior y estira el lienzo a toda la página.
const MOBILE_UA = /iPhone|iPad|iPod|Android/i;

// Carga el juego a su tamaño original (ej. 960×600 de Unity), recorta la barra de botones de la plantilla
// y lo escala para que quepa entero, tanto dentro de la máquina como en pantalla completa.
export default function GameFrame({ build, title, labels, hostUrl, onExit }: Props) {
  const stageRef = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(1);
  const [fullscreen, setFullscreen] = useState(false);
  // Respaldo para iPhone (no permite pantalla completa en elementos): el juego cubre la ventana con CSS.
  const [pseudo, setPseudo] = useState(false);
  // En celular la plantilla de Unity estira el lienzo sobre su barra, así que se muestra esa altura completa.
  const [mobile] = useState(() => MOBILE_UA.test(navigator.userAgent));
  const { width, footer, frame } = build;
  const visibleHeight = mobile ? build.height + footer : build.height;

  useEffect(() => {
    const stage = stageRef.current!;
    const fit = () => setScale(Math.min(stage.clientWidth / width, stage.clientHeight / visibleHeight));
    fit();
    const ro = new ResizeObserver(fit);
    ro.observe(stage);
    return () => ro.disconnect();
  }, [width, visibleHeight]);

  useEffect(() => {
    const onChange = () => setFullscreen(document.fullscreenElement === stageRef.current);
    document.addEventListener("fullscreenchange", onChange);
    return () => document.removeEventListener("fullscreenchange", onChange);
  }, []);

  // Esc cierra la pantalla completa simulada antes de que el arcade lo use para salir del juego.
  useEffect(() => {
    if (!pseudo) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key !== "Escape") return;
      e.stopPropagation();
      setPseudo(false);
    };
    window.addEventListener("keydown", onKey, true);
    return () => window.removeEventListener("keydown", onKey, true);
  }, [pseudo]);

  const enterFullscreen = async () => {
    const stage = stageRef.current!;
    try {
      if (!stage.requestFullscreen) throw new Error("unsupported");
      await stage.requestFullscreen();
    } catch {
      setPseudo(true);
    }
  };

  const exitFullscreen = () => {
    if (document.fullscreenElement) document.exitFullscreen();
    setPseudo(false);
  };

  return (
    <>
      <div className={pseudo ? "game-stage pseudo-fullscreen" : "game-stage"} ref={stageRef}>
        {/* Ventana del tamaño exacto del lienzo: lo que queda fuera (la barra de Unity) no se ve */}
        <div className="game-crop" style={{ width: width * scale, height: visibleHeight * scale }}>
          <iframe
            src={build.url}
            title={title}
            className="game-iframe"
            width={frame.left + width + frame.right}
            height={frame.top + build.height + footer + frame.bottom}
            // se corre el borde del alojamiento (itch) para que el lienzo quede justo en la esquina del recorte
            style={{ transform: `scale(${scale}) translate(${-frame.left}px, ${-frame.top}px)` }}
            allow="autoplay; fullscreen; gamepad"
            allowFullScreen
          />
        </div>
        {(fullscreen || pseudo) && (
          <button type="button" className="game-exit-fullscreen" onClick={exitFullscreen}>
            {labels.exitFullscreen}
          </button>
        )}
      </div>
      <div className="arcade-game-bar">
        <span>{title}</span>
        {/* Crédito al alojamiento, ya que su barra queda fuera del recorte */}
        {hostUrl && (
          <a href={hostUrl} className="arcade-host" target="_blank" rel="noopener noreferrer">
            {new URL(hostUrl).hostname.endsWith("itch.io") ? "itch.io" : new URL(hostUrl).hostname}
          </a>
        )}
        <button type="button" onClick={enterFullscreen}>
          {labels.fullscreen}
        </button>
        <button type="button" onClick={onExit}>
          {labels.exit}
        </button>
      </div>
    </>
  );
}
