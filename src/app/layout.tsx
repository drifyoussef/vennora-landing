import type { Metadata, Viewport } from "next";
import { Geist } from "next/font/google";
import { Analytics } from "@/components/analytics";
import { Reveal } from "@/components/reveal";
import { SITE } from "@/config/site";
import { metadonnees } from "@/lib/metadonnees";
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
  ...metadonnees({ titre: title, description, chemin: "/" }),
};

export const viewport: Viewport = {
  themeColor: "#0F3D4C",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    /* `data-scroll-behavior` n’est pas décoratif : c’est lui qui répare les
       liens du pied de page.

       `globals.css` pose `scroll-behavior: smooth` sur `<html>` pour que les
       ancres de l’accueil glissent. Jusqu’à Next 15, le routeur neutralisait
       ce réglage le temps d’un changement de page ; Next 16 ne le fait plus
       — sauf si cet attribut est présent (guide de migration, « Scroll
       Behavior Override »).

       Sans lui, cliquer « Conditions générales » depuis le pied de page
       ouvrait la nouvelle page à l’endroit où l’on était, tout en bas, puis
       la faisait remonter en glissant. On atterrissait au pied des mentions
       légales, ce qui donne l’impression d’un site cassé. */
    <html lang="fr" data-scroll-behavior="smooth" className={geist.variable}>
      <body>
        <a href="#contenu" className="saut">
          Aller au contenu
        </a>
        {children}
        <Reveal />
        <Analytics />
      </body>
    </html>
  );
}
