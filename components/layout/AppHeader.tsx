'use client';

import { Logo } from './Logo';
import { ProgressBar } from '@/components/ui/ProgressBar';

/** Header della web app (Fase 2, Schermata 3): logo, XP e progresso complessivo. */
export function AppHeader({ xpTotale, percentualeCompletamento }: { xpTotale: number; percentualeCompletamento: number }) {
  return (
    <header className="sticky top-0 z-40 border-b border-nebbia bg-segnaletica/95 backdrop-blur-md">
      <div className="container-app flex h-[64px] items-center justify-between gap-4">
        <Logo href="/dashboard" />
        <div className="flex items-center gap-3">
          <span className="hidden text-[14px] font-medium text-ardesia sm:inline">{xpTotale} XP</span>
          <div className="h-9 w-9 rounded-full bg-nebbia" aria-hidden />
        </div>
      </div>
      <div className="container-app pb-3">
        <ProgressBar percentuale={percentualeCompletamento} />
      </div>
    </header>
  );
}
