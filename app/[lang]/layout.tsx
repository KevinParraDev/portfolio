import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Pixelify_Sans } from "next/font/google";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Effects from "@/components/effects/Effects";
import { hasLocale, locales } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";
import "../globals.css";

const pixelify = Pixelify_Sans({ subsets: ["latin"], weight: ["400", "700"] });

// Vercel define esta variable con el dominio de producción; en local se usa localhost.
const siteUrl = process.env.VERCEL_PROJECT_PRODUCTION_URL
  ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
  : "http://localhost:3000";

// Solo existen /en y /es; cualquier otro idioma da 404.
export const dynamicParams = false;

export function generateStaticParams() {
  return locales.map((lang) => ({ lang }));
}

export async function generateMetadata({ params }: LayoutProps<"/[lang]">): Promise<Metadata> {
  const { lang } = await params;
  if (!hasLocale(lang)) return {};
  const t = getDictionary(lang).meta;
  return {
    metadataBase: new URL(siteUrl),
    title: { default: t.title, template: "%s | Kevin Parra" },
    description: t.description,
    alternates: { languages: { en: "/en", es: "/es" } },
    openGraph: {
      title: t.title,
      description: t.ogDescription,
      type: "website",
      locale: lang === "es" ? "es_CO" : "en_US",
      images: ["/img/Perfil_D.png"],
    },
  };
}

export default async function RootLayout({ children, params }: LayoutProps<"/[lang]">) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();
  const dict = getDictionary(lang);

  return (
    <html lang={lang} className={pixelify.className}>
      <body>
        <Effects achievement={dict.achievement} />
        <Navbar lang={lang} t={dict.nav} />
        <main>{children}</main>
        <Footer lang={lang} t={dict.footer} nav={dict.nav} />
      </body>
    </html>
  );
}
