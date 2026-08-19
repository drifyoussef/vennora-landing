import type { NextConfig } from "next";

/**
 * Site vitrine : aucune donnée, aucune session, aucun appel serveur.
 * L'export statique permet de l'héberger n'importe où — Vercel, un bucket S3,
 * un nginx — et rend le site insensible à une panne de l'application.
 */
const nextConfig: NextConfig = {
  output: "export",
  images: { unoptimized: true },
};

export default nextConfig;
