import { Logo } from './Logo';

export function Footer() {
  return (
    <footer className="border-t border-nebbia bg-segnaletica">
      <div className="container-app flex flex-col gap-8 py-12 md:flex-row md:items-start md:justify-between">
        <div className="flex flex-col gap-3">
          <Logo />
          <p className="max-w-[320px] text-[14px] text-ardesia">
            Il metodo per superare il quiz della patente in 7 giorni: guide, schemi, flashcard e quiz originali.
          </p>
        </div>
        <div className="flex gap-12">
          <div className="flex flex-col gap-2">
            <span className="text-[13px] font-medium text-ardesia">Prodotto</span>
            <a href="/prodotto" className="text-[14px] text-asfalto/80 hover:text-asfalto">Prezzi</a>
            <a href="/demo" className="text-[14px] text-asfalto/80 hover:text-asfalto">Demo gratuita</a>
          </div>
          <div className="flex flex-col gap-2">
            <span className="text-[13px] font-medium text-ardesia">Assistenza</span>
            <a href="mailto:ciao@patentein7giorni.it" className="text-[14px] text-asfalto/80 hover:text-asfalto">
              Contattaci
            </a>
          </div>
        </div>
      </div>
      <div className="border-t border-nebbia py-5">
        <p className="container-app text-[13px] text-ardesia">
          © {new Date().getFullYear()} Patente in 7 Giorni. Tutti i diritti riservati.
        </p>
      </div>
    </footer>
  );
}
