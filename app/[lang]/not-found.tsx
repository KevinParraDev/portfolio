import Link from "next/link";
import { getDictionary } from "@/i18n/dictionaries";

// La página de "no existe" no recibe el idioma, así que muestra el mensaje en los dos.
export default function NotFound() {
  const en = getDictionary("en").notFound;
  const es = getDictionary("es").notFound;

  return (
    <div className="game not-found">
      <h1>{en.title}</h1>
      <p>{en.text}</p>
      <p>{es.text}</p>
      <Link href="/" className="banner-cta">
        <span className="press-start">{en.back}</span>
      </Link>
    </div>
  );
}
