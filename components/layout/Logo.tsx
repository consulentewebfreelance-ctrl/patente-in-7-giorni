import Link from 'next/link';

/**
 * Wordmark + icona del brand (Fase 1): anello stile volante con un segmento
 * che si apre in un check, spazio negativo verticale che richiama la "P".
 */
export function Logo({ scuro = false, href = '/' }: { scuro?: boolean; href?: string }) {
  const colore = scuro ? '#FFFFFF' : '#0B0B0D';
  return (
    <Link href={href} className="flex items-center gap-2.5" aria-label="Patente in 7 Giorni, torna alla home">
      <svg width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="14" cy="14" r="10.5" stroke={colore} strokeWidth="2.4" />
        <line x1="14" y1="7" x2="14" y2="21" stroke={colore} strokeWidth="2.4" strokeLinecap="round" />
        <path d="M19.5 10.5L15 17L12.3 14.6" stroke={colore} strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
      <span className={`font-display text-[17px] font-bold ${scuro ? 'text-segnaletica' : 'text-asfalto'}`}>
        Patente<span className="text-superato">7</span>
      </span>
    </Link>
  );
}
