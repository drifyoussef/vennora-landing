/**
 * Marque Vennora, reprise du produit : deux montants qui convergent, une
 * amorce ambre au point de rencontre. Même tracé que dans l’application, au
 * pixel — un logo qui change entre le site et l’outil se lit comme deux
 * produits différents.
 */
export function VennoraMark({
  className = "size-8",
  monochrome = false,
}: {
  className?: string;
  monochrome?: boolean;
}) {
  return (
    <svg viewBox="0 0 32 32" fill="none" className={className} aria-hidden="true">
      <path
        d="M6 5.5 L16 26 L26 5.5"
        stroke="currentColor"
        strokeWidth="3.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M16 26 L20.6 16.5"
        stroke={monochrome ? "currentColor" : "var(--color-amber)"}
        strokeWidth="3.2"
        strokeLinecap="round"
        opacity={monochrome ? 0.55 : 1}
      />
    </svg>
  );
}

export function Wordmark({ className = "" }: { className?: string }) {
  return (
    <span className={`flex items-center gap-2.5 ${className}`}>
      <VennoraMark className="size-7 shrink-0" />
      <span className="text-[19px] font-semibold tracking-tight">Vennora</span>
    </span>
  );
}
