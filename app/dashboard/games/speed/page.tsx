import type { Metadata } from 'next';
import { SpeedChallengeClient } from '@/components/games/speed/SpeedChallengeClient';

export const metadata: Metadata = {
  title: 'Speed Challenge',
  robots: { index: false },
};

export default function SpeedChallengePage() {
  return <SpeedChallengeClient />;
}
