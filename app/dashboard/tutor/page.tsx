import type { Metadata } from 'next';
import { TutorAIClient } from '@/components/dashboard/TutorAIClient';

export const metadata: Metadata = {
  title: 'Tutor AI',
  robots: { index: false },
};

export default function TutorPage() {
  return <TutorAIClient />;
}
