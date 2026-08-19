"use client";

import { useEffect, useState } from "react";

/**
 * Démonstration jouée en boucle dans le héros.
 *
 * Six scènes, une intervention complète : la journée du technicien, le
 * chantier, la dictée, le compte-rendu, la signature, l’envoi. Le tout est
 * dessiné en HTML, aux couleurs exactes du produit — une vidéo aurait pesé
 * trois mégaoctets, se serait démodée à la première refonte, et n’aurait pas
 * été lisible sur un écran de téléphone.
 *
 * Chaque scène est remontée (`key`), ce qui relance ses animations CSS sans
 * qu’on ait à les réinitialiser à la main.
 */

const SCENES = [
  { id: "journee", label: "La journée", duree: 3400 },
  { id: "chantier", label: "Sur place", duree: 4400 },
  { id: "dictee", label: "Dictée", duree: 4200 },
  { id: "rapport", label: "Compte-rendu", duree: 4600 },
  { id: "signature", label: "Signature", duree: 3600 },
  { id: "envoi", label: "Envoi", duree: 3200 },
] as const;

/** Compteur qui s’arrête tout seul : sert aux photos et au chronomètre. */
function useTick(max: number, pas: number) {
  const [n, setN] = useState(0);
  useEffect(() => {
    if (n >= max) return;
    const id = setTimeout(() => setN((v) => v + 1), pas);
    return () => clearTimeout(id);
  }, [n, max, pas]);
  return n;
}

/* ------------------------------------------------------------------ scènes */

function Journee() {
  const lignes = [
    { h: "08:30", client: "Résidence Les Cévennes", lieu: "Alès", etat: "Terminée", c: "#4f7b45" },
    { h: "10:15", client: "Boulangerie Marchand", lieu: "Anduze", etat: "À faire", c: "#d97a28" },
    { h: "14:00", client: "M. et Mme Fabre", lieu: "Saint-Jean-du-Gard", etat: "Planifiée", c: "#6b7780" },
  ];
  return (
    <div>
      <Entete titre="Mardi 14 octobre" sous="3 interventions · Ludovic M." />
      <div className="mt-3.5 space-y-2.5">
        {lignes.map((l, i) => (
          <div
            key={l.h}
            className={
              "pop border-line/70 flex items-center gap-3 rounded-xl border bg-white p-2.5 " +
              (i === 1 ? "ring-amber/60 shadow-[0_8px_24px_-10px_rgba(217,122,40,0.5)] ring-2" : "")
            }
            style={{ animationDelay: `${i * 160 + (i === 1 ? 0 : 0)}ms` }}
          >
            <div className="bg-sand text-petrol grid w-12 shrink-0 place-items-center rounded-lg py-2 text-[12px] font-semibold">
              {l.h}
            </div>
            <div className="min-w-0 flex-1">
              <p className="text-ink truncate text-[12.5px] font-semibold">{l.client}</p>
              <p className="text-ink-soft truncate text-[11px]">{l.lieu}</p>
            </div>
            <span
              className="rounded-full px-2 py-1 text-[10px] font-semibold whitespace-nowrap"
              style={{ color: l.c, background: `${l.c}14` }}
            >
              {l.etat}
            </span>
          </div>
        ))}
      </div>
      <p className="text-ink-soft pop mt-3.5 text-[11px]" style={{ animationDelay: "900ms" }}>
        Le technicien ouvre la deuxième — il y est.
      </p>
    </div>
  );
}

function Chantier() {
  const photos = useTick(4, 620);
  return (
    <div>
      <Entete titre="Boulangerie Marchand" sous="Poêle à granulés · étiquette VNR-2841" />

      <div className="border-line/70 slide-in mt-3.5 flex items-center gap-3 rounded-xl border bg-white p-3">
        <span className="relative grid size-10 shrink-0 place-items-center">
          <span className="bg-amber/30 halo absolute inset-0 rounded-lg" />
          <span className="bg-petrol text-amber relative grid size-10 place-items-center rounded-lg">
            <svg viewBox="0 0 24 24" className="size-5" fill="none" stroke="currentColor" strokeWidth="1.7">
              <rect x="3" y="3" width="7" height="7" rx="1.5" />
              <rect x="14" y="3" width="7" height="7" rx="1.5" />
              <rect x="3" y="14" width="7" height="7" rx="1.5" />
              <path d="M14 14h3v3h-3zM20 14v3M14 20h7" strokeLinecap="round" />
            </svg>
          </span>
        </span>
        <div className="min-w-0">
          <p className="text-ink text-[12.5px] font-semibold">Équipement reconnu</p>
          <p className="text-ink-soft text-[11px]">
            Dernier passage : 18 octobre 2025 · échéance dans 4 jours
          </p>
        </div>
      </div>

      <div className="mt-3 grid grid-cols-4 gap-2">
        {[0, 1, 2, 3].map((i) => (
          <div
            key={i}
            className={
              "aspect-square rounded-lg transition-all duration-500 " +
              (i < photos
                ? "pop bg-gradient-to-br from-[#2f4750] to-[#16292f]"
                : "border-line border border-dashed bg-white/50")
            }
          />
        ))}
      </div>

      <div className="mt-3 flex items-center justify-between">
        <span className="text-ink-soft text-[11px]">{photos} photo{photos > 1 ? "s" : ""} ajoutée{photos > 1 ? "s" : ""}</span>
        {photos >= 4 && (
          <span className="pop rounded-full bg-[#e2610f14] px-2.5 py-1 text-[10px] font-semibold text-[#e2610f]">
            Anomalie · trappe inaccessible
          </span>
        )}
      </div>
    </div>
  );
}

function Dictee() {
  const t = useTick(72, 44);
  const mm = Math.floor(t / 60);
  const ss = String(t % 60).padStart(2, "0");
  return (
    <div>
      <Entete titre="Note vocale" sous="Le technicien parle, il ne tape pas." />

      <div className="border-line/70 mt-3.5 rounded-xl border bg-white p-4">
        <div className="flex items-center gap-3">
          <span className="relative grid size-11 shrink-0 place-items-center">
            <span className="bg-amber/25 halo absolute inset-0 rounded-full" />
            <span className="bg-amber relative grid size-11 place-items-center rounded-full text-white">
              <svg viewBox="0 0 24 24" className="size-5" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round">
                <rect x="9" y="3" width="6" height="11" rx="3" />
                <path d="M5 11a7 7 0 0 0 14 0M12 18v3" />
              </svg>
            </span>
          </span>
          <div className="flex h-10 flex-1 items-center gap-[3px]">
            {Array.from({ length: 34 }).map((_, i) => (
              <span
                key={i}
                className="wave bg-petrol/70 w-full rounded-full"
                style={{
                  height: `${18 + ((i * 37) % 22)}px`,
                  animationDelay: `${(i % 9) * 90}ms`,
                }}
              />
            ))}
          </div>
          <span className="text-ink-soft w-10 text-right text-[12px] font-semibold tabular-nums">
            {mm}:{ss}
          </span>
        </div>
      </div>

      <div className="bg-sand/70 mt-3 rounded-xl p-3">
        <p className="text-ink-soft text-[11px] font-semibold tracking-[0.12em] uppercase">
          Transcription
        </p>
        <p className="text-ink mt-1.5 text-[12.5px] leading-relaxed">
          « Conduit ramoné sur toute la hauteur, aspiration des suies faite. La
          trappe de pied est bloquée par un meuble, à signaler au client. »
        </p>
      </div>
    </div>
  );
}

const TEXTE =
  "Ramonage mécanique du conduit sur toute sa hauteur par le bas. Aspiration des suies, nettoyage du foyer, contrôle du tirage : conforme.";

function Rapport() {
  const [n, setN] = useState(0);
  useEffect(() => {
    if (n >= TEXTE.length) return;
    const id = setTimeout(() => setN((v) => Math.min(v + 3, TEXTE.length)), 26);
    return () => clearTimeout(id);
  }, [n]);

  const fini = n >= TEXTE.length;

  return (
    <div>
      <Entete titre="Compte-rendu proposé" sous="Rédigé à partir de la dictée, jamais envoyé sans relecture." />

      <div className="border-line/70 mt-3.5 rounded-xl border bg-white p-3.5">
        <div className="flex items-center justify-between">
          <p className="text-ink text-[11.5px] font-semibold">Travaux réalisés</p>
          <span
            className={
              "rounded-full px-2 py-0.5 text-[10px] font-semibold transition-colors " +
              (fini ? "bg-[#4f7b4514] text-[#4f7b45]" : "bg-sand text-ink-soft")
            }
          >
            {fini ? "Relu" : "Brouillon"}
          </span>
        </div>
        <p className="text-ink mt-2 min-h-[4.5rem] text-[12.5px] leading-relaxed">
          {TEXTE.slice(0, n)}
          {!fini && <span className="caret text-amber">▍</span>}
        </p>
      </div>

      <div className="mt-3 grid grid-cols-3 gap-2">
        {["État de l’équipement", "Anomalies", "Recommandations"].map((s, i) => (
          <div
            key={s}
            className="border-line/70 pop rounded-lg border bg-white px-2.5 py-2"
            style={{ animationDelay: `${1400 + i * 260}ms` }}
          >
            <p className="text-ink-soft hyphens-auto text-[9.5px] leading-tight font-semibold break-words">
              {s}
            </p>
            <span className="bg-sand-deep mt-1.5 block h-1 w-full rounded-full" />
            <span className="bg-sand-deep mt-1 block h-1 w-2/3 rounded-full" />
          </div>
        ))}
      </div>
    </div>
  );
}

function Signature() {
  return (
    <div>
      <Entete titre="Signature du client" sous="Sur l’écran, avant de quitter les lieux." />

      <div className="border-line/70 mt-3.5 rounded-xl border border-dashed bg-white p-4">
        <svg viewBox="0 0 300 74" className="text-petrol h-20 w-full" fill="none" aria-hidden="true">
          <path
            className="draw"
            d="M14 56c22 0 20-34 36-34s10 38 28 38 18-30 36-30 14 22 32 22 22-26 40-26 26 14 40 14"
            stroke="currentColor"
            strokeWidth="2.6"
            strokeLinecap="round"
          />
        </svg>
        <div className="border-line mt-2 flex items-center justify-between border-t pt-2.5">
          <p className="text-ink-soft text-[11px]">Mme Marchand · 14 octobre, 11 h 42</p>
          <span className="pop rounded-full bg-[#4f7b4514] px-2.5 py-1 text-[10px] font-semibold text-[#4f7b45]" style={{ animationDelay: "2200ms" }}>
            Signé
          </span>
        </div>
      </div>

      <p className="text-ink-soft mt-3 text-[11px]">
        La signature est horodatée et attachée au rapport : elle ne se rejoue pas.
      </p>
    </div>
  );
}

function Envoi() {
  const t = useTick(1, 2100);
  const fini = t >= 1;
  return (
    <div>
      <Entete titre="Envoi du rapport" sous="PDF généré, archivé, transmis." />

      <div className="border-line/70 mt-3.5 rounded-xl border bg-white p-4">
        <div className="flex items-center gap-3">
          <span className="bg-petrol grid size-10 shrink-0 place-items-center rounded-lg text-white">
            <svg viewBox="0 0 24 24" className="size-5" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
              <path d="M14 3v5h5" />
              <path d="M19 8v11a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h7l5 5Z" />
            </svg>
          </span>
          <div className="min-w-0 flex-1">
            <p className="text-ink text-[12.5px] font-semibold">
              rapport-2026-0412.pdf
            </p>
            <div className="bg-sand mt-2 h-1.5 w-full overflow-hidden rounded-full">
              <span className="bg-amber fill block h-full rounded-full" />
            </div>
          </div>
        </div>

        {fini && (
          <div className="pop border-line mt-3.5 flex items-center gap-2 border-t pt-3">
            <span className="grid size-5 place-items-center rounded-full bg-[#4f7b45] text-white">
              <svg viewBox="0 0 24 24" className="size-3" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                <path d="m5 12.5 4.5 4.5L19 7" />
              </svg>
            </span>
            <p className="text-ink text-[11.5px]">
              Envoyé à <span className="font-semibold">contact@boulangerie-marchand.fr</span>
            </p>
          </div>
        )}
      </div>

      <p className="text-ink-soft mt-3 text-[11px]">
        Prochaine échéance créée automatiquement : 14 octobre 2027.
      </p>
    </div>
  );
}

function Entete({ titre, sous }: { titre: string; sous: string }) {
  return (
    <div className="slide-in">
      <p className="text-ink text-[15px] font-semibold">{titre}</p>
      <p className="text-ink-soft mt-0.5 text-[11.5px]">{sous}</p>
    </div>
  );
}

const RENDU: Record<string, () => React.ReactElement> = {
  journee: Journee,
  chantier: Chantier,
  dictee: Dictee,
  rapport: Rapport,
  signature: Signature,
  envoi: Envoi,
};

/* ------------------------------------------------------------------ fenêtre */

export function AppPreview() {
  const [i, setI] = useState(0);
  const [anime, setAnime] = useState(true);
  // Le survol suspend la boucle : on ne se bat pas contre un visiteur qui
  // s’est arrêté sur une étape pour la lire.
  const [pause, setPause] = useState(false);
  // Scènes dont le contenu est monté. Pendant le défilé il en faut deux : la
  // sortante doit rester visible jusqu’au bout du glissement, et l’entrante
  // être montée pour que ses animations partent du début.
  const [montees, setMontees] = useState<number[]>([0]);

  useEffect(() => {
    setMontees((v) => (v.includes(i) ? v : [...v, i]));
    const id = setTimeout(() => setMontees([i]), 900);
    return () => clearTimeout(id);
  }, [i]);

  useEffect(() => {
    const doux = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (doux.matches) {
      setAnime(false);
      setI(3);
    }
  }, []);

  useEffect(() => {
    if (!anime || pause) return;
    const id = setTimeout(() => setI((v) => (v + 1) % SCENES.length), SCENES[i].duree);
    return () => clearTimeout(id);
  }, [i, anime, pause]);

  const scene = SCENES[i];

  return (
    <div
      className="demo relative min-w-0"
      onMouseEnter={() => setPause(true)}
      onMouseLeave={() => setPause(false)}
    >
      <div aria-hidden="true" className="bg-amber/25 absolute -inset-8 -z-10 rounded-[3rem] blur-3xl" />

      <div className="overflow-hidden rounded-2xl border border-white/10 bg-white shadow-2xl shadow-black/40">
        {/* Barre de fenêtre */}
        <div className="flex items-center gap-2 border-b border-black/5 bg-[#f6f4ef] px-4 py-3">
          <span className="size-2.5 rounded-full bg-[#e0dbd0]" />
          <span className="size-2.5 rounded-full bg-[#e0dbd0]" />
          <span className="size-2.5 rounded-full bg-[#e0dbd0]" />
          <span className="text-ink-soft mx-auto truncate rounded-md bg-white px-3 py-1 text-[11px] font-medium">
            vennora.app
          </span>
          <span
            className={
              "flex items-center gap-1.5 text-[10px] font-semibold " +
              (pause ? "text-ink-soft" : "text-[#4f7b45]")
            }
          >
            <span
              className={
                "size-1.5 rounded-full " +
                (pause ? "bg-ink-soft" : "animate-pulse bg-[#4f7b45]")
              }
            />
            {pause ? "En pause" : "En direct"}
          </span>
        </div>

        <div className="flex">
          {/* Barre latérale : le rail des étapes sert de fil conducteur. */}
          <div className="bg-petrol hidden w-40 shrink-0 flex-col gap-1 p-3 sm:flex">
            <p className="px-2.5 pt-1 pb-3 text-[10px] font-semibold tracking-[0.14em] text-white/40 uppercase">
              Ramonage Cévennes
            </p>
            {SCENES.map((s, k) => (
              <button
                key={s.id}
                type="button"
                onClick={() => setI(k)}
                aria-label={`Voir l’étape : ${s.label}`}
                className={
                  "flex cursor-pointer items-center gap-2 rounded-lg px-2.5 py-2 text-left text-[11.5px] font-medium transition-colors duration-500 hover:bg-white/10 " +
                  (k === i ? "bg-white/12 text-white" : "text-white/45")
                }
              >
                <span
                  className={
                    "size-1.5 shrink-0 rounded-full transition-colors duration-500 " +
                    (k === i ? "bg-amber" : k < i ? "bg-white/45" : "bg-white/20")
                  }
                />
                {s.label}
              </button>
            ))}
          </div>

          {/* Scènes : une piste horizontale qui défile d’une étape à l’autre.
              Hauteur fixe — un cadre qui grandit et rétrécit à chaque scène
              fait sauter toute la page. */}
          <div className="min-w-0 flex-1">
            <div className="h-[22rem] overflow-hidden" aria-hidden="true">
              <div
                className="flex h-full transition-transform duration-[650ms] ease-[cubic-bezier(0.65,0,0.35,1)]"
                style={{ transform: `translateX(-${i * 100}%)` }}
              >
                {SCENES.map((s, k) => {
                  const Contenu = RENDU[s.id];
                  return (
                    <div key={s.id} className="w-full min-w-0 shrink-0 p-4 sm:p-5">
                      {montees.includes(k) && <Contenu />}
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Progression de la scène en cours */}
            <div className="bg-sand/60 h-1 w-full">
              <span
                key={scene.id + "-barre"}
                className="bg-amber block h-full"
                style={
                  anime
                    ? {
                        animation: `fill ${scene.duree}ms linear both`,
                        // Gelée sur place au survol, plutôt que remise à zéro.
                        animationPlayState: pause ? "paused" : "running",
                      }
                    : { width: "100%" }
                }
              />
            </div>
          </div>
        </div>
      </div>

      <p className="mt-4 text-center text-[12.5px] text-white/45">
        Démonstration en temps réel · une intervention, du chantier au rapport envoyé
      </p>
    </div>
  );
}
