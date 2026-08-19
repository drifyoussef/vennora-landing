import type { MetadataRoute } from "next";
import { SITE } from "@/config/site";
import { METIERS } from "@/data/metiers";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const maj = new Date();
  return [
    { url: SITE.domaine, lastModified: maj, changeFrequency: "monthly", priority: 1 },
    ...METIERS.map((m) => ({
      url: `${SITE.domaine}/metiers/${m.slug}`,
      lastModified: maj,
      changeFrequency: "monthly" as const,
      priority: 0.8,
    })),
    // Les pages juridiques sont utiles aux humains, pas aux moteurs.
    { url: `${SITE.domaine}/mentions-legales`, lastModified: maj, priority: 0.1 },
    { url: `${SITE.domaine}/confidentialite`, lastModified: maj, priority: 0.1 },
    { url: `${SITE.domaine}/cgv`, lastModified: maj, priority: 0.1 },
  ];
}
