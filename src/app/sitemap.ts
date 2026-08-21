import type { MetadataRoute } from "next";
import { SITE } from "@/config/site";
import { METIERS } from "@/data/metiers";

export const dynamic = "force-static";

/**
 * Plan du site.
 *
 * Ne contient que ce qu’on veut voir indexé. Les pages juridiques portent un
 * `robots: noindex` : les lister ici reviendrait à demander l’indexation d’une
 * page qui la refuse, contradiction que les moteurs signalent en rapport de
 * couverture.
 *
 * `lastModified` vient de `SITE.majContenu`, pas de `new Date()` : la date du
 * build n’a rien à voir avec celle du contenu.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const maj = new Date(SITE.majContenu);
  return [
    { url: SITE.domaine, lastModified: maj, changeFrequency: "monthly", priority: 1 },
    ...METIERS.map((m) => ({
      url: `${SITE.domaine}/metiers/${m.slug}`,
      lastModified: maj,
      changeFrequency: "monthly" as const,
      priority: 0.8,
    })),
  ];
}
