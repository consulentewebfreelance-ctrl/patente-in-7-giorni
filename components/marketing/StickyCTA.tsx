'use client';

import { useEffect, useState } from 'react';
import { ButtonLink } from '@/components/ui/Button';

/** Fase 4, §4: CTA sticky in fondo allo schermo su mobile, dopo l'hero (pattern ad alta conversione). */
export function StickyCTA() {
  const [visibile, setVisibile] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisibile(window.scrollY > 640);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  if (!visibile) return null;

  return (
    <div className="fixed inset-x-0 bottom-0 z-30 border-t border-nebbia bg-segnaletica/95 p-3 backdrop-blur-md animate-slide-up md:hidden">
      <ButtonLink href="/prodotto" fullWidth>
        Inizia Ora
      </ButtonLink>
    </div>
  );
}
