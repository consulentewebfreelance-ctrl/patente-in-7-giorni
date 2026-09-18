import { Brain, Gauge, GraduationCap, LineChart, MessageCircleHeart, ShieldAlert, Video, type LucideIcon } from 'lucide-react';
import { FeatureCard } from './FeatureCard';
import { FUNZIONI, tierMaggioreOuguale, type IdFunzione, type Tier } from '@/lib/tiers';

const ICONE: Record<IdFunzione, LucideIcon> = {
  memoryGame: Brain,
  speedChallenge: Gauge,
  tutorAI: MessageCircleHeart,
  miniVideo: Video,
  ripassoAI: GraduationCap,
  heatmapErrori: LineChart,
  modalitaEsame: ShieldAlert,
  erroriGravi: ShieldAlert,
};

// Solo Tutor AI e Mini-video hanno oggi un'interfaccia dedicata da mostrare
// (vedi /dashboard/tutor e /dashboard/video): le altre funzioni compaiono
// come card informative finché non vengono costruite (Fase 4+ del Masterplan).
const HREF: Partial<Record<IdFunzione, string>> = {
  memoryGame: '/dashboard/games/memory',
  speedChallenge: '/dashboard/games/speed',
  tutorAI: '/dashboard/tutor',
  miniVideo: '/dashboard/video',
};

export function FeatureGrid({ tier }: { tier: Tier }) {
  return (
    <div>
      <h2 className="mb-1 font-display text-[16px] font-bold">Funzioni del tuo piano</h2>
      <p className="mb-4 text-[13px] text-ardesia">Quello che include il tuo piano, e cosa sblocchi passando al successivo.</p>
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
        {FUNZIONI.map((funzione) => (
          <FeatureCard
            key={funzione.id}
            funzione={funzione}
            Icona={ICONE[funzione.id]}
            sbloccata={tierMaggioreOuguale(tier, funzione.minimoTier)}
            href={HREF[funzione.id]}
          />
        ))}
      </div>
    </div>
  );
}
