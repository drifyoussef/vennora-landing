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
      <main>
        <Hero />
        <Chain />
        <Features />
        <Field />
        <Trades />
        <Trust />
        <Preuve />
        <Pricing />
        <Faq />
        <Demo />
      </main>
      <Footer />
    </>
  );
}
