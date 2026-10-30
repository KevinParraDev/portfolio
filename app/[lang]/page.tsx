import Banner from "@/components/Banner";
import Skills from "@/components/Skills";
import About from "@/components/About";
import Reels from "@/components/Reels";
import Projects from "@/components/Projects";
import type { Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";

// Los proyectos van primero: es lo que la mayoría de visitantes viene a ver.
export default async function Home({ params }: PageProps<"/[lang]">) {
  const lang = (await params).lang as Locale;
  const dict = getDictionary(lang);

  return (
    <>
      <Banner lang={lang} t={dict.banner} />
      <Projects lang={lang} t={dict.projects} />
      <Reels t={dict.reels} />
      <Skills lang={lang} t={dict.skills} />
      <About t={dict.about} />
    </>
  );
}
