import Banner from "@/components/Banner";
import Projects from "@/components/Projects";
import Arcade from "@/components/Arcade";
import RetroTV from "@/components/RetroTV";
import Skills from "@/components/Skills";
import About from "@/components/About";
import type { Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";

// Primero los proyectos principales, luego el baúl de juegos (arcade) y las animaciones (televisor).
export default async function Home({ params }: PageProps<"/[lang]">) {
  const lang = (await params).lang as Locale;
  const dict = getDictionary(lang);

  return (
    <>
      <Banner lang={lang} t={dict.banner} />
      <Projects lang={lang} t={dict.projects} />
      <Arcade lang={lang} t={dict.arcade} comingSoon={dict.projects.comingSoon} />
      <RetroTV lang={lang} t={dict.tv} />
      <Skills lang={lang} t={dict.skills} />
      <About t={dict.about} />
    </>
  );
}
