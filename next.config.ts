import type { NextConfig } from "next";

// Rutas viejas de cada proyecto, para que los links que ya compartiste sigan funcionando.
const oldProjectSlugs = [
  "zeri-adventure",
  "hamster-run",
  "survive-bird",
  "grecko-vs-machine",
  "knock-it-out",
  "maquinas-del-futuro",
  "el-amigo-robot",
  "domino",
];

// Proyectos que ya no están en el portafolio: sus links llevan a la lista de proyectos.
const removedProjectSlugs = ["vr-unal"];

const nextConfig: NextConfig = {
  async redirects() {
    return [
      ...oldProjectSlugs.map((slug) => ({
        source: `/${slug}`,
        destination: `/projects/${slug}`,
        permanent: true,
      })),
      ...removedProjectSlugs.flatMap((slug) => [
        { source: `/${slug}`, destination: "/#projects", permanent: false },
        { source: `/projects/${slug}`, destination: "/#projects", permanent: false },
        { source: `/:lang(en|es)/projects/${slug}`, destination: "/:lang#projects", permanent: false },
      ]),
      { source: "/galery", destination: "/gallery", permanent: true },
      { source: "/:lang(en|es)/galery", destination: "/:lang/gallery", permanent: true },
    ];
  },
};

export default nextConfig;
