import { ButtonLink } from '@/components/ui/Button';
import { PhoneMockup } from '@/components/mockups/PhoneMockup';
import { DashboardMockup } from '@/components/mockups/DashboardMockup';
import { DayTracker } from './DayTracker';

/** Fase 2/4, Schermata 1 — Hero ad alta conversione: titolo enorme, sottotitolo, mockup smartphone, doppia CTA, anteprima dei 7 giorni. */
export function Hero() {
  return (
    <section className="relative overflow-hidden bg-asfalto pb-16 pt-14 text-segnaletica md:pb-24 md:pt-20">
      {/* linee diagonali sottili che richiamano la segnaletica orizzontale */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[0.06]"
        style={{
          backgroundImage:
            'repeating-linear-gradient(115deg, transparent, transparent 68px, #17C964 68px, #17C964 70px)',
        }}
      />
      <div className="container-app relative grid items-center gap-10 md:grid-cols-2 md:gap-8">
        <div className="flex flex-col items-start gap-6">
          <h1 className="font-display text-[40px] font-bold leading-[1.05] md:text-[64px]">
            La patente non aspetta. Nemmeno tu dovresti.
          </h1>
          <p className="max-w-[440px] text-[17px] text-segnaletica/70 md:text-[18px]">
            Un metodo di studio organizzato in guide, schemi, flashcard e quiz originali per superare l&apos;esame in una settimana.
          </p>

          <div className="flex w-full flex-col gap-3 sm:w-auto sm:flex-row">
            <ButtonLink href="/prodotto" className="w-full sm:w-auto">
              Inizia Ora
            </ButtonLink>
            <ButtonLink
              href="/demo"
              variante="secondario"
              className="w-full border-segnaletica/40 bg-transparent text-segnaletica hover:bg-segnaletica/10 sm:w-auto"
            >
              Prova gratis il Livello 1
            </ButtonLink>
          </div>

          <div className="flex flex-col gap-2 pt-2">
            <span className="text-[12px] font-medium text-segnaletica/50">I tuoi 7 giorni</span>
            <DayTracker />
          </div>
        </div>
        <div className="flex justify-center md:justify-end">
          <PhoneMockup inclinato>
            <DashboardMockup />
          </PhoneMockup>
        </div>
      </div>
    </section>
  );
}
