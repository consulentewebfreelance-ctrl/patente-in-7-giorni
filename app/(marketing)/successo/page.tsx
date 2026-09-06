import type { Metadata } from 'next';
import { CheckCircle2 } from 'lucide-react';
import { ButtonLink } from '@/components/ui/Button';

export const metadata: Metadata = {
  title: 'Pagamento confermato',
  robots: { index: false }, // pagina di post-checkout, non va indicizzata
};

/**
 * Fase 2/3, Schermata 7. URL di ritorno da impostare come "Success URL"
 * nel tuo Stripe Payment Link — vedi README, sezione "Dove inserire Stripe".
 */
export default function SuccessoPage() {
  return (
    <div className="container-app flex min-h-[70vh] flex-col items-center justify-center gap-5 py-20 text-center">
      <div className="flex h-16 w-16 animate-pop-in items-center justify-center rounded-full bg-superato/10 text-superato">
        <CheckCircle2 className="h-9 w-9" strokeWidth={2} />
      </div>
      <h1 className="font-display text-[28px] font-bold md:text-[34px]">Benvenuto in Patente in 7 Giorni</h1>
      <p className="max-w-[420px] text-[16px] text-ardesia">
        Il pagamento è confermato, il tuo piano è pronto.
      </p>
      <ButtonLink href="/dashboard">Vai alla Dashboard</ButtonLink>
    </div>
  );
}
