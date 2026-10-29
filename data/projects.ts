import type { StaticImageData } from "next/image";

import zeriCover from "@/public/img/projects/zeriP.png";
import zeriV from "@/public/img/projects/zeriV.png";
import zeri1 from "@/public/img/projects/zeri1.png";
import zeri2 from "@/public/img/projects/zeri2.png";
import zeri3 from "@/public/img/projects/zeri3.png";
import hamsterCover from "@/public/img/projects/hamsterP.png";
import hamster1 from "@/public/img/projects/hamster1.png";
import hamster2 from "@/public/img/projects/hamster2.png";
import hamster3 from "@/public/img/projects/hamster3.png";
import surviveBirdCover from "@/public/img/projects/surviveBirdP.png";
import surviveBirdV from "@/public/img/projects/surviveBirdV.png";
import surviveBird1 from "@/public/img/projects/surviveBird1.png";
import surviveBird2 from "@/public/img/projects/surviveBird2.png";
import surviveBird3 from "@/public/img/projects/surviveBird3.png";
import greckoCover from "@/public/img/projects/greckoP.png";
import grecko1 from "@/public/img/projects/grecko1.png";
import grecko2 from "@/public/img/projects/grecko2.png";
import grecko3 from "@/public/img/projects/grecko3.png";
import kioCover from "@/public/img/projects/kioP.png";
import kioV from "@/public/img/projects/kioV.png";
import kio1 from "@/public/img/projects/kio.png";
import kio2 from "@/public/img/projects/kio2.png";
import kio3 from "@/public/img/projects/kio3.png";
import mdfCover from "@/public/img/projects/mdfP.png";
import robotCover from "@/public/img/projects/robotP.png";
import dominoCover from "@/public/img/projects/dominoP.png";
import dominoV from "@/public/img/projects/dominoV.png";
import domino1 from "@/public/img/projects/domino1.png";
import domino2 from "@/public/img/projects/domino2.png";
import domino3 from "@/public/img/projects/domino3.png";

export type Video = { provider: "youtube" | "vimeo"; id: string };

export type Media =
  | { type: "video"; video: Video; thumbnail: StaticImageData }
  | { type: "image"; src: StaticImageData };

export type Category = "game" | "animation";

export const categoryLabels: Record<Category, string> = {
  game: "Games",
  animation: "Animation",
};

export type Project = {
  slug: string;
  title: string;
  category: Category;
  genre: string;
  /** Si no se sabe, no se muestra la etiqueta de estado. */
  status?: "released" | "in-progress";
  /** Año de lanzamiento (o año previsto si está en desarrollo). */
  year?: number;
  /** Reemplaza el texto automático de la etiqueta ("Demo available", "Prototype"...). */
  statusText?: string;
  /** Se muestra grande arriba de la lista de proyectos. Solo uno. */
  featured?: boolean;
  /** Sin portada se muestra un recuadro "Screenshots coming soon". */
  cover?: StaticImageData;
  /** Video que se muestra solo, sin carrusel (cortos animados). */
  video?: Video;
  /** Carrusel: el primer elemento es el que se ve al entrar. */
  media: Media[];
  /** play: tienda principal; alsoOn: otras tiendas donde está el mismo juego. */
  links: { play?: string; alsoOn?: string[]; github?: string };
  description: string[];
  roles: string[];
  /** Ficha técnica: todo es opcional y solo se muestra lo que esté lleno. */
  studio?: { name: string; url?: string };
  players?: string;
  platforms?: string[];
  tools?: string[];
  /** Game jam, materia, cliente... */
  context?: string;
  duration?: string;
  credits?: string[];
};

/** Texto corto del estado para la etiqueta de la tarjeta y la ficha técnica. */
export const statusLabel = (p: Project) => {
  if (p.statusText) return p.statusText;
  if (p.status === "released") return p.year ? String(p.year) : "Released";
  if (p.status === "in-progress") return "In development";
  return undefined;
};

/** Nombre de la tienda a partir del link de "Play" (Steam, itch.io, Google Play...). */
export const playStore = (url: string) => {
  const host = new URL(url).hostname;
  if (host === "store.steampowered.com") return "Steam";
  if (host.endsWith("itch.io")) return "itch.io";
  if (host === "play.google.com") return "Google Play";
  return host.replace(/^www\./, "");
};

const image = (src: StaticImageData): Media => ({ type: "image", src });

const indieLevel = { name: "Indie Level Studio", url: "https://indielevelstudio.com/es/" };
const monteEstudio = { name: "Monte Estudio" };

// El orden de esta lista es el orden en que aparecen en la página.
export const projects: Project[] = [
  {
    slug: "farmageddon",
    title: "Farmageddon",
    category: "game",
    genre: "Co-op Action Roguelike",
    status: "in-progress",
    statusText: "Demo on Steam",
    featured: true,
    media: [],
    links: { play: "https://store.steampowered.com/app/3922300/Farmageddon/" },
    description: [
      "Defend your farm from waves of invading moles in this fun action roguelike, solo or in co-op with up to 4 friends. Dodge attacks, pick vegetables up from the ground or steal them in mid-air, and use them as projectiles to hold back the moles and survive the underground invasion.",
      "The full game launches in 2027, and the demo is already available on Steam.",
    ],
    roles: [
      "Lead Developer",
      "Gameplay Mechanics",
      "Level Design",
      "Co-op Multiplayer",
      "Art & UI Implementation",
      "Localization",
    ],
    studio: indieLevel,
    players: "1–4 (co-op)",
    platforms: ["PC (Steam)"],
    duration: "1.5 years",
  },
  {
    slug: "logicubes",
    title: "Logicubes",
    category: "game",
    genre: "Puzzle Adventure Game",
    status: "released",
    year: 2023,
    media: [],
    links: {
      play: "https://store.steampowered.com/app/1856120/Logicubes/",
      alsoOn: ["https://play.google.com/store/apps/details?id=com.IndieLevelStudio.TestProject"],
    },
    description: [
      "Logicubes is a captivating puzzle adventure game. Discover a charming universe teetering on the edge of darkness: join Wis on a journey alongside new friends, solve tricky puzzles and awaken the Great Architect to save the Cubeverse from eternal darkness.",
      "Available on Steam and Google Play, and coming soon to the App Store.",
    ],
    roles: [
      "Game Development",
      "Bug Fixing & Polishing",
      "Achievements & Cloud Save Porting (Steam, Google Play, App Store)",
    ],
    studio: indieLevel,
    platforms: ["PC (Steam)", "Android", "iOS (coming soon)"],
  },
  {
    slug: "survive-bird",
    title: "Survive Bird",
    category: "game",
    genre: "Hypercasual Game",
    status: "released",
    year: 2021,
    cover: surviveBirdCover,
    media: [
      { type: "video", video: { provider: "youtube", id: "B6aaNSXehuA" }, thumbnail: surviveBirdV },
      image(surviveBird1),
      image(surviveBird2),
      image(surviveBird3),
    ],
    links: {
      play: "https://play.google.com/store/apps/details?id=com.KawiGames.SurviveBird",
      github: "https://github.com/KevinParraDev/Survive-Bird",
    },
    description: [
      "Survive Bird is a casual Android game where you'll be a bird and you'll have to survive for as long as possible by dodging all the obstacles that appear on the screen. The game features over 30 different birds; collect them all!",
    ],
    roles: ["Game Development", "Game Design", "2D Art", "Animation"],
    platforms: ["Android"],
  },
  {
    slug: "la-aventura-unal",
    title: "La Aventura UNAL",
    category: "game",
    genre: "Turn-based Adventure Game",
    status: "released",
    year: 2025,
    statusText: "2025 · Internal project",
    media: [],
    links: {},
    description: [
      "La Aventura UNAL is a Pokémon-inspired adventure where you play as a student at the National University of Colombia, Medellín campus. Explore the campus, study hard and face your exams in turn-based battles, where every exam comes to life as an opponent.",
      "Life on campus isn't only about exams: make time for extracurricular and wellness activities like painting, dancing, sports and, of course, eating. Pass every semester to finally earn your degree!",
    ],
    roles: [
      "Pixel Art",
      "Animation",
      "Illustration",
      "UI Art",
      "Level Design",
      "Mechanics & Minigame Design",
    ],
    context: "Internal project for the National University of Colombia (not publicly available)",
  },
  {
    slug: "berracos-espantos",
    title: "Berracos Espantos",
    category: "game",
    genre: "Co-op Roguelite",
    status: "in-progress",
    statusText: "Playable prototype",
    media: [],
    links: { play: "https://monte-estudio.itch.io/berracos-espantos" },
    description: [
      "Berracos Espantos is a co-op roguelite rooted in Colombian folklore. Play as Don Pedro and Doña Ana, two farmers who must defend their village by heading into the wild mountains, machete in hand, to fight the Devil himself and the creatures of Colombian mythology.",
      "Team up with a friend in local co-op, survive each run and push deeper into the monte. The prototype is already playable on itch.io.",
    ],
    roles: [
      "Game Development",
      "Polishing",
      "Local Multiplayer",
      "Art Implementation",
      "UI Art",
      "Character & Prop Animation",
      "Environment Coloring",
    ],
    studio: monteEstudio,
    players: "Local co-op",
    platforms: ["Windows"],
  },
  {
    slug: "dino-party",
    title: "Dino Party",
    category: "game",
    genre: "2.5D Party Game",
    status: "in-progress",
    media: [],
    links: {},
    description: [
      "Dino Party is a 2.5D party game for 1 to 4 players where dinosaurs compete in minigames as their era comes to an end. Every round is a fight for survival: meteor showers, floods and earthquakes can strike in any minigame and turn the match upside down.",
      "A cartoon-style game built entirely by me as a solo developer, from the multiplayer and the minigames to the art, animation, UI and VFX.",
    ],
    roles: ["Solo Developer", "Multiplayer", "Minigame Design", "2.5D Art", "Animation", "UI Art", "VFX"],
    studio: monteEstudio,
    players: "1–4",
  },
  {
    slug: "zeri-adventure",
    title: "Zeri's Adventure",
    category: "game",
    genre: "2D Metroidvania Game",
    status: "released",
    year: 2023,
    cover: zeriCover,
    media: [
      { type: "video", video: { provider: "youtube", id: "cMdAMpP4f-E" }, thumbnail: zeriV },
      image(zeri1),
      image(zeri2),
      image(zeri3),
    ],
    links: {
      play: "https://kevin-parra.itch.io/zeris-adventure",
      github: "https://github.com/KevinParraDev/Zeri-s-Adventure",
    },
    description: [
      "Zeri's Adventure is a short metroidvania-style platformer game, where you play as Zeri, a blue-haired girl who, for unknown reasons, finds herself inside a cave. Your goal is to escape, but to do so, you need to overcome all the adversities that the cave brings: acid pits, poisonous bushes, and of course, monsters.",
      "Throughout the map, you will acquire different abilities that will allow you to keep progressing. Good luck!",
    ],
    roles: ["Game Development", "Game Design", "2D Art", "Animation"],
    platforms: ["Web", "Windows"],
  },
  {
    slug: "knock-it-out",
    title: "Knock It Out: The Show",
    category: "game",
    genre: "2D Platformer Game",
    status: "released",
    year: 2024,
    cover: kioCover,
    media: [
      { type: "video", video: { provider: "youtube", id: "eDbnl1O5HIs" }, thumbnail: kioV },
      image(kio1),
      image(kio2),
      image(kio3),
    ],
    links: {
      play: "https://kevin-parra.itch.io/knock-it-out-the-show",
      github: "https://github.com/KevinParraDev/Knock-It-Out-The-Show",
    },
    description: [
      "Knock It Out: The Show is a 2D platformer game for two players in which one of them will take control of the Knock It Out contestant, while the other will be the audience of the show, who will not only laugh at the contestant's mistakes but also make their life impossible by throwing pies at them to make them fail.",
    ],
    roles: ["Game Development", "Game Design", "2D Art", "Animation"],
    players: "2",
    platforms: ["Web"],
    tools: ["Unity 2D", "C#", "Aseprite"],
    context: "Global Game Jam 2024 — Medellín",
    duration: "48 hours",
  },
  {
    slug: "grecko-vs-machine",
    title: "Grecko Vs Machine",
    category: "game",
    genre: "2D Platformer Game",
    status: "in-progress",
    cover: greckoCover,
    media: [image(grecko1), image(grecko2), image(grecko3)],
    links: {},
    description: [
      "Grecko Vs Machine is the video game I am currently working on. It's a 2D platformer game in the style of metroidvania where you play as a lizard named Grecko who has to save the world from a robot invasion.",
      "We expect to release the beta before mid-2024.",
    ],
    roles: ["Game Development", "Game Design", "2D Art", "Animation"],
  },
  {
    slug: "hamster-run",
    title: "Hamster Run",
    category: "game",
    genre: "Vertical Runner Game",
    status: "in-progress",
    cover: hamsterCover,
    media: [image(hamster2), image(hamster1), image(hamster3)],
    links: {},
    description: [
      "Hamster Run is a runner-style game where you play as a hamster running along the map, and your duty is to dodge all obstacles. Throughout the map, you can find different power-ups that will either help you or make the game more challenging.",
      "It features a start menu that allows you to customize the character. The designs and animations of this video game were created in Animate CC and Photoshop.",
    ],
    roles: ["Game Development", "Game Design", "2D Art", "Animation"],
    tools: ["Animate CC", "Photoshop"],
  },
  {
    slug: "domino",
    title: "Domino",
    category: "game",
    genre: "Board Game",
    status: "released",
    year: 2022,
    cover: dominoCover,
    media: [
      { type: "video", video: { provider: "youtube", id: "iNHwY4ZRQ3w" }, thumbnail: dominoV },
      image(domino1),
      image(domino2),
      image(domino3),
    ],
    links: {
      play: "https://kevin-parra.itch.io/domino",
      github: "https://github.com/KevinParraDev/Domino",
    },
    description: [
      "This is a recreation of the Domino board game made for the Data Structures course at the National University of Colombia, Medellin campus. The game has only one mode: player versus 3 AI opponents, each with 7 randomly distributed tiles.",
      "The game ends when any player runs out of tiles or if the game stalls (none of the players can move). In that case, the player with the fewest points wins by adding up the values of their tiles.",
    ],
    roles: ["Game Development", "Game Design", "2D Art"],
    platforms: ["Web"],
    context: "Data Structures course — National University of Colombia",
  },
  {
    slug: "maquinas-del-futuro",
    title: "Maquinas del Futuro",
    category: "animation",
    genre: "Animated Short",
    status: "released",
    year: 2023,
    cover: mdfCover,
    video: { provider: "vimeo", id: "999399984" },
    media: [],
    links: {},
    description: [
      '"Maquinas del Futuro" is a short animated film that tells the story of computing, from the early work of Ada Lovelace on the Analytical Engine to recent advances like virtual reality.',
      "This short film was created using the stop-motion animation technique, fully animated by me, and the music was composed by Juan Camilo Valencia.",
    ],
    roles: ["Animator", "Storyboard", "Design"],
    tools: ["Stop-motion"],
    credits: ["Music: Juan Camilo Valencia"],
  },
  {
    slug: "el-amigo-robot",
    title: "El Amigo Robot",
    category: "animation",
    genre: "Animated Short",
    status: "released",
    year: 2024,
    cover: robotCover,
    video: { provider: "youtube", id: "-6xzjc_b_4U" },
    media: [],
    links: {},
    description: [
      '"El Amigo Robot" is an animated short film that explores the bond between a robot and a stray cat. The goal of this piece is to show how an apparently inanimate being can develop empathy and care for another living creature. The short film was produced with the intention of experimenting with visual storytelling and emotions, using modern technology to bring the story to life.',
    ],
    roles: ["Animator", "Storyboard", "Design"],
  },
];

export const getProject = (slug: string) => projects.find((p) => p.slug === slug);
