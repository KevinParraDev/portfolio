"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import type { Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/dictionaries";

const SEEN_KEY = "kp-museum-ticket";
const DELAY_MS = 8000;

// Ticket de entrada al museo: aparece una sola vez por visitante, unos segundos después de llegar al inicio.
export default function MuseumTicket({ lang, t }: { lang: Locale; t: Dictionary["museum"] }) {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    try {
      if (localStorage.getItem(SEEN_KEY)) return;
    } catch {
      return; // sin almacenamiento (modo privado estricto): mejor no mostrarlo que mostrarlo siempre
    }
    const id = setTimeout(() => {
      setOpen(true);
      try {
        localStorage.setItem(SEEN_KEY, "1");
      } catch {}
    }, DELAY_MS);
    return () => clearTimeout(id);
  }, []);

  if (!open) return null;

  return (
    <aside className="museum-ticket" role="status">
      <span className="museum-ticket-stub" aria-hidden>
        🎟
      </span>
      <p>{t.ticket}</p>
      <div className="museum-ticket-actions">
        <Link href={`/${lang}/gallery`} className="museum-ticket-enter" onClick={() => setOpen(false)}>
          {t.ticketEnter} ▶
        </Link>
        <button type="button" onClick={() => setOpen(false)} aria-label={t.ticketClose}>
          ✕
        </button>
      </div>
    </aside>
  );
}
