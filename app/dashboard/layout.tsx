export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  // Nessun Header/Footer marketing qui: la dashboard ha il proprio AppHeader
  // (logo, XP, progresso), coerente con la Fase 2, Schermata 3.
  return <div className="min-h-screen bg-segnaletica">{children}</div>;
}
