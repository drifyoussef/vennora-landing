import { AppPreview } from "./app-preview";
import { IconCheck } from "./icons";

const PREUVES = [
  "Rapport PDF signé sur place",
  "QR code sur chaque équipement",
  "Échéances suivies automatiquement",
];

const METIERS = [
  "Ramonage",
  "Chauffage",
  "Climatisation",
  "Serrurerie",
  "Piscine",
  "Nuisibles",
  "Traitement de l’eau",
];

export function Hero() {
  return (
    // `min-h-dvh` plutôt que `min-h-screen` : sur mobile, `100vh` compte la
    // barre d’adresse rétractable, et le bas du héros finit sous le pouce.
    <section
      id="haut"
      className="bg-petrol-deep grain relative isolate flex min-h-dvh flex-col overflow-hidden text-white"
    >
      {/* Lumière : deux halos, l’un ambre côté texte, l’autre froid côté
          produit. Le dégradé plat rendait le bloc terne en grand écran. */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10"
        style={{
          background:
            "radial-gradient(70rem 40rem at 12% -10%, rgba(217,122,40,0.22), transparent 60%), radial-gradient(60rem 40rem at 95% 8%, rgba(79,168,199,0.18), transparent 62%), linear-gradient(180deg, #08222b 0%, #0b2c37 55%, #08222b 100%)",
        }}
      />

      <div className="mx-auto flex w-full max-w-6xl flex-1 flex-col px-5 pt-24 pb-10 sm:px-6 sm:pt-28 lg:pt-32 lg:pb-12 [@media(max-height:850px)]:pt-20 [@media(max-height:850px)]:pb-6 [@media(max-height:850px)]:lg:pt-24">
        {/* `flex-1` : le bloc principal occupe la hauteur restante et s’y centre,
            le bandeau des métiers reste posé en bas de l’écran. */}
        <div className="grid flex-1 items-center gap-12 py-8 lg:grid-cols-[1.05fr_minmax(0,1fr)] lg:gap-16 [@media(max-height:850px)]:py-2">
          <div className="min-w-0">
            <span
              className="rise inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-3.5 py-1.5 text-[12.5px] font-medium text-white/75 backdrop-blur-sm"
            >
              <span className="bg-amber size-1.5 rounded-full" />
              Logiciel des métiers d’intervention
            </span>

            <h1
              className="rise mt-6 text-4xl leading-[1.05] font-semibold sm:text-5xl lg:text-[3.5rem] [@media(max-height:850px)]:mt-4 [@media(max-height:850px)]:lg:text-[3rem]"
              style={{ animationDelay: "90ms" }}
            >
              Du parc client au rapport signé,{" "}
              <span className="text-amber-bright">sans ressaisie</span>.
            </h1>

            <p
              className="rise mt-6 max-w-xl text-lg text-white/70 sm:text-xl [@media(max-height:850px)]:mt-4 [@media(max-height:850px)]:text-lg"
              style={{ animationDelay: "180ms" }}
            >
              Vennora tient vos clients, leurs sites, leurs équipements et vos
              interventions dans une seule chaîne. Le technicien scanne
              l’appareil, photographie, dicte ses constats&nbsp;: le
              compte-rendu part signé avant qu’il ne quitte le chantier.
            </p>

            <div
              className="rise mt-9 flex flex-wrap items-center gap-3 [@media(max-height:850px)]:mt-6"
              style={{ animationDelay: "270ms" }}
            >
              <a
                href="#demo"
                className="bg-amber-deep hover:bg-amber-dark rounded-xl px-6 py-3.5 text-[15px] font-semibold text-white shadow-xl shadow-black/25 transition-colors"
              >
                Demander une démo
              </a>
              <a
                href="#produit"
                className="rounded-xl border border-white/20 px-6 py-3.5 text-[15px] font-semibold text-white/90 transition-colors hover:bg-white/10"
              >
                Voir le produit
              </a>
            </div>

            <ul
              className="rise mt-9 flex flex-col gap-2.5 sm:flex-row sm:flex-wrap sm:gap-x-6 [@media(max-height:850px)]:mt-6"
              style={{ animationDelay: "360ms" }}
            >
              {PREUVES.map((p) => (
                <li
                  key={p}
                  className="flex items-center gap-2 text-[13.5px] text-white/65"
                >
                  <IconCheck className="text-amber size-4 shrink-0" />
                  {p}
                </li>
              ))}
            </ul>
          </div>

          <div className="rise min-w-0 lg:pl-4" style={{ animationDelay: "280ms" }}>
            <AppPreview />
          </div>
        </div>

        <div
          className="rise mt-auto border-t border-white/10 pt-7 [@media(max-height:780px)]:hidden"
          style={{ animationDelay: "480ms" }}
        >
          <p className="text-[11px] font-semibold tracking-[0.16em] text-white/60 uppercase">
            Un cœur commun, une application par métier
          </p>
          <ul className="mt-4 flex flex-wrap gap-x-6 gap-y-3">
            {METIERS.map((m) => (
              <li key={m} className="text-[15px] font-medium text-white/65">
                {m}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
