'use client';

import { Check, Crown, Lock, Sparkles } from 'lucide-react';
import { Modal } from '@/components/ui/Modal';
import { Button, ButtonLink } from '@/components/ui/Button';
import type { Tier } from '@/lib/tiers';

const CONTENUTO: Record<'premium' | 'pro', { titolo: string; vantaggi: string[]; ctaLabel: string; ctaSecondaria: string; icona: typeof Lock }> = {
  premium: {
    titolo: 'Questa funzione è Premium',
    vantaggi: ['Simulazioni illimitate', 'Tutor AI', 'Ripasso intelligente', 'Mini-video', 'Statistiche avanzate'],
    ctaLabel: 'Sblocca Premium a 29€',
    ctaSecondaria: 'Continua con Starter',
    icona: Lock,
  },
  pro: {
    titolo: 'Passa a Pro',
    vantaggi: ['Accesso a vita', 'Aggiornamenti futuri inclusi', 'Simulazioni finali illimitate', 'Contenuti futuri inclusi'],
    ctaLabel: 'Passa a Pro a 39€',
    ctaSecondaria: 'Continua con Premium',
    icona: Crown,
  },
};

/**
 * Fase 3 del Masterplan 2.0 — 1.5: mai un semplice "Bloccato". Ogni elemento
 * fuori dal piano apre questa modale invece di un link diretto, con l'elenco
 * dei vantaggi e una via d'uscita morbida ("Continua con Starter").
 */
export function UpgradeModal({
  aperto,
  onChiudi,
  richiedePiano,
}: {
  aperto: boolean;
  onChiudi: () => void;
  /** Piano minimo richiesto dalla funzione che ha aperto la modale. */
  richiedePiano: Extract<Tier, 'premium' | 'pro'>;
}) {
  const { titolo, vantaggi, ctaLabel, ctaSecondaria, icona: Icona } = CONTENUTO[richiedePiano];

  return (
    <Modal aperto={aperto} onChiudi={onChiudi} titolo={titolo}>
      <div className="flex flex-col gap-5">
        <div className="flex h-14 w-14 items-center justify-center rounded-full bg-segnale/10 text-segnale">
          <Icona className="h-7 w-7" strokeWidth={2} />
        </div>
        <ul className="flex flex-col gap-2.5">
          {vantaggi.map((v) => (
            <li key={v} className="flex items-center gap-2 text-[14px] text-asfalto">
              <Check className="h-4 w-4 flex-shrink-0 text-superato" strokeWidth={2.5} />
              {v}
            </li>
          ))}
        </ul>
        <div className="flex flex-col gap-2.5">
          <ButtonLink href="/prodotto" className="gap-1.5" fullWidth>
            <Sparkles className="h-4 w-4" /> {ctaLabel}
          </ButtonLink>
          <Button variante="secondario" onClick={onChiudi} fullWidth>
            {ctaSecondaria}
          </Button>
        </div>
      </div>
    </Modal>
  );
}
