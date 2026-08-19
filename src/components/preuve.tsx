import { SITE } from "@/config/site";

/**
 * Preuve sociale.
 *
 * Les deux tableaux sont vides à dessein : un témoignage inventé est un
 * mensonge qui se retourne au premier appel de vérification, et un logo posé
 * sans accord est un risque juridique. La section ne s’affiche que lorsqu’il
 * y a quelque chose de vrai à montrer — remplir un tableau suffit.
 *
 * Une seule règle : ne rien écrire ici que le client cité n’ait relu.
 */
export type Temoignage = {
  citation: string;
  auteur: string;
  role: string;
  entreprise: string;
  /** Chemin d’une photo dans public/, facultatif. */
  photo?: string;
};

export const TEMOIGNAGES: Temoignage[] = [
  // {
  //   citation:
  //     "On a arrêté les carnets. Le rapport part avant que je sois remonté dans la camionnette.",
  //   auteur: "Prénom Nom",
  //   role: "Gérant",
  //   entreprise: "Nom de l’entreprise",
  //   photo: "/temoignages/nom.jpg",
  // },
];

/** Logos clients : uniquement avec accord écrit. */
export const LOGOS: { nom: string; image: string }[] = [];

export function Preuve() {
  if (TEMOIGNAGES.length === 0 && LOGOS.length === 0) return null;

  return (
    <section className="border-line bg-sand/60 border-y">
      <div className="mx-auto max-w-6xl px-5 py-20 sm:px-6 sm:py-24">
        <p className="text-amber text-[11px] font-semibold tracking-[0.16em] uppercase">
          Ils l’utilisent
        </p>
        <h2 className="text-ink mt-3 max-w-2xl text-3xl font-semibold sm:text-[2.2rem]">
          Des entreprises qui ont arrêté le papier
        </h2>

        {TEMOIGNAGES.length > 0 && (
          <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {TEMOIGNAGES.map((t) => (
              <figure
                key={t.auteur + t.entreprise}
                className="border-line flex flex-col rounded-2xl border bg-white p-7"
              >
                <blockquote className="text-ink text-[16px] leading-relaxed">
                  « {t.citation} »
                </blockquote>
                <figcaption className="mt-auto flex items-center gap-3 pt-6">
                  {t.photo && (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={t.photo}
                      alt=""
                      width={44}
                      height={44}
                      className="size-11 rounded-full object-cover"
                    />
                  )}
                  <div>
                    <p className="text-ink text-[14px] font-semibold">
                      {t.auteur}
                    </p>
                    <p className="text-ink-soft text-[13px]">
                      {t.role} · {t.entreprise}
                    </p>
                  </div>
                </figcaption>
              </figure>
            ))}
          </div>
        )}

        {LOGOS.length > 0 && (
          <ul className="mt-12 flex flex-wrap items-center gap-x-12 gap-y-8 opacity-70">
            {LOGOS.map((l) => (
              <li key={l.nom}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={l.image} alt={l.nom} height={28} className="h-7 w-auto" />
              </li>
            ))}
          </ul>
        )}

        <p className="text-ink-soft mt-10 text-[14px]">
          Vous utilisez {SITE.nom} et vous acceptez d’en parler ?{" "}
          <a href="#demo" className="text-petrol font-semibold hover:underline">
            Écrivez-nous
          </a>
          .
        </p>
      </div>
    </section>
  );
}
