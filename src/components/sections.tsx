import {
  IconBell,
  IconCalendar,
  IconCamera,
  IconCheck,
  IconQr,
  IconShield,
  IconSignature,
  IconWave,
} from "./icons";

/* -------------------------------------------------------------------------
   Titre de section : même composition partout, pour que l’œil sache où il
   est sans relire.
------------------------------------------------------------------------- */
function SectionTitle({
  eyebrow,
  title,
  lead,
  inverse = false,
}: {
  eyebrow: string;
  title: React.ReactNode;
  lead?: string;
  inverse?: boolean;
}) {
  return (
    <div className="reveal max-w-2xl">
      <p
        className={
          "text-[11px] font-semibold tracking-[0.16em] uppercase " +
          // L’ambre décoratif ne se lit ni sur le papier ni sur le pétrole :
          // chaque fond a sa valeur. Voir la note de palette dans globals.css.
          (inverse ? "text-amber-bright" : "text-amber-deep")
        }
      >
        {eyebrow}
      </p>
      <h2
        className={
          "mt-3 text-3xl font-semibold sm:text-[2.5rem] sm:leading-[1.12] " +
          (inverse ? "text-white" : "text-ink")
        }
      >
        {title}
      </h2>
      {lead && (
        <p
          className={
            "mt-5 text-lg " + (inverse ? "text-white/65" : "text-ink-soft")
          }
        >
          {lead}
        </p>
      )}
    </div>
  );
}

/* -------------------------------------------------------------------------
   La chaîne. C’est le produit en une ligne : tout le reste en découle.
------------------------------------------------------------------------- */
const CHAINE = [
  ["Client", "Particulier ou syndic, avec ses contacts."],
  ["Site", "L’adresse où l’on se rend, ses accès."],
  ["Équipement", "L’appareil suivi, son étiquette, sa périodicité."],
  ["Intervention", "Ce qui est fait, quand, par qui."],
  ["Rapport", "Signé, en PDF, envoyé au client."],
  ["Historique", "Ce qu’on ressort trois ans plus tard."],
];

/* -------------------------------------------------------------------------
   Le serpentin.

   La grille change quatre fois de forme, et le trait qui relie les étapes
   doit suivre. À deux colonnes, on ne lit plus de gauche à droite en
   repartant à la ligne : on serpente, ce qui évite le trait qui s’arrête en
   fin de rangée et le saut de l’œil vers l’autre bord.

     une colonne      deux colonnes        trois            six
      ⑴               ⑴ ── ⑵              ⑴ ─ ⑵ ─ ⑶       ⑴─⑵─⑶─⑷─⑸─⑹
      ┆                       ┆             ⑷ ─ ⑸ ─ ⑹
      ⑵               ⑷ ── ⑶
      ┆                ┆
      ⑶               ⑸ ── ⑹

   À deux colonnes, chaque étape sauf la dernière porte donc un trait — c’est
   tout l’intérêt du serpentin. À trois, la troisième termine sa rangée et
   n’en porte pas.
------------------------------------------------------------------------- */

/**
 * Placement en serpentin, valable seulement à deux colonnes.
 *
 * Les rangées paires se lisent à l’endroit, les impaires à l’envers : la
 * colonne de gauche reçoit 1, 4, 5 et celle de droite 2, 3, 6. Au-delà de
 * deux colonnes, on rend la main au placement automatique.
 */
const SERPENTIN = [
  "sm:col-start-1 sm:row-start-1",
  "sm:col-start-2 sm:row-start-1",
  "sm:col-start-2 sm:row-start-2",
  "sm:col-start-1 sm:row-start-2",
  "sm:col-start-1 sm:row-start-3",
  "sm:col-start-2 sm:row-start-3",
  "lg:col-start-auto lg:row-start-auto",
];

/** Trait horizontal partant du flanc droit de la pastille. */
const VERS_LA_DROITE =
  "sm:top-3 sm:bottom-auto sm:left-6 sm:-right-6 sm:h-0 sm:w-auto sm:border-t sm:border-l-0";

/**
 * Trait horizontal partant du flanc gauche, pour la rangée qui se lit à
 * l’envers. `right-full` cale le bout droit sur le bord gauche de la carte,
 * et `w-full` lui donne la largeur d’une colonne — soit exactement la
 * gouttière plus ce qui reste de la colonne voisine jusqu’à sa pastille,
 * les deux colonnes étant de même largeur.
 */
const VERS_LA_GAUCHE =
  "sm:top-3 sm:bottom-auto sm:left-auto sm:right-full sm:h-0 sm:w-full sm:border-t sm:border-l-0";

/** À trois colonnes et au-delà, tous les traits repartent vers la droite. */
const RETOUR_EN_LIGNE =
  "lg:top-3 lg:bottom-auto lg:left-6 lg:-right-6 lg:h-0 lg:w-auto lg:border-t lg:border-l-0";

/**
 * Sens du trait à deux colonnes : droite, bas, gauche, bas, droite.
 * Le trait vers le bas est celui du repli à une colonne, rien à redéfinir.
 */
function sens(i: number): string {
  if (i % 4 === 0) return VERS_LA_DROITE;
  if (i % 4 === 2) return VERS_LA_GAUCHE;
  return "";
}

/**
 * Les seuls traits à masquer sont ceux qui termineraient une rangée.
 * Le serpentin n’en produit aucun ; à trois colonnes, la troisième étape en
 * produit un, qu’il faut défaire à six.
 */
function liaison(i: number, total: number): string {
  if (i === total - 1) return "hidden"; // la dernière étape ne mène nulle part
  return i % 3 === 2 ? "lg:hidden xl:block" : "";
}

/**
 * La chaîne.
 *
 * Le trait joint les pastilles : il part du bord de l’une et s’arrête au
 * bord de la suivante. Cela suppose que rien ne se trouve entre les deux.
 * D’où deux zones tenues libres tant que la grille serpente — la ligne du
 * numéro à droite de la pastille, et la marge de 36 px sous elle. Le titre
 * descend donc sous le numéro et se décale ; à partir de trois colonnes,
 * plus aucun trait ne descend, la marge est rendue au texte.
 */
export function Chain() {
  return (
    <section className="border-line bg-sand/60 border-y">
      <div className="mx-auto max-w-6xl px-5 py-14 sm:px-6">
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6">
          {CHAINE.map(([titre, texte], i) => (
            <div
              key={titre}
              className={`reveal reveal-${i % 4} relative pl-9 lg:pl-0 ${SERPENTIN[i]} ${SERPENTIN[6]}`}
            >
              <span
                aria-hidden="true"
                className={
                  "border-ink-soft/35 pointer-events-none absolute border-dashed " +
                  // Repli : de sous la pastille jusqu’à celle du dessous.
                  "top-6 -bottom-6 left-3 w-0 border-l " +
                  `${sens(i)} ${RETOUR_EN_LIGNE} ${liaison(i, CHAINE.length)}`
                }
              />
              <span className="bg-petrol absolute top-0 left-0 grid size-6 place-items-center rounded-full text-[11px] font-semibold text-white lg:static">
                {i + 1}
              </span>
              <p className="text-ink text-[15px] font-semibold sm:mt-8 lg:mt-3.5">
                {titre}
              </p>
              <p className="text-ink-soft mt-2 text-[13.5px] leading-relaxed">
                {texte}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* -------------------------------------------------------------------------
   Fonctionnalités
------------------------------------------------------------------------- */
const FONCTIONS = [
  {
    icon: IconQr,
    titre: "Un parc d’équipements qui se tient",
    texte:
      "Chaque appareil porte une étiquette. Le technicien la scanne, la fiche s’ouvre : historique, périodicité, anomalies encore ouvertes. Le jeton est opaque et révocable — l’étiquette ne porte jamais un identifiant de base.",
  },
  {
    icon: IconCalendar,
    titre: "Planning et tournées",
    texte:
      "Une semaine par technicien, une couleur par type d’intervention, une durée par défaut qui vient du catalogue métier. Une échéance devient un rendez-vous en trois gestes.",
  },
  {
    icon: IconCamera,
    titre: "Le terrain sans friction",
    texte:
      "Photos compressées avant l’envoi, anomalies enregistrées avec leur gravité, champs de saisie taillés pour un doigt ganté. L’application se tient d’une main.",
  },
  {
    icon: IconWave,
    titre: "Compte-rendu assisté",
    texte:
      "Le technicien dicte ses constats, Vennora propose un brouillon structuré selon les sections du métier. Rien ne part sans relecture : le texte reste modifiable et son origine est tracée.",
  },
  {
    icon: IconSignature,
    titre: "Signature, PDF, envoi",
    texte:
      "Le client signe sur l’écran. Le rapport est généré, archivé, envoyé. Le lien transmis expire ; la pièce, elle, reste dans l’historique.",
  },
  {
    icon: IconBell,
    titre: "Des échéances tenues",
    texte:
      "Les périodicités réglementaires sont portées par le type d’équipement. Vennora sort la liste de ce qui arrive à terme avant que le client n’appelle.",
  },
];

export function Features() {
  return (
    <section id="produit" className="mx-auto max-w-6xl px-5 py-20 sm:px-6 sm:py-28">
      <SectionTitle
        eyebrow="Le produit"
        title="Tout ce qu’une intervention laisse derrière elle"
        lead="Un logiciel de terrain ne se juge pas à sa liste de fonctions, mais à ce qu’il évite de ressaisir le soir. Vennora capte l’information là où elle naît."
      />

      <div className="mt-14 grid gap-px overflow-hidden rounded-2xl bg-[var(--color-line)] sm:grid-cols-2 lg:grid-cols-3">
        {FONCTIONS.map(({ icon: Icon, titre, texte }, i) => (
          <div
            key={titre}
            className={`reveal reveal-${i % 3} group bg-paper hover:bg-white p-7 transition-colors`}
          >
            <span className="bg-petrol text-amber grid size-10 place-items-center rounded-xl">
              <Icon className="size-5" />
            </span>
            <h3 className="text-ink mt-5 text-[17px] font-semibold">{titre}</h3>
            <p className="text-ink-soft mt-2.5 text-[14.5px] leading-relaxed">
              {texte}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}

/* -------------------------------------------------------------------------
   Terrain — la moitié du produit se joue sur un téléphone, dehors.
------------------------------------------------------------------------- */
const TERRAIN = [
  [
    "Une main, des gants, du soleil",
    "Champs de 44 pixels, contrastes tenus en plein jour, pas de menu à trois niveaux.",
  ],
  [
    "Ce qui compte est déjà rempli",
    "Le type d’intervention, sa durée, la périodicité : le catalogue du métier les donne. Le technicien corrige, il ne saisit pas.",
  ],
  [
    "La preuve se constitue seule",
    "Photos horodatées, anomalies datées, signature du client : le dossier est complet à la fermeture de la porte.",
  ],
];

export function Field() {
  return (
    <section
      id="terrain"
      className="bg-petrol grain relative isolate overflow-hidden text-white"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10"
        style={{
          background:
            "radial-gradient(50rem 30rem at 85% 0%, rgba(217,122,40,0.18), transparent 60%)",
        }}
      />
      <div className="mx-auto grid max-w-6xl items-center gap-14 px-5 py-20 sm:px-6 sm:py-28 lg:grid-cols-[1fr_0.8fr]">
        <div className="reveal-gauche">
          <SectionTitle
            inverse
            eyebrow="Sur le terrain"
            title="Conçu pour être utilisé debout, dehors"
            lead="Un technicien qui doit poser son sac pour remplir un formulaire ne le remplit pas. Il le remplira le soir, de mémoire, ou pas du tout."
          />

          <dl className="mt-12 space-y-8">
            {TERRAIN.map(([titre, texte], i) => (
              <div
                key={titre}
                className={`reveal reveal-${i} border-l-2 border-white/15 pl-5`}
              >
                <dt className="text-[16px] font-semibold text-white">{titre}</dt>
                <dd className="mt-1.5 text-[15px] leading-relaxed text-white/60">
                  {texte}
                </dd>
              </div>
            ))}
          </dl>
        </div>

        {/* Téléphone : cadre dessiné, écran d’intervention en cours. */}
        <div className="reveal-droite mx-auto w-full max-w-[17rem]">
          <div className="rounded-[2.2rem] border border-white/15 bg-black/40 p-2.5 shadow-2xl shadow-black/50 backdrop-blur-sm">
            <div className="bg-paper overflow-hidden rounded-[1.7rem]">
              <div className="bg-petrol px-4 pt-4 pb-5 text-white">
                <p className="text-[10px] tracking-[0.14em] text-white/60 uppercase">
                  Intervention en cours
                </p>
                <p className="mt-1.5 text-[15px] font-semibold">
                  Boulangerie Marchand
                </p>
                <p className="text-[11.5px] text-white/65">
                  Poêle à granulés · Anduze
                </p>
              </div>

              <div className="space-y-2.5 p-3.5">
                {/* Teintes assombries : les versions vives de ces trois
                    couleurs tombaient entre 3,5 et 4,4:1 sur du blanc, en
                    11 px. Voir la note de palette dans globals.css. */}
                {[
                  ["Photos", "4 clichés", "#4f7a45"],
                  ["Anomalie", "Trappe inaccessible", "#ba500c"],
                  ["Note vocale", "1 min 12", "#1c76ab"],
                ].map(([label, valeur, couleur]) => (
                  <div
                    key={label}
                    className="border-line flex items-center justify-between rounded-xl border bg-white px-3 py-2.5"
                  >
                    <span className="text-ink text-[12px] font-medium">
                      {label}
                    </span>
                    <span
                      className="text-[11px] font-semibold"
                      style={{ color: couleur }}
                    >
                      {valeur}
                    </span>
                  </div>
                ))}

                <div className="border-line rounded-xl border border-dashed bg-white/60 p-3 text-center">
                  <p className="text-ink-soft text-[11px]">Signature du client</p>
                  <svg
                    viewBox="0 0 160 40"
                    className="text-petrol mx-auto mt-1 h-9 w-full"
                    fill="none"
                    aria-hidden="true"
                  >
                    <path
                      d="M8 30c14 0 12-18 22-18s6 20 16 20 10-16 20-16 8 12 18 12 12-14 22-14 14 8 22 8"
                      stroke="currentColor"
                      strokeWidth="2.4"
                      strokeLinecap="round"
                    />
                  </svg>
                </div>

                <div className="bg-amber-deep rounded-xl py-2.5 text-center text-[12.5px] font-semibold text-white">
                  Terminer et envoyer
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* -------------------------------------------------------------------------
   Sérieux technique. Un acheteur B2B cherche cette section.
------------------------------------------------------------------------- */
const GARANTIES = [
  [
    "Cloisonnement par construction",
    "Chaque lecture et chaque écriture porte l’identifiant de votre entreprise, injecté par le socle. Ce n’est pas un filtre qu’un développeur peut oublier.",
  ],
  [
    "Droits relus à chaque requête",
    "Un compte désactivé perd l’accès dans la seconde, sans attendre l’expiration de sa session.",
  ],
  [
    "Fichiers hors du web public",
    "Photos de chantier et signatures ne sont jamais servies en clair : chaque lien est signé et expire.",
  ],
  [
    "Historique à valeur probante",
    "Une suppression est refusée dès qu’elle emporterait une intervention terminée ou un rapport signé.",
  ],
];

export function Trust() {
  return (
    <section className="border-line bg-sand/60 border-y">
      <div className="mx-auto max-w-6xl px-5 py-20 sm:px-6 sm:py-24">
        <div className="grid gap-12 lg:grid-cols-[0.9fr_1.1fr]">
          <div className="reveal-gauche">
            <span className="bg-petrol text-amber grid size-11 place-items-center rounded-xl">
              <IconShield className="size-5" />
            </span>
            <h2 className="text-ink mt-6 text-3xl font-semibold sm:text-[2.2rem]">
              Vos données ne se mélangent pas
            </h2>
            <p className="text-ink-soft mt-4 text-lg">
              Le risque, dans un logiciel multi-entreprises, n’est pas d’écrire
              un mauvais filtre : c’est d’en oublier un. La possibilité de
              l’oublier a été supprimée.
            </p>
          </div>

          <dl className="grid gap-x-10 gap-y-8 sm:grid-cols-2">
            {GARANTIES.map(([titre, texte], i) => (
              <div key={titre} className={`reveal reveal-${i % 2}`}>
                <dt className="text-ink flex items-center gap-2 text-[15.5px] font-semibold">
                  <IconCheck className="text-amber-deep size-4" />
                  {titre}
                </dt>
                <dd className="text-ink-soft mt-2 text-[14px] leading-relaxed">
                  {texte}
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </section>
  );
}
