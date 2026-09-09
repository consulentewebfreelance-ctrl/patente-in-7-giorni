import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { livelli, getLivelloById, getProssimoLivelloId } from '@/lib/livelli-data';
import { LivelloClient } from '@/components/dashboard/LivelloClient';

// Richiesto da next.config.js (output: 'export'): genera staticamente
// tutte le pagine /dashboard/livello/[id] in fase di build.
export function generateStaticParams() {
  return livelli.map((l) => ({ id: l.id }));
}

export function generateMetadata({ params }: { params: { id: string } }): Metadata {
  const livello = getLivelloById(params.id);
  return {
    title: livello ? `Livello ${livello.numero} · ${livello.titolo}` : 'Livello',
    robots: { index: false },
  };
}

export default function LivelloPage({ params }: { params: { id: string } }) {
  const livello = getLivelloById(params.id);
  if (!livello) notFound();

  return <LivelloClient id={params.id} prossimoLivelloId={getProssimoLivelloId(params.id)} />;
}
