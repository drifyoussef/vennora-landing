import { Nav } from "@/components/nav";
import { Hero } from "@/components/hero";
import { Chain, Features, Field, Trust } from "@/components/sections";
import { Trades } from "@/components/trades";
import { Demo, Faq, Footer, Pricing } from "@/components/closing";

export default function Page() {
  return (
    <>
      <Nav />
      <main>
        <Hero />
        <Chain />
        <Features />
        <Field />
        <Trades />
        <Trust />
        <Pricing />
        <Faq />
        <Demo />
      </main>
      <Footer />
    </>
  );
}
