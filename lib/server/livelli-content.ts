// SOLO SERVER. Contenuto REALE e protetto dei 7 livelli — mai importato da
// app/(marketing), da app/dashboard o da qualunque componente 'use client':
// non deve mai finire nel bundle statico del sito. Servito solo dopo verifica
// del token da app/api/get-livello-content, get-memory-content e
// get-speed-questions.
//
// Struttura Fase 3 (Masterplan 2.0): ogni livello è un percorso completo —
// introduzione, lezione a blocchi, galleria segnali, flashcard, quiz spiegati,
// boss fight a tema. Testi originali, scritti per questo prodotto. La
// classificazione dei segnali (pericolo/divieto/obbligo/indicazione) è
// volutamente semplificata a scopo didattico, coerente con come viene
// insegnata a chi si prepara per la prima volta.

export type Domanda = {
  domanda: string;
  risposte: [string, string, string];
  corretta: 0 | 1 | 2;
  spiegazione: string;
  erroreComune: string;
};

export type Flashcard = {
  fronte: string;
  retro: string;
};

import type { IconaBlocco, BloccoLezione, CategoriaSegnale, Segnale } from '@/lib/livelli-content-shared';

export type Livello = {
  id: string;
  numero: number;
  titolo: string;
  icona: 'segnali' | 'precedenze' | 'velocita' | 'sorpassi' | 'parcheggi' | 'sicurezza' | 'esame';
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

export const livelli: Livello[] = [
  {
    id: 'segnali',
    numero: 1,
    titolo: 'Segnali di Pericolo',
    icona: 'segnali',
    testoMotivazionale: 'Il primo passo è imparare a riconoscere il pericolo prima ancora di leggerlo per intero.',
    tempoStimatoMinuti: 12,
    xpOttenibili: 290,
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
  },
  {
    id: 'precedenze',
    numero: 2,
    titolo: 'Precedenze',
    icona: 'precedenze',
    testoMotivazionale: 'Chi passa e chi aspetta: poche regole, applicate sempre nello stesso ordine.',
    tempoStimatoMinuti: 14,
    xpOttenibili: 290,
    badge: 'Maestro dell\'Incrocio',
    bossNome: 'Il Signore della Rotonda',
    bossDescrizione: 'Incroci, rotatorie e segnali misti: dimostra di conoscere l\'ordine giusto.',
    blocchiLezione: [
      {
        titolo: 'La regola quando non c\'è nulla',
        testo: 'In un incrocio privo di segnaletica, vale la precedenza a destra: passa chi arriva dal lato destro rispetto a te. È la regola di base a cui tornare ogni volta che non trovi un segnale a dirti diversamente.',
        icona: 'regola',
        esempio: 'Due strade di pari importanza si incrociano senza alcun cartello: decide la posizione, non chi è arrivato prima.',
        riepilogo: 'Nessun segnale? Vince chi arriva da destra.',
      },
      {
        titolo: 'Il segnale vince sempre',
        testo: 'Appena compare un segnale di stop, di dare precedenza o un semaforo, questo prevale sempre sulla regola generale, senza eccezioni. Un incrocio regolato non lascia spazio all\'interpretazione della posizione.',
        icona: 'regola',
        esempio: 'Uno stop su una delle due strade toglie automaticamente la precedenza a destra: decide solo il segnale.',
        riepilogo: 'Il segnale specifico batte sempre la regola generale.',
      },
      {
        titolo: 'La logica della rotatoria',
        testo: 'Le rotatorie funzionano al contrario di quanto ci si aspetterebbe applicando la precedenza a destra: ha sempre la precedenza chi sta già circolando dentro l\'anello, non chi sta per entrarvi.',
        icona: 'attenzione',
        esempio: 'Sei fermo all\'ingresso di una rotatoria e un\'auto arriva da sinistra, già dentro l\'anello: aspetti, anche se sembra "il tuo turno".',
        riepilogo: 'In rotonda vince sempre chi è già dentro il cerchio.',
      },
      {
        titolo: 'Chi svolta, aspetta',
        testo: 'In un incrocio, chi svolta a sinistra deve generalmente dare precedenza ai veicoli che procedono dritti in senso opposto, perché la sua traiettoria attraversa quella dell\'altro veicolo. La freccia comunica l\'intenzione, non modifica la regola.',
        icona: 'pratica',
        esempio: 'Hai la freccia sinistra inserita da prima, ma un\'auto procede dritta in senso opposto: aspetti comunque il suo passaggio.',
        riepilogo: 'La freccia informa, non decide: chi svolta cede il passo a chi procede dritto.',
      },
    ],
    segnali: [
      { id: 'stop', nome: 'Stop', categoria: 'obbligo', simbolo: 'STOP', spiegazione: 'Obbliga all\'arresto del veicolo e a dare precedenza a chi sta transitando, in ogni caso.', esempio: 'Presente su strade secondarie che si immettono su strade principali.' },
      { id: 'dare-precedenza', nome: 'Dare precedenza', categoria: 'obbligo', simbolo: 'CEDI', spiegazione: 'Obbliga a rallentare e cedere il passo ai veicoli sulla strada che si incrocia, senza l\'arresto automatico dello stop.', esempio: 'Comune su strade secondarie con buona visibilità sull\'incrocio.' },
      { id: 'rotatoria', nome: 'Rotatoria', categoria: 'indicazione', simbolo: 'ROTONDA', spiegazione: 'Segnala l\'avvicinamento a una rotatoria, dove vale la regola di chi è già dentro l\'anello.', esempio: 'Posizionato prima dell\'ingresso della rotatoria stessa.' },
      { id: 'diritto-precedenza', nome: 'Diritto di precedenza', categoria: 'indicazione', simbolo: 'PRIORITÀ', spiegazione: 'Indica che la strada su cui ci si trova ha la precedenza sulle strade secondarie che la intersecano.', esempio: 'Frequente su strade extraurbane principali.' },
    ],
    truccoMnemonico: 'Il segnale batte sempre la regola generale. Se c\'è un cartello, decide lui. Se non c\'è nulla, decide la destra. In rotonda, vince chi è già dentro il cerchio.',
    erroriFrequenti: [
      'Applicare la precedenza a destra anche quando è presente un segnale che la sostituisce.',
      'Credere che chi entra in rotatoria abbia la precedenza su chi vi circola già.',
      'Pensare che accendere la freccia dia automaticamente la precedenza a chi svolta.',
    ],
    flashcard: [
      { fronte: 'Incrocio senza segnaletica', retro: 'Vale la precedenza a destra.' },
      { fronte: 'Ingresso in rotatoria', retro: 'Precedenza a chi sta già circolando nell\'anello.' },
      { fronte: 'Stop', retro: 'Arresto obbligatorio e precedenza a chi sta transitando.' },
      { fronte: 'Svolta a sinistra', retro: 'Generalmente cede il passo a chi procede dritto in senso opposto.' },
    ],
    quiz: [
      { domanda: 'In un incrocio senza segnaletica, chi ha la precedenza?', risposte: ['Il veicolo più veloce', 'Chi arriva da destra', 'Chi arriva da sinistra'], corretta: 1, spiegazione: 'In assenza di segnali, la regola generale è sempre la precedenza a destra.', erroreComune: 'Si sottovaluta questa regola quando l\'incrocio sembra poco trafficato.' },
      { domanda: 'In una rotatoria, chi ha la precedenza?', risposte: ['Chi sta entrando', 'Chi sta già circolando nell\'anello', 'Chi arriva da destra'], corretta: 1, spiegazione: 'Chi è già dentro la rotatoria ha sempre la precedenza su chi sta per entrarvi.', erroreComune: 'Si applica per errore la precedenza a destra anche dentro la rotonda.' },
      { domanda: 'A differenza dello stop, il segnale di dare precedenza:', risposte: ['Impone comunque l\'arresto totale', 'Non impone l\'arresto obbligatorio, solo di cedere il passo', 'Non ha alcun valore legale'], corretta: 1, spiegazione: 'Il dare precedenza impone di rallentare e cedere il passo se necessario, non l\'arresto automatico.', erroreComune: 'Si confondono i due segnali, trattandoli come equivalenti.' },
      { domanda: 'Chi svolta a sinistra, rispetto a chi procede dritto in senso opposto, deve:', risposte: ['Avere sempre la precedenza', 'Dare precedenza', 'Sorpassarlo se possibile'], corretta: 1, spiegazione: 'Chi svolta attraversa la traiettoria altrui e deve generalmente cedere il passo.', erroreComune: 'Si pensa che la freccia già inserita garantisca la precedenza.' },
    ],
  },
  {
    id: 'velocita',
    numero: 3,
    titolo: 'Velocità',
    icona: 'velocita',
    testoMotivazionale: 'Il limite è un tetto, non un traguardo da raggiungere sempre.',
    tempoStimatoMinuti: 10,
    xpOttenibili: 290,
    badge: 'Piede Leggero',
    bossNome: 'Il Cronometrista',
    bossDescrizione: 'Limiti, distanze e casi pratici, senza sconti.',
    blocchiLezione: [
      {
        titolo: 'Un tetto, non un obiettivo',
        testo: 'Ogni categoria di strada ha un proprio limite massimo. Ma il numero sul cartello è, appunto, un massimo: le condizioni reali — pioggia, nebbia, fondo sconnesso, traffico intenso — possono richiedere una velocità più bassa. Guidare sotto il limite in quelle condizioni non è "guidare male", è guidare correttamente.',
        icona: 'regola',
        esempio: 'Limite di 90 km/h ma pioggia intensa: restare esattamente a 90 non è la scelta corretta.',
        riepilogo: 'Il limite indica il massimo consentito, non la velocità sempre adatta.',
      },
      {
        titolo: 'La distanza che ti serve per fermarti',
        testo: 'Più alta è la velocità, più aumenta lo spazio necessario per fermarsi: si somma il tempo di reazione (durante il quale il veicolo continua a muoversi alla velocità di partenza) allo spazio di frenata vero e proprio, che cresce molto più che proporzionalmente con la velocità.',
        icona: 'esempio',
        esempio: 'Raddoppiare la velocità non raddoppia lo spazio di frenata: lo aumenta molto di più.',
        riepilogo: 'Più veloce vai, più lo spazio per fermarti cresce, e non in proporzione semplice.',
      },
      {
        titolo: 'Neopatentati e condizioni reali',
        testo: 'Chi ha conseguito la patente da meno di un anno ha limiti di velocità ridotti su alcune categorie di strade extraurbane e autostrade. Al di là di questo, la velocità va sempre adeguata alle condizioni reali del momento, non solo al numero sul cartello.',
        icona: 'attenzione',
        esempio: 'Un neopatentato su un\'autostrada ha un limite inferiore a quello generale, anche se il cartello indica un valore più alto.',
        riepilogo: 'Limiti ridotti nel primo anno, e comunque sempre adattati alle condizioni reali.',
      },
    ],
    segnali: [
      { id: 'limite-velocita', nome: 'Limite di velocità', categoria: 'divieto', simbolo: '50', spiegazione: 'Vieta di superare la velocità massima indicata dal numero, espressa in km/h.', esempio: 'Cerchio con bordo rosso e numero al centro.' },
      { id: 'fine-limite', nome: 'Fine limite di velocità', categoria: 'indicazione', simbolo: 'FINE 50', spiegazione: 'Segnala il termine del tratto in cui vigeva il limite indicato.', esempio: 'Dopo questo segnale torna il limite generale della categoria di strada.' },
      { id: 'velocita-consigliata', nome: 'Velocità consigliata', categoria: 'indicazione', simbolo: 'CONSIGL.', spiegazione: 'Indica una velocità raccomandata, non un limite obbligatorio.', esempio: 'Frequente in curve ampie o tratti con visibilità ridotta ma non pericolosi.' },
    ],
    truccoMnemonico: 'Il cartello dice "al massimo", non "esattamente". La velocità giusta è sempre la più bassa tra il limite e ciò che le condizioni permettono.',
    erroriFrequenti: [
      'Considerare il rispetto del numero sul cartello come sinonimo di guida sicura, in ogni condizione.',
      'Dimenticare i limiti ridotti previsti per i neopatentati nel primo anno.',
      'Sottovalutare quanto aumenti lo spazio di frenata a velocità più alte.',
    ],
    flashcard: [
      { fronte: 'In condizioni di scarsa visibilità, la velocità va:', retro: 'Adeguata alle condizioni, anche sotto il limite.' },
      { fronte: 'Neopatentato, primo anno', retro: 'Limiti di velocità ridotti su alcune categorie di strade.' },
      { fronte: 'Raddoppiare la velocità...', retro: '...aumenta lo spazio di frenata molto più che raddoppiandolo.' },
      { fronte: 'Cerchio rosso con un numero', retro: 'Limite massimo di velocità in km/h.' },
    ],
    quiz: [
      { domanda: 'In condizioni di scarsa visibilità, la velocità va:', risposte: ['Mantenuta al limite massimo', 'Adeguata alle condizioni, anche sotto il limite', 'Aumentata per uscire prima dalla zona'], corretta: 1, spiegazione: 'Il limite è un valore massimo, non un obiettivo da raggiungere sempre.', erroreComune: 'Si crede che rispettare il numero sul cartello basti sempre.' },
      { domanda: 'Per i neopatentati, nel primo anno, i limiti su alcune strade sono:', risposte: ['Uguali a quelli generali', 'Più restrittivi', 'Non applicabili'], corretta: 1, spiegazione: 'La normativa prevede limiti ridotti per i neopatentati su alcune categorie di strade nel primo anno.', erroreComune: 'Si applicano per errore i limiti generali.' },
      { domanda: 'Raddoppiando la velocità, lo spazio necessario per fermarsi:', risposte: ['Raddoppia soltanto', 'Aumenta molto più che raddoppiando', 'Resta invariato'], corretta: 1, spiegazione: 'Lo spazio di frenata cresce molto più che proporzionalmente rispetto alla velocità.', erroreComune: 'Si sottovaluta quanto la velocità incida sullo spazio di arresto.' },
      { domanda: 'Una velocità inadeguata al fondo stradale bagnato, pur restando sotto il limite:', risposte: ['Non è mai un problema', 'Può comunque essere pericolosa', 'Riguarda solo i mezzi pesanti'], corretta: 1, spiegazione: 'Restare sotto il limite numerico non basta se la velocità non è adeguata alle condizioni reali.', erroreComune: 'Si confonde il rispetto del numero con la sicurezza effettiva.' },
    ],
  },
  {
    id: 'sorpassi',
    numero: 4,
    titolo: 'Sorpassi',
    icona: 'sorpassi',
    testoMotivazionale: 'Se non vedi la fine della manovra, non è un sorpasso: è un rischio.',
    tempoStimatoMinuti: 11,
    xpOttenibili: 290,
    badge: 'Sorpasso Perfetto',
    bossNome: 'Il Guardiano della Corsia',
    bossDescrizione: 'Casi limite di sorpasso: valuta ogni situazione senza esitare.',
    blocchiLezione: [
      {
        titolo: 'Quando il sorpasso è vietato',
        testo: 'Il sorpasso è vietato in tutte le situazioni in cui la visibilità non permette di valutare con certezza lo spazio necessario: curve, dossi, prossimità di incroci. È vietato anche in presenza di una linea continua di mezzeria, che non va mai oltrepassata.',
        icona: 'regola',
        esempio: 'Curva con visibilità limitata: anche con un veicolo lento davanti, il sorpasso va rimandato.',
        riepilogo: 'Visibilità insufficiente o linea continua: il sorpasso è sempre vietato.',
      },
      {
        titolo: 'Cosa valutare prima di sorpassare',
        testo: 'Prima di sorpassare vanno valutati insieme tre fattori: la propria velocità, quella del veicolo da sorpassare, e lo spazio libero disponibile per rientrare in sicurezza nella propria corsia.',
        icona: 'esempio',
        esempio: 'Un veicolo molto lento davanti non basta da solo a rendere sicuro un sorpasso se lo spazio di rientro è incerto.',
        riepilogo: 'Velocità propria, velocità altrui, spazio di rientro: servono tutti e tre.',
      },
      {
        titolo: 'L\'errore più comune',
        testo: 'L\'errore più frequente è iniziare il sorpasso valutando solo la lentezza del veicolo da superare, senza considerare correttamente lo spazio necessario per completare la manovra e rientrare.',
        icona: 'attenzione',
        esempio: 'Sorpassare in prossimità di un incrocio: anche con strada dritta, la prevedibilità del traffico trasversale cala.',
        riepilogo: 'La lentezza altrui non basta: conta lo spazio per completare la manovra.',
      },
    ],
    segnali: [
      { id: 'divieto-sorpasso', nome: 'Divieto di sorpasso', categoria: 'divieto', simbolo: 'NO SORP.', spiegazione: 'Vieta il sorpasso di tutti i veicoli, salvo le eccezioni previste (es. veicoli molto lenti).', esempio: 'Comune su tratti con visibilità ridotta o alta densità di traffico.' },
      { id: 'fine-divieto-sorpasso', nome: 'Fine divieto di sorpasso', categoria: 'indicazione', simbolo: 'FINE', spiegazione: 'Segnala il termine del tratto in cui il sorpasso era vietato.', esempio: 'Da qui tornano applicabili le regole generali sul sorpasso.' },
      { id: 'doppio-senso', nome: 'Doppio senso di circolazione', categoria: 'pericolo', simbolo: '2 SENSI', spiegazione: 'Avvisa che il tratto, a differenza di quanto ci si potrebbe aspettare, è percorso in entrambi i sensi.', esempio: 'Utile dopo un tratto a senso unico che torna a doppio senso.' },
    ],
    truccoMnemonico: 'Se non vedi la fine della manovra, non è un sorpasso: è un rischio. E la linea continua non si negozia mai.',
    erroriFrequenti: [
      'Valutare il sorpasso guardando solo la velocità del veicolo da superare.',
      'Sorpassare in prossimità di un incrocio, dove il traffico è meno prevedibile.',
      'Oltrepassare una linea continua contando sull\'assenza di traffico visibile.',
    ],
    flashcard: [
      { fronte: 'Il sorpasso è vietato quando...', retro: '...la visibilità è ridotta, ad esempio in curva.' },
      { fronte: 'Linea continua di mezzeria', retro: 'Sorpasso sempre vietato, in ogni condizione.' },
      { fronte: 'Prima di sorpassare valuta:', retro: 'Velocità propria, velocità altrui, spazio di rientro.' },
      { fronte: 'Sorpasso vicino a un incrocio', retro: 'Sconsigliato: il traffico trasversale è meno prevedibile.' },
    ],
    quiz: [
      { domanda: 'Il sorpasso è vietato quando:', risposte: ['Il veicolo davanti procede lentamente', 'La visibilità è ridotta, ad esempio in curva', 'Si è su una strada a doppia corsia'], corretta: 1, spiegazione: 'La visibilità insufficiente non permette di valutare in sicurezza lo spazio necessario.', erroreComune: 'Si pensa che un veicolo lento giustifichi sempre il sorpasso.' },
      { domanda: 'Una linea continua al centro della carreggiata indica che il sorpasso è:', risposte: ['Consentito con prudenza', 'Vietato', 'Consentito solo di giorno'], corretta: 1, spiegazione: 'La linea continua non va mai oltrepassata: il sorpasso in quel tratto è vietato.', erroreComune: 'Si crede che l\'assenza di traffico visibile renda accettabile oltrepassarla.' },
      { domanda: 'Prima di sorpassare, oltre alla propria velocità, è fondamentale valutare:', risposte: ['Il colore del veicolo da sorpassare', 'Lo spazio necessario per completare la manovra e rientrare', 'Il numero di passeggeri a bordo'], corretta: 1, spiegazione: 'Il sorpasso sicuro richiede di valutare distanza, velocità relativa e spazio di rientro.', erroreComune: 'Si sottovaluta il tempo necessario per rientrare in sicurezza.' },
      { domanda: 'Sorpassare in prossimità di un incrocio è generalmente:', risposte: ['Consentito se la strada è dritta', 'Sconsigliato per la minore prevedibilità del traffico', 'Sempre vietato per legge in ogni caso'], corretta: 1, spiegazione: 'Vicino a un incrocio la prevedibilità del traffico trasversale è più bassa, aumentando il rischio.', erroreComune: 'Ci si concentra solo sulla visibilità della propria corsia.' },
    ],
  },
  {
    id: 'parcheggi',
    numero: 5,
    titolo: 'Parcheggi',
    icona: 'parcheggi',
    testoMotivazionale: 'Sapere dove non fermarsi è metà del lavoro.',
    tempoStimatoMinuti: 10,
    xpOttenibili: 290,
    badge: 'Parcheggio Perfetto',
    bossNome: 'Il Vigile Implacabile',
    bossDescrizione: 'Divieti, soste e casi reali: non lasciarti sorprendere.',
    blocchiLezione: [
      {
        titolo: 'Fermata o sosta? La differenza conta',
        testo: 'La fermata è un\'interruzione breve della marcia, con il conducente pronto a ripartire; la sosta è un\'interruzione più lunga, anche a veicolo incustodito. Molti divieti riguardano solo una delle due, non entrambe.',
        icona: 'regola',
        esempio: 'Fermarsi pochi secondi per far scendere un passeggero è una fermata; lasciare l\'auto per fare la spesa è una sosta.',
        riepilogo: 'Fermata = breve e presidiata. Sosta = più lunga, anche senza conducente.',
      },
      {
        titolo: 'Dove non ci si può mai fermare',
        testo: 'Ci sono punti in cui fermarsi è sempre vietato, a prescindere dalla segnaletica: in doppia fila, sulle strisce pedonali, davanti ai passi carrabili, in prossimità di incroci con visibilità ridotta.',
        icona: 'esempio',
        esempio: 'Fermarsi "un attimo" in doppia fila resta un\'infrazione, indipendentemente dalla durata.',
        riepilogo: 'Doppia fila, strisce, passi carrabili, incroci: mai, nemmeno per un attimo.',
      },
      {
        titolo: 'I colori raccontano la regola',
        testo: 'Le strisce a terra indicano il tipo di parcheggio: bianche per la sosta libera, blu per la sosta a pagamento, gialle per stalli riservati (disabili, carico e scarico) o per il divieto di sosta.',
        icona: 'pratica',
        esempio: 'Strisce blu senza aver esposto il tagliando di pagamento: sosta irregolare anche se il posto sembra libero.',
        riepilogo: 'Bianco libero, blu a pagamento, giallo riservato o vietato.',
      },
    ],
    segnali: [
      { id: 'divieto-sosta', nome: 'Divieto di sosta', categoria: 'divieto', simbolo: 'NO SOSTA', spiegazione: 'Vieta di lasciare il veicolo fermo oltre il tempo di una fermata breve.', esempio: 'Cerchio con bordo rosso e una barra diagonale.' },
      { id: 'divieto-fermata', nome: 'Divieto di fermata', categoria: 'divieto', simbolo: 'NO FERMATA', spiegazione: 'Vieta qualsiasi interruzione della marcia, anche breve, in quel tratto.', esempio: 'Più restrittivo del divieto di sosta: vieta anche le soste brevissime.' },
      { id: 'parcheggio', nome: 'Parcheggio', categoria: 'indicazione', simbolo: 'P', spiegazione: 'Segnala un\'area destinata alla sosta dei veicoli.', esempio: 'Quadrato blu con la lettera P, spesso accompagnato da indicazioni sulle tariffe.' },
      { id: 'parcheggio-disabili', nome: 'Parcheggio disabili', categoria: 'indicazione', simbolo: 'P DIS.', spiegazione: 'Segnala uno stallo riservato ai veicoli con contrassegno per persone con disabilità.', esempio: 'Riconoscibile dalle strisce gialle e dal simbolo dedicato a terra.' },
    ],
    truccoMnemonico: 'Se il conducente resta pronto a ripartire, è fermata. Se scende e si allontana, è sosta: e molti divieti valgono solo per una delle due.',
    erroriFrequenti: [
      'Confondere una fermata breve con una sosta consentita.',
      'Sostare in doppia fila "solo per un attimo".',
      'Non notare un passo carrabile prima di fermarsi davanti.',
    ],
    flashcard: [
      { fronte: 'Fermata', retro: 'Interruzione breve, conducente pronto a ripartire.' },
      { fronte: 'Sosta', retro: 'Interruzione più lunga, anche a veicolo incustodito.' },
      { fronte: 'Strisce blu', retro: 'Sosta a pagamento.' },
      { fronte: 'Doppia fila', retro: 'Sempre vietata, anche per pochi istanti.' },
    ],
    quiz: [
      { domanda: 'La differenza principale tra fermata e sosta è:', risposte: ['Il colore del veicolo', 'La durata e la presenza del conducente pronto a ripartire', 'Il tipo di strada'], corretta: 1, spiegazione: 'La fermata è breve e presidiata, la sosta è più lunga, anche senza conducente a bordo.', erroreComune: 'Si trattano le due situazioni come equivalenti.' },
      { domanda: 'Fermarsi in doppia fila per pochi istanti è:', risposte: ['Consentito se il traffico lo permette', 'Sempre vietato', 'Consentito solo di notte'], corretta: 1, spiegazione: 'La doppia fila è vietata a prescindere dalla durata della sosta.', erroreComune: 'Si pensa che la brevità renda la sosta accettabile.' },
      { domanda: 'Le strisce blu a terra indicano generalmente:', risposte: ['Sosta gratuita', 'Sosta a pagamento', 'Divieto assoluto di sosta'], corretta: 1, spiegazione: 'Il blu è il colore convenzionale per gli stalli di sosta a pagamento.', erroreComune: 'Si confondono con le strisce bianche, gratuite.' },
      { domanda: 'Fermarsi davanti a un passo carrabile è:', risposte: ['Consentito per pochi minuti', 'Vietato', 'Consentito se non ci sono auto in uscita'], corretta: 1, spiegazione: 'Il passo carrabile deve restare sempre libero, indipendentemente dalla situazione del momento.', erroreComune: 'Si valuta solo se in quel momento sembra libero.' },
    ],
  },
  {
    id: 'sicurezza',
    numero: 6,
    titolo: 'Sicurezza',
    icona: 'sicurezza',
    testoMotivazionale: 'Le regole che proteggono te valgono quanto quelle che regolano il traffico.',
    tempoStimatoMinuti: 11,
    xpOttenibili: 290,
    badge: 'Guardia del Corpo',
    bossNome: 'Il Custode della Sicurezza',
    bossDescrizione: 'Dispositivi di sicurezza, distanze e condizioni di guida: nessun dettaglio trascurato.',
    blocchiLezione: [
      {
        titolo: 'La cintura non è un\'opzione',
        testo: 'La cintura di sicurezza è obbligatoria per il conducente e per tutti i passeggeri, su ogni sedile dotato di cintura, per qualunque tipo di tragitto, anche brevissimo.',
        icona: 'regola',
        esempio: 'Anche un tragitto di pochi minuti in città richiede la cintura allacciata per tutti a bordo.',
        riepilogo: 'Cintura sempre, per tutti, su ogni sedile che ne è dotato.',
      },
      {
        titolo: 'La distanza che ti salva',
        testo: 'La distanza di sicurezza dal veicolo che precede deve tenere conto del tempo di reazione e dello spazio di frenata: entrambi aumentano con la velocità e con un fondo stradale bagnato o sconnesso.',
        icona: 'esempio',
        esempio: 'A velocità sostenuta e fondo bagnato, la distanza di sicurezza necessaria cresce sensibilmente rispetto a condizioni normali.',
        riepilogo: 'Più veloce vai e peggiori sono le condizioni, più distanza ti serve.',
      },
      {
        titolo: 'Guidare nelle condizioni giuste',
        testo: 'Stanchezza e scarsa attenzione aumentano il tempo di reazione tanto quanto — a volte più che — la velocità stessa. Se non ci si sente lucidi o riposati a sufficienza, la scelta più sicura è rimandare la guida.',
        icona: 'attenzione',
        esempio: 'Un lungo turno di lavoro senza pause può ridurre la prontezza di riflessi quanto una distrazione al volante.',
        riepilogo: 'La lucidità alla guida conta quanto le regole scritte sul codice.',
      },
    ],
    segnali: [
      { id: 'obbligo-cintura', nome: 'Obbligo cintura di sicurezza', categoria: 'obbligo', simbolo: 'CINTURA', spiegazione: 'Ricorda l\'obbligo, sempre vigente, di allacciare la cintura su ogni sedile che ne è dotato.', esempio: 'Spesso richiamato anche da segnalazioni acustiche a bordo veicolo.' },
      { id: 'obbligo-casco', nome: 'Obbligo casco', categoria: 'obbligo', simbolo: 'CASCO', spiegazione: 'Obbligo di indossare il casco protettivo alla guida di motocicli e ciclomotori.', esempio: 'Vale per conducente e passeggero, senza eccezioni di percorso.' },
      { id: 'velocita-minima', nome: 'Velocità minima', categoria: 'obbligo', simbolo: 'MIN 40', spiegazione: 'Impone una velocità minima da mantenere, per non intralciare il flusso del traffico.', esempio: 'Presente su alcune corsie autostradali o gallerie.' },
    ],
    truccoMnemonico: 'In caso di dubbio sulla tua lucidità o sulle tue energie, la scelta più sicura è non mettersi alla guida.',
    erroriFrequenti: [
      'Pensare che la cintura serva solo su tragitti lunghi o extraurbani.',
      'Sottovalutare quanto il fondo bagnato aumenti la distanza di sicurezza necessaria.',
      'Sottovalutare la stanchezza come fattore di rischio reale alla guida.',
    ],
    flashcard: [
      { fronte: 'Cintura di sicurezza', retro: 'Obbligatoria per tutti, su ogni sedile che ne è dotato, sempre.' },
      { fronte: 'Distanza di sicurezza', retro: 'Aumenta con la velocità e con un fondo bagnato o sconnesso.' },
      { fronte: 'Casco', retro: 'Obbligatorio per conducente e passeggero di moto e ciclomotori.' },
      { fronte: 'Stanchezza alla guida', retro: 'Aumenta il tempo di reazione quanto una distrazione.' },
    ],
    quiz: [
      { domanda: 'La cintura di sicurezza è obbligatoria:', risposte: ['Solo sui sedili anteriori', 'Su ogni sedile dotato di cintura, per tutti', 'Solo sui percorsi extraurbani'], corretta: 1, spiegazione: 'L\'obbligo vale per conducente e passeggeri, su ogni sedile che ne è dotato.', erroreComune: 'Si pensa che riguardi solo chi guida o solo i sedili davanti.' },
      { domanda: 'Con un fondo stradale bagnato, la distanza di sicurezza necessaria:', risposte: ['Resta invariata', 'Aumenta', 'Diminuisce'], corretta: 1, spiegazione: 'Il fondo bagnato riduce l\'aderenza e aumenta lo spazio di frenata necessario.', erroreComune: 'Si mantiene la stessa distanza usata in condizioni normali.' },
      { domanda: 'Il casco è obbligatorio:', risposte: ['Solo per il conducente della moto', 'Per conducente e passeggero', 'Solo sui percorsi extraurbani'], corretta: 1, spiegazione: 'L\'obbligo del casco vale per entrambi, senza eccezioni di percorso.', erroreComune: 'Si dimentica l\'obbligo per il passeggero.' },
      { domanda: 'La stanchezza alla guida:', risposte: ['Non ha effetti misurabili', 'Aumenta il tempo di reazione', 'Migliora la concentrazione'], corretta: 1, spiegazione: 'La stanchezza rallenta i riflessi e il tempo di reazione, aumentando il rischio.', erroreComune: 'Si sottovaluta rispetto ad altri fattori di rischio più discussi.' },
    ],
  },
  {
    id: 'esame',
    numero: 7,
    titolo: 'Preparazione Esame',
    icona: 'esame',
    testoMotivazionale: 'Non impari nulla di nuovo: dimostri quello che hai già costruito.',
    tempoStimatoMinuti: 15,
    xpOttenibili: 310,
    badge: 'Pronto per l\'Esame',
    bossNome: 'L\'Esaminatore',
    bossDescrizione: 'Domande miste da tutti i livelli, condizioni identiche all\'esame reale.',
    blocchiLezione: [
      {
        titolo: 'Come ripassare bene',
        testo: 'Un ripasso efficace non ripete tutto allo stesso modo: si concentra sulle domande sbagliate nei livelli precedenti, perché sono il segnale più preciso di dove si trova davvero una lacuna.',
        icona: 'regola',
        esempio: 'Se hai sbagliato più volte sulla rotatoria, il ripasso va concentrato lì, non su ciò che già sai.',
        riepilogo: 'Ripassa i tuoi errori, non i tuoi punti di forza.',
      },
      {
        titolo: 'Simulare le condizioni reali',
        testo: 'Una simulazione utile riproduce il formato dell\'esame il più fedelmente possibile: domande miste, senza spiegazioni intermedie, punteggio mostrato solo alla fine.',
        icona: 'esempio',
        esempio: 'Durante una simulazione non ci si ferma a rileggere la spiegazione dopo ogni domanda, esattamente come il giorno dell\'esame.',
        riepilogo: 'Più la simulazione somiglia all\'esame vero, più è utile.',
      },
      {
        titolo: 'Gestire la tensione',
        testo: 'Un po\' di tensione il giorno dell\'esame è normale, anche per chi conosce bene le regole. L\'obiettivo non è eliminarla, ma non lasciare che un dubbio su una domanda condizioni tutte le successive.',
        icona: 'attenzione',
        esempio: 'Se una domanda mette in difficoltà, meglio decidere e proseguire piuttosto che restare bloccati a lungo su di essa.',
        riepilogo: 'Decidi e vai avanti: è meglio di un dubbio che si trascina su tutto il resto.',
      },
    ],
    segnali: [
      { id: 'ripasso-pericolo', nome: 'Ripasso: pericolo', categoria: 'pericolo', simbolo: 'PERICOLO', spiegazione: 'Forma triangolare con bordo rosso: la famiglia dei segnali di pericolo.', esempio: 'Vedi il Livello 1 per il ripasso completo.' },
      { id: 'ripasso-divieto', nome: 'Ripasso: divieto', categoria: 'divieto', simbolo: 'DIVIETO', spiegazione: 'Cerchio con bordo rosso: vieta un comportamento specifico.', esempio: 'Vedi i Livelli 3, 4 e 5 per gli esempi pratici.' },
      { id: 'ripasso-obbligo', nome: 'Ripasso: obbligo', categoria: 'obbligo', simbolo: 'OBBLIGO', spiegazione: 'Cerchio blu pieno: impone un comportamento specifico.', esempio: 'Vedi i Livelli 2 e 6 per gli esempi pratici.' },
      { id: 'ripasso-indicazione', nome: 'Ripasso: indicazione', categoria: 'indicazione', simbolo: 'INFO', spiegazione: 'Forma quadrata o rettangolare: informa senza vietare né obbligare.', esempio: 'Presente in quasi tutti i livelli come segnale di supporto.' },
    ],
    truccoMnemonico: 'Tratta la simulazione come l\'esame vero: stesso silenzio, stesso tempo, stessa assenza di aiuti.',
    erroriFrequenti: [
      'Concentrare tutto il ripasso in un\'unica sessione lunga invece di distribuirlo.',
      'Saltare la simulazione finale ritenendo sufficienti i livelli singoli.',
    ],
    flashcard: [
      { fronte: 'Le 4 famiglie di segnali', retro: 'Pericolo (triangolo), divieto (cerchio rosso), obbligo (cerchio blu), indicazione (quadrato).' },
      { fronte: 'Regola d\'oro delle precedenze', retro: 'Nessun segnale: destra. Segnale presente: vince lui. Rotonda: chi è già dentro.' },
      { fronte: 'Sorpasso sicuro', retro: 'Visibilità, spazio di rientro, nessuna linea continua.' },
      { fronte: 'Prima dell\'esame', retro: 'Ripassa gli errori, non i punti di forza già solidi.' },
    ],
    quiz: [
      { domanda: 'Un segnale triangolare con bordo rosso indica un segnale di:', risposte: ['Divieto', 'Pericolo', 'Indicazione'], corretta: 1, spiegazione: 'La forma triangolare con bordo rosso è la famiglia dei segnali di pericolo.', erroreComune: 'Si confonde con il divieto, che è circolare.' },
      { domanda: 'In assenza di segnaletica, la precedenza spetta a:', risposte: ['Chi arriva da destra', 'Chi arriva da sinistra', 'Chi è più vicino all\'incrocio'], corretta: 0, spiegazione: 'La regola generale della precedenza a destra si applica quando non c\'è segnaletica specifica.', erroreComune: 'Si sottovaluta questa regola su incroci poco trafficati.' },
      { domanda: 'Il limite di velocità indicato da un cartello rappresenta:', risposte: ['Un valore sempre sicuro', 'Un tetto massimo, non un obiettivo', 'Un valore consigliato ma facoltativo'], corretta: 1, spiegazione: 'Il limite è un massimo: le condizioni reali possono richiedere una velocità inferiore.', erroreComune: 'Si pensa che rispettarlo equivalga sempre a guidare in sicurezza.' },
      { domanda: 'Il sorpasso in presenza di una linea continua di mezzeria è:', risposte: ['Consentito con prudenza', 'Sempre vietato', 'Consentito solo di giorno'], corretta: 1, spiegazione: 'La linea continua non va mai oltrepassata, in nessuna condizione.', erroreComune: 'Si pensa che l\'assenza di traffico visibile lo renda accettabile.' },
      { domanda: 'Fermarsi in doppia fila, anche per pochi istanti, è:', risposte: ['Consentito se il traffico lo permette', 'Sempre vietato', 'Consentito solo nei centri storici'], corretta: 1, spiegazione: 'La doppia fila è vietata indipendentemente dalla durata della sosta.', erroreComune: 'Si pensa che la brevità renda la sosta accettabile.' },
      { domanda: 'La cintura di sicurezza è obbligatoria:', risposte: ['Solo sui sedili anteriori', 'Su ogni sedile dotato di cintura, per tutti', 'Solo fuori città'], corretta: 1, spiegazione: 'L\'obbligo vale per conducente e passeggeri, su ogni sedile che ne è dotato.', erroreComune: 'Si dimentica che riguarda anche i passeggeri posteriori.' },
    ],
  },
];

export function getLivelloById(id: string): Livello | undefined {
  return livelli.find((l) => l.id === id);
}

export function getProssimoLivelloId(id: string): string | undefined {
  const index = livelli.findIndex((l) => l.id === id);
  if (index === -1 || index === livelli.length - 1) return undefined;
  return livelli[index + 1].id;
}
