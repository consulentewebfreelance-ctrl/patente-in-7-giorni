import type { Metadata } from 'next';
import { PDFMockup } from '@/components/mockups/PDFMockup';
import { DashboardMockup } from '@/components/mockups/DashboardMockup';
import { FlashcardMockup } from '@/components/mockups/FlashcardMockup';
import { PhoneMockup } from '@/components/mockups/PhoneMockup';
import { BrowserMockup } from '@/components/mockups/BrowserMockup';
import { Timeline } from '@/components/marketing/Timeline';
import { PricingCards } from '@/components/marketing/PricingCard';
import { FAQAccordion } from '@/components/marketing/FAQAccordion';
import { ButtonLink } from '@/components/ui/Button';

export const metadata: Metadata = {
  title: 'Il metodo completo',
  description: 'Guide, dashboard, flashcard e quiz per superare il quiz della patente in 7 giorni. Scegli il tuo pacchetto.',
};

export default function ProdottoPage() {
  return (
    <div className="pb-16 pt-14 md:pb-24 md:pt-20">
      <section className="container-app flex flex-col items-center gap-4 text-center">
        <h1 className="max-w-[640px] font-display text-[32px] font-bold leading-tight md:text-[48px]">
          Tutto il metodo, in un unico posto
        </h1>
        <p className="max-w-[520px] text-[16px] text-ardesia md:text-[18px]">
          PDF, dashboard, flashcard e quiz — organizzati negli stessi 7 giorni che hai già visto in homepage.
        </p>
      </section>

      <section className="container-app mt-14 grid gap-8 md:grid-cols-3 md:gap-6">
        <PDFMockup />
        <PhoneMockup className="md:mx-0">
          <DashboardMockup />
        </PhoneMockup>
        <FlashcardMockup />
      </section>

      <section className="container-app mt-20 md:mt-28" id="timeline">
        <h2 className="mb-8 font-display text-[24px] font-bold md:text-[32px]">I 7 giorni del metodo</h2>
        <Timeline />
      </section>

      <section className="container-app mt-20 md:mt-28" id="prezzi">
        <h2 className="mb-8 text-center font-display text-[24px] font-bold md:text-[32px]">Scegli il tuo pacchetto</h2>
        <PricingCards />
      </section>

      <section className="mt-20 border-t border-nebbia bg-nebbia py-16 md:mt-28 md:py-24">
        <div className="container-app">
          <h2 className="mb-10 text-center font-display text-[24px] font-bold md:text-[32px]">Domande frequenti</h2>
          <FAQAccordion />
        </div>
      </section>

      <section className="container-app mt-16 flex flex-col items-center gap-6 text-center md:mt-24">
        <h2 className="max-w-[480px] font-display text-[28px] font-bold leading-tight">
          Parti da oggi. L&apos;esame non aspetta.
        </h2>
        <ButtonLink href="#prezzi">Prendi il Tuo Piano</ButtonLink>
      </section>
    </div>
  );
}
