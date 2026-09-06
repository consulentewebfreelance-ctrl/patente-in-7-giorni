import type { Config } from 'tailwindcss';

// Token di design ereditati dalla Fase 1 (brand) e dalla Fase 2 (design system).
// Non modificare questi valori senza aggiornare anche il documento di brand identity.
const config: Config = {
  content: [
    './app/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        asfalto: '#0B0B0D',      // Nero profondo
        segnaletica: '#FFFFFF',  // Bianco puro
        nebbia: '#F4F4F6',       // Grigio chiaro
        ardesia: '#6E6E76',      // Grigio medio / testo secondario
        superato: '#17C964',     // Verde conferme / successo
        segnale: '#2F6FED',      // Blu fiducia (uso mirato)
        erroreLieve: '#E5484D',  // Solo per errori di validazione form
      },
      fontFamily: {
        display: ['var(--font-space-grotesk)', 'ui-sans-serif', 'system-ui'],
        sans: ['var(--font-inter)', 'ui-sans-serif', 'system-ui'],
      },
      borderRadius: {
        sm: '8px',
        md: '16px',
        lg: '24px',
      },
      boxShadow: {
        sm: '0 1px 2px rgba(11,11,13,0.06)',
        md: '0 8px 24px rgba(11,11,13,0.08)',
        lg: '0 16px 48px rgba(11,11,13,0.12)',
      },
      maxWidth: {
        container: '1200px',
      },
      keyframes: {
        popIn: {
          '0%': { transform: 'scale(0)', opacity: '0' },
          '60%': { transform: 'scale(1.05)', opacity: '1' },
          '100%': { transform: 'scale(1)', opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(16px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
      },
      animation: {
        'pop-in': 'popIn 400ms ease-out',
        'slide-up': 'slideUp 250ms ease-out',
      },
    },
  },
  plugins: [],
};

export default config;
