import Link from "next/link";
import { VennoraMark } from "./mark";
import { SITE } from "@/config/site";

/**
 * Gabarit des pages secondaires (juridique, métiers, 404).
 *
 * La barre du site vitrine est blanche sur fond sombre : elle ne tient pas
 * sur une page de texte. Ces pages ont donc leur propre en-tête, sobre, et le
 * même pied de page que l’accueil.
 */
export function PageShell({
  titre,
  chapeau,
  enTete,
  children,
}: {
  titre: string;
  chapeau?: string;
  enTete?: React.ReactNode;
  children: React.ReactNode;
}) {
  return (
    <>
      <header className="border-line border-b">
        <div className="mx-auto flex h-16 max-w-4xl items-center justify-between px-5 sm:px-6">
          <Link
            href="/"
            className="text-petrol flex items-center gap-2.5 transition-opacity hover:opacity-70"
          >
            <VennoraMark className="size-6" />
            <span className="text-[17px] font-semibold tracking-tight">
              {SITE.nom}
            </span>
          </Link>
          <Link
            href="/#demo"
            className="bg-petrol hover:bg-petrol-deep rounded-full px-4 py-2 text-[13.5px] font-semibold text-white transition-colors"
          >
            Essayer gratuitement
          </Link>
        </div>
      </header>

      <main className="mx-auto max-w-4xl px-5 py-14 sm:px-6 sm:py-20">
        <h1 className="text-ink text-3xl font-semibold sm:text-[2.5rem] sm:leading-[1.12]">
          {titre}
        </h1>
        {chapeau && (
          <p className="text-ink-soft mt-4 max-w-2xl text-lg">{chapeau}</p>
        )}
        {enTete}
        <div className="prose-vennora mt-10">{children}</div>
      </main>
    </>
  );
}

/** Bandeau d’avertissement tant que l’identité de l’éditeur est vide. */
export function AvertissementIdentite() {
  return (
    <div className="border-amber/40 bg-amber-soft/60 mt-8 rounded-xl border border-dashed p-4">
      <p className="text-ink text-[14px]">
        <span className="text-amber font-semibold">À compléter</span> — les
        champs marqués « À COMPLÉTER » viennent de{" "}
        <code className="bg-sand rounded px-1.5 py-0.5 text-[13px]">
          src/config/site.ts
        </code>
        . Ce document n’a pas de valeur tant qu’ils ne sont pas renseignés, et
        gagne à être relu par un juriste.
      </p>
    </div>
  );
}
