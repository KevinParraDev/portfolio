import type { Metadata } from "next";
import { Pixelify_Sans } from "next/font/google";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import "./globals.css";

const pixelify = Pixelify_Sans({ subsets: ["latin"], weight: ["400", "700"] });

// Vercel define esta variable con el dominio de producción; en local se usa localhost.
const siteUrl = process.env.VERCEL_PROJECT_PRODUCTION_URL
  ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
  : "http://localhost:3000";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: { default: "Kevin Parra | Game Developer", template: "%s | Kevin Parra" },
  description:
    "Portfolio of Kevin Parra, indie game developer and artist: Unity games, 2D art, animation and VR projects.",
  openGraph: {
    title: "Kevin Parra | Game Developer",
    description: "Indie games, 2D art, animation and VR projects.",
    type: "website",
    images: ["/img/Perfil_D.png"],
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={pixelify.className}>
      <body>
        <Navbar />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
