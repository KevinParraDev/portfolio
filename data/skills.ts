import type { StaticImageData } from "next/image";
import type { Text } from "@/i18n/config";
import type { Dictionary } from "@/i18n/dictionaries";
import { projects } from "./projects";

import unity from "@/public/img/skills/unity.png";
import csharp from "@/public/img/skills/csharp.png";
import unreal from "@/public/img/skills/unreal.png";
import blender from "@/public/img/skills/blender.png";
import photoshop from "@/public/img/skills/photoshop.png";
import aseprite from "@/public/img/skills/aseprite.png";
import animate from "@/public/img/skills/animate.png";
import harmony from "@/public/img/skills/harmony.png";

type Category = keyof Dictionary["skills"]["categories"];

export type Tool = {
  name: string;
  icon: StaticImageData;
  category: Category;
  /** Cómo aparece en el campo "tools" de los proyectos, para listar dónde la usaste. */
  matches: string[];
};

// Íconos recortados de tu imagen de skills original (public/img/SkillsEn2.png).
export const tools: Tool[] = [
  { name: "Unity", icon: unity, category: "engine", matches: ["Unity"] },
  { name: "C#", icon: csharp, category: "language", matches: ["C#"] },
  { name: "Unreal", icon: unreal, category: "engine", matches: ["Unreal"] },
  { name: "Blender", icon: blender, category: "art3d", matches: ["Blender"] },
  { name: "Photoshop", icon: photoshop, category: "art2d", matches: ["Photoshop"] },
  { name: "Aseprite", icon: aseprite, category: "art2d", matches: ["Aseprite"] },
  { name: "Animate CC", icon: animate, category: "animation", matches: ["Animate"] },
  { name: "Harmony", icon: harmony, category: "animation", matches: ["Harmony"] },
];

/** Proyectos que tienen esta herramienta en su ficha técnica. */
export const projectsUsing = (tool: Tool) =>
  projects.filter((p) => p.tools?.some((t) => tool.matches.some((m) => t.includes(m)))).map((p) => p.title);

// Lo que sabes hacer, sacado de tus roles en los proyectos.
export const abilities: Text[] = [
  { en: "Game Design", es: "Diseño de juego" },
  { en: "Gameplay Programming", es: "Programación de gameplay" },
  { en: "Level Design", es: "Diseño de niveles" },
  { en: "Multiplayer", es: "Multijugador" },
  "Pixel Art",
  { en: "2D Animation", es: "Animación 2D" },
  { en: "UI Art", es: "Arte de UI" },
  "VFX",
  { en: "Localization", es: "Localización" },
  { en: "Store Porting", es: "Ports a tiendas" },
  { en: "Stop-motion", es: "Stop-motion" },
];
