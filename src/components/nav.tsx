"use client";

import { useEffect, useRef, useState } from "react";
import { Wordmark } from "./mark";

const LINKS = [
  { href: "#produit", label: "Produit" },
  { href: "#terrain", label: "Terrain" },
  { href: "#metiers", label: "Métiers" },
  { href: "#tarifs", label: "Tarifs" },
  // Le bloc d’essai porte aussi l’adresse de contact : un seul point d’arrivée.
  { href: "#demo", label: "Contact" },
];

/**
 * Couleur du fond qui passe sous la barre.
 *
 * La barre est transparente et la page alterne les fonds : crème pour les
 * sections de contenu, pétrole pour le héros, la section terrain et la carte
 * d’essai. Un texte blanc fixe disparaît une section sur deux.
 *
 * Chaque bloc porte donc un `data-fond`, et un observateur regarde lequel
 * croise une ligne placée juste sous la barre. `rootMargin` écrase la zone
 * d’observation en un trait : seul l’élément qui passe à cette hauteur est
 * considéré. Quand plusieurs se superposent — une carte sombre posée sur une
 * section claire — le dernier dans l’ordre du document l’emporte, c’est-à-dire
 * le plus imbriqué, donc celui qu’on voit.
 */
function useFondSousBarre(): "clair" | "sombre" {
  const [fond, setFond] = useState<"clair" | "sombre">("sombre");
  const croises = useRef<Set<Element>>(new Set());

  useEffect(() => {
    const cibles = Array.from(document.querySelectorAll("[data-fond]"));
    if (cibles.length === 0) return;

    const observateur = new IntersectionObserver(
      (entrees) => {
        for (const e of entrees) {
          if (e.isIntersecting) croises.current.add(e.target);
          else croises.current.delete(e.target);
        }
        const dernier = cibles.filter((c) => croises.current.has(c)).pop();
        setFond(
          (dernier?.getAttribute("data-fond") as "clair" | "sombre") ?? "clair",
        );
      },
      // Une ligne d’observation à 48 px du haut, soit le milieu de la pilule.
      { rootMargin: "-48px 0px -100% 0px", threshold: 0 },
    );

    cibles.forEach((c) => observateur.observe(c));
    return () => observateur.disconnect();
  }, []);

  return fond;
}

export function Nav() {
  const fond = useFondSousBarre();
  const sombre = fond === "sombre";
  const [ouvert, setOuvert] = useState(false);

  /* Menu ouvert : on fige le défilement du document, sinon la page glisse
     derrière le panneau sur iOS. Et la touche Échap referme — c’est le
     réflexe de tout le monde, et le seul recours au clavier. */
  useEffect(() => {
    if (!ouvert) return;
    const precedent = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const surTouche = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOuvert(false);
    };
    document.addEventListener("keydown", surTouche);
    return () => {
      document.body.style.overflow = precedent;
      document.removeEventListener("keydown", surTouche);
    };
  }, [ouvert]);

  // Panneau ouvert, la barre passe sur fond crème : elle doit s’assombrir.
  const clair = sombre && !ouvert;

  return (
    // La barre entre avec le reste, juste avant le titre.
    //
    // Une seule pilule flottante, décollée du haut et des bords : logotype,
    // liens et bouton dans le même contour, sous le même flou. L’en-tête
    // lui-même est transparent et laisse passer les clics — sans
    // `pointer-events-none`, la marge autour de la pilule masquerait le haut
    // de la page.
    <header className="rise pointer-events-none fixed inset-x-0 top-0 z-50 px-3 pt-3 sm:px-4 sm:pt-4">
      {/* Le panneau ne couvre plus l’écran : un voile derrière lui le
          referme au toucher, comme on s’y attend sur téléphone. */}
      {ouvert && (
        <div
          aria-hidden="true"
          onClick={() => setOuvert(false)}
          className="bg-ink/25 pointer-events-auto fixed inset-0 -z-10 md:hidden"
        />
      )}
      {/* Menu déplié, la pilule prend le fond du panneau : sans cela le
          logotype reste en pétrole sur le héros sombre, c’est-à-dire
          invisible. Sinon, sa teinte suit le fond qui passe dessous. */}
      <div
        className={
          "pointer-events-auto mx-auto flex h-[4.5rem] max-w-6xl items-center justify-between gap-3 rounded-full border pr-4 pl-6 lg:gap-6 shadow-lg backdrop-blur-md transition-colors duration-300 sm:pr-5 sm:pl-7 " +
          (ouvert
            ? "bg-paper border-line shadow-black/5"
            : sombre
              ? "bg-petrol-deep/60 border-white/10 shadow-black/20"
              : "border-line bg-white/75 shadow-black/5")
        }
      >
        <a
          href="#haut"
          onClick={() => setOuvert(false)}
          className={
            "transition-colors duration-300 hover:opacity-80 " +
            (clair ? "text-white" : "text-petrol")
          }
          aria-label="Vennora, accueil"
        >
          <Wordmark />
        </a>

        <nav
          aria-label="Navigation principale"
          className="hidden items-center gap-1 md:flex"
        >
          {LINKS.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className={
                "rounded-full px-2.5 py-1.5 text-sm font-medium lg:px-4 lg:py-2 lg:text-[16px] transition-colors " +
                (clair
                  ? "text-white/70 hover:bg-white/10 hover:text-white"
                  : "text-ink-soft hover:bg-sand hover:text-ink")
              }
            >
              {l.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <a
            href="#demo"
            onClick={() => setOuvert(false)}
            // `whitespace-nowrap` : sur 390 px, l’intitulé passait à la
            // ligne, la barre doublait de hauteur et le bouton recouvrait le
            // logotype. Le libellé raccourcit avant de se casser en deux.
            className="bg-amber-deep hover:bg-amber-dark rounded-full px-3.5 py-2.5 text-[13px] font-semibold whitespace-nowrap text-white transition-colors sm:px-5 sm:text-sm"
          >
            <span className="sm:hidden">Essai gratuit</span>
            <span className="hidden sm:inline">Demander une démo</span>
          </a>

          {/* Sous `md`, la navigation disparaissait purement et simplement :
              sur téléphone, on ne pouvait atteindre ni les tarifs ni les
              métiers autrement qu’en faisant défiler toute la page. */}
          <button
            type="button"
            onClick={() => setOuvert((o) => !o)}
            aria-expanded={ouvert}
            aria-controls="menu-mobile"
            aria-label={ouvert ? "Fermer le menu" : "Ouvrir le menu"}
            className={
              "grid size-10 shrink-0 place-items-center rounded-full transition-colors md:hidden " +
              (clair ? "text-white hover:bg-white/10" : "text-ink hover:bg-sand")
            }
          >
            <IconMenu ouvert={ouvert} />
          </button>
        </div>
      </div>

      {/* Le panneau reprend la forme décrochée : une carte sous la pilule,
          pas un rideau collé aux bords. */}
      <div
        id="menu-mobile"
        hidden={!ouvert}
        className="border-line bg-paper pointer-events-auto mx-auto mt-2 max-w-6xl rounded-3xl border shadow-lg shadow-black/10 md:hidden"
      >
        <nav aria-label="Navigation" className="px-5 py-2">
          {LINKS.map((l) => (
            <a
              key={l.href}
              href={l.href}
              onClick={() => setOuvert(false)}
              className="border-line text-ink block border-b py-3.5 text-[16px] font-medium last:border-0"
            >
              {l.label}
            </a>
          ))}
        </nav>
      </div>
    </header>
  );
}

/** Trois barres qui deviennent une croix. Dessiné, pas importé : il est seul. */
function IconMenu({ ouvert }: { ouvert: boolean }) {
  const trait = "origin-center transition-transform duration-200";
  return (
    <svg
      viewBox="0 0 20 20"
      className="size-5"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.7"
      strokeLinecap="round"
      aria-hidden="true"
    >
      <line
        x1="3"
        y1="6"
        x2="17"
        y2="6"
        className={trait}
        style={ouvert ? { transform: "translateY(4px) rotate(45deg)" } : undefined}
      />
      <line
        x1="3"
        y1="10"
        x2="17"
        y2="10"
        className="transition-opacity duration-200"
        style={ouvert ? { opacity: 0 } : undefined}
      />
      <line
        x1="3"
        y1="14"
        x2="17"
        y2="14"
        className={trait}
        style={ouvert ? { transform: "translateY(-4px) rotate(-45deg)" } : undefined}
      />
    </svg>
  );
}
