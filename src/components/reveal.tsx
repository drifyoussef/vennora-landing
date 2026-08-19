"use client";

import { useEffect } from "react";

/**
 * Apparition au défilement.
 *
 * Première version : `animation-timeline: view()`, sans JavaScript. Élégant,
 * mais Firefox ne l’implémente pas et Safari ne l’a que depuis peu — donc,
 * pour une bonne partie des visiteurs, aucune animation. Un effet visible par
 * les uns et pas par les autres n’est pas une amélioration progressive, c’est
 * un bug intermittent.
 *
 * Deuxième version, celle-ci : un observateur d’intersection, disponible
 * partout depuis des années. La classe `anim` n’est posée sur la page que par
 * ce composant : sans JavaScript, rien n’est masqué, tout s’affiche. C’est le
 * seul ordre acceptable — on ne cache jamais du contenu en pariant sur du
 * script qui pourrait ne pas s’exécuter.
 */
const CIBLES = ".reveal, .reveal-gauche, .reveal-droite, .reveal-zoom";

export function Reveal() {
  useEffect(() => {
    const racine = document.documentElement;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    racine.classList.add("anim");

    const observateur = new IntersectionObserver(
      (entrees) => {
        for (const e of entrees) {
          if (!e.isIntersecting) continue;
          e.target.classList.add("vu");
          observateur.unobserve(e.target); // une fois révélé, on n’y revient pas
        }
      },
      // Le bloc doit être franchement entré dans le champ, pas l’effleurer.
      { rootMargin: "0px 0px -10% 0px", threshold: 0.08 },
    );

    document.querySelectorAll(CIBLES).forEach((el) => observateur.observe(el));
    return () => {
      observateur.disconnect();
      racine.classList.remove("anim");
    };
  }, []);

  return null;
}
