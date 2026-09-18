'use client';

import { useEffect, useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import { Brain, Lock, RotateCcw, Sparkles, Volume2, VolumeX } from 'lucide-react';
import { AppHeader } from '@/components/layout/AppHeader';
import { Button, ButtonLink } from '@/components/ui/Button';
import { UpgradeModal } from '@/components/dashboard/UpgradeModal';
import { Confetti } from '@/components/games/shared/Confetti';
import { MemoryCard, type StatoCarta } from './MemoryCard';
import { useRichiedeAcquisto, useMemoryLivelli, useMemoryContenuto } from '@/lib/access';
import { useProgresso } from '@/lib/xp';
import { useRecordGiochi } from '@/lib/gameRecords';
import { useSuoni } from '@/lib/sounds';
import { registraProgressoMissione } from '@/lib/missions';
import { TIER_INFO } from '@/lib/tiers';

type Difficolta = 'facile' | 'medio' | 'esperto';
const COPPIE_PER_DIFFICOLTA: Record<Difficolta, number> = { facile: 6, medio: 8, esperto: 12 };

type Carta = { id: string; pairId: string; testo: string; stato: StatoCarta };

function mescola<T>(arr: T[]): T[] {
  const c = [...arr];
  for (let i = c.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [c[i], c[j]] = [c[j], c[i]];
  }
  return c;
}

export function MemoryGameClient() {
  const { pronto, tier } = useRichiedeAcquisto();
  const { progresso } = useProgresso();
  const { play, toggle, attivi } = useSuoni();
  const { registraMemory } = useRecordGiochi();

  const { stato: statoElenco, elenco } = useMemoryLivelli();
  const [livelloId, setLivelloId] = useState<string | null>(null);
  const [difficolta, setDifficolta] = useState<Difficolta>('facile');
  const { stato: statoContenuto, titolo, coppie } = useMemoryContenuto(livelloId);

  const [carte, setCarte] = useState<Carta[]>([]);
  const [girate, setGirate] = useState<string[]>([]);
  const [mosse, setMosse] = useState(0);
  const [bloccoInput, setBloccoInput] = useState(false);
  const [inizio, setInizio] = useState<number | null>(null);
  const [vinto, setVinto] = useState<{ tempo: number; mosse: number } | null>(null);
  const [modaleAperta, setModaleAperta] = useState(false);

  useEffect(() => {
    if (statoContenuto !== 'pronto' || coppie.length === 0) return;
    const n = Math.min(COPPIE_PER_DIFFICOLTA[difficolta], coppie.length);
    const selezione = mescola(coppie).slice(0, n);
    const mazzo: Carta[] = mescola(
      selezione.flatMap((c) => [
        { id: `${c.id}-a`, pairId: c.id, testo: c.fronte, stato: 'coperta' as StatoCarta },
        { id: `${c.id}-b`, pairId: c.id, testo: c.retro, stato: 'coperta' as StatoCarta },
      ])
    );
    setCarte(mazzo);
    setGirate([]);
    setMosse(0);
    setVinto(null);
    setInizio(Date.now());
  }, [statoContenuto, coppie, difficolta]);

  function giraCarta(id: string) {
    if (bloccoInput || girate.length === 2) return;
    setCarte((prev) => prev.map((c) => (c.id === id ? { ...c, stato: 'girata' } : c)));
    const nuoveGirate = [...girate, id];
    setGirate(nuoveGirate);

    if (nuoveGirate.length === 2) {
      setMosse((m) => m + 1);
      const [primaId, secondaId] = nuoveGirate;
      const prima = carte.find((c) => c.id === primaId);
      const seconda = carte.find((c) => c.id === secondaId);
      setBloccoInput(true);

      if (prima && seconda && prima.pairId === seconda.pairId) {
        play('corretto');
        setTimeout(() => {
          setCarte((prev) => prev.map((c) => (c.pairId === prima.pairId ? { ...c, stato: 'trovata' } : c)));
          setGirate([]);
          setBloccoInput(false);
        }, 350);
      } else {
        play('errore');
        setTimeout(() => {
          setCarte((prev) => prev.map((c) => (c.id === primaId || c.id === secondaId ? { ...c, stato: 'coperta' } : c)));
          setGirate([]);
          setBloccoInput(false);
        }, 700);
      }
    }
  }

  useEffect(() => {
    if (carte.length === 0 || vinto) return;
    if (carte.every((c) => c.stato === 'trovata')) {
      const tempo = inizio ? Math.round((Date.now() - inizio) / 1000) : 0;
      setVinto({ tempo, mosse });
      registraMemory(tempo, mosse);
      registraProgressoMissione('memory');
      play('vittoria');
    }
  }, [carte, vinto, inizio, mosse, registraMemory, play]);

  if (!pronto || !tier) {
    return <div className="h-[64px] animate-pulse bg-nebbia" />;
  }

  const percentuale = 0;

  return (
    <div>
      <AppHeader xpTotale={progresso.xpTotale} percentualeCompletamento={percentuale} />
      <div className="container-app flex max-w-[620px] flex-col gap-6 py-8 md:py-12">
        <div className="flex items-center justify-between">
          <div>
            <span className="text-[13px] font-medium text-ardesia">Mini-gioco</span>
            <h1 className="mt-1 flex items-center gap-2 font-display text-[24px] font-bold">
              <Brain className="h-6 w-6 text-superato" /> Memory Game
            </h1>
          </div>
          <button
            onClick={toggle}
            aria-label={attivi ? 'Disattiva i suoni' : 'Attiva i suoni'}
            className="flex h-10 w-10 items-center justify-center rounded-full border border-nebbia text-ardesia hover:bg-nebbia"
          >
            {attivi ? <Volume2 className="h-4 w-4" /> : <VolumeX className="h-4 w-4" />}
          </button>
        </div>

        {!livelloId && (
          <div className="flex flex-col gap-5">
            <div>
              <p className="mb-2 text-[13px] font-medium text-ardesia">Difficoltà</p>
              <div className="flex gap-2">
                {(['facile', 'medio', 'esperto'] as Difficolta[]).map((d) => (
                  <button
                    key={d}
                    onClick={() => setDifficolta(d)}
                    className={`flex-1 rounded-md border-[1.5px] py-2.5 text-[13px] font-medium capitalize transition-colors ${
                      difficolta === d ? 'border-asfalto bg-asfalto text-segnaletica' : 'border-nebbia text-ardesia hover:border-asfalto/30'
                    }`}
                  >
                    {d} · {COPPIE_PER_DIFFICOLTA[d]} coppie
                  </button>
                ))}
              </div>
            </div>

            <div>
              <p className="mb-2 text-[13px] font-medium text-ardesia">Categoria</p>
              {statoElenco === 'carica' && <div className="h-24 animate-pulse rounded-lg bg-nebbia" />}
              <div className="grid grid-cols-2 gap-2.5">
                {elenco.map((l) => (
                  <button
                    key={l.id}
                    onClick={() => setLivelloId(l.id)}
                    className="rounded-lg border border-nebbia p-3 text-left text-[14px] font-medium text-asfalto hover:border-asfalto/30"
                  >
                    {l.titolo}
                  </button>
                ))}
                {tier === 'starter' && (
                  <button
                    onClick={() => setModaleAperta(true)}
                    className="flex items-center gap-2 rounded-lg border border-segnale/30 bg-segnale/[0.04] p-3 text-left text-[13px] text-segnale"
                  >
                    <Lock className="h-4 w-4 flex-shrink-0" /> Altre categorie con Premium
                  </button>
                )}
              </div>
            </div>
          </div>
        )}

        {livelloId && statoContenuto === 'upgrade-richiesto' && (
          <div className="flex flex-col items-center gap-4 py-10 text-center">
            <Lock className="h-8 w-8 text-segnale" />
            <p className="font-display text-[17px] font-bold">Categoria Premium</p>
            <ButtonLink href="/prodotto">Sblocca Premium</ButtonLink>
          </div>
        )}

        {livelloId && statoContenuto === 'pronto' && !vinto && (
          <div>
            <div className="mb-3 flex items-center justify-between text-[13px] text-ardesia">
              <span>{titolo}</span>
              <span>Mosse: {mosse}</span>
            </div>
            <div className="grid grid-cols-3 gap-2.5 sm:grid-cols-4">
              {carte.map((c) => (
                <MemoryCard key={c.id} testo={c.testo} stato={c.stato} onClick={() => giraCarta(c.id)} />
              ))}
            </div>
          </div>
        )}

        {vinto && (
          <motion.div initial={{ opacity: 0, scale: 0.96 }} animate={{ opacity: 1, scale: 1 }} className="relative flex flex-col items-center gap-4 py-10 text-center">
            <Confetti attivo />
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-superato/10 text-superato">
              <Sparkles className="h-8 w-8" />
            </div>
            <p className="font-display text-[22px] font-bold">Completato!</p>
            <p className="text-[14px] text-ardesia">{vinto.mosse} mosse · {vinto.tempo} secondi · +35 XP missione</p>
            <div className="flex gap-2.5">
              <Button onClick={() => setLivelloId(null)} variante="secondario" className="gap-1.5">
                <RotateCcw className="h-4 w-4" /> Rigioca
              </Button>
              <ButtonLink href="/dashboard">Torna alla Dashboard</ButtonLink>
            </div>
          </motion.div>
        )}
      </div>

      <UpgradeModal aperto={modaleAperta} onChiudi={() => setModaleAperta(false)} richiedePiano="premium" />
    </div>
  );
}
