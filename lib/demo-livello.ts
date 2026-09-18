// Contenuto completo del livello 1 ("Segnali di Pericolo"), usato SOLO dalla
// demo gratuita (/demo). È una copia intenzionalmente pubblica dello stesso
// livello che, nella dashboard, viene invece caricato in modo protetto da
// app/api/get-livello-content (vedi lib/server/livelli-content.ts).
// Non importare questo file da pagine/componenti della dashboard.

import type { Domanda, Flashcard } from './livelli-data';
import type { IconaBlocco, BloccoLezione, CategoriaSegnale, Segnale } from './livelli-content-shared';

export type LivelloDemo = {
  id: string;
  numero: number;
  titolo: string;
  icona: 'segnali';
  testoMotivazionale: string;
  tempoStimatoMinuti: number;
  xpOttenibili: number;
  badge: string;
  bossNome: string;
  bossDescrizione: string;
  blocchiLezione: BloccoLezione[];
  segnali: Segnale[];
  truccoMnemonico: string;
  erroriFrequenti: string[];
  flashcard: Flashcard[];
  quiz: Domanda[];
};

export const livelloDemo: LivelloDemo = 
  {
    id: 'segnali',
    numero: 1,
    titolo: 'Segnali di Pericolo',
    icona: 'segnali',
    testoMotivazionale: 'Il primo passo è imparare a riconoscere il pericolo prima ancora di leggerlo per intero.',
    tempoStimatoMinuti: 12,
    xpOttenibili: 180,
    badge: 'Occhio di Falco',
    bossNome: 'Il Guardiano dei Segnali',
    bossDescrizione: 'Dieci segnali di pericolo, un solo errore concesso.',
    blocchiLezione: [
      {
        titolo: 'La forma prima del simbolo',
        testo: 'Tutti i segnali di pericolo condividono la stessa forma: un triangolo con il bordo rosso e la punta verso l\'alto. Prima ancora di capire cosa c\'è disegnato dentro, la forma da sola ti dice già "attenzione, qui c\'è un rischio". Allenare l\'occhio a cogliere prima la forma è il modo più veloce per non farsi cogliere impreparati.',
        icona: 'regola',
        esempio: 'Vedi un triangolo con bordo rosso in lontananza: prima ancora di leggere il simbolo, sai già che devi prestare attenzione.',
        riepilogo: 'Triangolo, bordo rosso, punta in su: è sempre un pericolo.',
      },
      {
        titolo: 'Cosa cambia dentro il triangolo',
        testo: 'Dentro la forma, il disegno specifica il tipo di rischio: una curva indica una svolta stretta, un dosso segnala un dislivello improvviso, la figura di una persona indica un attraversamento pedonale. Non serve una memoria fotografica: basta collegare il simbolo alla situazione reale che rappresenta.',
        icona: 'esempio',
        esempio: 'Il simbolo con due curve a S indica una serie di curve; la stessa logica vale per dossi, semafori e strade sdrucciolevoli.',
        riepilogo: 'Il simbolo interno specifica il rischio, la forma resta sempre la stessa.',
      },
      {
        titolo: 'Perché il segnale arriva prima',
        testo: 'I segnali di pericolo sono posizionati con un anticipo sufficiente a permetterti di reagire: rallentare, spostarti, aumentare l\'attenzione. Il tempo di reazione di chi guida non è istantaneo, e questo anticipo è calcolato apposta per bastare anche a velocità sostenuta.',
        icona: 'attenzione',
        esempio: 'Un segnale di curva pericolosa compare prima della curva stessa, non nel punto esatto in cui inizia.',
        riepilogo: 'Il segnale ti dà il tempo di reagire: usalo, non aspettare di vedere il pericolo con i tuoi occhi.',
      },
    ],
    segnali: [
      { id: 'curva-pericolosa', nome: 'Curva pericolosa', categoria: 'pericolo', simbolo: 'CURVA', spiegazione: 'Segnala una curva la cui pendenza o il cui raggio richiedono una riduzione della velocità.', esempio: 'Compare prima di tornanti o curve strette su strade extraurbane.' },
      { id: 'dosso', nome: 'Dosso', categoria: 'pericolo', simbolo: 'DOSSO', spiegazione: 'Avvisa di un dislivello della carreggiata che può ridurre aderenza o visibilità.', esempio: 'Frequente in prossimità di ponti, passaggi a livello o dossi artificiali.' },
      { id: 'attraversamento-pedonale', nome: 'Attraversamento pedonale', categoria: 'pericolo', simbolo: 'PED', spiegazione: 'Segnala un punto in cui i pedoni possono attraversare la carreggiata.', esempio: 'Prima delle strisce pedonali, soprattutto vicino a scuole o zone residenziali.' },
      { id: 'semaforo', nome: 'Semaforo', categoria: 'pericolo', simbolo: 'SEMAF.', spiegazione: 'Avvisa della presenza di un impianto semaforico non immediatamente visibile.', esempio: 'Utile dopo una curva o un dosso che nasconde l\'incrocio semaforizzato.' },
      { id: 'strada-sdrucciolevole', nome: 'Strada sdrucciolevole', categoria: 'pericolo', simbolo: 'SDRUC.', spiegazione: 'Segnala un fondo che può ridurre l\'aderenza degli pneumatici, specie se bagnato.', esempio: 'Comune su tratti ombreggiati, in curva o all\'uscita di gallerie.' },
    ],
    truccoMnemonico: 'Tre parole, tre forme: Triangolo-Timore (pericolo), Cerchio-Rosso-Rifiuto (divieto), Cerchio-Blu-Blocco cioè imposizione (obbligo). In questo livello conta solo il triangolo.',
    erroriFrequenti: [
      'Concentrarsi solo sul simbolo interno e ignorare la forma, perdendo tempo prezioso nella lettura.',
      'Sottovalutare la distanza di anticipo con cui il segnale è posizionato, arrivando al pericolo già a velocità sostenuta.',
    ],
    flashcard: [
      { fronte: 'Che forma ha un segnale di pericolo?', retro: 'Triangolo con bordo rosso e punta verso l\'alto.' },
      { fronte: 'Curva pericolosa', retro: 'Segnala una curva che richiede riduzione della velocità.' },
      { fronte: 'Perché il segnale compare in anticipo?', retro: 'Per darti il tempo di reagire prima di incontrare il pericolo reale.' },
      { fronte: 'Dosso', retro: 'Dislivello della carreggiata: riduce aderenza e visibilità.' },
    ],
    quiz: [
      { domanda: 'Un segnale triangolare con bordo rosso indica sempre:', risposte: ['Un obbligo', 'Un pericolo', 'Un\'indicazione utile'], corretta: 1, spiegazione: 'La forma triangolare con bordo rosso è dedicata esclusivamente ai segnali di pericolo.', erroreComune: 'Si confonde con i segnali di divieto, che sono invece circolari.' },
      { domanda: 'Il segnale di dosso avvisa principalmente di:', risposte: ['Un dislivello della carreggiata', 'Un obbligo di svolta', 'Un divieto di sosta'], corretta: 0, spiegazione: 'Il dosso segnala un dislivello che può ridurre aderenza e visibilità.', erroreComune: 'Si tende a sottovalutarlo su strade che sembrano già note.' },
      { domanda: 'Perché i segnali di pericolo compaiono in anticipo rispetto al rischio reale?', risposte: ['Per motivi estetici', 'Per dare il tempo di reagire', 'Solo su strade urbane'], corretta: 1, spiegazione: 'L\'anticipo è calcolato per dare il tempo necessario a rallentare o prestare attenzione.', erroreComune: 'Si pensa che il pericolo inizi esattamente dove compare il cartello.' },
      { domanda: 'Il segnale di attraversamento pedonale serve soprattutto a:', risposte: ['Indicare un parcheggio vicino', 'Avvisare che i pedoni possono attraversare', 'Vietare la sosta'], corretta: 1, spiegazione: 'Segnala un punto in cui è probabile la presenza di pedoni che attraversano.', erroreComune: 'Si confonde con un semplice segnale informativo, abbassando l\'attenzione.' },
    ],
  };
