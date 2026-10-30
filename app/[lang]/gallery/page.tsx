import type { Metadata } from "next";
import Image, { type StaticImageData } from "next/image";
import type { Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";
import Museum from "@/components/museum/Museum";
import kio1 from "@/public/img/galery/kio (1).gif";
import kio2 from "@/public/img/galery/kio (2).gif";
import kio3 from "@/public/img/galery/kio (3).gif";
import za1 from "@/public/img/galery/za1.gif";
import za2 from "@/public/img/galery/za2.gif";
import za3 from "@/public/img/galery/za3.gif";
import bull from "@/public/img/galery/ToroCorriendo.gif";
import gvm1 from "@/public/img/galery/gvm1.gif";
import gvm2 from "@/public/img/galery/gvm2.gif";
import gvm3 from "@/public/img/galery/gvm3.gif";
import ht1 from "@/public/img/galery/ht1.gif";
import ht2 from "@/public/img/galery/ht2.gif";
import ht3 from "@/public/img/galery/ht3.gif";
import ht4 from "@/public/img/galery/ht4.gif";
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

export async function generateMetadata({ params }: PageProps<"/[lang]/gallery">): Promise<Metadata> {
  const t = getDictionary((await params).lang as Locale).gallery;
  return { title: t.title, description: t.description };
}

type Item = { src: StaticImageData; size: "s" | "m" };

// "from" es el juego de donde sale el personaje.
const characters: { name?: string; from: string; items: Item[] }[] = [
  { name: "Juan", from: "Knock It Out: The Show", items: [kio2, kio1, kio3].map((src) => ({ src, size: "m" })) },
  { name: "Zeri", from: "Zeri's Adventure", items: [za1, za2, za3].map((src) => ({ src, size: "m" })) },
  {
    from: "Grecko vs Machine",
    items: [
      { src: gvm1, size: "m" },
      { src: gvm2, size: "s" },
      { src: gvm3, size: "m" },
    ],
  },
  { from: "Grecko vs Machine", items: [ht1, ht2, ht3, ht4].map((src) => ({ src, size: "s" })) },
];

const environments = [
  [env1, env2],
  [env3, env4],
  [env5, env6],
];

const extras = [extra1, extra2, extra3, extra4];

// GIFs se sirven sin optimizar para que conserven la animación.
// La galería es el Museo KP (un mini juego); debajo queda la vista clásica con todas las obras,
// para quien no quiera jugar y para que Google y los lectores de pantalla vean el arte.
export default async function GalleryPage({ params }: PageProps<"/[lang]/gallery">) {
  const lang = (await params).lang as Locale;
  const dict = getDictionary(lang);
  const t = dict.gallery;

  return (
    <div className="game gallery-page">
      <h1>{dict.museum.title}</h1>
      <p className="section-intro">{dict.museum.intro}</p>
      <Museum lang={lang} t={dict.museum} />

      <details className="classic-gallery">
        <summary>{t.classic}</summary>
      <h1>{t.characters}</h1>
      {characters.map(({ name, from, items }, i) => (
        <section key={i} data-reveal>
          {name && <h2>{name}</h2>}
          <h3>
            {t.from} {from}
          </h3>
          <div>
            {items.map(({ src, size }, j) => (
              <Image key={j} src={src} alt={`${name ?? from} animation ${j + 1}`} unoptimized className={`image-box-galery-${size}`} />
            ))}
          </div>
        </section>
      ))}
      <h3>{t.bull}</h3>
      <div className="bull-container">
        <Image src={bull} alt="Bull running animation" unoptimized className="image-box-galery-toro" />
      </div>

      <h1>{t.environments}</h1>
      {environments.map((row, i) => (
        <div key={i} className="env-containter" data-reveal>
          {row.map((src, j) => (
            <Image key={j} src={src} alt={`Environment ${i * 2 + j + 1}`} quality={100} className="image-galery-env" sizes="(max-width: 800px) 100vw, 50vw" />
          ))}
        </div>
      ))}

      <h1>{t.extra}</h1>
      {extras.map((src, i) => (
        <Image key={i} src={src} alt={`Extra artwork ${i + 1}`} quality={100} className="image-galery-env" sizes="(max-width: 800px) 100vw, 50vw" />
      ))}
      </details>
    </div>
  );
}
