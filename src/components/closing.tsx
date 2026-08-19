import Link from "next/link";
import { IconArrow, IconCheck } from "./icons";
import { Wordmark } from "./mark";
import { EssaiForm } from "./essai-form";
import { SITE } from "@/config/site";
import { METIERS } from "@/data/metiers";

/* -------------------------------------------------------------------------
   Tarifs

   Le prix est par entreprise, pas par tête : un patron de quinze techniciens
   ne doit pas pouvoir calculer sa facture de tête et se braquer avant d’avoir
   vu le produit. La facturation à l’utilisateur ne commence qu’au-delà du
   forfait inclus.

   ⚠️ Montants à revoir avant mise en ligne si la grille bouge : ils sont tous
   dans ce tableau et dans les deux bandeaux qui suivent.
------------------------------------------------------------------------- */
const OFFRES = [
  {
    nom: "Essentiel",
    prix: "39 €",
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

export function Pricing() {
  return (
    <section id="tarifs" className="mx-auto max-w-6xl px-5 py-20 sm:px-6 sm:py-28">
      <div className="max-w-2xl">
        <p className="text-amber text-[11px] font-semibold tracking-[0.16em] uppercase">
          Tarifs
        </p>
        <h2 className="text-ink mt-3 text-3xl font-semibold sm:text-[2.5rem] sm:leading-[1.12]">
          Un abonnement par entreprise, pas par tête
        </h2>
        <p className="text-ink-soft mt-5 text-lg">
          Embaucher un technicien ne doit pas coûter une licence de plus dès le
          premier jour. Pas de frais de mise en service, pas de palier sur le
          nombre de clients ou d’équipements. Essai gratuit, sans engagement.
        </p>
      </div>

      <div className="mt-14 grid items-start gap-6 lg:grid-cols-3">
        {OFFRES.map((o) => (
          <div
            key={o.nom}
            className={
              "reveal relative flex flex-col rounded-2xl border p-7 " +
              (o.accent
                ? "border-petrol bg-petrol text-white shadow-2xl shadow-black/15 lg:-mt-4 lg:pb-9"
                : "border-line bg-white")
            }
          >
            {o.accent && (
              <span className="bg-amber absolute -top-3 left-7 rounded-full px-3 py-1 text-[11px] font-semibold text-white">
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
              <div className="flex items-baseline gap-2">
                <span
                  className={
                    "text-4xl font-semibold tracking-tight " +
                    (o.accent ? "text-white" : "text-ink")
                  }
                >
                  {o.prix}
                </span>
                <span
                  className={
                    "text-[13.5px] " + (o.accent ? "text-white/55" : "text-ink-soft")
                  }
                >
                  {o.unite}
                </span>
              </div>

              <p
                className={
                  "mt-2 text-[13.5px] font-medium " +
                  (o.accent ? "text-amber" : "text-petrol")
                }
              >
                {o.sieges}
              </p>
              {o.extra && (
                <p
                  className={
                    "mt-0.5 text-[12.5px] " +
                    (o.accent ? "text-white/45" : "text-ink-soft")
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
                  ? "bg-amber hover:bg-amber-bright text-white"
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
                      (o.accent ? "text-amber" : "text-petrol")
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

      <p className="text-ink-soft mt-8 text-center text-[13.5px]">
        Aucune carte bancaire requise · Annulation à tout moment
      </p>

      {/* Au-delà de dix utilisateurs, le prix se discute : autant le dire. */}
      <div className="border-line mt-6 flex flex-col gap-5 rounded-2xl border bg-white p-7 sm:flex-row sm:items-center sm:justify-between">
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
      <div className="bg-amber-soft/60 border-amber/30 mt-6 flex flex-col gap-4 rounded-2xl border border-dashed p-6 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-ink text-[14.5px]">
          <span className="text-amber font-semibold">Offre fondateur</span> —
          79 € par mois jusqu’à trois utilisateurs, pour les premières
          entreprises qui nous rejoignent.{" "}
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
        <h2 className="text-ink text-3xl font-semibold sm:text-[2.2rem]">
          Questions fréquentes
        </h2>

        <div className="mt-10 divide-y divide-[var(--color-line)] border-y border-[var(--color-line)]">
          {QUESTIONS.map(([q, r]) => (
            <details key={q} className="group py-5">
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
      <div className="bg-petrol-deep grain relative isolate overflow-hidden rounded-3xl px-7 py-14 text-white sm:px-14 sm:py-16">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 -z-10"
          style={{
            background:
              "radial-gradient(40rem 24rem at 20% 0%, rgba(217,122,40,0.28), transparent 62%), radial-gradient(36rem 22rem at 90% 100%, rgba(79,168,199,0.18), transparent 60%)",
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
            <p className="mt-8 text-[14px] text-white/45">
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
    <footer className="border-line border-t">
      <div className="mx-auto grid max-w-6xl gap-10 px-5 py-12 sm:px-6 md:grid-cols-[1fr_1.6fr]">
        <div>
          <span className="text-petrol">
            <Wordmark />
          </span>
          <p className="text-ink-soft mt-3 max-w-xs text-[13.5px]">
            Gérez vos interventions. Maîtrisez vos équipements.
          </p>
        </div>

        <div className="grid gap-8 text-[14px] sm:grid-cols-3">
          <nav className="flex flex-col gap-2.5">
            <p className="text-ink text-[12px] font-semibold tracking-[0.12em] uppercase">
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
                className="text-ink-soft hover:text-petrol transition-colors"
              >
                {label}
              </Link>
            ))}
          </nav>

          <nav className="flex flex-col gap-2.5">
            <p className="text-ink text-[12px] font-semibold tracking-[0.12em] uppercase">
              Métiers
            </p>
            {METIERS.slice(0, 4).map((m) => (
              <Link
                key={m.slug}
                href={`/metiers/${m.slug}`}
                className="text-ink-soft hover:text-petrol transition-colors"
              >
                {m.nom}
              </Link>
            ))}
            <Link
              href="/#metiers"
              className="text-ink-soft hover:text-petrol transition-colors"
            >
              Tous les métiers
            </Link>
          </nav>

          <nav className="flex flex-col gap-2.5">
            <p className="text-ink text-[12px] font-semibold tracking-[0.12em] uppercase">
              Vennora
            </p>
            {[
              [`mailto:${SITE.email}`, "Contact"],
              ["/mentions-legales", "Mentions légales"],
              ["/confidentialite", "Confidentialité"],
              ["/cgv", "Conditions générales"],
            ].map(([href, label]) => (
              <Link
                key={label}
                href={href}
                className="text-ink-soft hover:text-petrol transition-colors"
              >
                {label}
              </Link>
            ))}
          </nav>
        </div>
      </div>

      <div className="border-line border-t">
        <div className="text-ink-soft mx-auto flex max-w-6xl flex-col gap-2 px-5 py-6 text-[12.5px] sm:flex-row sm:justify-between sm:px-6">
          <p>
            © {new Date().getFullYear()} {SITE.nom}. Tous droits réservés.
          </p>
          <p>Fait en France, pour des métiers qui travaillent dehors.</p>
        </div>
      </div>
    </footer>
  );
}
