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

Le site est fonctionnel. Ce qui reste ne peut venir que de vous.

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
5. **Captures du produit** — la fenêtre du héros (`app-preview.tsx`) est une
   maquette animée, pas une capture. Un acheteur qui n’a jamais vu l’écran
   réel avant de donner son adresse est un acheteur qu’on perd ; c’est le
   premier frein de conversion du site, loin devant le prix.
6. **Domaine et courrier** — acheter le domaine de `SITE.domaine`, créer la
   boîte `contact@`, et surtout publier **SPF, DKIM et DMARC**. Sans eux, les
   réponses aux demandes d’essai partent en indésirables.
7. **Téléphone** — `SITE.telephone` est vide, donc aucun numéro n’apparaît.
   En B2B artisan, le téléphone convertit mieux qu’un formulaire.

Facultatif : `NEXT_PUBLIC_PLAUSIBLE_DOMAIN` pour la mesure d’audience. Vide,
aucun script tiers n’est chargé — et aucun bandeau cookies n’est nécessaire.
Renseigné, une demande d’essai envoyée déclenche l’objectif « Demande
d’essai », avec le métier et la taille d’équipe en propriétés.

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
├── lib/metadonnees.ts        titre, description, Open Graph et carte X
└── lib/mouvement.ts          préférence « moins d’animations »
```

## Ce qui se met à jour ensemble

- **Les catalogues** (`src/data/metiers.ts`) sont extraits des fichiers
  `src/verticals/<metier>/index.ts` des applications Vennora. Si un métier
  gagne un type d’équipement, cette page doit le gagner aussi : les chiffres
  affichés sur l’accueil et les pages métier viennent de là, et de là
  seulement — le carrousel compris, qui avait sa propre copie de la liste.
- **Les tarifs** sont regroupés dans le tableau `OFFRES` de
  `src/components/closing.tsx`, avec les deux bandeaux qui suivent.
- **La FAQ** alimente à la fois la section visible et les données structurées
  (`FAQPage`) : une question ajoutée profite aux deux.
- **`SITE.majContenu`** est le `lastmod` du plan du site. À toucher quand le
  contenu change réellement, pas à chaque déploiement.

## Couleurs et contraste

`src/app/globals.css` porte la palette et, au-dessus de l’ambre, la note qui
explique pourquoi il en existe trois valeurs. En résumé : une même couleur ne
peut pas à la fois porter du texte blanc sur un bouton et se lire sur le
pétrole. Les noms disent l’usage — `amber` ne sert qu’au décor, `amber-deep`
au texte sur fond clair et aux boutons, `amber-bright` au texte sur fond
sombre.

Même règle pour les métiers : `couleur` est la teinte d’identité, réservée
aux aplats et aux vignettes ; `couleurTexte` est sa version assombrie, la
seule qui porte du texte. Six des sept teintes d’origine plafonnent à 3,5:1
sur du blanc, là où le niveau AA en demande 4,5.

## Déploiement

Le dossier `out/` est statique. Sur Vercel, Netlify ou Cloudflare Pages :
commande `npm run build`, dossier de sortie `out`.

**Les en-têtes de sécurité viennent de l’hébergeur, pas de Next.** En
`output: "export"`, la fonction `headers()` de `next.config.ts` n’est jamais
appelée : il n’y a pas de serveur Next en production. Deux fichiers les
portent, et ils sont à tenir ensemble :

- `public/_headers` — Netlify, Cloudflare Pages. Copié tel quel dans `out/`.
- `vercel.json` — Vercel, qui ignore le précédent.

Derrière un nginx classique, transposer la même liste en `add_header`.

Une fois en ligne : forcer HTTPS, déposer le site dans la Search Console, et
vérifier les en-têtes sur `securityheaders.com`.
