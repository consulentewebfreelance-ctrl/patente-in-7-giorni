import type { Metadata } from 'next';
import { DashboardClient } from '@/components/dashboard/DashboardClient';

export const metadata: Metadata = {
  title: 'La tua dashboard',
  robots: { index: false }, // area riservata a chi ha già acquistato
};

export default function DashboardPage() {
  return <DashboardClient />;
}
