// Tipi PUBBLICI condivisi tra il contenuto protetto (lib/server/livelli-content.ts),
// il contenuto demo pubblico (lib/demo-livello.ts) e i componenti client che
// mostrano lezione/segnali. Nessun dato qui dentro: solo forme (interfacce).
// Sicuro da importare da qualunque componente 'use client'.

export type IconaBlocco = 'regola' | 'esempio' | 'attenzione' | 'pratica';

export type BloccoLezione = {
  titolo: string;
  testo: string;
  icona: IconaBlocco;
  esempio: string;
  riepilogo: string;
};

export type CategoriaSegnale = 'pericolo' | 'divieto' | 'obbligo' | 'indicazione';

export type Segnale = {
  id: string;
  nome: string;
  categoria: CategoriaSegnale;
  simbolo: string;
  spiegazione: string;
  esempio: string;
};
