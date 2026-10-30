"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";
import { prefersReducedMotion } from "./motion";

// Hace aparecer (fade + deslizamiento) todo elemento con data-reveal cuando entra a la pantalla.
// Usa data-revealed en vez de una clase para que React no la borre al volver a renderizar.
export default function RevealObserver() {
  const pathname = usePathname();

  useEffect(() => {
    const root = document.documentElement;
    if (prefersReducedMotion() || !("IntersectionObserver" in window)) {
      root.classList.remove("reveal-ready");
      return;
    }
    // Solo se ocultan los elementos cuando el JS ya corre: sin JS, todo se ve normal.
    root.classList.add("reveal-ready");

    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            (entry.target as HTMLElement).dataset.revealed = "";
            io.unobserve(entry.target);
          }
        }
      },
      { rootMargin: "0px 0px -8% 0px", threshold: 0.1 }
    );

    const observeAll = () =>
      document.querySelectorAll<HTMLElement>("[data-reveal]:not([data-revealed])").forEach((el) => io.observe(el));
    observeAll();

    // Los filtros de proyectos montan tarjetas nuevas: también hay que observarlas.
    const mo = new MutationObserver(observeAll);
    mo.observe(document.body, { childList: true, subtree: true });

    return () => {
      io.disconnect();
      mo.disconnect();
    };
  }, [pathname]);

  return null;
}
