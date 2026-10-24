import Link from "next/link";
import { IconCheck } from "./icons";
import { GrilleTarifs } from "./tarifs";
import { Wordmark } from "./mark";
import { EssaiForm } from "./essai-form";
import { SITE } from "@/config/site";
import { METIERS } from "@/data/metiers";

/* -------------------------------------------------------------------------
   Tarifs — la grille et ses montants vivent dans `tarifs.tsx`.
------------------------------------------------------------------------- */
export function Pricing() {
  return (
    <section id="tarifs" className="mx-auto max-w-6xl px-5 py-20 sm:px-6 sm:py-28">
      <div className="reveal max-w-2xl">
        <p className="text-amber-deep text-[11px] font-semibold tracking-[0.16em] uppercase">
          Tarifs
        </p>
        <h2 className="text-ink mt-3 text-3xl font-semibold sm:text-[2.5rem] sm:leading-[1.12]">
          Un forfait par entreprise, des utilisateurs inclus
        </h2>
        <p className="text-ink-soft mt-5 text-lg">
          Pro inclut trois utilisateurs, Business dix : embaucher un technicien
          ne coûte pas une licence de plus dès le premier jour. Pas de frais de
          mise en service, pas de palier sur le nombre de clients ou
          d’équipements. Essai gratuit, sans engagement.
        </p>
      </div>

      <GrilleTarifs />

      <p className="reveal text-ink-soft mt-8 text-center text-[13.5px]">
        Aucune carte bancaire requise · Annulation à tout moment
      </p>

      {/* Au-delà de dix utilisateurs, le prix se discute : autant le dire. */}
      <div className="reveal border-line mt-6 flex flex-col gap-5 rounded-2xl border bg-white p-7 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h3 className="text-ink text-[17px] font-semibold">
            Entreprise{" "}
            <span className="text-ink-soft font-medium">— sur devis</span>
          </h3>
          <p className="text-ink-soft mt-1.5 max-w-2xl text-[14.5px]">
            À partir de vingt utilisateurs, plusieurs agences ou plusieurs
            métiers dans un même compte. SSO, API avancée, engagement de
            service, reprise de vos données et accompagnement au déploiement.
          </p>
        </div>
        <a
          href="#demo"
          className="border-petrol text-petrol hover:bg-petrol shrink-0 rounded-xl border px-5 py-3 text-center text-[14.5px] font-semibold transition-colors hover:text-white"
        >
          Nous écrire
        </a>
      </div>

      {/* Offre de lancement : elle a une raison d’être — les premiers clients
          acceptent un produit jeune contre un prix tenu dans la durée. */}
      <div className="reveal bg-amber-soft/60 border-amber/30 mt-6 flex flex-col gap-4 rounded-2xl border border-dashed p-6 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-ink text-[14.5px]">
          <span className="text-amber-deep font-semibold">Offre fondateur : </span>
          <span className="font-semibold">−20&nbsp;%</span> sur le forfait de
          votre choix, pour les premières entreprises qui nous rejoignent.{" "}
          <span className="text-ink-soft">Prix garanti deux ans.</span>
        </p>
        <a
          href="#demo"
          className="text-petrol shrink-0 text-[14.5px] font-semibold hover:underline"
        >
          En profiter
        </a>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------------- */
export const QUESTIONS: [string, string][] = [
  [
    "Combien de temps pour démarrer ?",
    "Une demi-journée. On importe votre fichier clients, on crée vos techniciens, on colle les premières étiquettes. Le reste se remplit intervention après intervention.",
  ],
  [
    "Et si mes techniciens n’aiment pas les logiciels ?",
    "C’est le cas le plus fréquent. L’application terrain tient en trois écrans : ouvrir l’intervention, photographier, signer. Rien à apprendre, aucun paramétrage à faire sur le chantier.",
  ],
  [
    "Le compte-rendu rédigé automatiquement, c’est fiable ?",
    "Il n’est jamais envoyé sans relecture. Vennora propose un brouillon à partir des notes dictées, structuré selon les sections de votre métier ; le technicien corrige et valide. L’origine du texte reste tracée dans le dossier.",
  ],
  [
    "Le prix augmente à chaque technicien embauché ?",
    "Non. L’abonnement est celui de l’entreprise : trois utilisateurs compris dans l’offre Pro, dix dans l’offre Business. Au-delà du forfait, un utilisateur supplémentaire coûte 20 € par mois. Un renfort saisonnier ne fait pas basculer votre budget.",
  ],
  [
    "Que deviennent mes données si j’arrête ?",
    "Elles vous appartiennent. Un export complet, clients, équipements, interventions et rapports PDF, est fourni sur simple demande.",
  ],
  [
    "Ça remplace ma facturation ?",
    "Non, et c’est délibéré. Vennora couvre l’intervention et sa preuve. Le devis et la facture restent chez votre outil de gestion, que l’on alimente en exports.",
  ],
];

export function Faq() {
  return (
    <section className="border-line bg-sand/60 border-t">
      <div className="mx-auto max-w-3xl px-5 py-20 sm:px-6 sm:py-24">
        <h2 className="reveal text-ink text-3xl font-semibold sm:text-[2.2rem]">
          Questions fréquentes
        </h2>

        <div className="mt-10 divide-y divide-[var(--color-line)] border-y border-[var(--color-line)]">
          {QUESTIONS.map(([q, r], i) => (
            <details key={q} className={`reveal reveal-${i % 3} group py-5`}>
              <summary className="text-ink flex cursor-pointer list-none items-center justify-between gap-6 text-[16.5px] font-medium">
                {q}
                <span
                  aria-hidden="true"
                  className="border-line text-ink-soft grid size-7 shrink-0 place-items-center rounded-full border transition-transform group-open:rotate-45"
                >
                  +
                </span>
              </summary>
              <p className="text-ink-soft mt-3 max-w-2xl text-[15px] leading-relaxed">
                {r}
              </p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}

/* -------------------------------------------------------------------------
   Demande d’essai. Le formulaire remplace le lien `mailto:` : un bouton qui
   promet un essai et ouvre un client mail perd la moitié des visiteurs.
------------------------------------------------------------------------- */
export function Demo() {
  return (
    <section id="demo" className="mx-auto max-w-6xl px-5 py-20 sm:px-6 sm:py-24">
      <div
        data-fond="sombre"
        className="reveal-zoom bg-petrol-deep grain relative isolate overflow-hidden rounded-3xl px-7 py-14 text-white sm:px-14 sm:py-16"
      >
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 -z-10"
          style={{
            background:
              "radial-gradient(40rem 24rem at 20% 0%, rgba(217,122,40,0.28), transparent 62%), radial-gradient(36rem 22rem at 90% 100%,  rgba(217, 122, 40, 0.22), transparent 60%)",
          }}
        />
        <div className="grid gap-12 lg:grid-cols-[0.85fr_1fr] lg:gap-16">
          <div>
            <h2 className="text-3xl font-semibold sm:text-[2.4rem] sm:leading-[1.1]">
              Essayez sur vos vraies interventions
            </h2>
            <p className="mt-5 text-lg text-white/70">
              On ouvre un compte à votre nom, avec le catalogue de votre métier
              déjà en place. Un de vos clients, un de vos appareils, une
              intervention de la semaine dernière : vous verrez le rapport
              partir à la fin de l’essai.
            </p>
            <ul className="mt-8 space-y-3">
              {[
                "Aucune carte bancaire",
                "Vos données exportables à tout moment",
                "Accompagnement à la reprise de votre fichier clients",
              ].map((p) => (
                <li key={p} className="flex items-center gap-2.5 text-[14.5px] text-white/65">
                  <IconCheck className="text-amber size-4 shrink-0" />
                  {p}
                </li>
              ))}
            </ul>
            <p className="mt-8 text-[14px] text-white/60">
              Vous préférez en parler ?{" "}
              <a href={`mailto:${SITE.email}`} className="text-white/75 underline">
                {SITE.email}
              </a>
            </p>
          </div>

          <EssaiForm />
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------------- */
export function Footer() {
  return (
    <footer data-fond="sombre" className="bg-petrol text-white">
      <div className="mx-auto grid max-w-6xl gap-10 px-5 py-12 sm:px-6 md:grid-cols-[1fr_1.6fr]">
        <div>
          <span className="text-white">
            <Wordmark />
          </span>
          <p className="mt-3 max-w-xs text-white/65 text-[13.5px]">
            Gérez vos interventions. Maîtrisez vos équipements.
          </p>
        </div>

        <div className="grid gap-8 text-[14px] sm:grid-cols-3">
          <nav className="flex flex-col gap-2.5">
            <p className="text-[12px] font-semibold text-white tracking-[0.12em] uppercase">
              Produit
            </p>
            {[
              ["/#produit", "Fonctionnalités"],
              ["/#terrain", "Sur le terrain"],
              ["/#tarifs", "Tarifs"],
              ["/#demo", "Essai gratuit"],
            ].map(([href, label]) => (
              <Link
                key={label}
                href={href}
                className="text-white/65 transition-colors hover:text-white"
              >
                {label}
              </Link>
            ))}
          </nav>

          <nav className="flex flex-col gap-2.5">
            <p className="text-[12px] font-semibold text-white tracking-[0.12em] uppercase">
              Métiers
            </p>
            {/* Les sept, pas quatre : le pied de page est le seul endroit du
                site où elles tiennent toutes, et trois d’entre elles n’étaient
                atteignables que par le plan du site. */}
            {METIERS.map((m) => (
              <Link
                key={m.slug}
                href={`/metiers/${m.slug}`}
                className="text-white/65 transition-colors hover:text-white"
              >
                {m.nom}
              </Link>
            ))}
          </nav>

          <nav className="flex flex-col gap-2.5">
            <p className="text-[12px] font-semibold text-white tracking-[0.12em] uppercase">
              Vennora
            </p>
            {/* `Contact` est un `mailto:` : une ancre nue, pas un `Link`. Le
                routeur le laisse passer, mais confier une adresse de courrier
                à un composant de navigation interne n’a pas de sens. */}
            <a
              href={`mailto:${SITE.email}`}
              className="text-white/65 transition-colors hover:text-white"
            >
              Contact
            </a>
            {[
              ["/mentions-legales", "Mentions légales"],
              ["/confidentialite", "Confidentialité"],
              ["/cgv", "Conditions générales"],
            ].map(([href, label]) => (
              <Link
                key={label}
                href={href}
                className="text-white/65 transition-colors hover:text-white"
              >
                {label}
              </Link>
            ))}
          </nav>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="mx-auto flex max-w-6xl flex-col gap-2 px-5 py-6 text-[12.5px] text-white/60 sm:flex-row sm:justify-between sm:px-6">
          <p>
            © {new Date().getFullYear()} {SITE.nom}. Tous droits réservés.
          </p>
          <p>Fait en France, pour des métiers qui travaillent dehors.</p>
        </div>
      </div>
    </footer>
  );
}
