import type { Metadata } from 'next';
import { VideoLibraryClient } from '@/components/dashboard/VideoLibraryClient';

export const metadata: Metadata = {
  title: 'Mini-video',
  robots: { index: false },
};

export default function VideoPage() {
  return <VideoLibraryClient />;
}
