/** Mockup della copertina dell'e-book/PDF, coerente con la palette del brand. */
export function PDFMockup() {
  return (
    <div className="mx-auto flex aspect-[3/4] w-full max-w-[260px] flex-col justify-between rounded-md bg-asfalto p-6 text-segnaletica shadow-lg">
      <div className="flex items-center gap-2">
        <div className="h-6 w-6 rounded-full border-2 border-segnaletica" />
        <span className="font-display text-[13px] font-bold">Patente7</span>
      </div>
      <div>
        <p className="font-display text-[26px] font-bold leading-[1.05]">
          Il metodo<br />in 7 giorni
        </p>
        <p className="mt-2 text-[13px] text-segnaletica/60">Guide · Schemi · Flashcard · Quiz</p>
      </div>
      <div className="h-1 w-12 rounded-full bg-superato" />
    </div>
  );
}
