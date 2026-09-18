'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { MessageCircleHeart, Send, Sparkles } from 'lucide-react';
import { AppHeader } from '@/components/layout/AppHeader';
import { ButtonLink } from '@/components/ui/Button';
import { useRichiedeAcquisto } from '@/lib/access';
import { tierMaggioreOuguale } from '@/lib/tiers';
import { useProgresso } from '@/lib/xp';
import { livelli } from '@/lib/livelli-data';

const DOMANDE_SUGGERITE = [
  'Perché in rotatoria ha la precedenza chi è già dentro?',
  'Qual è la differenza tra obbligo e divieto?',
  'Quando è vietato sorpassare?',
];

type Messaggio = { autore: 'utente' | 'assistente'; testo: string };

/**
 * Interfaccia completa del Tutor AI (Masterplan 2.0, Premium+). L'architettura
 * di invio/ricezione è reale e collegata a /api/tutor-ai: oggi risponde con un
 * messaggio "in arrivo" perché nessun motore AI è ancora collegato (vedi
 * app/api/tutor-ai/route.ts per come attivarlo con l'API di Claude).
 */
export function TutorAIClient() {
  const { pronto, tier } = useRichiedeAcquisto();
  const { progresso } = useProgresso();
  const [messaggi, setMessaggi] = useState<Messaggio[]>([
    { autore: 'assistente', testo: 'Ciao! Sono il Tutor AI. Chiedimi pure un dubbio su un livello: segnali, precedenze, parcheggi...' },
  ]);
  const [bozza, setBozza] = useState('');
  const [invio, setInvio] = useState(false);

  if (!pronto || !tier) {
    return (
      <div>
        <div className="h-[64px] animate-pulse bg-nebbia" />
      </div>
    );
  }

  const sbloccato = tierMaggioreOuguale(tier, 'premium');

  async function invia(testo: string) {
    if (!testo.trim() || invio) return;
    setMessaggi((m) => [...m, { autore: 'utente', testo }]);
    setBozza('');
    setInvio(true);
    try {
      const accessoRaw = window.localStorage.getItem('patente7giorni_accesso_v2');
      const accesso = accessoRaw ? JSON.parse(accessoRaw) : null;
      const res = await fetch('/api/tutor-ai', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ token: accesso?.token, messages: [{ role: 'user', content: testo }] }),
      });
      if (res.status === 501) {
        setMessaggi((m) => [...m, { autore: 'assistente', testo: 'Questa funzione arriva presto: al momento il Tutor AI non è ancora collegato. Nel frattempo trovi lezione, trucco mnemonico ed errori comuni in ogni livello.' }]);
      } else if (!res.ok) {
        setMessaggi((m) => [...m, { autore: 'assistente', testo: 'Qualcosa non ha funzionato. Riprova tra poco.' }]);
      }
    } catch {
      setMessaggi((m) => [...m, { autore: 'assistente', testo: 'Qualcosa non ha funzionato. Riprova tra poco.' }]);
    } finally {
      setInvio(false);
    }
  }

  if (!sbloccato) {
    return (
      <div>
        <AppHeader xpTotale={progresso.xpTotale} percentualeCompletamento={0} />
        <div className="container-app flex min-h-[60vh] flex-col items-center justify-center gap-5 py-16 text-center">
          <div className="flex h-16 w-16 items-center justify-center rounded-full bg-segnale/10 text-segnale">
            <MessageCircleHeart className="h-8 w-8" strokeWidth={2} />
          </div>
          <p className="font-display text-[20px] font-bold">Il Tutor AI è incluso da Premium in su</p>
          <p className="max-w-[360px] text-[14px] text-ardesia">
            Passa a Premium per fare domande e ricevere spiegazioni su misura per ogni argomento.
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
      <AppHeader xpTotale={progresso.xpTotale} percentualeCompletamento={(Object.values(progresso.livelli).filter((l) => l.stato === 'completato').length / livelli.length) * 100} />
      <div className="container-app flex max-w-[640px] flex-col gap-6 py-8 md:py-12">
        <div>
          <span className="text-[13px] font-medium text-ardesia">Premium</span>
          <h1 className="mt-1 font-display text-[24px] font-bold">Tutor AI</h1>
        </div>

        <div className="flex flex-col gap-3 rounded-lg border border-asfalto/[0.06] bg-segnaletica p-4">
          {messaggi.map((m, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.2 }}
              className={cnAllinea(m.autore)}
            >
              <div
                className={
                  m.autore === 'utente'
                    ? 'max-w-[80%] rounded-lg bg-asfalto px-4 py-2.5 text-[14px] text-segnaletica'
                    : 'max-w-[80%] rounded-lg bg-nebbia px-4 py-2.5 text-[14px] text-asfalto'
                }
              >
                {m.testo}
              </div>
            </motion.div>
          ))}
        </div>

        <div className="flex flex-wrap gap-2">
          {DOMANDE_SUGGERITE.map((d) => (
            <button
              key={d}
              onClick={() => invia(d)}
              className="rounded-full border border-nebbia px-3 py-1.5 text-[12.5px] text-ardesia transition-colors hover:border-asfalto/30 hover:text-asfalto"
            >
              {d}
            </button>
          ))}
        </div>

        <form
          onSubmit={(e) => {
            e.preventDefault();
            invia(bozza);
          }}
          className="flex items-center gap-2"
        >
          <input
            value={bozza}
            onChange={(e) => setBozza(e.target.value)}
            placeholder="Scrivi la tua domanda..."
            className="h-[48px] flex-1 rounded-md border-[1.5px] border-nebbia bg-segnaletica px-4 text-[15px] outline-none focus:border-segnale"
          />
          <button
            type="submit"
            disabled={invio}
            aria-label="Invia"
            className="flex h-[48px] w-[48px] flex-shrink-0 items-center justify-center rounded-md bg-asfalto text-segnaletica disabled:opacity-50"
          >
            <Send className="h-4 w-4" />
          </button>
        </form>
      </div>
    </div>
  );
}

function cnAllinea(autore: Messaggio['autore']) {
  return autore === 'utente' ? 'flex justify-end' : 'flex justify-start';
}
