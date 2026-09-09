import type { Metadata } from 'next';
import { Suspense } from 'react';
import { SuccessoClient } from '@/components/marketing/SuccessoClient';

export const metadata: Metadata = {
  title: 'Pagamento confermato',
  robots: { index: false }, // pagina di post-checkout, non va indicizzata
};

/**
 * Fase 2/3/6, Schermata 7. Success URL da impostare nel Payment Link Stripe:
 * https://tuosito.it/successo?session_id={CHECKOUT_SESSION_ID}
 * (vedi README, sezione "Sicurezza dashboard").
 */
export default function SuccessoPage() {
  return (
    <Suspense fallback={null}>
      <SuccessoClient />
    </Suspense>
  );
}
