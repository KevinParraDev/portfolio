import Link from "next/link";
import Typewriter from "./Typewriter";
import SecretTap from "./SecretTap";
import type { Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/dictionaries";

export default function Banner({ lang, t }: { lang: Locale; t: Dictionary["banner"] }) {
  return (
    <div className="banner" id="home">
      <div className="welcome">
        <h2>{t.welcome}</h2>
      </div>
      <h1>
        <SecretTap>
          <Typewriter text={t.name} />
        </SecretTap>
      </h1>
      <p className="banner-tagline">{t.tagline}</p>
      <Link href={`/${lang}#projects`} className="banner-cta">
        <span className="press-start">{t.pressStart}</span>
        <span className="banner-cta-caption">{t.caption}</span>
      </Link>
    </div>
  );
}
