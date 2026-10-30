import Link from "next/link";
import Museum from "./museum/Museum";
import type { Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/dictionaries";

// Ventana al museo en el inicio: el personaje lo recorre solo y un clic te lleva a jugarlo.
export default function MuseumTeaser({ lang, t }: { lang: Locale; t: Dictionary["museum"] }) {
  return (
    <section id="museum" className="museum-teaser">
      <h1 className="subtitulo" data-reveal>
        {t.title}
      </h1>
      <p className="section-intro" data-reveal>
        {t.teaser}
      </p>
      <Link href={`/${lang}/gallery`} className="museum-teaser-window" aria-label={t.enter} data-reveal>
        <Museum lang={lang} t={t} demo />
        <span className="museum-teaser-cta">{t.enter}</span>
      </Link>
    </section>
  );
}
