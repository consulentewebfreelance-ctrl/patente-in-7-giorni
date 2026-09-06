'use client';

import { useEffect, useState } from 'react';
import { Logo } from './Logo';
import { ButtonLink } from '@/components/ui/Button';
import { cn } from '@/lib/utils';

/** Header del sito marketing: trasparente in cima, opaco allo scroll (Fase 2, Schermata 1). */
export function Header() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <header
      className={cn(
        'sticky top-0 z-40 transition-all duration-200',
        scrolled ? 'bg-segnaletica/90 shadow-sm backdrop-blur-md' : 'bg-transparent'
      )}
    >
      <div className="container-app flex h-[72px] items-center justify-between">
        <Logo />
        <nav className="hidden items-center gap-8 md:flex">
          <a href="/#metodo" className="text-[15px] text-asfalto/80 hover:text-asfalto">
            Il metodo
          </a>
          <a href="/prodotto" className="text-[15px] text-asfalto/80 hover:text-asfalto">
            Prezzi
          </a>
          <a href="/demo" className="text-[15px] text-asfalto/80 hover:text-asfalto">
            Demo gratuita
          </a>
        </nav>
        <ButtonLink href="/prodotto" className="h-[44px] px-5 text-[14px]">
          Inizia Ora
        </ButtonLink>
      </div>
    </header>
  );
}
