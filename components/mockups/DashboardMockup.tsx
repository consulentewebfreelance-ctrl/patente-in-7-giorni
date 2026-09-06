const righe = [
  { titolo: 'Segnali', stato: 'done' },
  { titolo: 'Precedenze', stato: 'done' },
  { titolo: 'Incroci', stato: 'active' },
  { titolo: 'Velocità', stato: 'locked' },
];

/** Rappresentazione semplificata della dashboard, usata come mockup nell'hero e nella pagina prodotto. */
export function DashboardMockup() {
  return (
    <div className="flex h-full flex-col bg-segnaletica p-4 text-left">
      <div className="mb-3 flex items-center justify-between">
        <span className="font-display text-[13px] font-bold">Livello 3 · 150 XP</span>
        <div className="h-6 w-6 rounded-full bg-nebbia" />
      </div>
      <div className="mb-4 h-1.5 w-full rounded-full bg-nebbia">
        <div className="h-full w-[42%] rounded-full bg-superato" />
      </div>
      <div className="flex flex-col gap-2">
        {righe.map((r) => (
          <div key={r.titolo} className="flex items-center justify-between rounded-md border border-nebbia p-2.5">
            <span
              className={
                'text-[12px] font-medium ' + (r.stato === 'locked' ? 'text-ardesia/50' : 'text-asfalto')
              }
            >
              {r.titolo}
            </span>
            {r.stato === 'done' && <span className="text-[11px] font-bold text-superato">✓</span>}
            {r.stato === 'active' && (
              <span className="rounded-full bg-segnale/10 px-2 py-0.5 text-[10px] font-medium text-segnale">
                In corso
              </span>
            )}
            {r.stato === 'locked' && <span className="text-[11px] text-ardesia/40">🔒</span>}
          </div>
        ))}
      </div>
    </div>
  );
}
