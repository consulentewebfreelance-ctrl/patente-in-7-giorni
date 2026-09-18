'use client';

import { useState } from 'react';
import { ArrowRight, Gauge, Sparkles, Zap } from 'lucide-react';
import { ButtonLink, Button } from '@/components/ui/Button';
import { ProgressRing } from './ProgressRing';
import { AnimatedNumber } from './AnimatedNumber';
import { UpgradeModal } from './UpgradeModal';
import { livelli } from '@/lib/livelli-data';
import type { Progresso } from '@/lib/xp';
import { useUltimoLivello } from '@/lib/lastPlayed';
import { puoAccedereASimulazioneFinale, type Tier } from '@/lib/tiers';

/**
 * Fase 9 del Masterplan 2.0 — 1.5: cuore della dashboard. Anello di
 * progresso, XP animati, missione del giorno in evidenza, ripresa rapida
 * dell'ultimo livello giocato, scorciatoia alla Simulazione Rapida.
 */
export function MissioneDelGiorno({ progresso, tier }: { progresso: Progresso; tier: Tier }) {
  const [modaleAperta, setModaleAperta] = useState(false);
  const ultimoLivelloId = useUltimoLivello();

  const completati = livelli.filter((l) => progresso.livelli[l.id]?.stato === 'completato').length;
  const percentuale = (completati / livelli.length) * 100;
  const rimanenti = livelli.length - completati;
  const missione = livelli.find((l) => progresso.livelli[l.id]?.stato === 'in-corso');
  const ultimoLivello = ultimoLivelloId && ultimoLivelloId !== missione?.id ? livelli.find((l) => l.id === ultimoLivelloId) : null;

  const puoSimulazione = puoAccedereASimulazioneFinale(tier);

  return (
    <div className="rounded-lg border border-asfalto/[0.06] bg-segnaletica p-5 shadow-md md:p-6">
      <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:gap-6">
        <ProgressRing percentuale={percentuale}>
          <div className="text-center">
            <span className="block font-display text-[18px] font-bold">{Math.round(percentuale)}%</span>
          </div>
        </ProgressRing>

        <div className="flex-1">
          <div className="flex items-center gap-1.5 text-[13px] font-medium text-ardesia">
            <Zap className="h-3.5 w-3.5 text-superato" />
            <AnimatedNumber value={progresso.xpTotale} className="font-display font-bold text-asfalto" /> XP totali
          </div>
          <p className="mt-1 text-[13px] text-ardesia">
            {rimanenti === 0 ? 'Hai completato tutti i livelli.' : `${rimanenti} livell${rimanenti === 1 ? 'o' : 'i'} da completare.`}
          </p>

          {missione && (
            <div className="mt-3">
              <span className="text-[12px] font-medium uppercase tracking-wide text-segnale">Missione del giorno</span>
              <div className="mt-1 flex items-center justify-between gap-3">
                <span className="font-display text-[15px] font-bold">
                  Livello {missione.numero} — {missione.titolo}
                </span>
                <ButtonLink href={`/dashboard/livello/${missione.id}`} className="h-[36px] gap-1 px-3 text-[13px]">
                  Continua <ArrowRight className="h-3.5 w-3.5" />
                </ButtonLink>
              </div>
            </div>
          )}

          {ultimoLivello && (
            <ButtonLink
              href={`/dashboard/livello/${ultimoLivello.id}`}
              variante="secondario"
              className="mt-3 h-[34px] gap-1.5 px-3 text-[12.5px]"
            >
              Riprendi da &ldquo;{ultimoLivello.titolo}&rdquo;
            </ButtonLink>
          )}
        </div>
      </div>

      <div className="mt-5 border-t border-nebbia pt-4">
        {puoSimulazione ? (
          <ButtonLink href="/dashboard/livello/esame" variante="secondario" className="h-[40px] gap-2 text-[14px]">
            <Gauge className="h-4 w-4" /> Simulazione Rapida
          </ButtonLink>
        ) : (
          <Button variante="secondario" onClick={() => setModaleAperta(true)} className="h-[40px] gap-2 text-[14px]">
            <Gauge className="h-4 w-4" /> Simulazione Rapida
            <Sparkles className="h-3.5 w-3.5 text-segnale" />
          </Button>
        )}
      </div>

      <UpgradeModal aperto={modaleAperta} onChiudi={() => setModaleAperta(false)} richiedePiano="premium" />
    </div>
  );
}
