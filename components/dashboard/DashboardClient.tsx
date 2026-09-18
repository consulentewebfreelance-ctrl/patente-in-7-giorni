'use client';

import { useMemo } from 'react';
import { AppHeader } from '@/components/layout/AppHeader';
import { LevelMap } from './LevelMap';
import { StatsGrid } from './StatsGrid';
import { BadgeShelf } from './BadgeShelf';
import { StreakIndicator } from './StreakIndicator';
import { FeatureGrid } from './FeatureGrid';
import { MissioneDelGiorno } from './MissioneDelGiorno';
import { DailyChallengeBanner } from './DailyChallengeBanner';
import { DailyMissions } from './DailyMissions';
import { PersonalRecords } from './PersonalRecords';
import { ExamCalendarCard } from './ExamCalendarCard';
import { ContinueJourney } from './ContinueJourney';
import { ProgressoTappe } from '@/components/ui/ProgressBar';
import { livelli } from '@/lib/livelli-data';
import { useProgresso } from '@/lib/xp';
import { useStreak } from '@/lib/streak';
import { useRecordGiochi } from '@/lib/gameRecords';
import { useCalendarioEsame } from '@/lib/examCalendar';
import { useRichiedeAcquisto } from '@/lib/access';
import { TIER_INFO } from '@/lib/tiers';

function DashboardSkeleton() {
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

/**
 * Dashboard Premium (Masterplan 2.0 — Fase 2, Core Gameplay): header (XP,
 * progresso), calendario esame, sfida del giorno, missioni giornaliere,
 * missione in evidenza, statistiche, funzioni del piano, badge, record
 * personali e mappa dei 7 livelli stile Duolingo.
 *
 * Accesso: useRichiedeAcquisto() reindirizza alla home se non risulta un
 * acquisto verificato con Stripe, ed espone il piano acquistato (tier).
 */
export function DashboardClient() {
  const { pronto: accessoVerificato, tier } = useRichiedeAcquisto();
  const { progresso, pronto } = useProgresso();
  const streak = useStreak();
  const { record } = useRecordGiochi();
  const { urgenza } = useCalendarioEsame();

  const completati = useMemo(
    () => livelli.filter((l) => progresso.livelli[l.id]?.stato === 'completato').length,
    [progresso]
  );
  const percentuale = (completati / livelli.length) * 100;

  if (!accessoVerificato || !tier || !pronto) {
    return <DashboardSkeleton />;
  }

  return (
    <div>
      <AppHeader xpTotale={progresso.xpTotale} percentualeCompletamento={percentuale} />
      <div className="container-app flex flex-col gap-10 py-8 md:py-12">
        <div>
          <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center gap-2.5">
              <h1 className="font-display text-[24px] font-bold">La tua dashboard</h1>
              <span className="rounded-full bg-asfalto px-3 py-1 text-[12px] font-bold text-segnaletica">
                {TIER_INFO[tier].nome}
              </span>
            </div>
            <StreakIndicator streak={streak} />
          </div>
          <MissioneDelGiorno progresso={progresso} tier={tier} />
        </div>

        <ContinueJourney />

        <ExamCalendarCard />

        <DailyChallengeBanner urgenza={urgenza} />
        <DailyMissions urgenza={urgenza} />

        <StatsGrid progresso={progresso} />

        <FeatureGrid tier={tier} />

        <BadgeShelf progresso={progresso} streak={streak} record={record} />

        <PersonalRecords streak={streak} xpTotale={progresso.xpTotale} />

        <div>
          <div className="mb-4 flex items-center justify-between">
            <h2 className="font-display text-[16px] font-bold">I tuoi livelli</h2>
            <ProgressoTappe totale={livelli.length} completate={completati} />
          </div>
          <LevelMap livelli={livelli} progresso={progresso} tier={tier} />
        </div>
      </div>
    </div>
  );
}
