import { Wordmark } from "./mark";

const LINKS = [
  { href: "#produit", label: "Produit" },
  { href: "#terrain", label: "Terrain" },
  { href: "#metiers", label: "Métiers" },
  { href: "#tarifs", label: "Tarifs" },
  // Le bloc d’essai porte aussi l’adresse de contact : un seul point d’arrivée.
  { href: "#demo", label: "Contact" },
];

export function Nav() {
  return (
    <header className="fixed inset-x-0 top-0 z-50">
      {/* Voile : voir `.nav-veil` dans globals.css. */}
      <div
        aria-hidden="true"
        className="nav-veil bg-petrol-deep/80 absolute inset-0 -z-10 border-b border-white/10 backdrop-blur-md"
      />
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-6 px-5 sm:h-18 sm:px-6">
        <a
          href="#haut"
          className="text-white transition-opacity hover:opacity-80"
          aria-label="Vennora, accueil"
        >
          <Wordmark />
        </a>

        <nav className="hidden items-center gap-1 rounded-full border border-white/10 bg-white/5 px-2 py-1.5 backdrop-blur-md md:flex">
          {LINKS.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="rounded-full px-3.5 py-1.5 text-sm font-medium text-white/70 transition-colors hover:bg-white/10 hover:text-white"
            >
              {l.label}
            </a>
          ))}
        </nav>

        <a
          href="#demo"
          className="bg-amber hover:bg-amber-bright rounded-full px-4 py-2.5 text-sm font-semibold text-white shadow-lg shadow-black/20 transition-colors sm:px-5"
        >
          Demander une démo
        </a>
      </div>
    </header>
  );
}
