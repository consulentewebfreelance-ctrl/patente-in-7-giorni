'use client';

import { useState } from 'react';
import { Sparkles, Video as VideoIcon } from 'lucide-react';
import { AppHeader } from '@/components/layout/AppHeader';
import { ButtonLink } from '@/components/ui/Button';
import { VideoPlayer } from './VideoPlayer';
import { useRichiedeAcquisto } from '@/lib/access';
import { tierMaggioreOuguale } from '@/lib/tiers';
import { useProgresso } from '@/lib/xp';
import { livelli } from '@/lib/livelli-data';

/**
 * Libreria mini-video (Masterplan 2.0, Premium+): miniature + player
 * placeholder, un video "in programma" per livello. Quando i video reali
 * saranno pronti, basterà passare l'URL a VideoPlayer — la griglia e lo
 * sblocco per piano restano invariati.
 */
export function VideoLibraryClient() {
  const { pronto, tier } = useRichiedeAcquisto();
  const { progresso } = useProgresso();
  const [aperto, setAperto] = useState<string | null>(null);

  if (!pronto || !tier) {
    return (
      <div>
        <div className="h-[64px] animate-pulse bg-nebbia" />
      </div>
    );
  }

  const sbloccato = tierMaggioreOuguale(tier, 'premium');
  const percentuale = (Object.values(progresso.livelli).filter((l) => l.stato === 'completato').length / livelli.length) * 100;

  if (!sbloccato) {
    return (
      <div>
        <AppHeader xpTotale={progresso.xpTotale} percentualeCompletamento={0} />
        <div className="container-app flex min-h-[60vh] flex-col items-center justify-center gap-5 py-16 text-center">
          <div className="flex h-16 w-16 items-center justify-center rounded-full bg-segnale/10 text-segnale">
            <VideoIcon className="h-8 w-8" strokeWidth={2} />
          </div>
          <p className="font-display text-[20px] font-bold">I mini-video sono inclusi da Premium in su</p>
          <p className="max-w-[360px] text-[14px] text-ardesia">
            Passa a Premium per sbloccare la libreria video, un video per ogni argomento.
          </p>
          <ButtonLink href="/prodotto">
            <Sparkles className="mr-1.5 h-4 w-4" /> Sblocca Premium
          </ButtonLink>
        </div>
      </div>
    );
  }

  return (
    <div>
      <AppHeader xpTotale={progresso.xpTotale} percentualeCompletamento={percentuale} />
      <div className="container-app flex flex-col gap-6 py-8 md:py-12">
        <div>
          <span className="text-[13px] font-medium text-ardesia">Premium</span>
          <h1 className="mt-1 font-display text-[24px] font-bold">Mini-video</h1>
          <p className="mt-1 text-[14px] text-ardesia">Un video di spiegazione per ogni livello. Stiamo girando i primi — la libreria si aggiorna automaticamente appena sono pronti.</p>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {livelli.map((l) => (
            <div key={l.id} className="flex flex-col gap-2">
              <VideoPlayer titolo={l.titolo} />
              <div className="flex items-center justify-between">
                <span className="text-[13px] font-medium text-asfalto">
                  Livello {l.numero} — {l.titolo}
                </span>
                <span className="text-[12px] text-ardesia">~3 min</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
