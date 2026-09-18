import type { Metadata } from 'next';
import { MemoryGameClient } from '@/components/games/memory/MemoryGameClient';

export const metadata: Metadata = {
  title: 'Memory Game',
  robots: { index: false },
};

export default function MemoryGamePage() {
  return <MemoryGameClient />;
}
