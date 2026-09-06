import { cn } from '@/lib/utils';

type Variante = 'neutro' | 'successo' | 'in-corso' | 'bloccato';

const stiliVariante: Record<Variante, string> = {
  neutro: 'bg-nebbia text-ardesia',
  successo: 'bg-superato/10 text-superato',
  'in-corso': 'bg-segnale/10 text-segnale',
  bloccato: 'bg-nebbia text-ardesia',
};

export function Badge({ variante = 'neutro', children }: { variante?: Variante; children: React.ReactNode }) {
  return (
    <span
      className={cn(
        'inline-flex items-center gap-1 rounded-full px-3 py-1 text-[13px] font-medium',
        stiliVariante[variante]
      )}
    >
      {children}
    </span>
  );
}
