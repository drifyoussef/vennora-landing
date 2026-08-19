import type { Metadata } from "next";
import { AvertissementIdentite, PageShell } from "@/components/page-shell";
import { Footer } from "@/components/closing";
import { SITE, IDENTITE_INCOMPLETE } from "@/config/site";

export const metadata: Metadata = {
  title: "Politique de confidentialité",
  description:
    "Données collectées, finalités, durées de conservation et droits des personnes concernées.",
  robots: { index: false, follow: true },
};

export default function Confidentialite() {
  return (
    <>
      <PageShell
        titre="Politique de confidentialité"
        chapeau="Ce que nous collectons, pourquoi, combien de temps nous le gardons, et comment reprendre la main."
        enTete={IDENTITE_INCOMPLETE ? <AvertissementIdentite /> : undefined}
      >
        <h2>Deux traitements distincts</h2>
        <p>
          Il faut distinguer <strong>le site vitrine</strong>, où{" "}
          {SITE.editeur.raisonSociale} est responsable de traitement, et{" "}
          <strong>l’application {SITE.nom}</strong>, où l’entreprise cliente
          est responsable des données de ses propres clients et où{" "}
          {SITE.nom} n’intervient qu’en qualité de sous-traitant, dans les
          limites du contrat qui les lie.
        </p>

        <h2>Données collectées par le site</h2>
        <ul>
          <li>
            <strong>Demande d’essai ou de démonstration</strong> : nom,
            entreprise, adresse e-mail, téléphone si vous le renseignez,
            métier et taille d’équipe. Base légale : mesures précontractuelles
            prises à votre demande.
          </li>
          <li>
            <strong>Mesure d’audience</strong> : statistiques agrégées, sans
            cookie ni identifiant publicitaire, ne permettant pas de vous
            identifier. Base légale : intérêt légitime à mesurer l’audience du
            site.
          </li>
        </ul>
        <p>
          Aucune donnée n’est vendue, louée, ni utilisée à des fins
          publicitaires. Aucun cookie de suivi tiers n’est déposé.
        </p>

        <h2>Données traitées dans l’application</h2>
        <p>
          Dans le cadre du service, {SITE.nom} héberge les données saisies par
          l’entreprise cliente : fiches clients et sites, équipements,
          interventions, photos de chantier, notes vocales, comptes-rendus et
          signatures. Ces données appartiennent à l’entreprise cliente. Elles
          sont cloisonnées par organisation et ne sont accessibles qu’aux
          utilisateurs qu’elle a créés.
        </p>

        <h2>Durées de conservation</h2>
        <ul>
          <li>Demande de contact non aboutie : trois ans après le dernier échange.</li>
          <li>Compte client : durée du contrat, puis douze mois d’archivage.</li>
          <li>Pièces comptables : dix ans, obligation légale.</li>
          <li>Statistiques d’audience agrégées : vingt-cinq mois.</li>
        </ul>

        <h2>Destinataires et sous-traitants</h2>
        <ul>
          {SITE.sousTraitants.map((s) => (
            <li key={s.nom}>
              <strong>{s.nom}</strong> — {s.role}, hébergement en {s.zone}.
            </li>
          ))}
        </ul>
        <p>
          Aucun transfert de données hors de l’Union européenne n’est réalisé
          sans garantie appropriée au sens du RGPD.
        </p>

        <h2>Vos droits</h2>
        <p>
          Vous disposez d’un droit d’accès, de rectification, d’effacement, de
          limitation, d’opposition et de portabilité. Ils s’exercent par
          courriel à <a href={`mailto:${SITE.email}`}>{SITE.email}</a>, avec un
          justificatif d’identité si un doute raisonnable existe. Réponse sous
          un mois.
        </p>
        <p>
          Si une réclamation reste sans réponse satisfaisante, vous pouvez
          saisir la CNIL — 3 place de Fontenoy, 75007 Paris —{" "}
          <a href="https://www.cnil.fr" rel="noreferrer">
            cnil.fr
          </a>
          . Lorsque la demande porte sur des données saisies par une entreprise
          cliente, elle doit être adressée à cette entreprise, qui en est
          responsable.
        </p>

        <h2>Sécurité</h2>
        <p>
          Chiffrement des échanges, mots de passe stockés sous forme
          d’empreinte, cloisonnement strict par organisation, fichiers servis
          par liens signés à durée limitée, journal des actions sensibles.
          Aucun fichier de chantier n’est accessible publiquement.
        </p>

        <p className="mt-10 text-[14px]">
          Dernière mise à jour : {SITE.majJuridique}.
        </p>
      </PageShell>
      <Footer />
    </>
  );
}
