import Starfield from "./Starfield";
import RevealObserver from "./RevealObserver";
import ClickSparks from "./ClickSparks";
import PageTransition from "./PageTransition";
import KonamiCode from "./KonamiCode";
import type { Dictionary } from "@/i18n/dictionaries";

// Todos los efectos globales del sitio en un solo lugar.
export default function Effects({ achievement }: { achievement: Dictionary["achievement"] }) {
  return (
    <>
      <Starfield />
      <RevealObserver />
      <ClickSparks />
      <PageTransition />
      <KonamiCode t={achievement} />
    </>
  );
}
