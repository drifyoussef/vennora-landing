import { AvertissementIdentite, PageShell } from "@/components/page-shell";
import { Footer } from "@/components/closing";
import { SITE, IDENTITE_INCOMPLETE } from "@/config/site";
import { metadonnees } from "@/lib/metadonnees";

export const metadata = metadonnees({
  titre: "Mentions légales — Vennora",
  description: `Éditeur, hébergeur et propriété intellectuelle du site ${SITE.nom}.`,
  chemin: "/mentions-legales",
  indexable: false,
});

export default function MentionsLegales() {
  const e = SITE.editeur;
  return (
    <>
      <PageShell
        titre="Mentions légales"
        chapeau={`Informations légales relatives au site ${SITE.domaine.replace("https://", "")}, conformément à la loi pour la confiance dans l’économie numérique.`}
        enTete={IDENTITE_INCOMPLETE ? <AvertissementIdentite /> : undefined}
      >
        <h2>Éditeur du site</h2>
        <dl>
          <dt>Éditeur</dt>
          <dd>
            {e.raisonSociale} — {e.formeJuridique}, exerçant sous le nom
            commercial {e.nomCommercial}
          </dd>
          <dt>Immatriculation</dt>
          <dd>
            SIRET {e.siret} — {e.immatriculation}
          </dd>
          <dt>Activité</dt>
          <dd>{e.ape}</dd>
          <dt>TVA</dt>
          <dd>{e.tva}</dd>
          {/* L'adresse n'est affichée que si elle est renseignée : une ligne
              vide dans des mentions légales est pire que pas de ligne. */}
          {e.adresse && (
            <>
              <dt>Adresse</dt>
              <dd>{e.adresse}</dd>
            </>
          )}
          <dt>Directeur de la publication</dt>
          <dd>{e.directeurPublication}</dd>
          <dt>Contact</dt>
          <dd>
            <a href={`mailto:${SITE.email}`}>{SITE.email}</a>
            {SITE.telephone ? ` — ${SITE.telephone}` : ""}
          </dd>
        </dl>

        <h2>Hébergeur</h2>
        <p>
          {SITE.hebergeur.nom} — {SITE.hebergeur.adresse} —{" "}
          {SITE.hebergeur.telephone}
        </p>

        <h2>Propriété intellectuelle</h2>
        <p>
          L’ensemble du site — structure, textes, interfaces, logiciel, marque
          et logo {SITE.nom} — est protégé par le droit de la propriété
          intellectuelle et reste la propriété de l’éditeur. Toute
          reproduction ou représentation, totale ou partielle, sans
          autorisation écrite préalable est interdite.
        </p>
        <p>
          Les marques, dénominations et logos des entreprises citées à titre
          d’exemple appartiennent à leurs titulaires respectifs.
        </p>

        <h2>Responsabilité</h2>
        <p>
          Les informations publiées sur ce site sont fournies à titre
          indicatif et peuvent évoluer. Les références réglementaires citées
          (périodicités d’entretien, obligations de contrôle) le sont à titre
          informatif : elles ne remplacent pas les textes officiels ni l’avis
          d’un professionnel qualifié. L’éditeur ne saurait être tenu
          responsable d’un dommage résultant de l’usage de ces informations.
        </p>
        <p>
          Le site peut contenir des liens vers des sites tiers, sur le contenu
          desquels l’éditeur n’exerce aucun contrôle.
        </p>

        <h2>Signalement d’un contenu</h2>
        <p>
          Toute demande relative au contenu du site peut être adressée à{" "}
          <a href={`mailto:${SITE.email}`}>{SITE.email}</a>.
        </p>

        <p className="mt-10 text-[14px]">
          Dernière mise à jour : {SITE.majJuridique}.
        </p>
      </PageShell>
      <Footer />
    </>
  );
}
