import { cn } from '@/lib/utils';

/**
 * Cornice smartphone realistica in CSS (Fase 4 §4: "smartphone più realistico"):
 * tasti laterali, notch, riflesso sottile sullo schermo, ombra più profonda.
 */
export function PhoneMockup({
  children,
  inclinato = false,
  className,
}: {
  children: React.ReactNode;
  inclinato?: boolean;
  className?: string;
}) {
  return (
    <div
      className={cn(
        'relative mx-auto w-[280px] rounded-[36px] border-[6px] border-asfalto bg-asfalto p-2 shadow-lg md:w-[300px]',
        'shadow-[0_24px_60px_rgba(11,11,13,0.28)]',
        inclinato && 'rotate-[6deg]',
        className
      )}
    >
      {/* tasto volume e power, solo dettaglio visivo */}
      <div className="absolute -left-[8px] top-20 h-8 w-[3px] rounded-full bg-asfalto/80" aria-hidden />
      <div className="absolute -left-[8px] top-32 h-12 w-[3px] rounded-full bg-asfalto/80" aria-hidden />
      <div className="absolute -right-[8px] top-28 h-14 w-[3px] rounded-full bg-asfalto/80" aria-hidden />

      <div className="absolute left-1/2 top-2 z-10 h-5 w-24 -translate-x-1/2 rounded-full bg-asfalto" aria-hidden />

      <div className="relative aspect-[9/19.5] w-full overflow-hidden rounded-[28px] bg-segnaletica">
        {children}
        {/* riflesso sottile per dare profondità al vetro */}
        <div
          className="pointer-events-none absolute inset-0"
          style={{
            background: 'linear-gradient(115deg, rgba(255,255,255,0.10) 0%, rgba(255,255,255,0) 26%)',
          }}
          aria-hidden
        />
      </div>
    </div>
  );
}
