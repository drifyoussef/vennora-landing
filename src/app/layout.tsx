import type { Metadata, Viewport } from "next";
import { Geist } from "next/font/google";
import { Analytics } from "@/components/analytics";
import { Reveal } from "@/components/reveal";
import { SITE } from "@/config/site";
import "./globals.css";

const geist = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
});

const title = "Vennora — le logiciel des métiers d’intervention";
const description =
  "Clients, équipements, planning, comptes-rendus signés : Vennora suit l’intervention du parc client au rapport envoyé. Ramonage, chauffage, climatisation, serrurerie, piscine, nuisibles, traitement de l’eau.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE.domaine),
  title,
  description,
  applicationName: "Vennora",
  keywords: [
    "logiciel intervention",
    "gestion de maintenance",
    "ramonage",
    "chauffage",
    "climatisation",
    "rapport d’intervention",
    "GMAO terrain",
  ],
  alternates: { canonical: "/" },
  openGraph: {
    title,
    description,
    type: "website",
    locale: "fr_FR",
    siteName: SITE.nom,
    url: SITE.domaine,
    images: [
      {
        url: "/og.png",
        width: 1200,
        height: 630,
        alt: "Vennora — du parc client au rapport signé",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
    images: ["/og.png"],
  },
};

export const viewport: Viewport = {
  themeColor: "#0F3D4C",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="fr" className={geist.variable}>
      <body>
        {children}
        <Reveal />
        <Analytics />
      </body>
    </html>
  );
}
