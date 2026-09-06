import { AlertTriangle, CheckCircle2, Info } from 'lucide-react';
import { cn } from '@/lib/utils';

type Variante = 'info' | 'successo' | 'attenzione';

const config: Record<Variante, { classi: string; Icona: typeof Info }> = {
  info: { classi: 'bg-segnale/[0.08] border-segnale text-asfalto', Icona: Info },
  successo: { classi: 'bg-superato/[0.08] border-superato text-asfalto', Icona: CheckCircle2 },
  attenzione: { classi: 'bg-erroreLieve/[0.08] border-erroreLieve text-asfalto', Icona: AlertTriangle },
};

export function Alert({ variante = 'info', children }: { variante?: Variante; children: React.ReactNode }) {
  const { classi, Icona } = config[variante];
  return (
    <div className={cn('flex gap-3 rounded-md border-l-[3px] p-4 text-[15px]', classi)}>
      <Icona className="mt-0.5 h-5 w-5 flex-shrink-0" strokeWidth={2} />
      <div>{children}</div>
    </div>
  );
}
