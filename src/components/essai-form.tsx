"use client";

import { useEffect, useRef, useState } from "react";
import { IconArrow, IconCheck } from "./icons";
import { METIERS } from "@/data/metiers";
import { SITE } from "@/config/site";

/**
 * Formulaire de demande d’essai.
 *
 * Le site est exporté en statique : il n’a pas de serveur à lui. L’envoi part
 * donc vers un service de formulaire (Formspree, Basin, Web3Forms…) défini par
 * `NEXT_PUBLIC_FORM_ENDPOINT`. Tant que la variable est vide, on retombe sur
 * un courriel pré-rempli plutôt que d’avaler la saisie en silence — un
 * formulaire qui ne mène nulle part coûte plus cher que pas de formulaire.
 *
 * Deux filtres à robots, parce qu’une adresse d’envoi publiée dans un bundle
 * statique est moissonnée en quelques jours et qu’un service de formulaire se
 * facture au message :
 *
 *   — un champ leurre, invisible et hors du parcours clavier. Un humain ne
 *     peut pas le remplir, un robot qui remplit tout le remplit ;
 *   — un délai plancher. Personne ne renseigne six champs en trois secondes.
 *
 * Dans les deux cas on affiche l’accusé de réception habituel sans rien
 * envoyer : un robot qui reçoit une erreur réessaie en s’adaptant, un robot
 * qui reçoit un succès s’en va.
 */
const ENDPOINT = process.env.NEXT_PUBLIC_FORM_ENDPOINT ?? "";

/** Sous ce délai, en millisecondes, la saisie n’est pas humaine. */
const DELAI_PLANCHER = 3000;

const TAILLES = [
  "Je travaille seul",
  "2 à 3 techniciens",
  "4 à 10 techniciens",
  "Plus de 10 techniciens",
];

type Etat = "saisie" | "envoi" | "envoye" | "erreur";

declare global {
  interface Window {
    /** Posé par Plausible quand la mesure d’audience est activée. */
    plausible?: (evenement: string, options?: { props?: Record<string, string> }) => void;
  }
}

export function EssaiForm() {
  const [etat, setEtat] = useState<Etat>("saisie");
  // Horodatage posé à l’affichage, pas au rendu : `Date.now()` dans le corps
  // d’un composant est impur, et React peut rejouer ce corps quand il veut.
  const ouverture = useRef(0);
  useEffect(() => {
    ouverture.current = Date.now();
  }, []);

  async function envoyer(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const brut: Record<string, FormDataEntryValue> = Object.fromEntries(
      new FormData(form).entries(),
    );

    const robot =
      String(brut.site ?? "") !== "" ||
      Date.now() - ouverture.current < DELAI_PLANCHER;
    if (robot) {
      setEtat("envoye");
      return;
    }

    // Le leurre ne part pas ; la provenance, oui : sans elle on ne saura
    // jamais laquelle des huit pages amène les demandes.
    delete brut.site;
    const donnees: Record<string, FormDataEntryValue> = {
      ...brut,
      provenance: window.location.pathname + window.location.hash,
    };

    if (!ENDPOINT) {
      const corps = Object.entries(donnees)
        .map(([k, v]) => `${k} : ${v}`)
        .join("\n");
      window.location.href = `mailto:${SITE.email}?subject=${encodeURIComponent(
        "Demande d’essai Vennora",
      )}&body=${encodeURIComponent(corps)}`;
      return;
    }

    setEtat("envoi");
    try {
      const reponse = await fetch(ENDPOINT, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify(donnees),
      });
      setEtat(reponse.ok ? "envoye" : "erreur");
      if (reponse.ok) {
        form.reset();
        window.plausible?.("Demande d’essai", {
          props: { metier: String(donnees.metier ?? ""), equipe: String(donnees.equipe ?? "") },
        });
      }
    } catch {
      setEtat("erreur");
    }
  }

  if (etat === "envoye") {
    return (
      <div
        role="status"
        className="rounded-2xl border border-white/15 bg-white/5 p-8 text-center backdrop-blur-sm"
      >
        <span className="bg-amber mx-auto grid size-11 place-items-center rounded-full text-white">
          <IconCheck className="size-5" />
        </span>
        <p className="mt-4 text-[17px] font-semibold text-white">
          C’est envoyé.
        </p>
        <p className="mt-2 text-[15px] text-white/65">
          Nous revenons vers vous sous 24 heures ouvrées, avec un accès et une
          proposition de créneau.
        </p>
      </div>
    );
  }

  const champ =
    "h-11 w-full rounded-xl border border-white/15 bg-white/5 px-3.5 text-[15px] text-white placeholder:text-white/55 focus:border-white/35 focus:outline-none";
  const label = "text-[13px] font-medium text-white/70";

  return (
    <form onSubmit={envoyer} className="grid gap-4 sm:grid-cols-2">
      {/* Le leurre. Il porte un nom que les robots aiment remplir, et rien
          d’autre sur la page ne s’appelle « site ». */}
      <div className="leurre" aria-hidden="true">
        <label htmlFor="site">Ne pas remplir</label>
        <input
          id="site"
          name="site"
          type="text"
          tabIndex={-1}
          autoComplete="off"
        />
      </div>

      <div className="grid gap-1.5">
        <label className={label} htmlFor="entreprise">
          Entreprise
        </label>
        <input
          id="entreprise"
          name="entreprise"
          required
          autoComplete="organization"
          className={champ}
        />
      </div>
      <div className="grid gap-1.5">
        <label className={label} htmlFor="nom">
          Votre nom
        </label>
        <input
          id="nom"
          name="nom"
          required
          autoComplete="name"
          className={champ}
        />
      </div>
      <div className="grid gap-1.5">
        <label className={label} htmlFor="email">
          E-mail professionnel
        </label>
        <input
          id="email"
          name="email"
          type="email"
          required
          autoComplete="email"
          className={champ}
        />
      </div>
      <div className="grid gap-1.5">
        <label className={label} htmlFor="telephone">
          Téléphone <span className="text-white/60">(facultatif)</span>
        </label>
        <input
          id="telephone"
          name="telephone"
          type="tel"
          autoComplete="tel"
          className={champ}
        />
      </div>
      <div className="grid gap-1.5">
        <label className={label} htmlFor="metier">
          Métier
        </label>
        <select id="metier" name="metier" required className={champ} defaultValue="">
          <option value="" disabled>
            Choisir…
          </option>
          {METIERS.map((m) => (
            <option key={m.slug} value={m.nom} className="text-ink">
              {m.nom}
            </option>
          ))}
          <option value="Autre" className="text-ink">
            Autre métier
          </option>
        </select>
      </div>
      <div className="grid gap-1.5">
        <label className={label} htmlFor="equipe">
          Taille de l’équipe
        </label>
        <select id="equipe" name="equipe" required className={champ} defaultValue="">
          <option value="" disabled>
            Choisir…
          </option>
          {TAILLES.map((t) => (
            <option key={t} value={t} className="text-ink">
              {t}
            </option>
          ))}
        </select>
      </div>

      <label className="flex items-start gap-2.5 text-[13px] text-white/65 sm:col-span-2">
        <input
          type="checkbox"
          name="consentement"
          required
          className="accent-amber mt-0.5 size-4 shrink-0"
        />
        <span>
          J’accepte d’être recontacté au sujet de ma demande. Les données sont
          traitées conformément à la{" "}
          <a href="/confidentialite" className="text-white/80 underline">
            politique de confidentialité
          </a>
          .
        </span>
      </label>

      <div className="flex flex-wrap items-center gap-4 sm:col-span-2">
        <button
          type="submit"
          disabled={etat === "envoi"}
          className="bg-amber-deep hover:bg-amber-dark flex items-center gap-2 rounded-xl px-6 py-3.5 text-[15px] font-semibold text-white transition-colors disabled:opacity-60"
        >
          {etat === "envoi" ? "Envoi…" : "Démarrer l’essai"}
          <IconArrow className="size-4" />
        </button>
        <p className="text-[13px] text-white/60">
          Sans carte bancaire · Réponse sous 24 h ouvrées
        </p>
      </div>

      {etat === "erreur" && (
        <p role="alert" className="text-[13.5px] text-[#f4a9a9] sm:col-span-2">
          L’envoi a échoué. Écrivez-nous directement à{" "}
          <a href={`mailto:${SITE.email}`} className="underline">
            {SITE.email}
          </a>
          .
        </p>
      )}
    </form>
  );
}
