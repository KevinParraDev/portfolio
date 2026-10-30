import type { StaticImageData } from "next/image";
import type { Text } from "@/i18n/config";
import type { SpriteName } from "./museumSprites";

import env1 from "@/public/img/galery/env1.png";
import env2 from "@/public/img/galery/env2.png";
import env3 from "@/public/img/galery/env3.png";
import env4 from "@/public/img/galery/env4.png";
import env5 from "@/public/img/galery/env5.png";
import env6 from "@/public/img/galery/env6.png";
import extra1 from "@/public/img/galery/extra1.png";
import extra2 from "@/public/img/galery/extra2.png";
import extra3 from "@/public/img/galery/extra3.png";
import extra4 from "@/public/img/galery/extra4.png";

export const TILE = 16;

/**
 * Mapa del museo, una letra por casilla de 16×16 px. Se puede editar a mano:
 *   #  pared          .  piso         _  alfombra       D  salida
 *   P  pedestal       R  recepción    p  planta         b  banca
 * Las paredes de 2–3 casillas de alto son donde se cuelgan los cuadros.
 * Arriba: sala de personajes · abajo izquierda: sala de obras · abajo derecha: vestíbulo.
 */
export const museumMap = [
  "####################################",
  "####################################",
  "####################################",
  "#..................................#",
  "#..................................#",
  "#..P...P...P...P....P...P...P...P..#",
  "#..................................#",
  "#..................................#",
  "#__________________________________#",
  "#.........................____.....#",
  "##########################____######",
  "##########################____######",
  "#p...................#....____....p#",
  "#....................#....____.....#",
  "#....................#....____RRRR.#",
  "#....................#....____.....#",
  "#..#################.#....____.....#",
  "#..#################.#....____.....#",
  "#....................#....____.bb..#",
  "#.........................____.....#",
  "#.......bb...bb...........____.....#",
  "#.........................____.....#",
  "#p..................p#....____....p#",
  "############################DD######",
];

/** Dónde aparece el jugador al entrar (columna, fila) mirando hacia arriba. */
export const spawn = { x: 28, y: 21 };

export type Artwork = {
  id: string;
  image: StaticImageData;
  title: Text;
  description: Text;
  /** Casilla superior izquierda del cuadro en la pared, y su tamaño en casillas. */
  x: number;
  y: number;
  w: number;
  h: number;
};

// Títulos genéricos por ahora: se cambian aquí.
const environment = (n: string): Pick<Artwork, "title" | "description"> => ({
  title: { en: `Environment ${n}`, es: `Escenario ${n}` },
  description: { en: "Environment art by Kevin Parra.", es: "Arte de escenario de Kevin Parra." },
});
const extra = (n: string): Pick<Artwork, "title" | "description"> => ({
  title: { en: `Extra ${n}`, es: `Extra ${n}` },
  description: { en: "Illustration by Kevin Parra.", es: "Ilustración de Kevin Parra." },
});

export const artworks: Artwork[] = [
  // Sala de obras: pared de arriba
  { id: "env1", image: env1, ...environment("I"), x: 2, y: 10, w: 3, h: 2 },
  { id: "env2", image: env2, ...environment("II"), x: 6, y: 10, w: 3, h: 2 },
  { id: "env3", image: env3, ...environment("III"), x: 10, y: 10, w: 3, h: 2 },
  { id: "env4", image: env4, ...environment("IV"), x: 14, y: 10, w: 3, h: 2 },
  { id: "env5", image: env5, ...environment("V"), x: 18, y: 10, w: 3, h: 2 },
  // Sala de obras: muro del medio
  { id: "env6", image: env6, ...environment("VI"), x: 3, y: 16, w: 3, h: 2 },
  { id: "extra1", image: extra1, ...extra("I"), x: 7, y: 16, w: 3, h: 2 },
  { id: "extra2", image: extra2, ...extra("II"), x: 11, y: 16, w: 3, h: 2 },
  { id: "extra3", image: extra3, ...extra("III"), x: 15, y: 16, w: 3, h: 2 },
  // Vestíbulo
  { id: "extra4", image: extra4, ...extra("IV"), x: 22, y: 10, w: 3, h: 2 },
];

/** El toro de Zeri's Adventure corriendo, como mural animado en la pared de la sala de personajes. */
export const mural = {
  sprite: "bull" as SpriteName,
  x: 9,
  y: 0,
  w: 18,
  h: 3,
  title: { en: "The Bull", es: "El Toro" } as Text,
  text: {
    en: "The Bull from Zeri's Adventure. Better not stand in its way!",
    es: "El Toro de Zeri's Adventure. ¡Mejor no te le atravieses!",
  } as Text,
  project: "zeri-adventure",
};

export type Npc = {
  id: string;
  sprite: SpriteName;
  name: Text;
  /** Casilla donde está (normalmente un pedestal "P" del mapa). */
  x: number;
  y: number;
  /** Cada elemento es un cuadro de diálogo. */
  lines: Text[];
  /** Si se indica, al final ofrece ir a la página de ese proyecto. */
  project?: string;
  /** Otras casillas desde donde se le puede hablar (ej. el mostrador de la recepción). */
  talkFrom?: { x: number; y: number }[];
};

// Diálogos de prueba: la idea es pulirlos después.
export const npcs: Npc[] = [
  {
    id: "guide",
    sprite: "kio-host",
    name: { en: "Guide", es: "Guía" },
    x: 32,
    y: 13,
    talkFrom: [{ x: 32, y: 14 }],
    lines: [
      { en: "Welcome to the KP Museum!", es: "¡Bienvenido al Museo KP!" },
      {
        en: "Walk with the arrow keys and press A in front of a character or a painting to learn more.",
        es: "Camina con las flechas y presiona A frente a un personaje o un cuadro para saber más.",
      },
      {
        en: "Characters are in the hall up north, and the art gallery is to the west. Enjoy!",
        es: "Los personajes están en la sala del norte y las obras en la sala del oeste. ¡Disfruta!",
      },
    ],
  },
  {
    id: "zeri",
    sprite: "zeri",
    name: { en: "Zeri", es: "Zeri" },
    x: 3,
    y: 5,
    project: "zeri-adventure",
    lines: [
      { en: "Hi! I'm Zeri.", es: "¡Hola! Soy Zeri." },
      {
        en: "I woke up in a cave full of acid pits and monsters... and found my way out!",
        es: "Desperté en una cueva llena de ácido y monstruos... ¡y logré salir!",
      },
    ],
  },
  {
    id: "grecko",
    sprite: "grecko",
    name: { en: "Grecko", es: "Grecko" },
    x: 7,
    y: 5,
    project: "grecko-vs-machine",
    lines: [
      { en: "Grecko here!", es: "¡Aquí Grecko!" },
      {
        en: "Robots are invading the world. Someone has to stop them.",
        es: "Los robots están invadiendo el mundo. Alguien tiene que detenerlos.",
      },
    ],
  },
  {
    id: "robot",
    sprite: "robot",
    name: { en: "Robot", es: "Robot" },
    x: 11,
    y: 5,
    project: "grecko-vs-machine",
    lines: [{ en: "BEEP BOOP. I'm from Grecko Vs Machine. Today I'm off duty.", es: "BIP BUP. Soy de Grecko Vs Machine. Hoy estoy descansando." }],
  },
  {
    id: "clock",
    sprite: "clock",
    name: { en: "Clockbot", es: "Relojbot" },
    x: 15,
    y: 5,
    project: "grecko-vs-machine",
    lines: [{ en: "Tick, tock... Tick, tock...", es: "Tic, tac... Tic, tac..." }],
  },
  {
    id: "mushroom-a",
    sprite: "mushroom-a",
    name: { en: "Mushroom", es: "Hongo" },
    x: 20,
    y: 5,
    lines: [{ en: "We mushrooms like to walk. A lot.", es: "A los hongos nos gusta caminar. Mucho." }],
  },
  {
    id: "mushroom-b",
    sprite: "mushroom-b",
    name: { en: "Mushroom", es: "Hongo" },
    x: 24,
    y: 5,
    lines: [{ en: "Careful with the red ones... some of them explode.", es: "Cuidado con los rojos... algunos explotan." }],
  },
  {
    id: "slime",
    sprite: "slime",
    name: { en: "Slime", es: "Slime" },
    x: 28,
    y: 5,
    project: "zeri-adventure",
    lines: [{ en: "Blub... blub...", es: "Blub... blub..." }],
  },
  {
    id: "kio",
    sprite: "kio-blonde",
    name: { en: "Show guest", es: "Invitado del show" },
    x: 32,
    y: 5,
    project: "knock-it-out",
    lines: [{ en: "Hi! I'm from Knock It Out: The Show!", es: "¡Hola! ¡Soy de Knock It Out: The Show!" }],
  },
];

/** Avatar temporal (Juan de Knock It Out) hasta tener el tuyo. */
export const player = { walk: "juan-walk" as SpriteName, idle: "juan-idle" as SpriteName };
