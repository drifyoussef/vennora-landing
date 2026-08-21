import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { PageShell } from "@/components/page-shell";
import { Footer } from "@/components/closing";
import { IconArrow, IconCheck } from "@/components/icons";
import { METIERS, getMetier } from "@/data/metiers";
import { SITE } from "@/config/site";
import { metadonnees } from "@/lib/metadonnees";

/**
 * Une page par métier.
 *
 * Raison d’être : une entreprise ne cherche pas « logiciel de gestion
 * d’interventions », elle cherche « logiciel de ramonage ». Sept pages, sept
 * requêtes, sept catalogues réels — et pas sept fois le même texte avec un
 * mot changé, ce que les moteurs comme les lecteurs repèrent immédiatement.
 */
export function generateStaticParams() {
  return METIERS.map((m) => ({ slug: m.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const m = getMetier(slug);
  if (!m) return {};
  const titre = `${m.requete.charAt(0).toUpperCase()}${m.requete.slice(1)} — ${SITE.nom}`;
  const description = `${m.nom} : suivi du parc, planning, photos, comptes-rendus signés et échéances. ${m.equipements.length} types d’équipement et ${m.interventions.length} types d’intervention livrés d’office.`;
  return metadonnees({
    titre,
    description,
    chemin: `/metiers/${m.slug}`,
    type: "article",
  });
}

const APPORTS = [
  [
    "Le parc, pas seulement le carnet",
    "Chaque appareil a sa fiche, son étiquette QR, son historique et sa périodicité. On sait ce qui a été fait, quand, et par qui.",
  ],
  [
    "Le compte-rendu écrit sur place",
    "Le technicien dicte ses constats, Vennora propose un brouillon structuré selon les sections du métier. Il corrige, le client signe, le PDF part.",
  ],
  [
    "Les échéances avant l’appel du client",
    "Les périodicités sont portées par le type d’équipement. La liste de ce qui arrive à terme sort toute seule.",
  ],
  [
    "Les preuves rangées",
    "Photos horodatées, anomalies datées avec leur gravité, signature attachée au rapport. Le dossier est complet à la fermeture de la porte.",
  ],
];

export default async function MetierPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const m = getMetier(slug);
  if (!m) notFound();

  const autres = METIERS.filter((x) => x.slug !== m.slug);

  return (
    <>
      <PageShell
        titre={`${m.requete.charAt(0).toUpperCase()}${m.requete.slice(1)}`}
        chapeau={m.accroche}
        enTete={
          <div className="mt-8 flex flex-wrap items-center gap-3">
            <Link
              href="/#demo"
              className="bg-amber-deep hover:bg-amber-dark rounded-xl px-5 py-3 text-[15px] font-semibold text-white transition-colors"
            >
              Essayer gratuitement
            </Link>
            <Link
              href="/#tarifs"
              className="border-line text-ink hover:border-ink-soft/50 rounded-xl border px-5 py-3 text-[15px] font-semibold transition-colors"
            >
              Voir les tarifs
            </Link>
            <span className="text-ink-soft text-[13.5px]">
              Sans carte bancaire
            </span>
          </div>
        }
      >
        <h2>Ce que Vennora change pour un professionnel du {m.nom.toLowerCase()}</h2>
        <dl>
          {APPORTS.map(([titre, texte]) => (
            <div key={titre}>
              <dt>{titre}</dt>
              <dd>{texte}</dd>
            </div>
          ))}
        </dl>

        <h2>Le catalogue livré d’office</h2>
        <p>
          Pas de paramétrage à faire avant la première intervention : les types
          d’équipement et d’intervention du métier sont déjà là, avec leurs
          durées et leurs périodicités. Ils restent modifiables.
        </p>

        <div className="not-prose mt-6 grid gap-4 sm:grid-cols-2">
          <div className="border-line rounded-2xl border bg-white p-6">
            <h3 className="text-ink text-[15px] font-semibold">
              {m.equipements.length} types d’équipement
            </h3>
            <ul className="mt-4 space-y-2">
              {m.equipements.map((e) => (
                <li key={e} className="flex items-start gap-2.5">
                  <IconCheck
                    className="mt-0.5 size-4 shrink-0"
                    style={{ color: m.couleurTexte }}
                  />
                  <span className="text-ink-soft text-[14px]">{e}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="border-line rounded-2xl border bg-white p-6">
            <h3 className="text-ink text-[15px] font-semibold">
              {m.interventions.length} types d’intervention
            </h3>
            <ul className="mt-4 space-y-2">
              {m.interventions.map((e) => (
                <li key={e} className="flex items-start gap-2.5">
                  <IconCheck
                    className="mt-0.5 size-4 shrink-0"
                    style={{ color: m.couleurTexte }}
                  />
                  <span className="text-ink-soft text-[14px]">{e}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <h2>Périodicités et cadre</h2>
        <p>{m.reglementation}</p>
        <p className="text-[14px]">
          Ces éléments sont donnés à titre indicatif et ne remplacent pas les
          textes officiels ; ils servent de valeurs par défaut, que vous
          ajustez équipement par équipement.
        </p>

        <h2>Et si je fais plusieurs métiers ?</h2>
        <p>
          Le cœur de Vennora est commun à tous : clients, sites, équipements,
          interventions, comptes-rendus. Seul le catalogue change. Une
          entreprise qui fait du {m.nom.toLowerCase()} et un autre métier les
          gère dans le même compte.
        </p>

        <div className="not-prose border-line mt-10 flex flex-col gap-5 rounded-2xl border bg-white p-7 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-ink text-[17px] font-semibold">
              Trente minutes sur vos vraies interventions
            </p>
            <p className="text-ink-soft mt-1.5 text-[14.5px]">
              Un de vos clients, un de vos appareils, une intervention de la
              semaine dernière.
            </p>
          </div>
          <Link
            href="/#demo"
            className="bg-petrol hover:bg-petrol-deep shrink-0 rounded-xl px-5 py-3 text-center text-[14.5px] font-semibold text-white transition-colors"
          >
            Demander une démo
          </Link>
        </div>

        <h2>Les autres métiers</h2>
        <ul className="not-prose mt-4 flex flex-wrap gap-2">
          {autres.map((a) => (
            <li key={a.slug}>
              <Link
                href={`/metiers/${a.slug}`}
                className="border-line text-ink-soft hover:border-ink-soft/40 hover:text-ink flex items-center gap-2 rounded-full border bg-white px-3.5 py-2 text-[13.5px] font-medium transition-colors"
              >
                <span
                  className="size-2 rounded-full"
                  style={{ background: a.couleur }}
                />
                {a.nom}
                <IconArrow className="size-3.5" />
              </Link>
            </li>
          ))}
        </ul>
      </PageShell>
      <Footer />
    </>
  );
}
