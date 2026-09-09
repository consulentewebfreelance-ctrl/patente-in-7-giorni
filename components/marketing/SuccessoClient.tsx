'use client';

import { useSearchParams } from 'next/navigation';
import { CheckCircle2, XCircle } from 'lucide-react';
import { ButtonLink } from '@/components/ui/Button';
import { useConvalidaAcquisto } from '@/lib/access';

/**
 * Verifica il session_id tornato da Stripe (vedi README, "Sicurezza dashboard")
 * e mostra la conferma solo se il pagamento risulta davvero completato.
 */
export function SuccessoClient() {
  const searchParams = useSearchParams();
  const sessionId = searchParams.get('session_id');
  const stato = useConvalidaAcquisto(sessionId);

  if (stato === 'in-corso') {
    return (
      <div className="container-app flex min-h-[70vh] flex-col items-center justify-center gap-4 py-20 text-center">
        <div className="h-10 w-10 animate-pulse rounded-full bg-nebbia" aria-hidden />
        <p className="text-[15px] text-ardesia">Verifica del pagamento in corso...</p>
      </div>
    );
  }

  if (stato === 'non-valido') {
    return (
      <div className="container-app flex min-h-[70vh] flex-col items-center justify-center gap-5 py-20 text-center">
        <div className="flex h-16 w-16 items-center justify-center rounded-full bg-erroreLieve/10 text-erroreLieve">
          <XCircle className="h-9 w-9" strokeWidth={2} />
        </div>
        <h1 className="font-display text-[24px] font-bold">Non troviamo un pagamento valido</h1>
        <p className="max-w-[420px] text-[15px] text-ardesia">
          Se hai appena completato un acquisto, torna alla pagina precedente e riprova il link ricevuto
          da Stripe. Se il problema continua, scrivici.
        </p>
        <ButtonLink href="/prodotto">Torna al metodo</ButtonLink>
      </div>
    );
  }

  return (
    <div className="container-app flex min-h-[70vh] flex-col items-center justify-center gap-5 py-20 text-center">
      <div className="flex h-16 w-16 animate-pop-in items-center justify-center rounded-full bg-superato/10 text-superato">
        <CheckCircle2 className="h-9 w-9" strokeWidth={2} />
      </div>
      <h1 className="font-display text-[28px] font-bold md:text-[34px]">Benvenuto in Patente in 7 Giorni</h1>
      <p className="max-w-[420px] text-[16px] text-ardesia">Il pagamento è confermato, il tuo piano è pronto.</p>
      <ButtonLink href="/dashboard">Vai alla Dashboard</ButtonLink>
    </div>
  );
}
