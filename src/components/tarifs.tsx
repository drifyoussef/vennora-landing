"use client";

import { useState } from "react";
import { IconArrow, IconBell, IconCheck } from "./icons";
import { useMouvementReduit } from "@/lib/mouvement";
import { SITE } from "@/config/site";

/* -------------------------------------------------------------------------
   Grille tarifaire

   Un forfait par entreprise, avec des utilisateurs inclus : un patron de
   quinze techniciens ne doit pas pouvoir calculer sa facture de tête et se
   braquer avant d’avoir vu le produit. La facturation à l’utilisateur ne
   commence qu’au-delà du forfait inclus.

   On ne promet donc pas « pas par tête » : les forfaits ont un plafond
   d’utilisateurs, et le titre le contredisait trois lignes plus bas.

   Le sélecteur bascule entre le tarif public et le tarif de lancement
   (−20 %, arrondi à l’euro inférieur). C’est le seul composant client de la
   section : le titre et les encarts restent rendus côté serveur.

   Pas de prix barré. En droit français, un prix barré doit correspondre à
   un prix réellement pratiqué auparavant ; avant le lancement, il n’y en a
   pas. Le tarif de lancement est donc présenté pour ce qu’il est, avec le
   tarif public cité en clair à côté.

   Tous les montants sont hors taxes, et le disent : en B2B, un prix sans
   mention fait douter.

   ⚠️ Montants à revoir avant mise en ligne si la grille bouge : ils sont
   tous dans ce tableau (et dans `jsonld.tsx` pour les moteurs).
------------------------------------------------------------------------- */
const UNITE = "HT / mois";
const SUPPLEMENT = "puis 20 € HT par utilisateur supplémentaire";

const OFFRES: {
  nom: string;
  prix: string;
  lancement: string;
  sieges: string;
  extra?: string;
  pitch: string;
  /** L’argument qui fait passer au niveau supérieur, mis en avant. */
  atout?: [string, string];
  inclus: string[];
  cta: string;
  accent: boolean;
}[] = [
  {
    nom: "Essentiel",
    prix: "39 €",
    lancement: "31 €",
    sieges: "1 utilisateur",
    pitch: "Pour gérer ses interventions sans papier.",
    // L’envoi par e-mail en fait partie : un technicien seul s’attend à
    // pouvoir envoyer son rapport, sans quoi l’offre paraît bridée.
    inclus: [
      "Clients, sites, équipements",
      "Planning et interventions",
      "Photos et anomalies",
      "Étiquettes QR illimitées",
      "Rapport d’intervention PDF signé",
      "Envoi des rapports par e-mail",
    ],
    cta: `Essai gratuit ${SITE.essaiJours} jours`,
    accent: false,
  },
  {
    nom: "Pro",
    prix: "99 €",
    lancement: "79 €",
    sieges: "Jusqu’à 3 utilisateurs",
    extra: SUPPLEMENT,
    pitch: "Pour faire revenir chaque client à son échéance, en équipe.",
    atout: [
      "Rappels d’échéance automatiques",
      "Entretiens annuels et vérifications réglementaires sortent d’eux-mêmes, avant que le client n’appelle un concurrent.",
    ],
    inclus: [
      "Toute l’offre Essentiel",
      "Dictée et compte-rendu assisté",
      "Rôles et permissions",
      "Support sous 24 h ouvrées",
    ],
    cta: `Essai gratuit ${SITE.essaiJours} jours`,
    accent: true,
  },
  {
    nom: "Business",
    prix: "249 €",
    lancement: "199 €",
    sieges: "Jusqu’à 10 utilisateurs",
    extra: SUPPLEMENT,
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
  const [lancement, setLancement] = useState(false);
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
              (lancement ? "translate-x-full" : "")
            }
          />
          <button
            type="button"
            onClick={() => setLancement(false)}
            aria-pressed={!lancement}
            className={
              "relative rounded-full px-4 py-2.5 text-[13.5px] font-semibold whitespace-nowrap transition-colors sm:px-6 sm:text-[14px] " +
              (lancement ? "text-ink-soft hover:text-ink" : "text-white")
            }
          >
            Tarif public
          </button>
          <button
            type="button"
            onClick={() => setLancement(true)}
            aria-pressed={lancement}
            className={
              "relative flex items-center justify-center gap-2 rounded-full px-4 py-2.5 text-[13.5px] font-semibold whitespace-nowrap transition-colors sm:px-6 sm:text-[14px] " +
              (lancement ? "text-white" : "text-ink-soft hover:text-ink")
            }
          >
            Tarif de lancement
            <span
              className={
                "rounded-full px-1.5 py-0.5 text-[11px] font-semibold transition-colors " +
                (lancement
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
                Recommandé
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

            <div className="mt-6 min-h-[8rem]">
              {/* La clé change avec l’offre : le bloc est remonté et son
                  apparition rejouée, l’œil voit que le prix a bougé. */}
              <div key={lancement ? "lancement" : "public"} className={reduit ? "" : "pop"}>
                <div className="flex items-baseline gap-2">
                  <span
                    className={
                      "text-4xl font-semibold tracking-tight " +
                      (o.accent ? "text-white" : "text-ink")
                    }
                  >
                    {lancement ? o.lancement : o.prix}
                  </span>
                  <span
                    className={
                      "text-[13.5px] " + (o.accent ? "text-white/65" : "text-ink-soft")
                    }
                  >
                    {UNITE}
                  </span>
                </div>
                {/* Toujours une ligne, dans les deux modes : la carte ne
                    change pas de hauteur quand on bascule. Le tarif public
                    est cité en clair, jamais barré — voir l’en-tête. */}
                <p
                  className={
                    "mt-1 text-[12.5px] " +
                    (o.accent ? "text-white/60" : "text-ink-soft")
                  }
                >
                  {lancement
                    ? `Garanti 2 ans · tarif public ${o.prix} HT`
                    : "Sans engagement · annulable à tout moment"}
                </p>
              </div>

              <p
                className={
                  "mt-3 text-[13.5px] font-medium " +
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

            {/* L’argument du passage au niveau supérieur : sorti de la
                liste, pour qu’on ne le lise pas comme une ligne parmi six. */}
            {o.atout && (
              <div
                className={
                  "mt-7 rounded-xl border p-4 " +
                  (o.accent
                    ? "border-white/15 bg-white/[0.06]"
                    : "border-line bg-paper")
                }
              >
                <p
                  className={
                    "flex items-center gap-2 text-[14.5px] font-semibold " +
                    (o.accent ? "text-white" : "text-ink")
                  }
                >
                  <IconBell
                    className={
                      "size-4 shrink-0 " +
                      (o.accent ? "text-amber-bright" : "text-amber-deep")
                    }
                  />
                  {o.atout[0]}
                </p>
                <p
                  className={
                    "mt-1.5 text-[13px] leading-relaxed " +
                    (o.accent ? "text-white/65" : "text-ink-soft")
                  }
                >
                  {o.atout[1]}
                </p>
              </div>
            )}

            <ul className={(o.atout ? "mt-5" : "mt-7") + " space-y-3"}>
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
