import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { livelli, getLivelloById } from '@/lib/livelli-data';
import { BossFightClient } from '@/components/games/boss/BossFightClient';

export function generateStaticParams() {
  return livelli.map((l) => ({ id: l.id }));
}

export function generateMetadata({ params }: { params: { id: string } }): Metadata {
  const livello = getLivelloById(params.id);
  return {
    title: livello ? `Boss Fight · ${livello.titolo}` : 'Boss Fight',
    robots: { index: false },
  };
}

export default function BossFightPage({ params }: { params: { id: string } }) {
  const livello = getLivelloById(params.id);
  if (!livello) notFound();

  return <BossFightClient id={params.id} />;
}
