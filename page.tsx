import type { Metadata } from 'next';
import { Hero } from '@/components/marketing/Hero';
import { LaunchBanner } from '@/components/marketing/LaunchBanner';
import { TrustBar } from '@/components/marketing/TrustBar';
import { StatsStrip } from '@/components/marketing/StatsStrip';
import { FeatureCards } from '@/components/marketing/FeatureCards';
import { WhyItWorks } from '@/components/marketing/WhyItWorks';
import { FreeLevelBand } from '@/components/marketing/FreeLevelBand';
import { FinalCTA } from '@/components/marketing/FinalCTA';
import { StickyCTA } from '@/components/marketing/StickyCTA';

export const metadata: Metadata = {
  title: 'Patente in 7 Giorni — Il metodo per superare il quiz in una settimana',
  description:
    'Un metodo di studio organizzato in guide, schemi, flashcard e quiz originali per superare il quiz della patente in 7 giorni.',
};

export default function HomePage() {
  return (
    <>
      <Hero />
      <LaunchBanner />
      <TrustBar />
      <StatsStrip />
      <FeatureCards />
      <WhyItWorks />
      <FreeLevelBand />
      <FinalCTA />
      <StickyCTA />
    </>
  );
}
