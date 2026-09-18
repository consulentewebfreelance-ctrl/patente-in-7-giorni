import type { CategoriaSegnale } from '@/lib/livelli-content-shared';

const STILE: Record<CategoriaSegnale, { forma: 'triangolo' | 'cerchio' | 'quadrato'; bordo: string; sfondo: string; testo: string }> = {
  pericolo: { forma: 'triangolo', bordo: '#E5484D', sfondo: '#FFFFFF', testo: '#0B0B0D' },
  divieto: { forma: 'cerchio', bordo: '#E5484D', sfondo: '#FFFFFF', testo: '#0B0B0D' },
  obbligo: { forma: 'cerchio', bordo: '#2F6FED', sfondo: '#2F6FED', testo: '#FFFFFF' },
  indicazione: { forma: 'quadrato', bordo: '#0B0B0D', sfondo: '#0B0B0D', testo: '#FFFFFF' },
};

/**
 * Rappresentazione stilizzata ed educativa di un segnale (forma + simbolo
 * testuale): non è la riproduzione grafica del segnale reale, insegna a
 * riconoscere prima la forma e il colore, poi il contenuto — lo stesso
 * metodo spiegato nella lezione.
 */
export function SignalShape({ categoria, simbolo, dimensione = 88 }: { categoria: CategoriaSegnale; simbolo: string; dimensione?: number }) {
  const { forma, bordo, sfondo, testo } = STILE[categoria];

  const testoEl = (
    <span
      className="pointer-events-none absolute inset-0 flex items-center justify-center px-2 text-center font-display font-bold leading-none"
      style={{ color: testo, fontSize: Math.max(9, dimensione * 0.14) }}
    >
      {simbolo}
    </span>
  );

  if (forma === 'triangolo') {
    return (
      <div className="relative" style={{ width: dimensione, height: dimensione }}>
        <svg viewBox="0 0 100 100" width={dimensione} height={dimensione}>
          <polygon points="50,6 96,92 4,92" fill={sfondo} stroke={bordo} strokeWidth={7} strokeLinejoin="round" />
        </svg>
        <div className="absolute inset-0 flex items-end justify-center pb-2">
          <span className="text-center font-display font-bold leading-none" style={{ color: testo, fontSize: Math.max(9, dimensione * 0.13) }}>
            {simbolo}
          </span>
        </div>
      </div>
    );
  }

  if (forma === 'cerchio') {
    return (
      <div className="relative" style={{ width: dimensione, height: dimensione }}>
        <svg viewBox="0 0 100 100" width={dimensione} height={dimensione}>
          <circle cx="50" cy="50" r="44" fill={sfondo} stroke={bordo} strokeWidth={8} />
        </svg>
        {testoEl}
      </div>
    );
  }

  return (
    <div className="relative" style={{ width: dimensione, height: dimensione }}>
      <svg viewBox="0 0 100 100" width={dimensione} height={dimensione}>
        <rect x="6" y="6" width="88" height="88" rx="10" fill={sfondo} stroke={bordo} strokeWidth={4} />
      </svg>
      {testoEl}
    </div>
  );
}
