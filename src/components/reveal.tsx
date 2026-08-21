"use client";

import { usePathname } from "next/navigation";
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
 *
 * Deux pièges, tous deux corrigés ici :
 *
 * 1. Ce composant vit dans la mise en page racine, qui ne se démonte pas
 *    entre deux routes. Avec un effet à dépendances vides, l’observateur
 *    n’était créé qu’une fois, sur la première page visitée. En arrivant par
 *    `/cgv` puis en cliquant « Tarifs », l’accueil se montait avec `anim`
 *    toujours posée et personne pour observer : la page entière restait à
 *    `opacity: 0`. D’où la dépendance au chemin — un observateur par page.
 *
 * 2. Au chargement, le document est peint avant l’hydratation : le contenu
 *    s’affiche, puis `anim` le masque, puis l’observateur le révèle. Un
 *    clignotement, surtout visible sur un lien profond du type `/#tarifs`
 *    où l’on atterrit au milieu de la page. On marque donc « vu » tout ce
 *    qui est déjà à l’écran *avant* de poser `anim` : ce qui a été peint ne
 *    disparaît jamais.
 */
const CIBLES = ".reveal, .reveal-gauche, .reveal-droite, .reveal-zoom";

export function Reveal() {
  const chemin = usePathname();

  useEffect(() => {
    const racine = document.documentElement;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const cibles = Array.from(document.querySelectorAll(CIBLES));

    // Déjà à l’écran = déjà peint : on ne le masque pas pour le ramener.
    const marge = window.innerHeight * 0.1;
    for (const el of cibles) {
      const r = el.getBoundingClientRect();
      if (r.top < window.innerHeight - marge && r.bottom > 0) {
        el.classList.add("vu");
      }
    }

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

    for (const el of cibles) {
      if (!el.classList.contains("vu")) observateur.observe(el);
    }

    return () => {
      observateur.disconnect();
      racine.classList.remove("anim");
    };
  }, [chemin]);

  return null;
}
