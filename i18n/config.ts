export const locales = ["en", "es"] as const;
export type Locale = (typeof locales)[number];
export const defaultLocale: Locale = "en";

/** Nombre de la cookie donde se guarda el idioma que eligió el visitante. */
export const LOCALE_COOKIE = "NEXT_LOCALE";

export const hasLocale = (value: string): value is Locale => (locales as readonly string[]).includes(value);

/** Un texto que cambia según el idioma, o uno igual en ambos (nombres propios, herramientas...). */
export type Text = string | Record<Locale, string>;

export const tr = (text: Text, lang: Locale) => (typeof text === "string" ? text : text[lang]);

/** Cambia el idioma de una ruta: /en/projects/domino → /es/projects/domino */
export const switchLocalePath = (pathname: string, lang: Locale) =>
  pathname.replace(/^\/(en|es)(?=\/|$)/, `/${lang}`) || `/${lang}`;
