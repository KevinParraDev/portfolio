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
  "vr-unal",
];

const nextConfig: NextConfig = {
  async redirects() {
    return [
      ...oldProjectSlugs.map((slug) => ({
        source: `/${slug}`,
        destination: `/projects/${slug}`,
        permanent: true,
      })),
      { source: "/galery", destination: "/gallery", permanent: true },
    ];
  },
};

export default nextConfig;
