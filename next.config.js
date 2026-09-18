/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // Nessuna configurazione di export/deploy necessaria: Vercel riconosce
  // Next.js automaticamente. Le route in app/api/ diventano funzioni
  // serverless native, senza bisogno di plugin o cartelle speciali.
};

module.exports = nextConfig;
