"use client";

import { useRef, type CSSProperties, type PointerEvent, type ReactNode } from "react";
import { prefersReducedMotion } from "./effects/motion";

const MAX_TILT = 8; // grados

// Inclina la tarjeta en 3D siguiendo el mouse y mueve el brillo encima. En pantallas táctiles no hace nada.
export default function TiltCard({
  className,
  style,
  children,
}: {
  className: string;
  style?: CSSProperties;
  children: ReactNode;
}) {
  const ref = useRef<HTMLElement>(null);

  const onMove = (e: PointerEvent<HTMLElement>) => {
    if (e.pointerType !== "mouse" || prefersReducedMotion()) return;
    const el = ref.current!;
    const rect = el.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width;
    const y = (e.clientY - rect.top) / rect.height;
    // La tarjeta destacada es grande: se inclina la mitad para que no maree.
    const max = className.includes("project-card-featured") ? MAX_TILT / 2 : MAX_TILT;
    el.style.setProperty("--ry", `${(x - 0.5) * max * 2}deg`);
    el.style.setProperty("--rx", `${(0.5 - y) * max * 2}deg`);
    el.style.setProperty("--gx", `${x * 100}%`);
    el.style.setProperty("--gy", `${y * 100}%`);
  };

  const onLeave = () => {
    const el = ref.current!;
    el.style.setProperty("--rx", "0deg");
    el.style.setProperty("--ry", "0deg");
  };

  return (
    <article ref={ref} className={className} style={style} onPointerMove={onMove} onPointerLeave={onLeave} data-reveal>
      {children}
    </article>
  );
}
