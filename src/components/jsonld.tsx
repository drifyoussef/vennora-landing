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
        logo: `${SITE.domaine}/icon.png`,
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
        offers: [
          { "@type": "Offer", name: "Essentiel", price: "39", priceCurrency: "EUR" },
          { "@type": "Offer", name: "Pro", price: "99", priceCurrency: "EUR" },
          { "@type": "Offer", name: "Business", price: "249", priceCurrency: "EUR" },
        ],
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
