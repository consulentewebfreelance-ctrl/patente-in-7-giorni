'use client';

import { useEffect, useMemo, useState } from 'react';
import { useRouter } from 'next/navigation';
import { AppHeader } from '@/components/layout/AppHeader';
import { LevelCard } from './LevelCard';
import { StatsGrid } from './StatsGrid';
import { BadgeShelf } from './BadgeShelf';
import { StreakIndicator } from './StreakIndicator';
import { ProgressoTappe } from '@/components/ui/ProgressBar';
import { livelli } from '@/lib/livelli-data';
import { useProgresso } from '@/lib/xp';
import { useStreak } from '@/lib/streak';


const ACCESS_KEY = 'patente7_access';

/**
 * Fase 2/3/4, Schermata 3 — Dashboard Premium: header (XP, progresso),
 * streak giornaliero, statistiche, badge sbloccabili e le 7 card missione.
 */
export function DashboardClient() {
  const router = useRouter();
  const [ok,setOk]=useState(false);
  useEffect(()=>{
    if(localStorage.getItem(ACCESS_KEY)==='premium'){setOk(true);}else{router.replace('/');}
  },[router]);
  if(!ok) return null;
  const { progresso, pronto } = useProgresso();
  const streak = useStreak();

  const completati = useMemo(
    () => livelli.filter((l) => progresso.livelli[l.id]?.stato === 'completato').length,
    [progresso]
  );
  const percentuale = (completati / livelli.length) * 100;

  if (!pronto) {
    // Skeleton semplice invece di uno spinner, coerente con le linee guida micro-interazioni.
    return (
      <div>
        <div className="h-[64px] animate-pulse bg-nebbia" />
        <div className="container-app py-8">
          <div className="mb-6 grid grid-cols-2 gap-3 md:grid-cols-4">
            {Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="h-[84px] animate-pulse rounded-lg bg-nebbia" />
            ))}
          </div>
          <div className="flex flex-col gap-3">
            {Array.from({ length: 7 }).map((_, i) => (
              <div key={i} className="h-[72px] animate-pulse rounded-lg bg-nebbia" />
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div>
      <AppHeader xpTotale={progresso.xpTotale} percentualeCompletamento={percentuale} />
      <div className="container-app flex flex-col gap-10 py-8 md:py-12">
        <div>
          <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
            <h1 className="font-display text-[24px] font-bold">La tua dashboard</h1>
            <StreakIndicator streak={streak} />
          </div>
          <StatsGrid progresso={progresso} />
        </div>

        <BadgeShelf progresso={progresso} streak={streak} />

        <div>
          <div className="mb-4 flex items-center justify-between">
            <h2 className="font-display text-[16px] font-bold">I tuoi livelli</h2>
            <ProgressoTappe totale={livelli.length} completate={completati} />
          </div>
          <div className="flex flex-col gap-3">
            {livelli.map((livello) => {
              const stato = progresso.livelli[livello.id]?.stato ?? 'bloccato';
              const xp = progresso.livelli[livello.id]?.xp ?? 0;
              return (
                <LevelCard key={livello.id} livello={livello} stato={stato} xp={xp} totaleDomande={livello.quiz.length} />
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
