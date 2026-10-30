// Si la persona pidió "reducir movimiento" en su sistema, los efectos se apagan o se simplifican.
export const prefersReducedMotion = () =>
  typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
