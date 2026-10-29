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
import vrCover from "@/public/img/projects/m3P.png";
import vr1 from "@/public/img/projects/m31.png";
import vr2 from "@/public/img/projects/m32.png";

export type Video = { provider: "youtube" | "vimeo"; id: string };

export type Media =
  | { type: "video"; video: Video; thumbnail: StaticImageData }
  | { type: "image"; src: StaticImageData };

export type Project = {
  slug: string;
  title: string;
  genre: string;
  /** Año de lanzamiento, o "in progress" si todavía no sale. */
  year: string;
  cover: StaticImageData;
  /** Video que se muestra solo, sin carrusel (cortos animados). */
  video?: Video;
  /** Carrusel: el primer elemento es el que se ve al entrar. */
  media: Media[];
  links: { play?: string; github?: string };
  description: string[];
  roles: string[];
  tools?: string[];
};

const image = (src: StaticImageData): Media => ({ type: "image", src });

export const projects: Project[] = [
  {
    slug: "zeri-adventure",
    title: "Zeri's Adventure",
    genre: "2D Metroidvania Game",
    year: "2023",
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
  },
  {
    slug: "hamster-run",
    title: "Hamster Run",
    genre: "Vertical Runner Game",
    year: "in progress",
    cover: hamsterCover,
    media: [image(hamster2), image(hamster1), image(hamster3)],
    links: {},
    description: [
      "Hamster Run is a runner-style game where you play as a hamster running along the map, and your duty is to dodge all obstacles. Throughout the map, you can find different power-ups that will either help you or make the game more challenging.",
      "It features a start menu that allows you to customize the character. The designs and animations of this video game were created in Animate CC and Photoshop.",
    ],
    roles: ["Game Development", "Game Design", "2D Art", "Animation"],
  },
  {
    slug: "survive-bird",
    title: "Survive Bird",
    genre: "Hypercasual Game",
    year: "2021",
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
  },
  {
    slug: "grecko-vs-machine",
    title: "Grecko Vs Machine",
    genre: "2D Platformer Game",
    year: "in progress",
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
    slug: "knock-it-out",
    title: "Knock It Out: The Show",
    genre: "2D Platformer Game",
    year: "2024",
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
    tools: ["Unity 2D", "C#", "Aseprite"],
  },
  {
    slug: "maquinas-del-futuro",
    title: "Maquinas del Futuro",
    genre: "Animated Short",
    year: "2023",
    cover: mdfCover,
    video: { provider: "vimeo", id: "999399984" },
    media: [],
    links: {},
    description: [
      '"Maquinas del Futuro" is a short animated film that tells the story of computing, from the early work of Ada Lovelace on the Analytical Engine to recent advances like virtual reality.',
      "This short film was created using the stop-motion animation technique, fully animated by me, and the music was composed by Juan Camilo Valencia.",
    ],
    roles: ["Animator", "Storyboard", "Design"],
  },
  {
    slug: "el-amigo-robot",
    title: "El Amigo Robot",
    genre: "Animated Short",
    year: "2024",
    cover: robotCover,
    video: { provider: "youtube", id: "-6xzjc_b_4U" },
    media: [],
    links: {},
    description: [
      '"El Amigo Robot" is an animated short film that explores the bond between a robot and a stray cat. The goal of this piece is to show how an apparently inanimate being can develop empathy and care for another living creature. The short film was produced with the intention of experimenting with visual storytelling and emotions, using modern technology to bring the story to life.',
    ],
    roles: ["Animator", "Storyboard", "Design"],
  },
  {
    slug: "domino",
    title: "Domino",
    genre: "Board Game",
    year: "2022",
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
  },
  {
    slug: "vr-unal",
    title: "VR UNAL",
    genre: "VR Game",
    year: "in progress",
    cover: vrCover,
    media: [image(vr1), image(vr2)],
    links: {},
    description: [
      "VR UNAL is an augmented reality game made for the National University of Colombia, Medellín campus, where players can explore a small floating island that contains one of the university's most representative buildings (Block M3). As students explore the game, they will learn facts and a bit of history about the university's Faculty of Engineering.",
    ],
    roles: ["Game Development", "3D Artist"],
  },
];

export const getProject = (slug: string) => projects.find((p) => p.slug === slug);
