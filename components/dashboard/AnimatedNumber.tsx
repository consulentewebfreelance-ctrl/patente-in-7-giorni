'use client';

import { useEffect, useRef } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';

/** Numero che si anima fluidamente verso il nuovo valore (Fase 9: "XP animati"). */
export function AnimatedNumber({ value, className }: { value: number; className?: string }) {
  const motionValue = useMotionValue(value);
  const spring = useSpring(motionValue, { stiffness: 120, damping: 20 });
  const display = useTransform(spring, (v) => Math.round(v).toLocaleString('it-IT'));
  const primoRender = useRef(true);

  useEffect(() => {
    if (primoRender.current) {
      motionValue.set(value);
      primoRender.current = false;
      return;
    }
    motionValue.set(value);
  }, [value, motionValue]);

  return <motion.span className={className}>{display}</motion.span>;
}
