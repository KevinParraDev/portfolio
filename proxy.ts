import { NextResponse, type NextRequest } from "next/server";
import { defaultLocale, hasLocale, LOCALE_COOKIE, locales, type Locale } from "./i18n/config";

// Elige el idioma: primero el que el visitante eligió con el botón EN/ES (cookie),
// si no, el idioma de su navegador; si no es inglés ni español, inglés.
function getLocale(request: NextRequest): Locale {
  const saved = request.cookies.get(LOCALE_COOKIE)?.value;
  if (saved && hasLocale(saved)) return saved;

  const accepted = (request.headers.get("accept-language") ?? "")
    .split(",")
    .map((part) => {
      const [tag, q] = part.trim().split(";q=");
      return { lang: tag.slice(0, 2).toLowerCase(), q: q ? Number(q) : 1 };
    })
    .sort((a, b) => b.q - a.q);

  return accepted.find((a) => hasLocale(a.lang))?.lang as Locale | undefined ?? defaultLocale;
}

// Toda ruta sin idioma (/, /projects/domino...) se redirige a la versión con idioma (/es/projects/domino).
export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const hasPrefix = locales.some((l) => pathname === `/${l}` || pathname.startsWith(`/${l}/`));
  if (hasPrefix) return;

  request.nextUrl.pathname = `/${getLocale(request)}${pathname === "/" ? "" : pathname}`;
  return NextResponse.redirect(request.nextUrl);
}

export const config = {
  // No aplica a la API, a los archivos internos de Next ni a archivos con extensión (imágenes, GIFs, íconos...).
  matcher: ["/((?!api|_next|.*\\..*).*)"],
};
