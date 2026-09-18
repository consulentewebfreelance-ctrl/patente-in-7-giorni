'use client';

import { useState } from 'react';
import { Play } from 'lucide-react';

/**
 * Player placeholder (Masterplan 2.0 §Video): pensato per essere sostituito
 * in futuro con un vero player (es. Mux, Cloudflare Stream o <video> nativo)
 * senza cambiare l'interfaccia che lo ospita — basta sostituire il contenuto
 * di questo componente.
 */
export function VideoPlayer({ titolo }: { titolo: string }) {
  const [cliccato, setCliccato] = useState(false);

  return (
    <div className="relative aspect-video w-full overflow-hidden rounded-lg bg-asfalto">
      <div
        className="absolute inset-0 opacity-20"
        style={{ backgroundImage: 'repeating-linear-gradient(115deg, transparent, transparent 18px, #17C964 18px, #17C964 19px)' }}
        aria-hidden
      />
      <button
        onClick={() => setCliccato(true)}
        className="absolute inset-0 flex flex-col items-center justify-center gap-3 text-segnaletica"
        aria-label={`Riproduci: ${titolo}`}
      >
        <span className="flex h-14 w-14 items-center justify-center rounded-full bg-segnaletica/15 backdrop-blur-sm">
          <Play className="h-6 w-6 translate-x-0.5" fill="currentColor" />
        </span>
        <span className="text-[13px] font-medium text-segnaletica/70">
          {cliccato ? 'Video in arrivo' : 'Riproduci'}
        </span>
      </button>
    </div>
  );
}
