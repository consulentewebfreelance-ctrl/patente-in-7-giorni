'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Lock, Sparkles, type LucideIcon } from 'lucide-react';
import { UpgradeModal } from './UpgradeModal';
import { cn } from '@/lib/utils';
import type { Funzione } from '@/lib/tiers';
import { TIER_INFO } from '@/lib/tiers';

/**
 * Una funzione del Masterplan (Tutor AI, Mini-video, Memory Game...) mostrata
 * sempre — sbloccata, "prossimamente" o bloccata dal piano. Fase 3: mai un
 * semplice "Bloccato", ma una modale elegante con i vantaggi del piano.
 */
export function FeatureCard({
  funzione,
  Icona,
  sbloccata,
  href,
}: {
  funzione: Funzione;
  Icona: LucideIcon;
  sbloccata: boolean;
  /** Se presente e la funzione è sbloccata, la card è cliccabile verso l'interfaccia dedicata. */
  href?: string;
}) {
  const [modaleAperta, setModaleAperta] = useState(false);

  if (!sbloccata) {
    const tierRichiesto = TIER_INFO[funzione.minimoTier];
    // minimoTier è sempre 'premium' o 'pro' in questo ramo: se fosse 'starter'
    // la funzione sarebbe già sbloccata per chiunque (nessun piano è sotto Starter).
    const pianoModale = funzione.minimoTier as 'premium' | 'pro';
    return (
      <>
        <button
          onClick={() => setModaleAperta(true)}
          className="flex w-full flex-col gap-3 rounded-lg border border-asfalto/[0.06] bg-nebbia p-4 text-left opacity-90 transition-opacity hover:opacity-100"
        >
          <div className="flex items-center justify-between">
            <span className="flex h-9 w-9 items-center justify-center rounded-full bg-segnaletica text-ardesia/60">
              <Lock className="h-4 w-4" />
            </span>
            <span className="rounded-full bg-segnale/10 px-2.5 py-1 text-[11px] font-medium text-segnale">
              {tierRichiesto.nome}
            </span>
          </div>
          <div>
            <p className="font-display text-[15px] font-bold text-asfalto">{funzione.nome}</p>
            <p className="mt-0.5 text-[12.5px] text-ardesia">{funzione.descrizione}</p>
          </div>
          <span className="flex h-[38px] items-center justify-center gap-1.5 rounded-md border-[1.5px] border-asfalto text-[13px] font-extrabold text-asfalto">
            <Sparkles className="h-3.5 w-3.5" /> Passa a {tierRichiesto.nome}
          </span>
        </button>
        <UpgradeModal aperto={modaleAperta} onChiudi={() => setModaleAperta(false)} richiedePiano={pianoModale} />
      </>
    );
  }

  const contenuto = (
    <div
      className={cn(
        'flex h-full flex-col gap-3 rounded-lg border border-asfalto/[0.06] bg-segnaletica p-4',
        href && 'transition-shadow hover:shadow-md'
      )}
    >
      <div className="flex items-center justify-between">
        <span className="flex h-9 w-9 items-center justify-center rounded-full bg-superato/10 text-superato">
          <Icona className="h-4 w-4" strokeWidth={2} />
        </span>
        {funzione.stato === 'prossimamente' && (
          <span className="rounded-full bg-nebbia px-2.5 py-1 text-[11px] font-medium text-ardesia">Prossimamente</span>
        )}
      </div>
      <div>
        <p className="font-display text-[15px] font-bold text-asfalto">{funzione.nome}</p>
        <p className="mt-0.5 text-[12.5px] text-ardesia">{funzione.descrizione}</p>
      </div>
    </div>
  );

  if (href) return <Link href={href}>{contenuto}</Link>;
  return contenuto;
}
