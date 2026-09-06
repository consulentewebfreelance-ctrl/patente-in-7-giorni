export function BrowserMockup({ children }: { children: React.ReactNode }) {
  return (
    <div className="mx-auto w-full max-w-[880px] overflow-hidden rounded-lg border border-nebbia shadow-lg">
      <div className="flex h-9 items-center gap-1.5 border-b border-nebbia bg-nebbia px-4">
        <span className="h-2.5 w-2.5 rounded-full bg-ardesia/30" />
        <span className="h-2.5 w-2.5 rounded-full bg-ardesia/30" />
        <span className="h-2.5 w-2.5 rounded-full bg-ardesia/30" />
        <div className="ml-3 h-4 flex-1 max-w-[280px] rounded-full bg-segnaletica/70" />
      </div>
      <div className="bg-segnaletica">{children}</div>
    </div>
  );
}
