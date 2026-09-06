/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  // Il progetto viene esportato come sito statico: nessun backend,
  // pubblicabile su Netlify come cartella "out".
  output: 'export',
  images: {
    // Non usiamo l'ottimizzazione immagini di Next (richiede un server):
    // i mockup sono realizzati in CSS/SVG, quindi non serve un loader remoto.
    unoptimized: true,
  },
  trailingSlash: true,
};

module.exports = nextConfig;
