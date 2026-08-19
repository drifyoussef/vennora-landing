import type { Metadata, Viewport } from "next";
import { Geist } from "next/font/google";
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
  metadataBase: new URL("https://vennora.app"),
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
  openGraph: {
    title,
    description,
    type: "website",
    locale: "fr_FR",
    siteName: "Vennora",
  },
  twitter: { card: "summary_large_image", title, description },
  icons: { icon: [{ url: "/vennora.svg", type: "image/svg+xml" }] },
};

export const viewport: Viewport = {
  themeColor: "#0F3D4C",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="fr" className={geist.variable}>
      <body>{children}</body>
    </html>
  );
}
