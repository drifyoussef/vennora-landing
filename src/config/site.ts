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
    raisonSociale: "À COMPLÉTER — raison sociale",
    formeJuridique: "À COMPLÉTER — SAS, SASU, EI…",
    capital: "À COMPLÉTER — capital social",
    siret: "À COMPLÉTER — numéro SIRET",
    rcs: "À COMPLÉTER — ville et numéro RCS",
    tva: "À COMPLÉTER — numéro de TVA intracommunautaire",
    adresse: "À COMPLÉTER — adresse du siège",
    directeurPublication: "À COMPLÉTER — nom du directeur de la publication",
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
} as const;

/** Vrai tant que l’identité de l’éditeur n’a pas été renseignée. */
export const IDENTITE_INCOMPLETE = SITE.editeur.siret.startsWith("À COMPLÉTER");
