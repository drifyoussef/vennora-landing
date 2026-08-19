"use client";

import { useSyncExternalStore } from "react";

const REQUETE = "(prefers-reduced-motion: reduce)";

/**
 * Préférence système « moins d’animations ».
 *
 * Lue par `useSyncExternalStore` plutôt que par un `useState` dans un effet :
 * l’état vit hors de React, la valeur est disponible dès le premier rendu, et
 * un changement de réglage en cours de session est pris en compte sans
 * rechargement.
 */
export function useMouvementReduit(): boolean {
  return useSyncExternalStore(
    (prevenir) => {
      const mq = window.matchMedia(REQUETE);
      mq.addEventListener("change", prevenir);
      return () => mq.removeEventListener("change", prevenir);
    },
    () => window.matchMedia(REQUETE).matches,
    () => false, // rendu serveur : on suppose l’animation, le client corrige
  );
}
