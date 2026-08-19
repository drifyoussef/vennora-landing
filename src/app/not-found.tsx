import Link from "next/link";
import { VennoraMark } from "@/components/mark";

export default function NotFound() {
  return (
    <main className="bg-petrol-deep grain relative isolate flex min-h-dvh flex-col items-center justify-center px-5 text-center text-white">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10"
        style={{
          background:
            "radial-gradient(50rem 30rem at 50% 0%, rgba(217,122,40,0.2), transparent 62%)",
        }}
      />
      <VennoraMark className="size-10" />
      <p className="text-amber mt-8 text-[12px] font-semibold tracking-[0.16em] uppercase">
        Erreur 404
      </p>
      <h1 className="mt-3 text-3xl font-semibold sm:text-4xl">
        Cette page n’existe pas
      </h1>
      <p className="mt-4 max-w-md text-white/65">
        Le lien est peut-être ancien, ou l’adresse comporte une coquille. Le
        reste du site, lui, est toujours là.
      </p>
      <div className="mt-8 flex flex-wrap justify-center gap-3">
        <Link
          href="/"
          className="bg-amber hover:bg-amber-bright rounded-xl px-5 py-3 text-[15px] font-semibold text-white transition-colors"
        >
          Retour à l’accueil
        </Link>
        <Link
          href="/#tarifs"
          className="rounded-xl border border-white/20 px-5 py-3 text-[15px] font-semibold text-white/90 transition-colors hover:bg-white/10"
        >
          Voir les tarifs
        </Link>
      </div>
    </main>
  );
}
