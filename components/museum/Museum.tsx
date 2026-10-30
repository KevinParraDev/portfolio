"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useRef, useState, type KeyboardEvent, type PointerEvent } from "react";
import { TILE, artworks, demoRoute, museumMap, mural, npcs, player as playerSprites, spawn, type Artwork } from "@/data/museum";
import { sprites, type SpriteName } from "@/data/museumSprites";
import { getProject } from "@/data/projects";
import { tr, type Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/dictionaries";
import { drawArtwork, drawMap, drawMuralFrame, isSolidTile } from "./tiles";
import { prefersReducedMotion } from "../effects/motion";

// Pantalla interna: 20×12 casillas en computador; en celular 10×9, como la Game Boy original (160×144 px).
const DESKTOP_VIEW = { w: 20 * TILE, h: 12 * TILE };
const HANDHELD_VIEW = { w: 10 * TILE, h: 9 * TILE };
/** Debe coincidir con el media query de la carcasa Game Boy en globals.css. */
const HANDHELD_QUERY = "(max-width: 800px)";
const MAP_W = museumMap[0].length * TILE;
const MAP_H = museumMap.length * TILE;
const STEP_MS = 200; // tiempo para caminar una casilla
const PEDESTAL_LIFT = 6; // los NPC se paran encima del pedestal
const TEXT_SPEED_MS = 22;

type Dir = "up" | "down" | "left" | "right";
const DELTA: Record<Dir, [number, number]> = { up: [0, -1], down: [0, 1], left: [-1, 0], right: [1, 0] };

type Choice = { label: string; run: () => void };
type Dialog = { speaker?: string; pages: string[]; page: number; chars: number; choices?: Choice[]; choice: number };

/** demo: vista previa sin controles, en la que el personaje recorre el museo solo (inicio y arcade). */
type Props = { lang: Locale; t: Dictionary["museum"]; demo?: boolean };

// Las obras se pintan chiquitas en la pared: se pide una versión reducida al optimizador de imágenes de Next.
const thumbUrl = (src: string) => `/_next/image?url=${encodeURIComponent(src)}&w=128&q=75`;

const loadImage = (src: string) =>
  new Promise<HTMLImageElement>((resolve, reject) => {
    const img = new window.Image();
    img.onload = () => resolve(img);
    img.onerror = reject;
    img.src = src;
  });

const walkable = (x: number, y: number) =>
  y >= 0 && y < museumMap.length && x >= 0 && x < museumMap[0].length && !isSolidTile(x, y) && !npcs.some((n) => n.x === x && n.y === y);

/** Camino más corto entre dos casillas (búsqueda en anchura), como lista de pasos. Lo usa el modo demo. */
function findPath(fromX: number, fromY: number, toX: number, toY: number): Dir[] {
  const key = (x: number, y: number) => y * museumMap[0].length + x;
  const prev = new Map<number, { k: number; dir: Dir }>();
  const queue: [number, number][] = [[fromX, fromY]];
  const seen = new Set([key(fromX, fromY)]);
  while (queue.length) {
    const [x, y] = queue.shift()!;
    if (x === toX && y === toY) break;
    for (const dir of Object.keys(DELTA) as Dir[]) {
      const [dx, dy] = DELTA[dir];
      const nx = x + dx;
      const ny = y + dy;
      if (!walkable(nx, ny) || seen.has(key(nx, ny))) continue;
      seen.add(key(nx, ny));
      prev.set(key(nx, ny), { k: key(x, y), dir });
      queue.push([nx, ny]);
    }
  }
  const path: Dir[] = [];
  let k = key(toX, toY);
  while (prev.has(k)) {
    const step = prev.get(k)!;
    path.unshift(step.dir);
    k = step.k;
  }
  return path;
}

export default function Museum({ lang, t, demo = false }: Props) {
  const router = useRouter();
  const wrapRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [ready, setReady] = useState(false);
  const [focused, setFocused] = useState(false);
  const [view, setView] = useState({ ...DESKTOP_VIEW, scale: 2 });
  const viewRef = useRef(view);
  const [dialog, setDialog] = useState<Dialog | null>(null);
  const [viewer, setViewer] = useState<Artwork | null>(null);
  // Aviso "Presiona A / Enter" cuando hay algo interactuable al lado.
  const [prompt, setPrompt] = useState<"talk" | "look" | null>(null);
  const promptRef = useRef(prompt);
  const [touch, setTouch] = useState(false);

  // Estado del juego en refs: cambia 60 veces por segundo y no necesita re-render de React.
  const game = useRef({
    x: spawn.x,
    y: spawn.y,
    px: spawn.x * TILE,
    py: spawn.y * TILE,
    dir: "up" as Dir,
    moving: false,
    from: [0, 0],
    start: 0,
    held: [] as Dir[],
    /** Último toque de dirección, aunque ya se haya soltado (para que un toque rápido dé un paso). */
    tapped: null as Dir | null,
  });
  // Recorrido automático del modo demo.
  const auto = useRef({ wp: 0, path: [] as Dir[], waitUntil: 0 });
  const blocked = useRef(false);
  // Mientras hay un diálogo o el visor abierto, el personaje no camina.
  useEffect(() => {
    blocked.current = Boolean(dialog || viewer);
  }, [dialog, viewer]);

  // ---------- Diálogos ----------

  const say = useCallback((pages: string[], speaker?: string, choices?: Choice[]) => {
    game.current.held = [];
    game.current.tapped = null;
    setDialog({ speaker, pages, page: 0, chars: 0, choices, choice: 0 });
  }, []);

  const closeDialog = () => setDialog(null);

  // Texto que se va escribiendo letra por letra.
  useEffect(() => {
    if (!dialog) return;
    const text = dialog.pages[dialog.page];
    if (dialog.chars >= text.length) return;
    const id = setTimeout(() => setDialog((d) => d && { ...d, chars: d.chars + 1 }), TEXT_SPEED_MS);
    return () => clearTimeout(id);
  }, [dialog]);

  const pressA = () => {
    if (viewer) return setViewer(null);
    if (dialog) {
      const text = dialog.pages[dialog.page];
      if (dialog.chars < text.length) return setDialog({ ...dialog, chars: text.length });
      if (dialog.page < dialog.pages.length - 1) return setDialog({ ...dialog, page: dialog.page + 1, chars: 0 });
      if (dialog.choices) {
        const choice = dialog.choices[dialog.choice];
        closeDialog();
        return choice.run();
      }
      return closeDialog();
    }
    interact();
  };

  const pressB = () => {
    if (viewer) return setViewer(null);
    if (dialog) closeDialog();
  };

  const moveChoice = (step: number) =>
    setDialog((d) => (d?.choices ? { ...d, choice: (d.choice + step + d.choices.length) % d.choices.length } : d));

  // ---------- Mundo ----------

  const npcAt = (x: number, y: number) =>
    npcs.find((n) => (n.x === x && n.y === y) || n.talkFrom?.some((p) => p.x === x && p.y === y));

  const projectChoice = (slug?: string): Choice[] => {
    const project = slug ? getProject(slug) : undefined;
    if (!project) return [];
    return [{ label: `${t.goToProject}: ${project.title}`, run: () => router.push(`/${lang}/projects/${slug}`) }];
  };

  // Qué hay en una casilla: un NPC, un cuadro o el mural.
  type Target = { kind: "npc"; npc: (typeof npcs)[number] } | { kind: "art"; art: Artwork } | { kind: "mural" };
  function targetAt(tx: number, ty: number): Target | null {
    const npc = npcAt(tx, ty);
    if (npc) return { kind: "npc", npc };
    const art = artworks.find((a) => tx >= a.x && tx < a.x + a.w && ty >= a.y && ty < a.y + a.h);
    if (art) return { kind: "art", art };
    if (tx >= mural.x && tx < mural.x + mural.w && ty >= mural.y && ty < mural.y + mural.h) return { kind: "mural" };
    return null;
  }

  // Algo interactuable al lado del jugador: primero lo que tiene en frente, luego los otros lados.
  function nearby() {
    const g = game.current;
    const dirs: Dir[] = [g.dir, ...(["up", "down", "left", "right"] as Dir[]).filter((d) => d !== g.dir)];
    for (const dir of dirs) {
      const [dx, dy] = DELTA[dir];
      const target = targetAt(g.x + dx, g.y + dy);
      if (target) return { target, dir };
    }
    return null;
  }

  // Presionar A al lado de algo: el personaje se voltea hacia eso y habla o mira.
  function interact() {
    const g = game.current;
    if (g.moving) return;
    const found = nearby();
    if (!found) return;
    g.dir = found.dir;
    const target = found.target;

    if (target.kind === "npc") {
      const npc = target.npc;
      const name = tr(npc.name, lang);
      const choices = projectChoice(npc.project);
      return say(
        npc.lines.map((l) => tr(l, lang)),
        name,
        choices.length ? [...choices, { label: t.bye, run: () => {} }] : undefined
      );
    }

    if (target.kind === "art") {
      const art = target.art;
      return say([`${tr(art.title, lang)} — ${t.by}`, tr(art.description, lang)], undefined, [
        { label: t.viewArtwork, run: () => setViewer(art) },
        { label: t.bye, run: () => {} },
      ]);
    }

    return say([tr(mural.title, lang), tr(mural.text, lang)], undefined, [
      ...projectChoice(mural.project),
      { label: t.bye, run: () => {} },
    ]);
  }

  // Al pisar la puerta de salida.
  const onStep = (x: number, y: number) => {
    if (museumMap[y][x] === "D") {
      say([t.leave], undefined, [
        { label: t.yes, run: () => router.push(`/${lang}`) },
        { label: t.no, run: () => {} },
      ]);
    }
  };

  // ---------- Bucle del juego ----------

  useEffect(() => {
    const canvas = canvasRef.current!;
    const ctx = canvas.getContext("2d")!;
    let frame = 0;
    let cancelled = false;

    const layer = document.createElement("canvas");
    layer.width = MAP_W;
    layer.height = MAP_H;
    const layerCtx = layer.getContext("2d")!;
    const sheets: Partial<Record<SpriteName, HTMLImageElement>> = {};

    async function load() {
      const names = Object.keys(sprites) as SpriteName[];
      const [sheetImgs, artImgs] = await Promise.all([
        Promise.all(names.map((n) => loadImage(sprites[n].src))),
        Promise.all(artworks.map((a) => loadImage(thumbUrl(a.image.src)).catch(() => loadImage(a.image.src)))),
      ]);
      if (cancelled) return;
      names.forEach((n, i) => (sheets[n] = sheetImgs[i]));
      layerCtx.imageSmoothingEnabled = false;
      drawMap(layerCtx);
      drawMuralFrame(layerCtx, mural.x, mural.y, mural.w, mural.h);
      artworks.forEach((a, i) => drawArtwork(layerCtx, artImgs[i], a.x, a.y, a.w, a.h));
      setReady(true);
      frame = requestAnimationFrame(loop);
    }

    function drawSprite(name: SpriteName, now: number, footX: number, footY: number, flip = false) {
      const s = sprites[name];
      const img = sheets[name];
      if (!img) return;
      const f = Math.floor(now / s.ms) % s.frames;
      const dx = Math.round(footX - s.width / 2);
      const dy = Math.round(footY - s.height);
      // sombra
      ctx.fillStyle = "#00000055";
      ctx.fillRect(Math.round(footX - 5), Math.round(footY - 2), 10, 3);
      if (flip) {
        ctx.save();
        ctx.translate(dx + s.width, dy);
        ctx.scale(-1, 1);
        ctx.drawImage(img, f * s.width, 0, s.width, s.height, 0, 0, s.width, s.height);
        ctx.restore();
      } else {
        ctx.drawImage(img, f * s.width, 0, s.width, s.height, dx, dy, s.width, s.height);
      }
    }

    function update(now: number) {
      const g = game.current;
      if (g.moving) {
        const p = Math.min((now - g.start) / STEP_MS, 1);
        g.px = (g.from[0] + (g.x - g.from[0]) * p) * TILE;
        g.py = (g.from[1] + (g.y - g.from[1]) * p) * TILE;
        if (p === 1) {
          g.moving = false;
          if (!demo) onStep(g.x, g.y);
        }
      }
      if (demo) return autopilot(now);
      if (!g.moving && !blocked.current) {
        const dir = g.held[g.held.length - 1] ?? g.tapped;
        g.tapped = null;
        if (dir) {
          g.dir = dir;
          const [dx, dy] = DELTA[dir];
          if (walkable(g.x + dx, g.y + dy)) {
            g.from = [g.x, g.y];
            g.x += dx;
            g.y += dy;
            g.moving = true;
            g.start = now;
          }
        }
      }
    }

    // Modo demo: va al siguiente punto de la ruta, mira un rato y sigue.
    function autopilot(now: number) {
      const g = game.current;
      const a = auto.current;
      if (g.moving || now < a.waitUntil || prefersReducedMotion()) return;
      if (!a.path.length) {
        const target = demoRoute[a.wp];
        if (g.x === target.x && g.y === target.y) {
          g.dir = target.face;
          a.waitUntil = now + target.wait;
          a.wp = (a.wp + 1) % demoRoute.length;
          return;
        }
        a.path = findPath(g.x, g.y, target.x, target.y);
        if (!a.path.length) {
          a.wp = (a.wp + 1) % demoRoute.length;
          return;
        }
      }
      const dir = a.path.shift()!;
      const [dx, dy] = DELTA[dir];
      g.dir = dir;
      if (!walkable(g.x + dx, g.y + dy)) {
        a.path = [];
        return;
      }
      g.from = [g.x, g.y];
      g.x += dx;
      g.y += dy;
      g.moving = true;
      g.start = now;
    }

    function render(now: number) {
      const g = game.current;
      const { w: viewW, h: viewH } = viewRef.current;
      const camX = Math.round(Math.min(Math.max(g.px + TILE / 2 - viewW / 2, 0), MAP_W - viewW));
      const camY = Math.round(Math.min(Math.max(g.py + TILE / 2 - viewH / 2, 0), MAP_H - viewH));
      ctx.imageSmoothingEnabled = false;
      ctx.drawImage(layer, camX, camY, viewW, viewH, 0, 0, viewW, viewH);

      // Mural animado (el toro corriendo)
      const bull = sprites[mural.sprite];
      const bullImg = sheets[mural.sprite];
      if (bullImg) {
        const f = Math.floor(now / bull.ms) % bull.frames;
        const mx = mural.x * TILE + (mural.w * TILE - bull.width) / 2 - camX;
        const my = mural.y * TILE + mural.h * TILE - bull.height - camY;
        ctx.drawImage(bullImg, f * bull.width, 0, bull.width, bull.height, Math.round(mx), my, bull.width, bull.height);
      }

      // Personajes ordenados de arriba hacia abajo, para que el de adelante tape al de atrás
      const actors: { y: number; draw: () => void }[] = npcs.map((n) => {
        const onPedestal = museumMap[n.y][n.x] === "P";
        const footY = n.y * TILE + TILE - (onPedestal ? PEDESTAL_LIFT + 4 : 2) - camY;
        return { y: n.y * TILE, draw: () => drawSprite(n.sprite, now, n.x * TILE + TILE / 2 - camX, footY) };
      });
      actors.push({
        y: g.py + 1,
        draw: () =>
          drawSprite(
            g.moving ? playerSprites.walk : playerSprites.idle,
            now,
            g.px + TILE / 2 - camX,
            g.py + TILE - 1 - camY,
            g.dir === "left"
          ),
      });
      actors.sort((a, b) => a.y - b.y).forEach((a) => a.draw());
    }

    function loop(now: number) {
      frame = requestAnimationFrame(loop);
      // El demo no gasta nada mientras no se ve en pantalla.
      if (demo && !visible) return;
      update(now);
      render(now);
      if (demo) return;
      const g = game.current;
      const found = !g.moving && !blocked.current ? nearby() : null;
      const next = found ? (found.target.kind === "npc" ? "talk" : "look") : null;
      if (next !== promptRef.current) {
        promptRef.current = next;
        setPrompt(next);
      }
    }

    // El demo carga sus imágenes solo cuando se acerca a la pantalla.
    let visible = !demo;
    let io: IntersectionObserver | undefined;
    if (demo) {
      let started = false;
      io = new IntersectionObserver(
        ([entry]) => {
          visible = entry.isIntersecting;
          if (visible && !started) {
            started = true;
            load();
          }
        },
        { rootMargin: "200px" }
      );
      io.observe(canvas);
    } else {
      load();
    }
    return () => {
      cancelled = true;
      io?.disconnect();
      cancelAnimationFrame(frame);
    };
    // El bucle se arma una sola vez; lo que cambia (diálogos) se lee desde refs.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Tamaño de la vista y escala entera según el espacio disponible (sin pasarse del alto de la pantalla).
  useEffect(() => {
    const wrap = wrapRef.current!;
    const fit = () => {
      setTouch(window.matchMedia("(pointer: coarse)").matches);
      const handheld = window.matchMedia(HANDHELD_QUERY).matches;
      let next;
      if (demo) {
        // Vista previa: escala entera (×2 o más) y tantas casillas como quepan a lo ancho.
        const avail = wrap.clientWidth;
        const s = Math.max(2, Math.floor(avail / DESKTOP_VIEW.w));
        const cols = Math.max(8, Math.min(20, Math.floor(avail / (TILE * s))));
        next = { w: cols * TILE, h: Math.max(6, Math.round(cols * 0.6)) * TILE, scale: s };
      } else if (handheld) {
        // Pixeles exactos (×2 o ×3): si no caben 10×9 casillas, se muestran menos (9×8, 8×7) en vez de escalar a medias.
        const avail = wrap.clientWidth;
        const s = avail >= HANDHELD_VIEW.w * 3 ? 3 : 2;
        const cols = Math.min(10, Math.floor(avail / (TILE * s)));
        next =
          cols >= 8
            ? { w: cols * TILE, h: (cols - 1) * TILE, scale: s }
            : { ...HANDHELD_VIEW, scale: avail / HANDHELD_VIEW.w };
      } else {
        const byWidth = wrap.clientWidth / DESKTOP_VIEW.w;
        const byHeight = (window.innerHeight * 0.72) / DESKTOP_VIEW.h;
        const s = Math.min(byWidth, byHeight);
        next = { ...DESKTOP_VIEW, scale: s >= 2 ? Math.floor(s) : s };
      }
      viewRef.current = next;
      setView(next);
    };
    fit();
    const ro = new ResizeObserver(fit);
    ro.observe(wrap);
    window.addEventListener("resize", fit);
    return () => {
      ro.disconnect();
      window.removeEventListener("resize", fit);
    };
  }, [demo]);

  // ---------- Controles ----------

  const KEY_DIR: Record<string, Dir> = {
    ArrowUp: "up", ArrowDown: "down", ArrowLeft: "left", ArrowRight: "right",
    w: "up", s: "down", a: "left", d: "right",
  };

  const hold = (dir: Dir) => {
    const g = game.current;
    if (!g.held.includes(dir)) g.held.push(dir);
    g.tapped = dir;
  };
  const release = (dir: Dir) => {
    const g = game.current;
    g.held = g.held.filter((d) => d !== dir);
  };

  const onKeyDown = (e: KeyboardEvent<HTMLDivElement>) => {
    const key = e.key.length === 1 ? e.key.toLowerCase() : e.key;
    const dir = KEY_DIR[key];
    if (dir) {
      e.preventDefault();
      if (dialog?.choices && (dir === "up" || dir === "down")) moveChoice(dir === "up" ? -1 : 1);
      else if (!e.repeat) hold(dir);
    } else if (key === "z" || key === "Enter" || key === " ") {
      e.preventDefault();
      if (!e.repeat) pressA();
    } else if (key === "x" || key === "Escape" || key === "Backspace") {
      e.preventDefault();
      pressB();
    }
  };

  const onKeyUp = (e: KeyboardEvent<HTMLDivElement>) => {
    const key = e.key.length === 1 ? e.key.toLowerCase() : e.key;
    const dir = KEY_DIR[key];
    if (dir) release(dir);
  };

  // Cruceta táctil: cada botón dice su dirección en data-dir.
  const onPadDown = (e: PointerEvent<HTMLButtonElement>) => {
    e.preventDefault();
    const dir = e.currentTarget.dataset.dir as Dir;
    if (dialog?.choices && (dir === "up" || dir === "down")) moveChoice(dir === "up" ? -1 : 1);
    else hold(dir);
  };
  const onPadUp = (e: PointerEvent<HTMLButtonElement>) => release(e.currentTarget.dataset.dir as Dir);
  const padHandlers = { onPointerDown: onPadDown, onPointerUp: onPadUp, onPointerLeave: onPadUp, onPointerCancel: onPadUp };

  const currentText = dialog ? dialog.pages[dialog.page].slice(0, dialog.chars) : "";
  const dialogDone = dialog ? dialog.chars >= dialog.pages[dialog.page].length : false;
  const lastPage = dialog ? dialog.page === dialog.pages.length - 1 : false;

  // START: salir del museo · SELECT: ver la ayuda de controles (solo en la carcasa de celular).
  const pressStart = () => {
    if (viewer || dialog) return;
    say([t.leave], undefined, [
      { label: t.yes, run: () => router.push(`/${lang}`) },
      { label: t.no, run: () => {} },
    ]);
  };
  const pressSelect = () => {
    if (viewer || dialog) return;
    say([t.help]);
  };

  // Vista previa: solo la pantalla, sin controles ni diálogos.
  if (demo) {
    return (
      <div className="museum-demo" ref={wrapRef} aria-hidden>
        <div className="museum-screen" style={{ width: view.w * view.scale, height: view.h * view.scale }}>
          <canvas ref={canvasRef} width={view.w} height={view.h} className="museum-canvas" />
          {!ready && <p className="museum-loading">{t.loading}</p>}
        </div>
      </div>
    );
  }

  return (
    // En celular toda esta caja se ve como una Game Boy: pantalla arriba y controles abajo (ver globals.css).
    <div className="museum gameboy">
      <div className="gb-bezel">
        <span className="gb-bezel-label" aria-hidden>
          {t.bezel}
        </span>
        <span className="gb-led" aria-hidden />
      <div
        ref={wrapRef}
        className="museum-frame"
        tabIndex={0}
        onKeyDown={onKeyDown}
        onKeyUp={onKeyUp}
        onFocus={() => setFocused(true)}
        onBlur={() => {
          setFocused(false);
          game.current.held = [];
        }}
        role="application"
        aria-label={`${t.title}. ${t.keys}`}
      >
        <div className="museum-screen" style={{ width: view.w * view.scale, height: view.h * view.scale }}>
          <canvas ref={canvasRef} width={view.w} height={view.h} className="museum-canvas" />

          {!ready && <p className="museum-loading">{t.loading}</p>}

          {ready && !focused && !dialog && (
            <button type="button" className="museum-start" onClick={() => wrapRef.current?.focus()}>
              {t.clickToPlay}
            </button>
          )}

          {prompt && !dialog && ready && (
            <p className="museum-prompt" aria-live="polite">
              {t.press} <kbd>{touch ? "A" : "Enter"}</kbd> · {prompt === "talk" ? t.talk : t.look}
            </p>
          )}

          {dialog && (
            <div className="museum-dialog" role="dialog" aria-live="polite">
              {dialog.speaker && <span className="museum-dialog-name">{dialog.speaker}</span>}
              <p>{currentText}</p>
              {dialogDone && lastPage && dialog.choices ? (
                <ul className="museum-choices">
                  {dialog.choices.map((c, i) => (
                    <li key={c.label}>
                      <button
                        type="button"
                        className={i === dialog.choice ? "active" : ""}
                        onClick={() => {
                          closeDialog();
                          c.run();
                        }}
                      >
                        {c.label}
                      </button>
                    </li>
                  ))}
                </ul>
              ) : (
                dialogDone && (
                  <button type="button" className="museum-next" onClick={pressA} aria-label="A">
                    ▼
                  </button>
                )
              )}
            </div>
          )}
        </div>
      </div>
      </div>

      <p className="gb-brand" aria-hidden>
        KP<span>·</span>BOY
      </p>

      {/* Controles en pantalla para celulares */}
      <div className="museum-pad" aria-hidden>
        <div className="museum-dpad">
          <button type="button" className="up" data-dir="up" {...padHandlers}>▲</button>
          <button type="button" className="left" data-dir="left" {...padHandlers}>◀</button>
          <button type="button" className="right" data-dir="right" {...padHandlers}>▶</button>
          <button type="button" className="down" data-dir="down" {...padHandlers}>▼</button>
        </div>
        <div className="museum-ab">
          <button type="button" className="b" onPointerDown={(e) => { e.preventDefault(); pressB(); }}>B</button>
          <button type="button" className="a" onPointerDown={(e) => { e.preventDefault(); pressA(); }}>A</button>
        </div>
      </div>

      <div className="gb-startselect" aria-hidden>
        <button type="button" onPointerDown={(e) => { e.preventDefault(); pressSelect(); }}>
          <span />
          SELECT
        </button>
        <button type="button" onPointerDown={(e) => { e.preventDefault(); pressStart(); }}>
          <span />
          START
        </button>
      </div>
      <span className="gb-speaker" aria-hidden />

      <p className="museum-keys">{t.keys}</p>

      {/* Visor de la obra en grande */}
      {viewer && (
        <div className="museum-viewer" role="dialog" aria-modal="true" aria-label={tr(viewer.title, lang)} onClick={() => setViewer(null)}>
          <figure onClick={(e) => e.stopPropagation()}>
            {/* Sin optimizar: es pixel art y debe verse nítido al agrandarse */}
            <Image src={viewer.image} alt={tr(viewer.title, lang)} unoptimized />
            <figcaption>
              <strong>{tr(viewer.title, lang)}</strong> · {tr(viewer.description, lang)}
            </figcaption>
            <button
              type="button"
              onClick={() => {
                setViewer(null);
                wrapRef.current?.focus();
              }}
            >
              {t.close}
            </button>
          </figure>
        </div>
      )}
    </div>
  );
}
