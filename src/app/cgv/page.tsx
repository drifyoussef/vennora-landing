import { AvertissementIdentite, PageShell } from "@/components/page-shell";
import { Footer } from "@/components/closing";
import { SITE, IDENTITE_INCOMPLETE } from "@/config/site";
import { metadonnees } from "@/lib/metadonnees";

export const metadata = metadonnees({
  titre: "Conditions générales — Vennora",
  description:
    "Conditions générales d’utilisation et de vente du service Vennora : abonnement, essai, données, résiliation.",
  chemin: "/cgv",
  indexable: false,
});

export default function Cgv() {
  return (
    <>
      <PageShell
        titre="Conditions générales"
        chapeau="Conditions d’utilisation et de vente du service Vennora, applicables entre l’éditeur et l’entreprise cliente."
        enTete={IDENTITE_INCOMPLETE ? <AvertissementIdentite /> : undefined}
      >
        <h2>1. Objet</h2>
        <p>
          Les présentes conditions régissent l’accès au logiciel {SITE.nom},
          service en ligne de gestion des interventions techniques, proposé par{" "}
          {SITE.editeur.raisonSociale} à des clients professionnels. Toute
          souscription emporte acceptation sans réserve des présentes.
        </p>

        <h2>2. Compte et utilisateurs</h2>
        <p>
          Le service est réservé aux professionnels. Le client crée les comptes
          de ses utilisateurs et reste responsable de leur usage et de la
          confidentialité de leurs identifiants. Chaque offre comprend un
          nombre d’utilisateurs indiqué sur la page des tarifs ; au-delà, tout
          utilisateur supplémentaire est facturé au tarif en vigueur.
        </p>

        <h2>3. Essai gratuit</h2>
        <p>
          L’essai est gratuit, sans saisie de carte bancaire et sans engagement.
          À son terme, l’accès est suspendu à défaut de souscription ; les
          données sont conservées trente jours, puis supprimées.
        </p>

        <h2>4. Prix et paiement</h2>
        <p>
          Les prix sont indiqués en euros hors taxes, par mois. L’abonnement
          est payable d’avance, par prélèvement ou carte bancaire, et se
          renouvelle par tacite reconduction pour la même durée. Les tarifs
          peuvent évoluer ; toute évolution est notifiée au moins trente jours
          avant sa prise d’effet et n’affecte pas la période en cours.
        </p>
        <p>
          Tout retard de paiement entraîne, de plein droit, des pénalités au
          taux d’intérêt légal majoré et une indemnité forfaitaire de
          recouvrement de quarante euros.
        </p>

        <h2>5. Disponibilité et maintenance</h2>
        <p>
          L’éditeur met en œuvre les moyens nécessaires pour assurer la
          continuité du service, sans obligation de résultat en dehors d’un
          engagement de niveau de service souscrit séparément. Les
          interventions de maintenance programmées sont annoncées à l’avance et
          planifiées, autant que possible, en dehors des heures ouvrées.
        </p>

        <h2>6. Données du client</h2>
        <p>
          Les données saisies restent la propriété du client. L’éditeur agit en
          qualité de sous-traitant au sens du RGPD et ne les exploite que pour
          fournir le service. Le client peut en obtenir un export complet à
          tout moment, y compris après résiliation, pendant la durée
          d’archivage indiquée dans la{" "}
          <a href="/confidentialite">politique de confidentialité</a>.
        </p>

        <h2>7. Obligations du client</h2>
        <p>
          Le client s’engage à un usage conforme à la loi, à ne pas tenter de
          contourner les protections du service, et à disposer des droits
          nécessaires sur les contenus qu’il téléverse — notamment les photos
          prises chez ses propres clients.
        </p>

        <h2>8. Responsabilité</h2>
        <p>
          {SITE.nom} est un outil de suivi et de traçabilité : il ne se
          substitue ni au diagnostic ni à la responsabilité professionnelle du
          client, seul juge de la conformité de ses interventions et des
          documents qu’il remet. La responsabilité de l’éditeur est, en tout
          état de cause, limitée aux sommes versées au titre des douze derniers
          mois.
        </p>

        <h2>9. Résiliation</h2>
        <p>
          Le client peut résilier à tout moment depuis son compte ou par
          courriel ; la résiliation prend effet au terme de la période en
          cours, sans remboursement du prorata. L’éditeur peut suspendre
          l’accès en cas d’impayé ou de manquement grave, après mise en demeure
          restée sans effet pendant quinze jours.
        </p>

        <h2>10. Droit applicable</h2>
        <p>
          Les présentes sont soumises au droit français. À défaut de résolution
          amiable, compétence est attribuée aux tribunaux du ressort du siège
          de l’éditeur, sous réserve des règles impératives applicables.
        </p>

        <p className="mt-10 text-[14px]">
          Dernière mise à jour : {SITE.majJuridique}.
        </p>
      </PageShell>
      <Footer />
    </>
  );
}
