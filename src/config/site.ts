/**
 * Identité du site et de l’éditeur.
 *
 * Tout ce qui est marqué « À COMPLÉTER » doit l’être avant la mise en ligne :
 * les mentions légales et la politique de confidentialité s’appuient sur ces
 * valeurs, et une mention légale incomplète vaut absence de mention légale.
 */
export const SITE = {
  nom: "Vennora",
  domaine: "https://vennora.app",
  baseline: "Gérez vos interventions. Maîtrisez vos équipements.",
  description:
    "Clients, équipements, planning, comptes-rendus signés : Vennora suit l’intervention du parc client au rapport envoyé.",
  email: "contact@vennora.app",
  telephone: "", // optionnel — affiché seulement s’il est renseigné

  editeur: {
    raisonSociale: "Youssef DRIF",
    nomCommercial: "YD Development",
    formeJuridique: "Entrepreneur individuel",
    siret: "994 002 863 00011",
    siren: "994 002 863",
    ape: "6201Z — Programmation informatique",
    /**
     * Registre national des entreprises. Un entrepreneur individuel n'a ni
     * capital social ni numéro RCS distinct : ces mentions n'ont pas d'objet.
     */
    immatriculation: "Registre national des entreprises, le 19 novembre 2025",
    /**
     * À COMPLÉTER — numéro de TVA intracommunautaire, ou, en franchise en
     * base, la mention « TVA non applicable, article 293 B du CGI ».
     */
    tva: "À COMPLÉTER — régime de TVA",
    /**
     * Volontairement absente : voir la note dans les mentions légales. La
     * renseigner ici la fait réapparaître partout, sans autre changement.
     */
    adresse: "",
    directeurPublication: "Youssef DRIF",
  },

  hebergeur: {
    nom: "À COMPLÉTER — nom de l’hébergeur",
    adresse: "À COMPLÉTER — adresse de l’hébergeur",
    telephone: "À COMPLÉTER — téléphone de l’hébergeur",
  },

  /** Sous-traitants au sens du RGPD, cités dans la politique de confidentialité. */
  sousTraitants: [
    { nom: "À COMPLÉTER — hébergeur des données", role: "Hébergement", zone: "Union européenne" },
    { nom: "À COMPLÉTER — envoi d’e-mails", role: "Envoi des rapports", zone: "Union européenne" },
  ],

  /** Date de dernière révision des documents juridiques. */
  majJuridique: "19 août 2026",

  /**
   * Dernière révision du contenu public, au format ISO.
   *
   * Sert de `lastmod` au plan du site. À mettre à jour quand le contenu
   * change réellement — pas à chaque déploiement : un site entier « modifié
   * aujourd’hui » à chaque build est un signal que les moteurs apprennent à
   * ignorer, et on perd alors le bénéfice du champ pour les vraies mises à
   * jour.
   */
  majContenu: "2026-08-19",
} as const;

/** Vrai tant que l’identité de l’éditeur n’a pas été renseignée. */
/**
 * Vrai tant qu'une information légalement exigée manque. L'hébergeur en fait
 * partie au même titre que l'éditeur : une mention légale amputée de l'un ou
 * de l'autre ne vaut pas mieux qu'une page absente.
 */
export const IDENTITE_INCOMPLETE =
  SITE.editeur.siret.startsWith("À COMPLÉTER") ||
  SITE.editeur.tva.startsWith("À COMPLÉTER") ||
  SITE.hebergeur.nom.startsWith("À COMPLÉTER");
