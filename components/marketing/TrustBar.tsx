const voci = [
  { emoji: '🛡️', titolo: 'Pagamento sicuro', sottotitolo: 'Stripe' },
  { emoji: '📱', titolo: 'Accesso immediato', sottotitolo: 'Dopo il pagamento' },
  { emoji: '📚', titolo: 'Metodo in 7 livelli', sottotitolo: 'Percorso completo' },
];

/** Barra fiducia, subito sotto il banner di lancio. */
export function TrustBar() {
  return (
    <section className="border-b border-nebbia bg-segnaletica py-6">
      <div className="container-app grid grid-cols-1 gap-3 sm:grid-cols-3 sm:gap-4">
        {voci.map(({ emoji, titolo, sottotitolo }) => (
          <div
            key={titolo}
            className="flex items-center gap-3 rounded-lg border border-asfalto/[0.06] bg-segnaletica p-4 shadow-sm"
          >
            <span className="text-[22px] leading-none" aria-hidden>
              {emoji}
            </span>
            <div>
              <p className="text-[14px] font-bold text-asfalto">{titolo}</p>
              <p className="text-[12px] text-ardesia">{sottotitolo}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
