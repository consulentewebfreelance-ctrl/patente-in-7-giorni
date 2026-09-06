import type { Metadata } from 'next';
import { DemoExperience } from '@/components/demo/DemoExperience';

export const metadata: Metadata = {
  title: 'Demo gratuita',
  description: 'Prova gratis il primo livello del metodo: lezione, flashcard e 5 domande in stile esame.',
};

export default function DemoPage() {
  return <DemoExperience />;
}
