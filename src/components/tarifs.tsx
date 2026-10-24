"use client";

import { useState } from "react";
import { IconArrow, IconCheck } from "./icons";
import { useMouvementReduit } from "@/lib/mouvement";

/* -------------------------------------------------------------------------
   Grille tarifaire

   Un forfait par entreprise, avec des utilisateurs inclus : un patron de
   quinze techniciens ne doit pas pouvoir calculer sa facture de tête et se
   braquer avant d’avoir vu le produit. La facturation à l’utilisateur ne
   commence qu’au-delà du forfait inclus.

   On ne promet donc pas « pas par tête » : les forfaits ont un plafond
   d’utilisateurs, et le titre le contredisait trois lignes plus bas.

   Le sélecteur bascule entre le tarif public et l’offre fondateur (−20 %,
   arrondi à l’euro inférieur). C’est le seul composant client de la
   section : le titre et les encarts restent rendus côté serveur.

   ⚠️ Montants à revoir avant mise en ligne si la grille bouge : ils sont
   tous dans ce tableau.
------------------------------------------------------------------------- */
const OFFRES = [
  {
    nom: "Essentiel",
    prix: "39 €",
    fondateur: "31 €",
    unite: "par mois",
    sieges: "1 utilisateur",
    pitch: "Pour gérer ses interventions sans papier.",
    inclus: [
      "Clients, sites, équipements",
      "Planning et interventions",
      "Photos et anomalies",
      "Étiquettes QR illimitées",
      "Rapport d’intervention PDF signé",
    ],
    cta: "Essayer gratuitement",
    accent: false,
  },
  {
    nom: "Pro",
    prix: "99 €",
    fondateur: "79 €",
    unite: "par mois",
    sieges: "Jusqu’à 3 utilisateurs",
    extra: "puis 20 € par utilisateur supplémentaire",
    pitch: "Pour automatiser ses comptes-rendus et travailler en équipe.",
    inclus: [
      "Toute l’offre Essentiel",
      "Dictée et compte-rendu assisté",
      "Rappels d’échéance automatiques",
      "Envoi des rapports par e-mail",
      "Rôles et permissions",
      "Support sous 24 h ouvrées",
    ],
    cta: "Essayer gratuitement",
    accent: true,
  },
  {
    nom: "Business",
    prix: "249 €",
    fondateur: "199 €",
    unite: "par mois",
    sieges: "Jusqu’à 10 utilisateurs",
    extra: "puis 20 € par utilisateur supplémentaire",
    pitch: "Pour structurer plusieurs équipes et plusieurs sites.",
    inclus: [
      "Toute l’offre Pro",
      "Permissions avancées",
      "Plusieurs sites et plusieurs équipes",
      "Exports et API",
      "Intégrations comptables",
      "Support prioritaire",
    ],
    cta: "Demander une démo",
    accent: false,
  },
];

export function GrilleTarifs() {
  const [fondateur, setFondateur] = useState(false);
  const reduit = useMouvementReduit();

  return (
    <>
      <div className="reveal mt-12 flex flex-col items-center gap-3">
        {/* Deux colonnes de même largeur : le curseur fait exactement une
            demi-largeur et n’a qu’à glisser de sa propre taille. */}
        <div className="border-line relative grid grid-cols-2 rounded-full border bg-white p-1 shadow-sm">
          <span
            aria-hidden="true"
            className={
              "bg-petrol absolute inset-y-1 left-1 w-[calc(50%-0.25rem)] rounded-full shadow-md transition-transform duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] motion-reduce:transition-none " +
              (fondateur ? "translate-x-full" : "")
            }
          />
          <button
            type="button"
            onClick={() => setFondateur(false)}
            aria-pressed={!fondateur}
            className={
              "relative rounded-full px-4 py-2.5 text-[13.5px] font-semibold whitespace-nowrap transition-colors sm:px-6 sm:text-[14px] " +
              (fondateur ? "text-ink-soft hover:text-ink" : "text-white")
            }
          >
            Offre classique
          </button>
          <button
            type="button"
            onClick={() => setFondateur(true)}
            aria-pressed={fondateur}
            className={
              "relative flex items-center justify-center gap-2 rounded-full px-4 py-2.5 text-[13.5px] font-semibold whitespace-nowrap transition-colors sm:px-6 sm:text-[14px] " +
              (fondateur ? "text-white" : "text-ink-soft hover:text-ink")
            }
          >
            Offre fondateur
            <span
              className={
                "rounded-full px-1.5 py-0.5 text-[11px] font-semibold transition-colors " +
                (fondateur
                  ? "text-amber-bright bg-white/10"
                  : "bg-amber-soft text-amber-deep")
              }
            >
              −20&nbsp;%
            </span>
          </button>
        </div>
      </div>

      <div className="mt-14 grid items-start gap-6 lg:grid-cols-3">
        {OFFRES.map((o, i) => (
          <div
            key={o.nom}
            className={
              `reveal reveal-${i} relative flex flex-col rounded-2xl border p-7 ` +
              (o.accent
                ? "border-petrol bg-petrol text-white shadow-2xl shadow-black/15 lg:-mt-4 lg:pb-9"
                : "border-line bg-white")
            }
          >
            {o.accent && (
              <span className="bg-amber-deep absolute -top-3 left-7 rounded-full px-3 py-1 text-[11px] font-semibold text-white">
                Le plus choisi
              </span>
            )}

            <h3
              className={
                "text-[17px] font-semibold " + (o.accent ? "text-white" : "text-ink")
              }
            >
              {o.nom}
            </h3>
            <p
              className={
                "mt-1.5 text-[13.5px] " +
                (o.accent ? "text-white/60" : "text-ink-soft")
              }
            >
              {o.pitch}
            </p>

            <div className="mt-6 min-h-[6.5rem]">
              {/* La clé change avec l’offre : le bloc est remonté et son
                  apparition rejouée, l’œil voit que le prix a bougé. */}
              <div
                key={fondateur ? "fondateur" : "classique"}
                className={"flex items-baseline gap-2 " + (reduit ? "" : "pop")}
              >
                <span
                  className={
                    "text-4xl font-semibold tracking-tight " +
                    (o.accent ? "text-white" : "text-ink")
                  }
                >
                  {fondateur ? o.fondateur : o.prix}
                </span>
                {/* L’ancien prix est barré : il se met en retrait, il ne
                    rivalise pas avec le nouveau. */}
                {fondateur && (
                  <span
                    className={
                      "text-lg font-medium line-through " +
                      (o.accent ? "text-white/50" : "text-ink-soft")
                    }
                  >
                    {o.prix}
                  </span>
                )}
                <span
                  className={
                    "text-[13.5px] " + (o.accent ? "text-white/65" : "text-ink-soft")
                  }
                >
                  {o.unite}
                </span>
              </div>

              <p
                className={
                  "mt-2 text-[13.5px] font-medium " +
                  (o.accent ? "text-amber-bright" : "text-petrol")
                }
              >
                {o.sieges}
              </p>
              {o.extra && (
                <p
                  className={
                    "mt-0.5 text-[12.5px] " +
                    (o.accent ? "text-white/60" : "text-ink-soft")
                  }
                >
                  {o.extra}
                </p>
              )}
            </div>

            <a
              href="#demo"
              className={
                "mt-1 flex items-center justify-center gap-2 rounded-xl px-5 py-3 text-[14.5px] font-semibold transition-colors " +
                (o.accent
                  ? "bg-amber-deep hover:bg-amber-dark text-white"
                  : "bg-petrol hover:bg-petrol-deep text-white")
              }
            >
              {o.cta} <IconArrow className="size-4" />
            </a>

            <ul className="mt-7 space-y-3">
              {o.inclus.map((f) => (
                <li key={f} className="flex items-start gap-2.5">
                  <IconCheck
                    className={
                      "mt-0.5 size-4 shrink-0 " +
                      (o.accent ? "text-amber-bright" : "text-petrol")
                    }
                  />
                  <span
                    className={
                      "text-[14px] " +
                      (o.accent ? "text-white/80" : "text-ink-soft")
                    }
                  >
                    {f}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </>
  );
}
