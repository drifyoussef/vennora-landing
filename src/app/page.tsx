import { Nav } from "@/components/nav";
import { Hero } from "@/components/hero";
import { Chain, Features, Field, Trust } from "@/components/sections";
import { Trades } from "@/components/trades";
import { Demo, Faq, Footer, Pricing, QUESTIONS } from "@/components/closing";
import { JsonLd } from "@/components/jsonld";
import { Preuve } from "@/components/preuve";

export default function Page() {
  return (
    <>
      <JsonLd faq={QUESTIONS} />
      <Nav />
      {/* `data-fond` dit à la barre de navigation ce qui passe sous elle :
          elle est transparente, son texte doit suivre le fond. */}
      <main>
        <div data-fond="sombre">
          <Hero />
        </div>
        <div data-fond="clair">
          <Chain />
          <Features />
        </div>
        <div data-fond="sombre">
          <Field />
        </div>
        <div data-fond="clair">
          <Trades />
          <Trust />
          <Preuve />
          <Pricing />
          <Faq />
          <Demo />
        </div>
      </main>
      <Footer />
    </>
  );
}
