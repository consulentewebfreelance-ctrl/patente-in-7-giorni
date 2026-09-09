// Contenuto completo del livello 1 ("Segnali"), usato SOLO dalla demo gratuita
// (/demo). È una copia intenzionalmente pubblica dello stesso livello che, nella
// dashboard, viene invece caricato in modo protetto da netlify/functions/get-livello-content.
// Non importare questo file da pagine/componenti della dashboard.

import type { Domanda, Flashcard } from './livelli-data';

export type LivelloDemo = {
  id: string;
  numero: number;
  titolo: string;
  icona: 'segnali';
  lezione: string;
  truccoMnemonico: string;
  erroriFrequenti: string[];
  flashcard: Flashcard[];
  quiz: Domanda[];
};

export const livelloDemo: LivelloDemo = 
  {
    id: 'segnali',
    numero: 1,
    titolo: 'Segnali',
    icona: 'segnali',
    lezione:
      'I segnali stradali si dividono in quattro grandi famiglie: pericolo (triangolari, bordo rosso), obbligo (circolari, sfondo blu), divieto (circolari, bordo rosso) e indicazione (quadrati o rettangolari, sfondo blu o verde). Riconoscere subito la famiglia di un segnale, prima ancora del simbolo al suo interno, è il modo più veloce per rispondere correttamente al quiz.',
    truccoMnemonico:
      'Forma prima del contenuto: triangolo = attenzione, cerchio con bordo rosso = vietato, cerchio pieno blu = obbligo. Il colore rosso, in ogni forma, significa quasi sempre "limite" o "pericolo".',
    erroriFrequenti: [
      'Confondere i segnali di obbligo (cerchio blu) con quelli di indicazione (quadrato blu): l\'obbligo impone un comportamento, l\'indicazione informa soltanto.',
      'Pensare che un segnale di precedenza tolto elimini anche le regole generali di precedenza (non è così, si applicano comunque).',
    ],
    flashcard: [
      { fronte: 'Triangolo con bordo rosso', retro: 'Segnale di pericolo: avvisa di un rischio imminente sulla strada.' },
      { fronte: 'Cerchio con bordo rosso e simbolo nero', retro: 'Segnale di divieto: vieta un comportamento specifico.' },
      { fronte: 'Cerchio blu pieno con simbolo bianco', retro: 'Segnale di obbligo: impone un comportamento specifico.' },
      { fronte: 'Ottagono rosso', retro: 'Stop: obbligo di arresto e di dare precedenza.' },
    ],
    quiz: [
      {
        domanda: 'Un segnale triangolare con bordo rosso indica generalmente:',
        risposte: ['Un obbligo da rispettare', 'Un pericolo sulla strada', 'Un\'indicazione utile'],
        corretta: 1,
        spiegazione: 'La forma triangolare con bordo rosso è la famiglia dei segnali di pericolo: avvisano di un rischio prima che si presenti.',
        erroreComune: 'Si confonde spesso con i segnali di divieto perché entrambi hanno il bordo rosso, ma la forma cambia completamente il significato.',
      },
      {
        domanda: 'Il segnale di "Stop" impone di:',
        risposte: ['Rallentare soltanto se c\'è traffico', 'Fermarsi sempre e dare precedenza', 'Fermarsi solo di notte'],
        corretta: 1,
        spiegazione: 'Lo stop obbliga all\'arresto del veicolo in ogni caso, indipendentemente dal traffico presente, e a dare precedenza a chi sta transitando.',
        erroreComune: 'Molti pensano che, in assenza di altri veicoli, ci si possa limitare a rallentare: non è corretto, l\'arresto è sempre obbligatorio.',
      },
      {
        domanda: 'Un cerchio blu pieno con una freccia bianca indica:',
        risposte: ['Una direzione consigliata', 'Una direzione obbligatoria', 'Un divieto di svolta'],
        corretta: 1,
        spiegazione: 'I segnali circolari blu pieni appartengono alla famiglia dell\'obbligo: la direzione indicata non è un suggerimento ma una prescrizione.',
        erroreComune: 'Si tende a confonderlo con i pannelli di indicazione stradale, che hanno invece forma quadrata o rettangolare.',
      },
      {
        domanda: 'Un segnale quadrato o rettangolare con sfondo blu, in genere, serve a:',
        risposte: ['Vietare un comportamento', 'Dare un\'indicazione utile', 'Imporre un obbligo'],
        corretta: 1,
        spiegazione: 'La famiglia dei segnali di indicazione ha forma quadrata o rettangolare e fornisce informazioni utili alla guida, senza imporre né vietare nulla.',
        erroreComune: 'Si confonde con i segnali di obbligo, che hanno invece forma circolare.',
      },
      {
        domanda: 'Il colore rosso su un segnale stradale indica quasi sempre:',
        risposte: ['Un\'informazione secondaria', 'Un limite o un pericolo', 'Una zona turistica'],
        corretta: 1,
        spiegazione: 'In quasi tutte le forme di segnale, il rosso segnala un limite da rispettare o un pericolo da tenere in considerazione.',
        erroreComune: 'Si sottovaluta il colore come indizio rapido e ci si concentra solo sul simbolo interno, perdendo tempo nella lettura.',
      },
    ],
  };
