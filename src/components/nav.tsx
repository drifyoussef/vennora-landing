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
      // Une ligne d’observation à 40 px du haut, soit le milieu de la barre.
      { rootMargin: "-40px 0px -100% 0px", threshold: 0 },
    );

    cibles.forEach((c) => observateur.observe(c));
    return () => observateur.disconnect();
  }, []);

  return fond;
}

export function Nav() {
  const fond = useFondSousBarre();
  const sombre = fond === "sombre";

  return (
    // La barre entre avec le reste, juste avant le titre.
    <header className="rise fixed inset-x-0 top-0 z-50">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-6 px-5 sm:h-18 sm:px-6">
        <a
          href="#haut"
          className={
            "transition-colors duration-300 hover:opacity-80 " +
            (sombre ? "text-white" : "text-petrol")
          }
          aria-label="Vennora, accueil"
        >
          <Wordmark />
        </a>

        <nav
          className={
            "hidden items-center gap-1 rounded-full border px-2 py-1.5 backdrop-blur-md transition-colors duration-300 md:flex " +
            (sombre ? "border-white/10 bg-white/5" : "border-line bg-white/70")
          }
        >
          {LINKS.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className={
                "rounded-full px-3.5 py-1.5 text-sm font-medium transition-colors " +
                (sombre
                  ? "text-white/70 hover:bg-white/10 hover:text-white"
                  : "text-ink-soft hover:bg-sand hover:text-ink")
              }
            >
              {l.label}
            </a>
          ))}
        </nav>

        <a
          href="#demo"
          className="bg-amber hover:bg-amber-bright rounded-full px-4 py-2.5 text-sm font-semibold text-white transition-colors sm:px-5"
        >
          Demander une démo
        </a>
      </div>
    </header>
  );
}
