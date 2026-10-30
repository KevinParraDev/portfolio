import type { StaticImageData } from "next/image";
import { tr, type Locale, type Text } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";

// "P" es la portada (el banner de cada juego); los números van en el carrusel.
import farmageddonCover from "@/public/img/projects/farmageddonP.webp";
import farmageddon0 from "@/public/img/projects/farmageddon0.webp";
import farmageddon1 from "@/public/img/projects/farmageddon1.webp";
import farmageddon2 from "@/public/img/projects/farmageddon2.webp";
import farmageddon3 from "@/public/img/projects/farmageddon3.webp";
import farmageddon4 from "@/public/img/projects/farmageddon4.webp";
import farmageddon5 from "@/public/img/projects/farmageddon5.webp";
import farmageddon6 from "@/public/img/projects/farmageddon6.webp";
import logicubesCover from "@/public/img/projects/logicubesP.webp";
import logicubes0 from "@/public/img/projects/logicubes0.webp";
import logicubes1 from "@/public/img/projects/logicubes1.webp";
import logicubes2 from "@/public/img/projects/logicubes2.webp";
import logicubes3 from "@/public/img/projects/logicubes3.webp";
import logicubes4 from "@/public/img/projects/logicubes4.webp";
import logicubes5 from "@/public/img/projects/logicubes5.webp";
import logicubes6 from "@/public/img/projects/logicubes6.webp";
import aventuraCover from "@/public/img/projects/aventuraP.webp";
import aventura1 from "@/public/img/projects/aventura1.webp";
import aventura2 from "@/public/img/projects/aventura2.webp";
import aventura3 from "@/public/img/projects/aventura3.webp";
import aventura4 from "@/public/img/projects/aventura4.webp";
import aventura5 from "@/public/img/projects/aventura5.webp";
import aventura6 from "@/public/img/projects/aventura6.webp";
import berracosCover from "@/public/img/projects/berracosP.webp";
import berracos1 from "@/public/img/projects/berracos1.webp";
import berracos2 from "@/public/img/projects/berracos2.webp";
import berracos3 from "@/public/img/projects/berracos3.webp";
import berracos4 from "@/public/img/projects/berracos4.webp";
import berracos5 from "@/public/img/projects/berracos5.webp";
import dinoCover from "@/public/img/projects/dinoP.webp";
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

export const categoryLabels: Record<Category, Record<Locale, string>> = {
  game: { en: "Games", es: "Juegos" },
  animation: { en: "Animation", es: "Animación" },
};

/**
 * Los textos que cambian según el idioma se escriben así: { en: "...", es: "..." }.
 * Si un texto es igual en los dos (nombres, herramientas), basta con el string.
 */
export type Project = {
  slug: string;
  title: string;
  category: Category;
  /**
   * Dónde aparece en el inicio: "main" = proyectos principales (tarjetas grandes),
   * "arcade" = el baúl de juegos (máquina arcade). Las animaciones salen en el televisor.
   */
  section: "main" | "arcade" | "tv";
  /** Versión HTML5 para jugar dentro de la web (en la máquina arcade). */
  webBuild?: WebBuild;
  genre: Text;
  /** Si no se sabe, no se muestra la etiqueta de estado. */
  status?: "released" | "in-progress";
  /** Año de lanzamiento (o año previsto si está en desarrollo). */
  year?: number;
  /** Reemplaza el texto automático de la etiqueta ("Demo on Steam", "Playable prototype"...). */
  statusText?: Text;
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
  /** Un párrafo por elemento, en cada idioma. */
  description: Record<Locale, string[]>;
  roles: Text[];
  /** Ficha técnica: todo es opcional y solo se muestra lo que esté lleno. */
  studio?: { name: string; url?: string };
  players?: Text;
  platforms?: Text[];
  tools?: string[];
  /** Game jam, materia, cliente... */
  context?: Text;
  duration?: Text;
  credits?: Text[];
};

/** Texto corto del estado para la etiqueta de la tarjeta y la ficha técnica. */
export const statusLabel = (p: Project, lang: Locale) => {
  const t = getDictionary(lang).projects;
  if (p.statusText) return tr(p.statusText, lang);
  if (p.status === "released") return p.year ? String(p.year) : t.released;
  if (p.status === "in-progress") return t.inDevelopment;
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

/**
 * Build web de un juego. width/height es el tamaño original con el que se exportó: la máquina arcade
 * carga el juego a ese tamaño y lo escala para que quepa entero en la pantalla.
 */
export type WebBuild = { url: string; width: number; height: number };

/**
 * Embed oficial de itch.io para juegos HTML5. El número es el "upload id" del build web
 * (sale en el código de la página del juego en itch: html-classic.itch.zone/html/<ID>/...).
 * Por defecto, el lienzo de Unity (960×600) más la barra inferior de la plantilla.
 */
const itchEmbed = (uploadId: number, width = 960, height = 640): WebBuild => ({
  url: `https://itch.io/embed-upload/${uploadId}?color=000000`,
  width,
  height,
});

const indieLevel = { name: "Indie Level Studio", url: "https://indielevelstudio.com/es/" };
const monteEstudio = { name: "Monte Estudio" };

// Roles que se repiten en varios proyectos.
const role = {
  gameDev: { en: "Game Development", es: "Desarrollo" },
  gameDesign: { en: "Game Design", es: "Diseño de juego" },
  art2d: { en: "2D Art", es: "Arte 2D" },
  animation: { en: "Animation", es: "Animación" },
  uiArt: { en: "UI Art", es: "Arte de UI" },
  levelDesign: { en: "Level Design", es: "Diseño de niveles" },
  polishing: { en: "Polishing", es: "Pulido" },
  animator: { en: "Animator", es: "Animador" },
  design: { en: "Design", es: "Diseño" },
} satisfies Record<string, Text>;

export const projects: Project[] = [
  // ---- Proyectos principales (el orden es el de la página) ----
  {
    slug: "farmageddon",
    title: "Farmageddon",
    category: "game",
    section: "main",
    genre: { en: "Co-op Action Roguelike", es: "Roguelike de acción cooperativo" },
    status: "in-progress",
    statusText: { en: "Demo on Steam", es: "Demo en Steam" },
    featured: true,
    cover: farmageddonCover,
    media: [
      { type: "video", video: { provider: "youtube", id: "rd42HsEk4_c" }, thumbnail: farmageddonCover },
      image(farmageddon0),
      image(farmageddon1),
      image(farmageddon2),
      image(farmageddon3),
      image(farmageddon4),
      image(farmageddon5),
      image(farmageddon6),
    ],
    links: { play: "https://store.steampowered.com/app/3922300/Farmageddon/" },
    description: {
      en: [
        "Defend your farm from waves of invading moles in this fun action roguelike, solo or in co-op with up to 4 friends. Dodge attacks, pick vegetables up from the ground or steal them in mid-air, and use them as projectiles to hold back the moles and survive the underground invasion.",
        "The full game launches in 2027, and the demo is already available on Steam.",
      ],
      es: [
        "Defiende tu granja de oleadas de topos invasores en este divertido roguelike de acción, solo o en cooperativo con hasta 4 amigos. Esquiva ataques, recoge vegetales del suelo o róbalos en el aire, y úsalos como proyectiles para frenar a los topos y sobrevivir a la invasión subterránea.",
        "El juego completo sale en 2027, y la demo ya está disponible en Steam.",
      ],
    },
    roles: [
      { en: "Lead Developer", es: "Desarrollador principal" },
      { en: "Gameplay Mechanics", es: "Mecánicas de juego" },
      role.levelDesign,
      { en: "Co-op Multiplayer", es: "Multijugador cooperativo" },
      { en: "Art & UI Implementation", es: "Implementación de arte y UI" },
      { en: "Localization", es: "Localización" },
    ],
    studio: indieLevel,
    players: { en: "1–4 (co-op)", es: "1–4 (cooperativo)" },
    platforms: ["PC (Steam)"],
    duration: { en: "1.5 years", es: "Año y medio" },
  },
  {
    slug: "logicubes",
    title: "Logicubes",
    category: "game",
    section: "main",
    genre: { en: "Puzzle Adventure Game", es: "Aventura de puzles" },
    status: "released",
    year: 2023,
    cover: logicubesCover,
    media: [
      { type: "video", video: { provider: "youtube", id: "oxc7e5lKBzg" }, thumbnail: logicubesCover },
      image(logicubes0),
      image(logicubes1),
      image(logicubes2),
      image(logicubes3),
      image(logicubes4),
      image(logicubes5),
      image(logicubes6),
    ],
    links: {
      play: "https://store.steampowered.com/app/1856120/Logicubes/",
      alsoOn: ["https://play.google.com/store/apps/details?id=com.IndieLevelStudio.TestProject"],
    },
    description: {
      en: [
        "Logicubes is a captivating puzzle adventure game. Discover a charming universe teetering on the edge of darkness: join Wis on a journey alongside new friends, solve tricky puzzles and awaken the Great Architect to save the Cubeverse from eternal darkness.",
        "Available on Steam and Google Play, and coming soon to the App Store.",
      ],
      es: [
        "Logicubes es un fascinante juego de aventura y puzles. Descubre un encantador universo que se tambalea al borde de la oscuridad: acompaña a Wis en una travesía junto a nuevos amigos, resuelve complicados acertijos y despierta al Gran Arquitecto para salvar el Cubeverse de la oscuridad eterna.",
        "Disponible en Steam y Google Play, y próximamente en la App Store.",
      ],
    },
    roles: [
      role.gameDev,
      { en: "Bug Fixing & Polishing", es: "Corrección de errores y pulido" },
      {
        en: "Achievements & Cloud Save Porting (Steam, Google Play, App Store)",
        es: "Port de logros y guardado en la nube (Steam, Google Play, App Store)",
      },
    ],
    studio: indieLevel,
    platforms: ["PC (Steam)", "Android", { en: "iOS (coming soon)", es: "iOS (próximamente)" }],
  },
  {
    slug: "berracos-espantos",
    title: "Berracos Espantos",
    category: "game",
    section: "main",
    genre: { en: "Co-op Roguelite", es: "Roguelite cooperativo" },
    status: "in-progress",
    statusText: { en: "Playable prototype", es: "Prototipo jugable" },
    cover: berracosCover,
    media: [image(berracos1), image(berracos2), image(berracos3), image(berracos4), image(berracos5)],
    links: { play: "https://monte-estudio.itch.io/berracos-espantos" },
    description: {
      en: [
        "Berracos Espantos is a co-op roguelite rooted in Colombian folklore. Play as Don Pedro and Doña Ana, two farmers who must defend their village by heading into the wild mountains, machete in hand, to fight the Devil himself and the creatures of Colombian mythology.",
        "Team up with a friend in local co-op, survive each run and push deeper into the monte. The prototype is already playable on itch.io.",
      ],
      es: [
        "Berracos Espantos es un roguelite cooperativo inspirado en el folclor colombiano. Encarna a Don Pedro y Doña Ana, dos campesinos que deben defender su pueblo adentrándose en el monte, machete en mano, para enfrentarse al mismísimo diablo y a las criaturas de la mitología colombiana.",
        "Únete con un amigo en cooperativo local, sobrevive cada partida y adéntrate cada vez más en el monte. El prototipo ya se puede jugar en itch.io.",
      ],
    },
    roles: [
      role.gameDev,
      role.polishing,
      { en: "Local Multiplayer", es: "Multijugador local" },
      { en: "Art Implementation", es: "Implementación de arte" },
      role.uiArt,
      { en: "Character & Prop Animation", es: "Animación de personajes y elementos" },
      { en: "Environment Coloring", es: "Coloreado de escenarios" },
    ],
    studio: monteEstudio,
    players: { en: "Local co-op", es: "Cooperativo local" },
    platforms: ["Windows"],
  },
  {
    slug: "dino-party",
    title: "Dino Party",
    category: "game",
    section: "main",
    genre: { en: "2.5D Party Game", es: "Juego party en 2.5D" },
    status: "in-progress",
    cover: dinoCover,
    // Por ahora solo hay banner: se muestra también como imagen principal de su página.
    media: [image(dinoCover)],
    links: {},
    description: {
      en: [
        "Dino Party is a 2.5D party game for 1 to 4 players where dinosaurs compete in minigames as their era comes to an end. Every round is a fight for survival: meteor showers, floods and earthquakes can strike in any minigame and turn the match upside down.",
        "A cartoon-style game built entirely by me as a solo developer, from the multiplayer and the minigames to the art, animation, UI and VFX.",
      ],
      es: [
        "Dino Party es un juego party en 2.5D para 1 a 4 jugadores en el que dinosaurios compiten en minijuegos mientras su era llega a su fin. Cada ronda es una lucha por sobrevivir: lluvias de meteoritos, diluvios y terremotos pueden aparecer en cualquier minijuego y darle la vuelta a la partida.",
        "Un juego de estilo cartoon hecho completamente por mí como desarrollador independiente: desde el multijugador y los minijuegos hasta el arte, la animación, la UI y los VFX.",
      ],
    },
    roles: [
      { en: "Solo Developer", es: "Desarrollador en solitario" },
      { en: "Multiplayer", es: "Multijugador" },
      { en: "Minigame Design", es: "Diseño de minijuegos" },
      { en: "2.5D Art", es: "Arte 2.5D" },
      role.animation,
      role.uiArt,
      "VFX",
    ],
    studio: monteEstudio,
    players: "1–4",
  },
  // ---- Baúl de juegos (máquina arcade) ----
  {
    slug: "survive-bird",
    title: "Survive Bird",
    category: "game",
    section: "arcade",
    genre: { en: "Hypercasual Game", es: "Juego hipercasual" },
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
    description: {
      en: [
        "Survive Bird is a casual Android game where you'll be a bird and you'll have to survive for as long as possible by dodging all the obstacles that appear on the screen. The game features over 30 different birds; collect them all!",
      ],
      es: [
        "Survive Bird es un juego casual para Android en el que eres un pájaro y tienes que sobrevivir el mayor tiempo posible esquivando todos los obstáculos que aparecen en pantalla. ¡Tiene más de 30 pájaros diferentes; colecciónalos todos!",
      ],
    },
    roles: [role.gameDev, role.gameDesign, role.art2d, role.animation],
    platforms: ["Android"],
  },
  {
    slug: "zeri-adventure",
    title: "Zeri's Adventure",
    category: "game",
    section: "arcade",
    webBuild: itchEmbed(8175534),
    genre: { en: "2D Metroidvania Game", es: "Metroidvania 2D" },
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
    description: {
      en: [
        "Zeri's Adventure is a short metroidvania-style platformer game, where you play as Zeri, a blue-haired girl who, for unknown reasons, finds herself inside a cave. Your goal is to escape, but to do so, you need to overcome all the adversities that the cave brings: acid pits, poisonous bushes, and of course, monsters.",
        "Throughout the map, you will acquire different abilities that will allow you to keep progressing. Good luck!",
      ],
      es: [
        "Zeri's Adventure es un corto plataformero estilo metroidvania en el que juegas como Zeri, una chica de pelo azul que, por razones desconocidas, aparece dentro de una cueva. Tu objetivo es escapar, pero para lograrlo tendrás que superar todas las adversidades de la cueva: pozos de ácido, arbustos venenosos y, por supuesto, monstruos.",
        "A lo largo del mapa conseguirás distintas habilidades que te permitirán seguir avanzando. ¡Buena suerte!",
      ],
    },
    roles: [role.gameDev, role.gameDesign, role.art2d, role.animation],
    platforms: ["Web", "Windows"],
  },
  {
    slug: "la-aventura-unal",
    title: "La Aventura UNAL",
    category: "game",
    section: "arcade",
    genre: { en: "Turn-based Adventure Game", es: "Aventura por turnos" },
    status: "released",
    year: 2025,
    statusText: { en: "2025 · Internal project", es: "2025 · Proyecto interno" },
    cover: aventuraCover,
    media: [image(aventura1), image(aventura2), image(aventura3), image(aventura4), image(aventura5), image(aventura6)],
    links: {},
    description: {
      en: [
        "La Aventura UNAL is a Pokémon-inspired adventure where you play as a student at the National University of Colombia, Medellín campus. Explore the campus, study hard and face your exams in turn-based battles, where every exam comes to life as an opponent.",
        "Life on campus isn't only about exams: make time for extracurricular and wellness activities like painting, dancing, sports and, of course, eating. Pass every semester to finally earn your degree!",
      ],
      es: [
        "La Aventura UNAL es una aventura inspirada en Pokémon en la que eres estudiante de la Universidad Nacional de Colombia, sede Medellín. Recorre el campus, estudia y enfrenta tus exámenes en batallas por turnos, donde cada examen cobra vida como un rival.",
        "La vida en el campus no es solo exámenes: saca tiempo para actividades extracurriculares y de bienestar como pintar, bailar, hacer deporte y, por supuesto, comer. ¡Aprueba todos los semestres para graduarte!",
      ],
    },
    roles: [
      "Pixel Art",
      role.animation,
      { en: "Illustration", es: "Ilustración" },
      role.uiArt,
      role.levelDesign,
      { en: "Mechanics & Minigame Design", es: "Diseño de mecánicas y minijuegos" },
    ],
    context: {
      en: "Internal project for the National University of Colombia (not publicly available)",
      es: "Proyecto interno de la Universidad Nacional de Colombia (no disponible al público)",
    },
  },
  {
    slug: "knock-it-out",
    title: "Knock It Out: The Show",
    category: "game",
    section: "arcade",
    webBuild: itchEmbed(9604224),
    genre: { en: "2D Platformer Game", es: "Plataformero 2D" },
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
    description: {
      en: [
        "Knock It Out: The Show is a 2D platformer game for two players in which one of them will take control of the Knock It Out contestant, while the other will be the audience of the show, who will not only laugh at the contestant's mistakes but also make their life impossible by throwing pies at them to make them fail.",
      ],
      es: [
        "Knock It Out: The Show es un plataformero 2D para dos jugadores: uno controla al concursante de Knock It Out, mientras el otro es el público del show, que no solo se ríe de los errores del concursante, sino que le hace la vida imposible lanzándole pasteles para que falle.",
      ],
    },
    roles: [role.gameDev, role.gameDesign, role.art2d, role.animation],
    players: "2",
    platforms: ["Web"],
    tools: ["Unity 2D", "C#", "Aseprite"],
    context: "Global Game Jam 2024 — Medellín",
    duration: { en: "48 hours", es: "48 horas" },
  },
  {
    slug: "grecko-vs-machine",
    title: "Grecko Vs Machine",
    category: "game",
    section: "arcade",
    genre: { en: "2D Platformer Game", es: "Plataformero 2D" },
    status: "in-progress",
    cover: greckoCover,
    media: [image(grecko1), image(grecko2), image(grecko3)],
    links: {},
    description: {
      en: [
        "Grecko Vs Machine is the video game I am currently working on. It's a 2D platformer game in the style of metroidvania where you play as a lizard named Grecko who has to save the world from a robot invasion.",
        "We expect to release the beta before mid-2024.",
      ],
      es: [
        "Grecko Vs Machine es el videojuego en el que estoy trabajando actualmente. Es un plataformero 2D estilo metroidvania en el que juegas como Grecko, un lagarto que tiene que salvar al mundo de una invasión de robots.",
        "Esperamos lanzar la beta antes de mediados de 2024.",
      ],
    },
    roles: [role.gameDev, role.gameDesign, role.art2d, role.animation],
  },
  {
    slug: "hamster-run",
    title: "Hamster Run",
    category: "game",
    section: "arcade",
    genre: { en: "Vertical Runner Game", es: "Runner vertical" },
    status: "in-progress",
    cover: hamsterCover,
    media: [image(hamster2), image(hamster1), image(hamster3)],
    links: {},
    description: {
      en: [
        "Hamster Run is a runner-style game where you play as a hamster running along the map, and your duty is to dodge all obstacles. Throughout the map, you can find different power-ups that will either help you or make the game more challenging.",
        "It features a start menu that allows you to customize the character. The designs and animations of this video game were created in Animate CC and Photoshop.",
      ],
      es: [
        "Hamster Run es un juego tipo runner en el que eres un hámster que corre por el mapa y tu misión es esquivar todos los obstáculos. A lo largo del mapa encontrarás distintos power-ups que te ayudarán o harán el juego más desafiante.",
        "Tiene un menú de inicio que permite personalizar al personaje. Los diseños y animaciones del juego se hicieron en Animate CC y Photoshop.",
      ],
    },
    roles: [role.gameDev, role.gameDesign, role.art2d, role.animation],
    tools: ["Animate CC", "Photoshop"],
  },
  {
    slug: "domino",
    title: "Domino",
    category: "game",
    section: "arcade",
    webBuild: itchEmbed(8200095),
    genre: { en: "Board Game", es: "Juego de mesa" },
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
    description: {
      en: [
        "This is a recreation of the Domino board game made for the Data Structures course at the National University of Colombia, Medellin campus. The game has only one mode: player versus 3 AI opponents, each with 7 randomly distributed tiles.",
        "The game ends when any player runs out of tiles or if the game stalls (none of the players can move). In that case, the player with the fewest points wins by adding up the values of their tiles.",
      ],
      es: [
        "Una recreación del juego de mesa Dominó hecha para la materia de Estructuras de Datos de la Universidad Nacional de Colombia, sede Medellín. El juego tiene un solo modo: el jugador contra 3 rivales controlados por IA, cada uno con 7 fichas repartidas al azar.",
        "La partida termina cuando algún jugador se queda sin fichas o si el juego se tranca (nadie puede mover). En ese caso gana quien tenga menos puntos sumando los valores de sus fichas.",
      ],
    },
    roles: [role.gameDev, role.gameDesign, role.art2d],
    platforms: ["Web"],
    context: {
      en: "Data Structures course — National University of Colombia",
      es: "Materia de Estructuras de Datos — Universidad Nacional de Colombia",
    },
  },
  // ---- Animaciones (televisor) ----
  {
    slug: "maquinas-del-futuro",
    title: "Maquinas del Futuro",
    category: "animation",
    section: "tv",
    genre: { en: "Animated Short", es: "Cortometraje animado" },
    status: "released",
    year: 2023,
    cover: mdfCover,
    video: { provider: "vimeo", id: "999399984" },
    media: [],
    links: {},
    description: {
      en: [
        '"Maquinas del Futuro" is a short animated film that tells the story of computing, from the early work of Ada Lovelace on the Analytical Engine to recent advances like virtual reality.',
        "This short film was created using the stop-motion animation technique, fully animated by me, and the music was composed by Juan Camilo Valencia.",
      ],
      es: [
        '"Máquinas del Futuro" es un cortometraje animado que cuenta la historia de la computación, desde los primeros trabajos de Ada Lovelace en la Máquina Analítica hasta avances recientes como la realidad virtual.',
        "El corto se hizo con la técnica de stop-motion, animado completamente por mí, y la música fue compuesta por Juan Camilo Valencia.",
      ],
    },
    roles: [role.animator, "Storyboard", role.design],
    tools: ["Stop-motion"],
    credits: [{ en: "Music: Juan Camilo Valencia", es: "Música: Juan Camilo Valencia" }],
  },
  {
    slug: "el-amigo-robot",
    title: "El Amigo Robot",
    category: "animation",
    section: "tv",
    genre: { en: "Animated Short", es: "Cortometraje animado" },
    status: "released",
    year: 2024,
    cover: robotCover,
    video: { provider: "youtube", id: "-6xzjc_b_4U" },
    media: [],
    links: {},
    description: {
      en: [
        '"El Amigo Robot" is an animated short film that explores the bond between a robot and a stray cat. The goal of this piece is to show how an apparently inanimate being can develop empathy and care for another living creature. The short film was produced with the intention of experimenting with visual storytelling and emotions, using modern technology to bring the story to life.',
      ],
      es: [
        '"El Amigo Robot" es un cortometraje animado que explora el vínculo entre un robot y un gato callejero. La pieza busca mostrar cómo un ser aparentemente inanimado puede desarrollar empatía y cuidado por otra criatura viva. Se produjo con la intención de experimentar con la narrativa visual y las emociones, usando tecnología moderna para darle vida a la historia.',
      ],
    },
    roles: [role.animator, "Storyboard", role.design],
  },
];

export const getProject = (slug: string) => projects.find((p) => p.slug === slug);
