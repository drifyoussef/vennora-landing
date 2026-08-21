import type { Metadata } from "next";
import { SITE } from "@/config/site";

/**
 * Métadonnées d’une page.
 *
 * Next ne fusionne pas `openGraph` : une page qui déclare un titre Open Graph
 * remplace tout le bloc de la mise en page racine, image comprise. Chaque
 * page métier partait donc en aperçu — LinkedIn, WhatsApp, Slack — sans
 * visuel, et sans carte Twitter du tout. Ce petit constructeur évite d’avoir
 * à s’en souvenir : on lui donne ce qui change, il rebâtit l’ensemble.
 */
const IMAGE = {
  url: "/og.png",
  width: 1200,
  height: 630,
  alt: "Vennora — du parc client au rapport signé",
};

export function metadonnees({
  titre,
  description,
  chemin,
  type = "website",
  indexable = true,
}: {
  titre: string;
  description: string;
  /** Chemin absolu depuis la racine, `/` pour l’accueil. */
  chemin: string;
  type?: "website" | "article";
  /** Faux pour les pages qui n’ont rien à faire dans un index. */
  indexable?: boolean;
}): Metadata {
  const url = chemin === "/" ? SITE.domaine : `${SITE.domaine}${chemin}`;

  return {
    title: titre,
    description,
    alternates: { canonical: url },
    ...(indexable ? {} : { robots: { index: false, follow: true } }),
    openGraph: {
      title: titre,
      description,
      type,
      locale: "fr_FR",
      siteName: SITE.nom,
      url,
      images: [IMAGE],
    },
    twitter: {
      card: "summary_large_image",
      title: titre,
      description,
      images: [IMAGE.url],
    },
  };
}
