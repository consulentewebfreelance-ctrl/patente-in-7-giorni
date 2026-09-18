'use client';

import { motion } from 'framer-motion';
import { AlertTriangle, ArrowRightCircle, Award, Clock, Flag, Gauge, MapPin, ShieldCheck, Sparkles, TrafficCone, Zap, type LucideIcon } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import type { FaseLivello } from '@/lib/checkpoints';
import { etichettaFase } from '@/lib/checkpoints';

const ICONE_LIVELLO: Record<string, LucideIcon> = {
  segnali: TrafficCone,
  precedenze: ArrowRightCircle,
  velocita: Gauge,
  sorpassi: AlertTriangle,
  parcheggi: MapPin,
  sicurezza: ShieldCheck,
  esame: Flag,
};

/** Schermata di introduzione al livello (Fase 3): icona, motivazione, tempo, XP, badge, CTA. */
export function LevelIntro({
  numero,
  titolo,
  icona,
  testoMotivazionale,
  tempoStimatoMinuti,
  xpOttenibili,
  badge,
  checkpointFase,
  onInizia,
  onContinua,
}: {
  numero: number;
  titolo: string;
  icona: string;
  testoMotivazionale: string;
  tempoStimatoMinuti: number;
  xpOttenibili: number;
  badge: string;
  checkpointFase: FaseLivello | null;
  onInizia: () => void;
  onContinua: () => void;
}) {
  const Icona = ICONE_LIVELLO[icona] ?? TrafficCone;
  const puoRiprendere = checkpointFase && checkpointFase !== 'completato';

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35 }}
      className="flex flex-col items-center gap-5 py-10 text-center"
    >
      <motion.div
        initial={{ scale: 0.6, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: 'spring', stiffness: 220, damping: 16, delay: 0.1 }}
        className="flex h-20 w-20 items-center justify-center rounded-full bg-superato/10 text-superato"
      >
        <Icona className="h-10 w-10" strokeWidth={1.75} />
      </motion.div>

      <div>
        <span className="text-[13px] font-medium text-ardesia">Livello {numero}</span>
        <h1 className="mt-1 font-display text-[26px] font-bold md:text-[30px]">{titolo}</h1>
      </div>

      <p className="max-w-[360px] text-[15px] text-ardesia">{testoMotivazionale}</p>

      <div className="flex flex-wrap items-center justify-center gap-2.5">
        <span className="flex items-center gap-1.5 rounded-full bg-nebbia px-3 py-1.5 text-[13px] font-medium text-asfalto">
          <Clock className="h-3.5 w-3.5" /> ~{tempoStimatoMinuti} min
        </span>
        <span className="flex items-center gap-1.5 rounded-full bg-nebbia px-3 py-1.5 text-[13px] font-medium text-asfalto">
          <Zap className="h-3.5 w-3.5 text-superato" /> fino a {xpOttenibili} XP
        </span>
        <span className="flex items-center gap-1.5 rounded-full bg-nebbia px-3 py-1.5 text-[13px] font-medium text-asfalto">
          <Award className="h-3.5 w-3.5 text-segnale" /> {badge}
        </span>
      </div>

      <div className="mt-2 flex flex-col items-center gap-2">
        <Button onClick={puoRiprendere ? onContinua : onInizia}>
          {puoRiprendere ? `Continua da ${etichettaFase(checkpointFase)}` : 'Inizia livello'}
        </Button>
        {puoRiprendere && (
          <button onClick={onInizia} className="flex items-center gap-1 text-[12.5px] text-ardesia hover:text-asfalto">
            <Sparkles className="h-3 w-3" /> Ricomincia da capo
          </button>
        )}
      </div>
    </motion.div>
  );
}
