'use client';

import { motion } from 'framer-motion';

/** Anello di progresso animato (Fase 9 del Masterplan 2.0 — 1.5). */
export function ProgressRing({
  percentuale,
  dimensione = 88,
  spessore = 8,
  children,
}: {
  percentuale: number;
  dimensione?: number;
  spessore?: number;
  children?: React.ReactNode;
}) {
  const raggio = (dimensione - spessore) / 2;
  const circonferenza = 2 * Math.PI * raggio;
  const valore = Math.max(0, Math.min(100, percentuale));

  return (
    <div className="relative flex-shrink-0" style={{ width: dimensione, height: dimensione }}>
      <svg width={dimensione} height={dimensione} className="-rotate-90">
        <circle cx={dimensione / 2} cy={dimensione / 2} r={raggio} stroke="#F4F4F6" strokeWidth={spessore} fill="none" />
        <motion.circle
          cx={dimensione / 2}
          cy={dimensione / 2}
          r={raggio}
          stroke="#17C964"
          strokeWidth={spessore}
          strokeLinecap="round"
          fill="none"
          strokeDasharray={circonferenza}
          initial={false}
          animate={{ strokeDashoffset: circonferenza - (valore / 100) * circonferenza }}
          transition={{ type: 'spring', stiffness: 100, damping: 20 }}
        />
      </svg>
      <div className="absolute inset-0 flex items-center justify-center">{children}</div>
    </div>
  );
}
