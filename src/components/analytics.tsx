import Script from "next/script";

/**
 * Mesure d’audience, optionnelle et sans cookie.
 *
 * Plausible ne dépose ni cookie ni identifiant : pas de bandeau de
 * consentement à afficher. Tant que `NEXT_PUBLIC_PLAUSIBLE_DOMAIN` est vide,
 * rien n’est chargé — le site ne tire aucune requête vers un tiers.
 */
export function Analytics() {
  const domaine = process.env.NEXT_PUBLIC_PLAUSIBLE_DOMAIN;
  if (!domaine) return null;

  return (
    <Script
      defer
      data-domain={domaine}
      src="https://plausible.io/js/script.js"
      strategy="afterInteractive"
    />
  );
}
