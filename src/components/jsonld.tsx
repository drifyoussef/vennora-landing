import { SITE } from "@/config/site";
import { METIERS } from "@/data/metiers";

/**
 * Données structurées.
 *
 * Trois objets, pas plus : qui édite (Organization), ce qui est vendu
 * (SoftwareApplication, avec la grille tarifaire) et la foire aux questions,
 * seule candidate crédible à un résultat enrichi. Déclarer davantage de types
 * qu’on n’en affiche est le meilleur moyen de se faire ignorer.
 */
export function JsonLd({ faq }: { faq: [string, string][] }) {
  const donnees = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": `${SITE.domaine}/#organisation`,
        name: SITE.nom,
        url: SITE.domaine,
        // Un PNG plutôt que le favicon SVG : Google veut une image
        // matricielle d’au moins 112 px pour le logo d’une organisation.
        logo: `${SITE.domaine}/logo.png`,
        email: SITE.email,
        slogan: SITE.baseline,
        areaServed: "FR",
      },
      {
        "@type": "SoftwareApplication",
        "@id": `${SITE.domaine}/#logiciel`,
        name: SITE.nom,
        applicationCategory: "BusinessApplication",
        operatingSystem: "Web, iOS, Android",
        description: SITE.description,
        url: SITE.domaine,
        publisher: { "@id": `${SITE.domaine}/#organisation` },
        featureList: METIERS.map((m) => m.nom),
        // Tarif public, hors taxes, au mois — comme la grille l’affiche.
        offers: (
          [
            ["Essentiel", "39"],
            ["Pro", "99"],
            ["Business", "249"],
          ] as const
        ).map(([name, price]) => ({
          "@type": "Offer",
          name,
          price,
          priceCurrency: "EUR",
          priceSpecification: {
            "@type": "UnitPriceSpecification",
            price,
            priceCurrency: "EUR",
            unitText: "MONTH",
            valueAddedTaxIncluded: false,
          },
        })),
      },
      {
        "@type": "FAQPage",
        mainEntity: faq.map(([question, reponse]) => ({
          "@type": "Question",
          name: question,
          acceptedAnswer: { "@type": "Answer", text: reponse },
        })),
      },
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(donnees) }}
    />
  );
}
