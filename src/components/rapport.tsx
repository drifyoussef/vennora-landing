/* -------------------------------------------------------------------------
   Le rapport et l’historique — ce que l’intervention laisse derrière elle,
   montré plutôt que décrit.

   Les personnes, l’entreprise et les numéros sont fictifs. Les téléphones
   sont pris dans la tranche que l’ARCEP réserve à la fiction
   (06 39 98 xx xx), le courriel sur un domaine d’exemple : rien ici ne doit
   pouvoir sonner chez quelqu’un.
------------------------------------------------------------------------- */

/**
 * QR code décoratif.
 *
 * Il en a l’allure — trois repères d’angle, lignes de synchronisation — mais
 * ne se scanne pas : le reste est tiré d’un générateur à graine fixe, donc
 * identique au serveur et au client. Un vrai code renverrait vers une fiche
 * qui n’existe pas.
 */
function QrDecor({ className = "" }: { className?: string }) {
  const N = 21;
  let graine = 0x9e3779b9;
  const hasard = () => {
    graine = (graine ^ (graine << 13)) >>> 0;
    graine = (graine ^ (graine >>> 17)) >>> 0;
    graine = (graine ^ (graine << 5)) >>> 0;
    return graine / 0xffffffff;
  };

  const dansRepere = (x: number, y: number) =>
    (x < 8 && y < 8) || (x >= N - 8 && y < 8) || (x < 8 && y >= N - 8);

  let d = "";
  for (let y = 0; y < N; y++) {
    for (let x = 0; x < N; x++) {
      if (dansRepere(x, y)) continue;
      const synchro = x === 6 || y === 6;
      const plein = synchro ? (x + y) % 2 === 0 : hasard() < 0.5;
      if (plein) d += `M${x} ${y}h1v1h-1z`;
    }
  }

  // Repères d’angle : carré 7×7, anneau blanc, cœur 3×3.
  for (const [ox, oy] of [
    [0, 0],
    [N - 7, 0],
    [0, N - 7],
  ]) {
    d += `M${ox} ${oy}h7v7h-7zM${ox + 1} ${oy + 1}v5h5v-5z`;
    d += `M${ox + 2} ${oy + 2}h3v3h-3z`;
  }

  return (
    <svg
      viewBox={`0 0 ${N} ${N}`}
      className={className}
      aria-hidden="true"
      shapeRendering="crispEdges"
    >
      <path d={d} fill="currentColor" fillRule="evenodd" />
    </svg>
  );
}

/** Pastille d’état, partagée par le rapport et l’historique. */
function Etat({
  ton,
  children,
}: {
  ton: "ok" | "alerte";
  children: React.ReactNode;
}) {
  return (
    <span
      className={
        "inline-flex shrink-0 items-center rounded-full px-2.5 py-0.5 text-[11px] font-semibold whitespace-nowrap " +
        (ton === "ok"
          ? "bg-petrol/10 text-petrol"
          : "bg-amber-soft text-amber-deep")
      }
    >
      {children}
    </span>
  );
}

/* -------------------------------------------------------------------------
   Le rapport
------------------------------------------------------------------------- */
const CONTENU = [
  ["Client et site", "Coordonnées et adresse du chantier"],
  ["Équipement", "Type de conduit, emplacement"],
  ["Photos", "Avant et après intervention"],
  ["Compte-rendu", "Constat, travaux réalisés, recommandations"],
  ["Conformité", "Points de contrôle et anomalies"],
  ["Signatures", "Client et technicien"],
  ["Facture", "Votre PDF existant, si vous voulez le joindre"],
];

const CONTROLES = [
  "Conduit en bon état, sans fissure visible",
  "Tirage correct après intervention",
  "Trappe de ramonage accessible",
  "Plaque signalétique présente",
  "Écart au feu respecté",
];

const RUBRIQUES = [
  [
    "Constat",
    "Conduit maçonné en boisseaux, raccordé à un poêle à bois. Dépôt de suie sèche modéré, environ 2 mm, sans bistre.",
  ],
  [
    "Travaux réalisés",
    "Ramonage mécanique par le bas au hérisson Ø 150 sur toute la hauteur du conduit. Nettoyage du raccordement et du foyer.",
  ],
  [
    "Recommandations",
    "Prochain ramonage avant la saison de chauffe 2027. Brûler du bois sec, à moins de 20 % d’humidité.",
  ],
];

/** Étiquette en petites capitales des encadrés du rapport. */
const ETIQUETTE =
  "text-ink-soft text-[8.5px] font-semibold tracking-[0.14em] uppercase sm:text-[9px]";

function Document() {
  return (
    <div className="border-petrol text-ink rounded-sm border-t-4 bg-white px-5 py-6 shadow-xl shadow-[#10262e]/10 sm:px-8 sm:py-8">
      {/* En-tête */}
      <div className="flex flex-wrap items-start justify-between gap-x-6 gap-y-3">
        <div>
          <p className="text-petrol text-[13px] font-semibold sm:text-[14px]">
            Morel Ramonage
          </p>
          <p className="text-ink-soft mt-0.5 text-[10px] sm:text-[11px]">
            Julien Morel · 06 39 98 45 78 · Saint-Ismier
          </p>
        </div>
        <div className="sm:text-right">
          <p className="text-petrol text-[13px] font-semibold sm:text-[14px]">
            Rapport d’intervention
          </p>
          <p className="text-ink-soft mt-0.5 font-mono text-[9.5px] sm:text-[10.5px]">
            R-2026-0418 · 21 oct. 2026
          </p>
        </div>
      </div>

      {/* Client et équipement */}
      <div className="mt-5 grid gap-2.5 sm:grid-cols-2">
        <div className="border-line bg-paper rounded-md border p-3">
          <p className={ETIQUETTE}>Client et site</p>
          <p className="mt-1.5 text-[10.5px] font-semibold sm:text-[11px]">
            Martine Lefèvre
          </p>
          <p className="text-ink-soft text-[10px] leading-snug sm:text-[10.5px]">
            12 chemin des Tilleuls, 38330 Saint-Ismier
          </p>
          <p className="text-ink-soft mt-1 text-[10px] leading-snug sm:text-[10.5px]">
            06 39 98 73 20 · m.lefevre@exemple.fr
          </p>
        </div>
        <div className="border-line bg-paper rounded-md border p-3">
          <p className={ETIQUETTE}>Équipement</p>
          <p className="mt-1.5 text-[10.5px] font-semibold sm:text-[11px]">
            Poêle à bois Jøtul F 305
          </p>
          <p className="text-ink-soft text-[10px] leading-snug sm:text-[10.5px]">
            Conduit bois · boisseaux Ø 150
          </p>
          <p className="text-ink-soft mt-1 text-[10px] leading-snug sm:text-[10.5px]">
            Salon, rez-de-chaussée · EQ-0142
          </p>
        </div>
      </div>

      {/* Prestation */}
      <div className="border-line mt-3 flex flex-wrap items-center gap-x-6 gap-y-2 border-y py-2.5 text-[10px] sm:text-[10.5px]">
        <p className="text-ink-soft">
          Prestation{" "}
          <span className="text-ink font-semibold">Ramonage mécanique</span>
        </p>
        <p className="text-ink-soft">
          Technicien <span className="text-ink font-semibold">Julien Morel</span>
        </p>
        <span className="ml-auto">
          <Etat ton="ok">Conforme</Etat>
        </span>
      </div>

      {/* Compte-rendu */}
      <div className="mt-4 space-y-3">
        {RUBRIQUES.map(([titre, texte]) => (
          <div key={titre}>
            <p className="text-[10.5px] font-semibold sm:text-[11px]">{titre}</p>
            <p className="mt-0.5 text-[10px] leading-relaxed sm:text-[10.5px]">
              {texte}
            </p>
          </div>
        ))}
      </div>

      {/* Points de contrôle */}
      <p className="mt-4 text-[10.5px] font-semibold sm:text-[11px]">
        Points de contrôle
      </p>
      <ul className="mt-1">
        {CONTROLES.map((c) => (
          <li
            key={c}
            className="border-line flex items-center justify-between gap-4 border-b border-dashed py-1.5 text-[10px] sm:text-[10.5px]"
          >
            <span>{c}</span>
            <span className="text-petrol font-semibold">Oui</span>
          </li>
        ))}
      </ul>

      {/* Photos : des emplacements hachurés, pas de faux clichés. */}
      <p className="mt-4 text-[10.5px] font-semibold sm:text-[11px]">Photos</p>
      <div className="mt-2 grid grid-cols-4 gap-2">
        {["Avant 1", "Avant 2", "Après 1", "Après 2"].map((p) => (
          <div key={p}>
            <div
              className="aspect-[4/3] rounded-sm"
              style={{
                backgroundImage:
                  "repeating-linear-gradient(135deg, #ece5d8 0 6px, #f5f1e9 6px 12px)",
              }}
            />
            <p className="text-ink-soft mt-1 text-[8.5px] sm:text-[9px]">{p}</p>
          </div>
        ))}
      </div>

      {/* Signatures */}
      <div className="mt-4 grid gap-2.5 sm:grid-cols-2">
        {[
          "Signature client · Martine Lefèvre",
          "Signature technicien · Julien Morel",
        ].map((s) => (
          <div key={s} className="border-line rounded-md border px-3 py-2.5">
            <p className={ETIQUETTE}>{s}</p>
            <p className="text-ink-soft mt-2 text-[10px] italic sm:text-[10.5px]">
              Signé sur mobile le 21 oct. 2026
            </p>
          </div>
        ))}
      </div>

      {/* Pied */}
      <div className="text-ink-soft mt-4 flex flex-wrap justify-between gap-x-4 gap-y-1 text-[8.5px] sm:text-[9px]">
        <p>Facture jointe : facture-2026-418.pdf</p>
        <p>Généré par Vennora · conservé dans l’historique EQ-0142</p>
      </div>
    </div>
  );
}

export function Rapport() {
  return (
    <section
      id="rapport"
      className="mx-auto grid max-w-6xl items-center gap-12 px-5 pb-20 sm:px-6 sm:pb-28 lg:grid-cols-[1.05fr_1fr] lg:gap-16"
    >
      <div className="reveal-gauche bg-sand-deep/45 order-2 rounded-[2rem] p-4 sm:p-8 lg:order-1">
        <Document />
      </div>

      <div className="reveal-droite order-1 lg:order-2">
        <h2 className="text-ink text-3xl font-semibold sm:text-[2.5rem] sm:leading-[1.12]">
          Un rapport propre, sans rien retaper le soir.
        </h2>
        <p className="text-ink-soft mt-5 max-w-md text-lg">
          Le PDF se génère à la fin de l’intervention, avec tout ce que vous
          avez saisi sur place. Le client le reçoit par e-mail avant votre
          départ.
        </p>

        <dl className="border-line mt-10 border-b">
          {CONTENU.map(([titre, texte]) => (
            <div
              key={titre}
              className="border-line grid gap-1 border-t py-3.5 sm:grid-cols-[11rem_1fr] sm:gap-4"
            >
              <dt className="text-ink text-[15.5px] font-semibold">{titre}</dt>
              <dd className="text-ink-soft text-[15px]">{texte}</dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}

/* -------------------------------------------------------------------------
   L’historique par équipement
------------------------------------------------------------------------- */
const PASSAGES: {
  date: string;
  detail: string;
  etat: string;
  ton: "ok" | "alerte";
}[] = [
  {
    date: "21 oct. 2026",
    detail: "Ramonage mécanique · 4 photos",
    etat: "Conforme",
    ton: "ok",
  },
  {
    date: "14 oct. 2025",
    detail: "Ramonage mécanique · 4 photos",
    etat: "Conforme",
    ton: "ok",
  },
  {
    date: "9 nov. 2024",
    detail: "Ramonage + débistrage · 6 photos",
    etat: "Anomalie mineure",
    ton: "alerte",
  },
];

export function Historique() {
  return (
    <section className="border-line bg-sand/60 border-y">
      <div className="mx-auto grid max-w-6xl items-center gap-14 px-5 py-20 sm:px-6 sm:py-24 lg:grid-cols-[1fr_1.05fr]">
        <div className="reveal-gauche">
          <h2 className="text-ink text-3xl font-semibold sm:text-[2.5rem] sm:leading-[1.12]">
            Le rapport de 2024, retrouvé en dix secondes.
          </h2>
          <p className="text-ink-soft mt-5 max-w-lg text-lg">
            Chaque conduit a son QR code, collé près de la trappe. Vous le
            scannez et vous avez tous les passages précédents : rapports,
            photos, anomalies signalées. Un client ou son assureur vous demande
            un rapport ? Vous le renvoyez depuis l’historique.
          </p>
        </div>

        <div className="reveal-droite flex flex-col items-start sm:flex-row sm:justify-center">
          {/* L’étiquette, telle qu’elle est collée sur le conduit. */}
          <div className="relative z-10 mb-8 ml-2 shrink-0 -rotate-6 rounded-2xl bg-white p-4 shadow-lg shadow-[#10262e]/10 sm:mt-[-0.5rem] sm:mr-10 sm:mb-0 sm:ml-0 sm:p-5">
            <QrDecor className="text-ink size-24 sm:size-28" />
            <p className="text-ink mt-2.5 text-center font-mono text-[12px] tracking-wider">
              EQ-0142
            </p>
          </div>

          <div className="border-line w-full min-w-0 overflow-hidden rounded-2xl border bg-white shadow-sm sm:max-w-sm sm:flex-1">
            <div className="border-line border-b px-5 py-4">
              <p className="text-ink text-[16px] font-semibold">
                Poêle à bois Jøtul F 305
              </p>
              <p className="text-ink-soft text-[13px]">
                Martine Lefèvre · Saint-Ismier
              </p>
            </div>
            <ul className="divide-line divide-y">
              {PASSAGES.map((p) => (
                <li
                  key={p.date}
                  className="flex items-center justify-between gap-4 px-5 py-3.5"
                >
                  <div>
                    <p className="text-ink text-[14px] font-semibold">
                      {p.date}
                    </p>
                    <p className="text-ink-soft text-[12.5px]">{p.detail}</p>
                  </div>
                  <Etat ton={p.ton}>{p.etat}</Etat>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
