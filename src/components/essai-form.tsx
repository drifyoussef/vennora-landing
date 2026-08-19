"use client";

import { useState } from "react";
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
 */
const ENDPOINT = process.env.NEXT_PUBLIC_FORM_ENDPOINT ?? "";

const TAILLES = [
  "Je travaille seul",
  "2 à 3 techniciens",
  "4 à 10 techniciens",
  "Plus de 10 techniciens",
];

type Etat = "saisie" | "envoi" | "envoye" | "erreur";

export function EssaiForm() {
  const [etat, setEtat] = useState<Etat>("saisie");

  async function envoyer(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const donnees = Object.fromEntries(new FormData(form).entries());

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
      if (reponse.ok) form.reset();
    } catch {
      setEtat("erreur");
    }
  }

  if (etat === "envoye") {
    return (
      <div className="rounded-2xl border border-white/15 bg-white/5 p-8 text-center backdrop-blur-sm">
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
    "h-11 w-full rounded-xl border border-white/15 bg-white/5 px-3.5 text-[15px] text-white placeholder:text-white/35 focus:border-white/35 focus:outline-none";
  const label = "text-[13px] font-medium text-white/70";

  return (
    <form onSubmit={envoyer} className="grid gap-4 sm:grid-cols-2">
      <div className="grid gap-1.5">
        <label className={label} htmlFor="entreprise">
          Entreprise
        </label>
        <input id="entreprise" name="entreprise" required className={champ} />
      </div>
      <div className="grid gap-1.5">
        <label className={label} htmlFor="nom">
          Votre nom
        </label>
        <input id="nom" name="nom" required className={champ} />
      </div>
      <div className="grid gap-1.5">
        <label className={label} htmlFor="email">
          E-mail professionnel
        </label>
        <input id="email" name="email" type="email" required className={champ} />
      </div>
      <div className="grid gap-1.5">
        <label className={label} htmlFor="telephone">
          Téléphone <span className="text-white/35">(facultatif)</span>
        </label>
        <input id="telephone" name="telephone" type="tel" className={champ} />
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

      <label className="flex items-start gap-2.5 text-[13px] text-white/55 sm:col-span-2">
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
          className="bg-amber hover:bg-amber-bright flex items-center gap-2 rounded-xl px-6 py-3.5 text-[15px] font-semibold text-white transition-colors disabled:opacity-60"
        >
          {etat === "envoi" ? "Envoi…" : "Démarrer l’essai"}
          <IconArrow className="size-4" />
        </button>
        <p className="text-[13px] text-white/45">
          Sans carte bancaire · Réponse sous 24 h ouvrées
        </p>
      </div>

      {etat === "erreur" && (
        <p className="text-[13.5px] text-[#ef8f8f] sm:col-span-2">
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
