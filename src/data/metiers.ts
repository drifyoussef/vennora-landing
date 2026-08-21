/**
 * Les métiers, avec leur catalogue réel.
 *
 * Les listes d’équipements et de types d’intervention sont extraites des
 * fichiers `src/verticals/<metier>/index.ts` des applications Vennora : ce
 * sont exactement les catalogues livrés, pas une liste d’argumentaire. Si le
 * produit gagne un type d’équipement, cette page doit le gagner aussi.
 */
export type Metier = {
  slug: string;
  nom: string;
  /** Requête visée par la page dédiée. */
  requete: string;
  categorie: string;
  /**
   * Couleur d’identité du métier, reprise de l’application. Elle sert aux
   * aplats et aux vignettes — jamais à du texte : six des sept ne dépassent
   * pas 3,5:1 sur du blanc, là où AA en demande 4,5.
   */
  couleur: string;
  /**
   * La même couleur, assombrie jusqu’à être lisible sur le papier comme sur
   * son propre aplat à 12 %. C’est elle qui porte le texte teinté.
   */
  couleurTexte: string;
  accroche: string;
  /** Texte court de la carte du carrousel de l’accueil. */
  resume: string;
  /** Trois équipements emblématiques, montrés sur la carte du carrousel. */
  exemples: [string, string, string];
  reglementation: string;
  equipements: string[];
  interventions: string[];
  photo: string;
};

export const METIERS: Metier[] = [
  {
    slug: "ramonage",
    nom: "Ramonage",
    requete: "logiciel de ramonage",
    categorie: "Entretien réglementaire",
    couleur: "#0F3D4C",
    couleurTexte: "#0F3D4C",
    accroche:
      "Le ramoneur passe, le certificat part. Entre les deux, il y a un conduit, une date, une trappe bloquée et un client à rappeler dans douze mois.",
    resume:
      "Conduits, poêles, inserts. Certificat annuel et périodicités de l’arrêté du 20 juillet 2023. Chaque conduit garde son historique de passages et ses anomalies encore ouvertes.",
    exemples: ["Cheminée", "Poêle à granulés", "Insert"],
    reglementation:
      "Périodicités : l'arrêté du 20 juillet 2023 impose un ramonage annuel pour les conduits desservant un appareil bois/fioul, deux passages annuels n'étant plus exigés partout mais restant fréquents en usage continu. On retient 12 mois par défaut ; c'est modifiable par équipement.",
    equipements: ["Cheminée", "Poêle à bois", "Poêle à granulés", "Insert", "Chaudière bois", "Chaudière fioul", "Chaudière gaz"],
    interventions: ["Ramonage", "Entretien", "Contrôle", "Dépannage"],
    photo: "/metiers/ramonage.svg",
  },
  {
    slug: "chauffage",
    nom: "Chauffage",
    requete: "logiciel d’entretien de chaudière",
    categorie: "Entretien et dépannage",
    couleur: "#E2610F",
    couleurTexte: "#B54D0C",
    accroche:
      "Une chaudière entretenue chaque année, une analyse de combustion à consigner, un dépannage à caser entre deux visites : c’est un métier de dates et de relevés.",
    resume:
      "Chaudières, pompes à chaleur, planchers chauffants. Entretien annuel et contrôle de combustion, avec les valeurs relevées consignées à chaque visite.",
    exemples: ["Chaudière gaz", "Pompe à chaleur", "Plancher chauffant"],
    reglementation:
      "Périodicités : le décret n° 2009-649 impose un entretien annuel des chaudières de 4 à 400 kW ; le décret n° 2020-912 étend l'obligation aux pompes à chaleur et systèmes thermodynamiques de même puissance, avec un contrôle au moins tous les deux ans. On retient 12 mois par défaut, c'est modifiable par équipement.",
    equipements: ["Chaudière gaz", "Chaudière fioul", "Chaudière bois", "Pompe à chaleur", "Chauffe-eau", "Plancher chauffant", "Radiateur", "Réseau hydraulique"],
    interventions: ["Entretien annuel", "Contrôle de combustion", "Mise en service", "Désembouage", "Dépannage"],
    photo: "/metiers/chauffage.svg",
  },
  {
    slug: "climatisation",
    nom: "Climatisation",
    requete: "logiciel d’entretien de climatisation",
    categorie: "Froid et traitement d’air",
    couleur: "#2F9EC2",
    couleurTexte: "#237792",
    accroche:
      "Filtres, pressions, étanchéité du circuit frigorigène : la clim se suit machine par machine, et le contrôle réglementaire ne tolère pas l’à-peu-près.",
    resume:
      "Splits, gainables, VRV, centrales de traitement d’air. Contrôle d’étanchéité et traçabilité du fluide frigorigène, machine par machine.",
    exemples: ["Split mural", "Gainable", "VRV / VRF"],
    reglementation:
      "Périodicités : le règlement (UE) 517/2014 impose un contrôle d'étanchéité dès 5 tonnes équivalent CO₂ de fluide frigorigène, annuel dans le cas courant ; le décret n° 2020-912 ajoute l'entretien annuel des systèmes de 4 à 70 kW. On retient 12 mois par défaut, modifiable par équipement.",
    equipements: ["Split mural", "Multi-split", "Gainable", "Cassette plafonnière", "Système VRV / VRF", "Groupe froid", "Centrale de traitement d'air", "VMC"],
    interventions: ["Entretien annuel", "Contrôle d'étanchéité", "Nettoyage des filtres", "Mise en service", "Dépannage"],
    photo: "/metiers/climatisation.svg",
  },
  {
    slug: "serrurier",
    nom: "Serrurerie",
    requete: "logiciel pour serrurier",
    categorie: "Urgence et sécurité",
    couleur: "#B08D3A",
    couleurTexte: "#856B2C",
    accroche:
      "L’ouverture de porte à 23 h et la vérification annuelle du rideau métallique ne se ressemblent pas, mais elles finissent dans le même carnet.",
    resume:
      "Ouvertures, cylindres, rideaux, contrôle d’accès. L’urgence et la maintenance dans le même outil : le dépannage de nuit comme la vérification annuelle des issues.",
    exemples: ["Porte blindée", "Rideau métallique", "Contrôle d’accès"],
    reglementation:
      "Particularité du métier : l'urgence domine. Une grande partie des interventions n'est pas récurrente (ouverture de porte, remplacement de cylindre après effraction) ; la maintenance périodique ne concerne que les ouvrants motorisés et les issues de secours, dont la vérification annuelle relève du code du travail (art. R. 4224-17) pour les établissements.",
    equipements: ["Porte d'entrée", "Porte blindée", "Serrure", "Cylindre", "Portail motorisé", "Rideau métallique", "Contrôle d'accès", "Interphone / visiophone", "Coffre-fort"],
    interventions: ["Ouverture de porte", "Remplacement de cylindre", "Pose / installation", "Maintenance préventive", "Mise en sécurité", "Dépannage"],
    photo: "/metiers/serrurier.svg",
  },
  {
    slug: "piscine",
    nom: "Piscine",
    requete: "logiciel d’entretien de piscine",
    categorie: "Entretien saisonnier",
    couleur: "#00A0A8",
    couleurTexte: "#007A80",
    accroche:
      "Mise en service au printemps, passages rapprochés l’été, hivernage à l’automne : le métier vit au rythme des saisons, avec une analyse d’eau à chaque visite.",
    resume:
      "Filtration, traitement, hivernage. Analyses d’eau consignées à chaque passage — pH, désinfectant, sel — avec les produits ajoutés et les volumes.",
    exemples: ["Filtration", "Électrolyseur", "Volet"],
    reglementation:
      "Périodicités : le rythme est saisonnier plutôt que réglementaire. Mise en service au printemps, entretiens rapprochés pendant la saison de baignade, hivernage à l'automne. Les bassins collectifs relèvent en plus du contrôle sanitaire (arrêté du 26 mai 2021), d'où l'analyse d'eau périodique.",
    equipements: ["Bassin", "Pompe de filtration", "Filtre", "Électrolyseur au sel", "Régulation pH / chlore", "Pompe à chaleur", "Robot nettoyeur", "Volet / couverture", "Local technique"],
    interventions: ["Entretien courant", "Mise en service", "Hivernage", "Analyse d'eau", "Traitement choc", "Dépannage"],
    photo: "/metiers/piscine.svg",
  },
  {
    slug: "nuisibles",
    nom: "Nuisibles",
    requete: "logiciel de dératisation",
    categorie: "Lutte intégrée",
    couleur: "#6E9A2E",
    couleurTexte: "#567824",
    accroche:
      "Postes d’appâtage numérotés, plan de zones, produit et numéro d’AMM : en agroalimentaire, ce qui n’est pas tracé n’a pas eu lieu.",
    resume:
      "Postes d’appâtage, pièges, plans de zones. Traçabilité du produit et de son numéro d’AMM, relevé des consommations, audit sanitaire prêt à sortir.",
    exemples: ["Poste d’appâtage", "Piège lumineux", "Zone sensible"],
    reglementation:
      "Particularité du métier : l'équipement suivi n'appartient pas au client, il est posé par l'entreprise — postes d'appâtage, pièges lumineux, stations de monitoring — et repéré sur un plan. En restauration et en agroalimentaire, le contrat de lutte intégrée impose des visites de contrôle régulières (trimestrielles en usage courant), tracées pour l'audit sanitaire.",
    equipements: ["Poste d'appâtage", "Piège mécanique", "Désinsectiseur lumineux", "Piège à phéromones", "Station connectée", "Zone sensible"],
    interventions: ["Visite de contrôle", "Dératisation", "Désinsectisation", "Désinfection", "Traitement préventif", "Audit sanitaire", "Intervention d'urgence"],
    photo: "/metiers/nuisibles.svg",
  },
  {
    slug: "traitement-eau",
    nom: "Traitement de l’eau",
    requete: "logiciel de traitement de l’eau",
    categorie: "Qualité de l’eau",
    couleur: "#1E7FB8",
    couleurTexte: "#1B72A5",
    accroche:
      "Dureté à l’entrée, dureté à la sortie, cartouches changées, réseau désinfecté : le métier se prouve par des relevés.",
    resume:
      "Adoucisseurs, osmoseurs, stérilisateurs UV. Relevés de dureté à l’entrée et à la sortie, changement des consommables et désinfection du réseau.",
    exemples: ["Adoucisseur", "Osmoseur", "Stérilisateur UV"],
    reglementation:
      "Périodicités : l'entretien annuel est la règle du métier (contrôle du bac à sel, désinfection des résines, changement des cartouches et des lampes UV). En réseau collectif, l'arrêté du 1er février 2010 ajoute la surveillance des légionelles sur les réseaux d'eau chaude sanitaire.",
    equipements: ["Adoucisseur", "Osmoseur", "Filtre à sédiments", "Stérilisateur UV", "Pompe doseuse", "Surpresseur", "Ballon d'eau chaude", "Réseau de distribution"],
    interventions: ["Entretien annuel", "Analyse d'eau", "Changement de consommable", "Désinfection du réseau", "Mise en service", "Dépannage"],
    photo: "/metiers/traitement-eau.svg",
  },
];

export function getMetier(slug: string): Metier | undefined {
  return METIERS.find((m) => m.slug === slug);
}
