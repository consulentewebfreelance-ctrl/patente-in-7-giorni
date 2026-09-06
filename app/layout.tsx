import type { Metadata, Viewport } from 'next';
import { Space_Grotesk, Inter } from 'next/font/google';
import './globals.css';

const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  weight: ['500', '700'],
  variable: '--font-space-grotesk',
  display: 'swap',
});

const inter = Inter({
  subsets: ['latin'],
  weight: ['400', '500', '700', '800'],
  variable: '--font-inter',
  display: 'swap',
});

export const metadata: Metadata = {
  metadataBase: new URL('https://patentein7giorni.it'),
  title: {
    default: 'Patente in 7 Giorni — Il metodo per superare il quiz in una settimana',
    template: '%s · Patente in 7 Giorni',
  },
  description:
    'Un metodo di studio organizzato in guide, schemi, flashcard e quiz originali per superare il quiz della patente in 7 giorni.',
  openGraph: {
    title: 'Patente in 7 Giorni',
    description: 'Il metodo per superare il quiz della patente in una settimana.',
    url: 'https://patentein7giorni.it',
    siteName: 'Patente in 7 Giorni',
    locale: 'it_IT',
    type: 'website',
    images: [{ url: '/og-image.png', width: 1200, height: 630 }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Patente in 7 Giorni',
    description: 'Il metodo per superare il quiz della patente in una settimana.',
    images: ['/og-image.png'],
  },
  icons: {
    icon: '/favicon.svg',
  },
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: '#0B0B0D',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="it" className={`${spaceGrotesk.variable} ${inter.variable}`}>
      <body className="bg-segnaletica font-sans text-asfalto antialiased">{children}</body>
    </html>
  );
}
