import Banner from "@/components/Banner";
import Skills from "@/components/Skills";
import About from "@/components/About";
import Reels from "@/components/Reels";
import Projects from "@/components/Projects";

// Los proyectos van primero: es lo que la mayoría de visitantes viene a ver.
export default function Home() {
  return (
    <>
      <Banner />
      <Projects />
      <Reels />
      <Skills />
      <About />
    </>
  );
}
