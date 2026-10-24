/**
 * Marque Vennora — piste 2a.
 *
 * Quatre coins de cadrage autour d’un « V » qui relie trois nœuds : les deux
 * points du haut, et le nœud ambre où tout converge. Le cadre, c’est
 * l’équipement qu’on vise et qu’on scanne ; le V, la chaîne qui mène du
 * client au rapport.
 *
 * Tracé repris au point près des fichiers de marque (`symbole-*.svg`) : un
 * logo qui change entre le site et l’outil se lit comme deux produits
 * différents. Le pétrole et le blanc passent par `currentColor`, l’ambre est
 * la seule couleur fixe.
 */
export function VennoraMark({
  className = "size-8",
  monochrome = false,
}: {
  className?: string;
  monochrome?: boolean;
}) {
  return (
    <svg viewBox="0 0 64 64" fill="none" className={className} aria-hidden="true">
      <g stroke="currentColor" strokeLinecap="round" strokeLinejoin="round">
        <path
          d="M8 20 V8 H20 M44 8 H56 V20 M8 44 V56 H20 M56 44 V56 H44"
          strokeWidth="5"
        />
        <path d="M22 22 L32 41 L42 22" strokeWidth="4.5" />
      </g>
      <circle cx="22" cy="22" r="4.5" fill="currentColor" />
      <circle cx="42" cy="22" r="4.5" fill="currentColor" />
      <circle
        cx="32"
        cy="42"
        r="6.5"
        fill={monochrome ? "currentColor" : "var(--color-amber)"}
      />
    </svg>
  );
}

export function Wordmark({ className = "" }: { className?: string }) {
  return (
    <span className={`flex items-center gap-2.5 ${className}`}>
      <VennoraMark className="size-8 shrink-0" />
      <span className="text-[19px] font-semibold tracking-tight">Vennora</span>
    </span>
  );
}
