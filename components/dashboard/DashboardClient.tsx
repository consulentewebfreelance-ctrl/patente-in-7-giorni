'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { AppHeader } from '@/components/layout/AppHeader';
import { StatsGrid } from './StatsGrid';
import { BadgeShelf } from './BadgeShelf';
import { StreakIndicator } from './StreakIndicator';
import { LevelCard } from './LevelCard';
import { livelli } from '@/lib/livelli-data';
import { useProgresso } from '@/lib/xp';
import { useStreak } from '@/lib/streak';

const ACCESS_KEY = 'patente7_access';

export default function DashboardClient() {
  const router = useRouter();
  const { progresso, pronto } = useProgresso();
  const streak = useStreak();

  useEffect(() => {
    if (localStorage.getItem(ACCESS_KEY) !== 'premium') {
      router.replace('/');
    }
  }, [router]);

  if (!pronto) return null;

  const completati = livelli.filter(
    (l) => progresso.livelli[l.id]?.stato === 'completato'
  ).length;

  const percentuale = (completati / livelli.length) * 100;

  return (
    <div>
      <AppHeader
        xpTotale={progresso.xpTotale}
        percentualeCompletamento={percentuale}
      />
      <StatsGrid progresso={progresso} />
      <StreakIndicator streak={streak} />
      <BadgeShelf progresso={progresso} />
      <div className="grid gap-4">
        {livelli.map((livello) => (
          <LevelCard key={livello.id} livello={livello} progresso={progresso} />
        ))}
      </div>
    </div>
  );
}
