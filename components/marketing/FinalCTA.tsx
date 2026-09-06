import { ButtonLink } from '@/components/ui/Button';

export function FinalCTA() {
  return (
    <section className="bg-asfalto py-20 text-center text-segnaletica md:py-28">
      <div className="container-app flex flex-col items-center gap-6">
        <h2 className="max-w-[560px] font-display text-[32px] font-bold leading-tight md:text-[48px]">
          Smetti di scrollare. Inizia a superare.
        </h2>
        <ButtonLink href="/prodotto">Sì, Voglio la Patente</ButtonLink>
      </div>
    </section>
  );
}
