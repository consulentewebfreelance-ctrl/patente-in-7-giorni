import { Check } from 'lucide-react';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { cn } from '@/lib/utils';

// STRIPE: sostituisci ogni placeholder con il tuo Payment Link reale di Stripe.
// Vedi README, sezione "Dove inserire Stripe".
export const STRIPE_PAYMENT_LINKS: Record<string, string> = {
  base: 'https://buy.stripe.com/STRIPE_PAYMENT_LINK_BASE',
  premium: 'https://buy.stripe.com/STRIPE_PAYMENT_LINK_PREMIUM',
  pro: 'https://buy.stripe.com/STRIPE_PAYMENT_LINK_PRO',
};

type Pacchetto = {
  id: 'base' | 'premium' | 'pro';
  nome: string;
  prezzo: number;
  descrizione: string;
  incluso: string[];
  evidenziato?: boolean;
};

const pacchetti: Pacchetto[] = [
  {
    id: 'base',
    nome: 'Base',
    prezzo: 19,
    descrizione: 'Per chi vuole partire con il metodo essenziale.',
    incluso: ['Tutti e 7 i livelli', 'Quiz e flashcard per ogni livello', 'PDF scaricabile'],
  },
  {
    id: 'premium',
    nome: 'Premium',
    prezzo: 29,
    descrizione: 'Il pacchetto più scelto: metodo completo con più ripasso.',
    incluso: ['Tutto il piano Base', 'Simulazioni d\'esame illimitate', 'Ripasso mirato sugli errori'],
    evidenziato: true,
  },
  {
    id: 'pro',
    nome: 'Pro',
    prezzo: 39,
    descrizione: 'Per chi vuole il massimo supporto fino al giorno dell\'esame.',
    incluso: ['Tutto il piano Premium', 'Aggiornamenti del metodo inclusi', 'Accesso prioritario alle novità'],
  },
];

export function PricingCards() {
  return (
    <div className="grid gap-6 md:grid-cols-3">
      {pacchetti.map((p) => (
        <Card key={p.id} evidenziata={p.evidenziato} className="flex flex-col">
          {p.evidenziato && (
            <span className="mb-3 inline-block w-fit rounded-full bg-superato/10 px-3 py-1 text-[12px] font-medium text-superato">
              Più scelto
            </span>
          )}
          <h3 className="font-display text-[20px] font-bold">{p.nome}</h3>
          <p className="mt-1 text-[14px] text-ardesia">{p.descrizione}</p>
          <p className="mt-5 font-display text-[40px] font-bold">
            {p.prezzo}€
          </p>
          <ul className="mt-5 flex flex-1 flex-col gap-2.5">
            {p.incluso.map((voce) => (
              <li key={voce} className="flex items-start gap-2 text-[14px] text-asfalto">
                <Check className="mt-0.5 h-4 w-4 flex-shrink-0 text-superato" strokeWidth={2.5} />
                {voce}
              </li>
            ))}
          </ul>
          <a href={STRIPE_PAYMENT_LINKS[p.id]} className="mt-6">
            <Button
              variante={p.evidenziato ? 'primario' : 'secondario'}
              fullWidth
              className={cn(p.evidenziato && 'bg-superato hover:brightness-95')}
            >
              Scegli {p.nome}
            </Button>
          </a>
        </Card>
      ))}
    </div>
  );
}
