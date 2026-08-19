# Vennora — site vitrine

Site public de Vennora, logiciel des métiers d’intervention. Next 16,
Tailwind 4, **export statique** : le build produit `out/`, qui s’héberge
n’importe où et ne dépend pas de l’application.

```bash
npm install
npm run dev        # http://localhost:3010
npm run build      # génère out/
npm run lint
npm run typecheck
```

## À compléter avant la mise en ligne

Le site est fonctionnel mais quatre choses ne peuvent venir que de vous.

1. **Identité de l’éditeur** — `src/config/site.ts`. Tant que les champs
   « À COMPLÉTER » y sont, un bandeau d’avertissement s’affiche en tête des
   pages juridiques. Mentions légales incomplètes = mentions légales absentes.
2. **Point d’envoi du formulaire** — `NEXT_PUBLIC_FORM_ENDPOINT` (Formspree,
   Basin, Web3Forms…). Sans lui, le formulaire d’essai retombe sur un courriel
   pré-rempli plutôt que d’avaler la saisie.
3. **Preuve sociale** — `src/components/preuve.tsx`. Les tableaux
   `TEMOIGNAGES` et `LOGOS` sont vides : la section ne s’affiche pas tant
   qu’ils le sont. N’y mettre que des citations relues par la personne citée
   et des logos avec accord écrit.
4. **Photos de chantier** — `public/metiers/*.svg` sont des visuels d’attente
   générés. Les remplacer par de vraies photos (cadrage 4:3) et mettre à jour
   le champ `photo` dans `src/data/metiers.ts`.

Facultatif : `NEXT_PUBLIC_PLAUSIBLE_DOMAIN` pour la mesure d’audience. Vide,
aucun script tiers n’est chargé — et aucun bandeau cookies n’est nécessaire.

## Structure

```
src/
├── app/
│   ├── page.tsx              accueil
│   ├── metiers/[slug]/       une page par métier (7), générées au build
│   ├── mentions-legales/     obligations LCEN
│   ├── confidentialite/      RGPD
│   ├── cgv/                  conditions de vente
│   ├── robots.ts sitemap.ts  fichiers d’indexation
│   ├── icon.png apple-icon.png
│   └── not-found.tsx         404 maison
├── components/               sections de la page, démo animée, carrousel
├── config/site.ts            identité de l’éditeur, sous-traitants
├── data/metiers.ts           catalogues réels, extraits des applications
└── lib/mouvement.ts          préférence « moins d’animations »
```

## Ce qui se met à jour ensemble

- **Les catalogues** (`src/data/metiers.ts`) sont extraits des fichiers
  `src/verticals/<metier>/index.ts` des applications Vennora. Si un métier
  gagne un type d’équipement, cette page doit le gagner aussi : les chiffres
  affichés sur l’accueil et les pages métier viennent de là, et de là
  seulement.
- **Les tarifs** sont regroupés dans le tableau `OFFRES` de
  `src/components/closing.tsx`, avec les deux bandeaux qui suivent.
- **La FAQ** alimente à la fois la section visible et les données structurées
  (`FAQPage`) : une question ajoutée profite aux deux.

## Déploiement

Le dossier `out/` est statique. Sur Vercel, Netlify ou Cloudflare Pages :
commande `npm run build`, dossier de sortie `out`. Sur un serveur classique,
copier `out/` derrière nginx.

Penser à : acheter le domaine déclaré dans `SITE.domaine`, créer la boîte
`contact@`, forcer HTTPS, et déposer le site dans la Search Console une fois
en ligne.
