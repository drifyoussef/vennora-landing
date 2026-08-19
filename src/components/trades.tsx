"use client";

import { useEffect, useState } from "react";
import { IconArrow } from "./icons";

/**
 * Les métiers, en carrousel.
 *
 * La carte du métier courant est au centre, ses voisines dépassent à gauche
 * et à droite, réduites et floutées : on voit qu’il y en a d’autres, et de
 * quel côté elles arrivent. Le carrousel tourne seul ; les pastilles et les
 * flèches permettent d’y couper court.
 *
 * Les visuels de `public/metiers/` sont des images d’attente, à remplacer par
 * de vraies photos de chantier — même chemin, cadrage carré ou 4:3.
 */
const METIERS = [
  {
    slug: "ramonage",
    nom: "Ramonage",
    couleur: "#0F3D4C",
    texte:
      "Conduits, poêles, inserts. Certificat annuel et périodicités de l’arrêté du 20 juillet 2023. Chaque conduit garde son historique de passages et ses anomalies encore ouvertes.",
    exemples: ["Cheminée", "Poêle à granulés", "Insert"],
    photo: "/metiers/ramonage.svg",
    categorie: "Entretien réglementaire",
    catalogue: { equipements: 8, interventions: 5 },
  },
  {
    slug: "chauffage",
    nom: "Chauffage",
    couleur: "#E2610F",
    texte:
      "Chaudières, pompes à chaleur, planchers chauffants. Entretien annuel et contrôle de combustion, avec les valeurs relevées consignées à chaque visite.",
    exemples: ["Chaudière gaz", "Pompe à chaleur", "Plancher chauffant"],
    photo: "/metiers/chauffage.svg",
    categorie: "Entretien et dépannage",
    catalogue: { equipements: 9, interventions: 6 },
  },
  {
    slug: "climatisation",
    nom: "Climatisation",
    couleur: "#2F9EC2",
    texte:
      "Splits, gainables, VRV, centrales de traitement d’air. Contrôle d’étanchéité et traçabilité du fluide frigorigène, machine par machine.",
    exemples: ["Split mural", "Gainable", "VRV / VRF"],
    photo: "/metiers/climatisation.svg",
    categorie: "Froid et traitement d’air",
    catalogue: { equipements: 9, interventions: 6 },
  },
  {
    slug: "serrurier",
    nom: "Serrurerie",
    couleur: "#B08D3A",
    texte:
      "Ouvertures, cylindres, rideaux, contrôle d’accès. L’urgence et la maintenance dans le même outil : le dépannage de nuit comme la vérification annuelle des issues.",
    exemples: ["Porte blindée", "Rideau métallique", "Contrôle d’accès"],
    photo: "/metiers/serrurier.svg",
    categorie: "Urgence et sécurité",
    catalogue: { equipements: 10, interventions: 7 },
  },
  {
    slug: "piscine",
    nom: "Piscine",
    couleur: "#00A0A8",
    texte:
      "Filtration, traitement, hivernage. Analyses d’eau consignées à chaque passage — pH, désinfectant, sel — avec les produits ajoutés et les volumes.",
    exemples: ["Filtration", "Électrolyseur", "Volet"],
    photo: "/metiers/piscine.svg",
    categorie: "Entretien saisonnier",
    catalogue: { equipements: 10, interventions: 7 },
  },
  {
    slug: "nuisibles",
    nom: "Nuisibles",
    couleur: "#6E9A2E",
    texte:
      "Postes d’appâtage, pièges, plans de zones. Traçabilité du produit et de son numéro d’AMM, relevé des consommations, audit sanitaire prêt à sortir.",
    exemples: ["Poste d’appâtage", "Piège lumineux", "Zone sensible"],
    photo: "/metiers/nuisibles.svg",
    categorie: "Lutte intégrée",
    catalogue: { equipements: 7, interventions: 8 },
  },
  {
    slug: "traitement-eau",
    nom: "Traitement de l’eau",
    couleur: "#1E7FB8",
    texte:
      "Adoucisseurs, osmoseurs, stérilisateurs UV. Relevés de dureté à l’entrée et à la sortie, changement des consommables et désinfection du réseau.",
    exemples: ["Adoucisseur", "Osmoseur", "Stérilisateur UV"],
    photo: "/metiers/traitement-eau.svg",
    categorie: "Qualité de l’eau",
    catalogue: { equipements: 9, interventions: 7 },
  },
];

const DUREE = 4600;
const N = METIERS.length;

/**
 * Place une carte selon sa distance signée à la carte courante : 0 au centre,
 * −1 à gauche, +1 à droite, et ainsi de suite jusqu’à disparaître.
 */
function styleCarte(d: number) {
  const abs = Math.abs(d);
  const sens = Math.sign(d);

  if (abs === 0) {
    return {
      transform: "translate3d(-50%, 0, 0) scale(1.06)",
      opacity: 1,
      filter: "none",
      zIndex: 30,
    };
  }
  if (abs === 1) {
    return {
      transform: `translate3d(calc(-50% + ${sens * 74}%), 0, 0) scale(0.8)`,
      opacity: 0.55,
      filter: "blur(4px)",
      zIndex: 20,
    };
  }
  if (abs === 2) {
    return {
      transform: `translate3d(calc(-50% + ${sens * 128}%), 0, 0) scale(0.68)`,
      opacity: 0.24,
      filter: "blur(9px)",
      zIndex: 10,
    };
  }
  return {
    transform: `translate3d(calc(-50% + ${sens * 170}%), 0, 0) scale(0.6)`,
    opacity: 0,
    filter: "blur(12px)",
    zIndex: 0,
  };
}

/** Distance signée la plus courte sur un anneau de N cartes. */
function distance(k: number, actif: number) {
  let d = k - actif;
  if (d > N / 2) d -= N;
  if (d < -N / 2) d += N;
  return d;
}

/** Les deux flèches ne diffèrent que par leur bord d’ancrage. */
const FLECHE =
  "border-line text-ink-soft hover:border-ink-soft/40 hover:text-ink absolute " +
  "top-1/2 z-40 grid size-11 -translate-y-1/2 cursor-pointer place-items-center " +
  "rounded-full border bg-white shadow-[0_8px_24px_-10px_rgba(16,38,46,0.45)] " +
  "transition-colors sm:size-12 ";

export function Trades() {
  const [actif, setActif] = useState(0);
  const [pause, setPause] = useState(false);
  const [auto, setAuto] = useState(true);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setAuto(false);
    }
  }, []);

  useEffect(() => {
    if (!auto || pause) return;
    const id = setTimeout(() => setActif((a) => (a + 1) % N), DUREE);
    return () => clearTimeout(id);
  }, [actif, auto, pause]);

  const aller = (pas: number) => setActif((a) => (a + pas + N) % N);

  return (
    <section
      id="metiers"
      className="mx-auto max-w-6xl px-5 py-20 sm:px-6 sm:py-28"
    >
      <div className="grid gap-8 lg:grid-cols-[1fr_1fr] lg:items-end lg:gap-16">
        <div>
          <p className="text-amber text-[11px] font-semibold tracking-[0.16em] uppercase">
            Les métiers
          </p>
          <h2 className="text-ink mt-3 text-3xl font-semibold sm:text-[2.5rem] sm:leading-[1.12]">
            Le même cœur, votre vocabulaire
          </h2>
        </div>
        <div>
          <p className="text-ink-soft text-lg">
            Le catalogue d’équipements, les types d’intervention, les
            périodicités et les sections du compte-rendu appartiennent au
            métier. Vous ne travaillez jamais dans le logiciel de quelqu’un
            d’autre.
          </p>
          <p className="text-ink-soft mt-4 text-[14.5px]">
            Incendie, portes automatiques, cuisine professionnelle : le socle
            est le même, seul le catalogue change.{" "}
            <a
              href="#demo"
              className="text-petrol font-semibold hover:underline"
            >
              Parlons-en <IconArrow className="inline size-4 align-[-3px]" />
            </a>
          </p>
        </div>
      </div>

      {/* Les sept métiers, au-dessus du carrousel : ils servent de sommaire
          autant que de commande. */}
      <div className="mt-12">
        <ul className="flex flex-wrap justify-center gap-2">
          {METIERS.map((m, k) => {
            const on = k === actif;
            return (
              <li key={m.slug}>
                <button
                  type="button"
                  onClick={() => setActif(k)}
                  className={
                    "flex cursor-pointer items-center gap-2 rounded-full border px-3.5 py-2 text-[13.5px] font-medium transition-colors " +
                    (on
                      ? "border-transparent text-white"
                      : "border-line text-ink-soft hover:border-ink-soft/40 hover:text-ink bg-white")
                  }
                  style={on ? { background: m.couleur } : undefined}
                  aria-current={on ? "true" : undefined}
                >
                  <span
                    className="size-2 rounded-full"
                    style={{ background: on ? "#ffffff" : m.couleur }}
                  />
                  {m.nom}
                </button>
              </li>
            );
          })}
        </ul>
      </div>

      {/* Carrousel : le débordement latéral est voulu, il est estompé sur les
          bords pour que les cartes lointaines sortent du champ en douceur. */}
      <div
        className="relative mt-10"
        onMouseEnter={() => setPause(true)}
        onMouseLeave={() => setPause(false)}
      >
        <button
          type="button"
          onClick={() => aller(-1)}
          aria-label="Métier précédent"
          className={FLECHE + "left-0 sm:left-2"}
        >
          <IconArrow className="size-4 rotate-180 sm:size-5" />
        </button>
        <button
          type="button"
          onClick={() => aller(1)}
          aria-label="Métier suivant"
          className={FLECHE + "right-0 sm:right-2"}
        >
          <IconArrow className="size-4 sm:size-5" />
        </button>

        <div className="relative h-[30rem] overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_7%,black_93%,transparent)] sm:h-[31rem]">
          {METIERS.map((m, k) => {
            const d = distance(k, actif);
            const st = styleCarte(d);
            return (
              <article
                key={m.slug}
                aria-hidden={d !== 0}
                className="border-line absolute top-2 left-1/2 flex h-[27rem] w-[19rem] flex-col rounded-3xl border bg-white p-6 shadow-[0_30px_70px_-35px_rgba(16,38,46,0.5)] transition-all duration-[650ms] ease-[cubic-bezier(0.65,0,0.35,1)] sm:h-[28rem] sm:w-[23rem] sm:p-7"
                style={st}
              >
                <div className="flex items-center gap-4">
                  {/* Vignette carrée : la photo du métier, recadrée, sur un
                      fond de sa couleur pour tenir même si l’image manque. */}
                  <div
                    className="size-[4.5rem] shrink-0 overflow-hidden rounded-2xl sm:size-20"
                    style={{ background: m.couleur }}
                  >
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={m.photo}
                      alt={`Intervention ${m.nom.toLowerCase()}`}
                      width={800}
                      height={600}
                      className="size-full object-cover"
                      loading={Math.abs(d) <= 1 ? "eager" : "lazy"}
                    />
                  </div>
                  <div className="min-w-0">
                    <h3 className="text-ink text-[21px] leading-tight font-semibold tracking-tight sm:text-[23px]">
                      {m.nom}
                    </h3>
                    <p className="text-ink-soft mt-1.5 text-[14px]">
                      {m.categorie}
                    </p>
                  </div>
                </div>

                <p className="text-ink mt-6 text-[16px] leading-[1.72]">
                  {m.texte}
                </p>

                <ul className="mt-5 flex flex-wrap gap-2">
                  {m.exemples.map((e, n) => (
                    <li
                      key={e}
                      className="rounded-full px-3 py-1.5 text-[13px] font-medium"
                      style={
                        n === 0
                          ? { background: `${m.couleur}1f`, color: m.couleur }
                          : {
                              background: "var(--color-sand)",
                              color: "var(--color-ink-soft)",
                            }
                      }
                    >
                      {e}
                    </li>
                  ))}
                </ul>

                {/* Pied de carte : le volume réel du catalogue livré avec le
                    métier. `whitespace-nowrap` — la ligne se coupait en deux
                    sur téléphone. */}
                <div className="border-line text-ink-soft mt-auto flex items-center gap-2 border-t pt-4 text-[12.5px] whitespace-nowrap">
                  <span className="font-semibold" style={{ color: m.couleur }}>
                    {m.catalogue.equipements}
                  </span>
                  équipements
                  <span className="bg-line size-1 rounded-full" />
                  <span className="font-semibold" style={{ color: m.couleur }}>
                    {m.catalogue.interventions}
                  </span>
                  types d’intervention
                </div>
              </article>
            );
          })}
        </div>
      </div>

      {/* Sous le carrousel, il ne reste que la progression : les flèches
          sont passées sur les flancs des cartes. */}
      <div className="mt-10">
        <div className="mx-auto flex w-full max-w-sm items-center gap-4">
          <div className="bg-line h-1 flex-1 overflow-hidden rounded-full">
            <span
              key={actif}
              className="block h-full rounded-full"
              style={{
                background: METIERS[actif].couleur,
                ...(auto && !pause
                  ? { animation: `fill ${DUREE}ms linear both` }
                  : { width: "100%" }),
              }}
            />
          </div>
          <span className="text-ink-soft text-[12px] font-medium tabular-nums">
            {actif + 1} / {N}
          </span>
        </div>
      </div>
    </section>
  );
}
