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

export type Livello = {
  id: string;
  numero: number;
  titolo: string;
  icona: 'segnali' | 'precedenze' | 'incroci' | 'velocita' | 'sorpassi' | 'ripasso' | 'finale';
  lezione: string;
  truccoMnemonico: string;
  erroriFrequenti: string[];
  flashcard: Flashcard[];
  quiz: Domanda[];
};

// Contenuto di esempio: struttura e formato definitivi, testi da completare
// in fase di redazione contenuti reale (vedi README, sezione "Dove sostituire i contenuti").
export const livelli: Livello[] = [
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
  },
  {
    id: 'precedenze',
    numero: 2,
    titolo: 'Precedenze',
    icona: 'precedenze',
    lezione:
      'In assenza di segnaletica, la regola generale è la precedenza a destra. Agli incroci regolati da segnali o semafori, questi prevalgono sempre sulla regola generale. Rotatorie: la precedenza è di chi sta già circolando all\'interno dell\'anello, salvo diversa segnaletica.',
    truccoMnemonico:
      'Nessun segnale, nessuna regola scritta sull\'asfalto? Vince chi arriva da destra. In rotonda, invece, vince chi è già "dentro il cerchio".',
    erroriFrequenti: [
      'Applicare la precedenza a destra anche quando è presente un segnale di stop o di dare precedenza, che invece prevale sempre.',
      'Credere che chi entra in rotatoria abbia la precedenza su chi vi circola già: è vero il contrario.',
    ],
    flashcard: [
      { fronte: 'Incrocio senza segnaletica', retro: 'Si applica la precedenza a destra.' },
      { fronte: 'Ingresso in rotatoria', retro: 'La precedenza è di chi sta già circolando nell\'anello.' },
      { fronte: 'Segnale di dare precedenza (triangolo capovolto)', retro: 'Obbligo di rallentare e cedere il passo ai veicoli sulla strada che si incrocia.' },
    ],
    quiz: [
      {
        domanda: 'In un incrocio senza segnaletica, ha la precedenza:',
        risposte: ['Il veicolo più veloce', 'Il veicolo proveniente da destra', 'Il veicolo più grande'],
        corretta: 1,
        spiegazione: 'In assenza di segnali, si applica sempre la regola generale della precedenza a destra.',
        erroreComune: 'Si crede erroneamente che la precedenza dipenda dalla dimensione del veicolo o da chi "arriva prima": conta solo la posizione.',
      },
      {
        domanda: 'Chi ha la precedenza in una rotatoria?',
        risposte: ['Chi sta entrando', 'Chi sta già circolando nell\'anello', 'Chi viene da sinistra'],
        corretta: 1,
        spiegazione: 'Chi è già all\'interno della rotatoria ha sempre la precedenza su chi sta per entrarvi, salvo segnaletica diversa.',
        erroreComune: 'Un errore frequente è pensare che la precedenza a destra si applichi anche dentro la rotonda.',
      },
      {
        domanda: 'Il segnale "dare precedenza" obbliga a:',
        risposte: ['Fermarsi sempre, come allo stop', 'Rallentare e cedere il passo se necessario', 'Suonare il clacson prima di procedere'],
        corretta: 1,
        spiegazione: 'A differenza dello stop, il segnale di dare precedenza non impone l\'arresto obbligatorio, ma il rallentamento e la cessione del passo quando serve.',
        erroreComune: 'Si confonde spesso con lo stop, che invece impone l\'arresto in ogni caso.',
      },
    ],
  },
  {
    id: 'incroci',
    numero: 3,
    titolo: 'Incroci',
    icona: 'incroci',
    lezione:
      'Negli incroci, la traiettoria da seguire dipende dalla manovra: chi svolta a sinistra deve generalmente dare precedenza ai veicoli che procedono dritti in senso opposto. La visibilità e la velocità di avvicinamento sono determinanti per una manovra sicura.',
    truccoMnemonico:
      'Chi gira "taglia" la strada a qualcuno: chi svolta a sinistra è quasi sempre chi deve aspettare.',
    erroriFrequenti: [
      'Impegnare l\'incrocio senza aver verificato lo spazio di uscita, rischiando di bloccarlo in caso di coda.',
      'Sottovalutare la velocità dei veicoli che procedono dritti quando si effettua una svolta a sinistra.',
    ],
    flashcard: [
      { fronte: 'Svolta a sinistra in un incrocio', retro: 'Si deve generalmente precedenza ai veicoli che procedono dritti in senso opposto.' },
      { fronte: 'Incrocio con coda a valle', retro: 'Non impegnare l\'incrocio se non c\'è spazio sufficiente per uscirne.' },
    ],
    quiz: [
      {
        domanda: 'Chi svolta a sinistra in un incrocio, rispetto a chi procede dritto in senso opposto, deve:',
        risposte: ['Avere sempre la precedenza', 'Dare precedenza', 'Sorpassarlo se possibile'],
        corretta: 1,
        spiegazione: 'Chi svolta attraversa la traiettoria del veicolo che procede dritto, quindi deve generalmente cedere il passo.',
        erroreComune: 'Si pensa erroneamente che la svolta "programmata" garantisca automaticamente la precedenza.',
      },
      {
        domanda: 'Prima di impegnare un incrocio è corretto verificare che:',
        risposte: ['Ci sia spazio sufficiente per uscirne', 'Il semaforo sia verde da almeno 10 secondi', 'Non ci siano pedoni a 100 metri'],
        corretta: 0,
        spiegazione: 'Impegnare un incrocio senza spazio per uscirne può bloccare la circolazione trasversale, anche con il verde a favore.',
        erroreComune: 'Molti pensano che il verde garantisca sempre il diritto di attraversare, indipendentemente dallo spazio disponibile a valle.',
      },
      {
        domanda: 'In un incrocio a raso non semaforizzato, la visibilità limitata richiede di:',
        risposte: ['Accelerare per liberare l\'incrocio', 'Procedere a velocità moderata e pronti a fermarsi', 'Suonare il clacson e proseguire'],
        corretta: 1,
        spiegazione: 'La scarsa visibilità impone prudenza: velocità moderata e disponibilità a fermarsi in ogni momento.',
        erroreComune: 'Accelerare per "liberare" l\'incrocio riduce il tempo di reazione disponibile in caso di imprevisto.',
      },
    ],
  },
  {
    id: 'velocita',
    numero: 4,
    titolo: 'Velocità',
    icona: 'velocita',
    lezione:
      'I limiti di velocità variano per tipo di strada e, per i neopatentati, sono più restrittivi nel primo anno. La velocità va sempre adeguata alle condizioni di visibilità, traffico e fondo stradale, anche quando è inferiore al limite massimo consentito.',
    truccoMnemonico:
      'Il limite è un tetto, non un obiettivo: la velocità "giusta" è quella più bassa tra il limite e ciò che le condizioni permettono.',
    erroriFrequenti: [
      'Considerare il limite di velocità come sempre sicuro, anche in condizioni di pioggia, nebbia o scarsa visibilità.',
      'Dimenticare i limiti ridotti previsti per i neopatentati nel primo anno dal conseguimento della patente.',
    ],
    flashcard: [
      { fronte: 'Limite in autostrada per neopatentati (primo anno)', retro: 'Il limite è ridotto rispetto a quello generale, verifica sempre il valore aggiornato nel manuale ufficiale.' },
      { fronte: 'Pioggia o scarsa visibilità', retro: 'La velocità va ridotta anche se il limite consentito è più alto.' },
    ],
    quiz: [
      {
        domanda: 'In condizioni di scarsa visibilità, la velocità va:',
        risposte: ['Mantenuta al limite massimo', 'Adeguata alle condizioni, anche sotto il limite', 'Aumentata per uscire prima dalla zona a rischio'],
        corretta: 1,
        spiegazione: 'Il limite è un valore massimo, non un obiettivo: le condizioni reali possono richiedere una velocità inferiore.',
        erroreComune: 'Si pensa che rispettare il limite sia sempre sufficiente per essere in regola e in sicurezza.',
      },
      {
        domanda: 'Per i neopatentati, nel primo anno dal conseguimento della patente, i limiti di velocità sono:',
        risposte: ['Uguali a quelli generali', 'Più restrittivi su alcune strade', 'Non applicabili'],
        corretta: 1,
        spiegazione: 'La normativa prevede limiti ridotti per i neopatentati su determinate categorie di strade nel primo anno.',
        erroreComune: 'Si dimentica spesso questa eccezione, applicando per errore i limiti generali.',
      },
      {
        domanda: 'La velocità eccessiva rispetto alle condizioni del fondo stradale (es. asfalto bagnato):',
        risposte: ['Non è mai sanzionabile se sotto il limite', 'Può comunque essere considerata pericolosa', 'Riguarda solo i mezzi pesanti'],
        corretta: 1,
        spiegazione: 'Anche restando sotto il limite numerico, una velocità inadeguata alle condizioni reali della strada resta una condotta pericolosa.',
        erroreComune: 'Si confonde il rispetto del numero sul cartello con la sicurezza effettiva della guida.',
      },
    ],
  },
  {
    id: 'sorpassi',
    numero: 5,
    titolo: 'Sorpassi',
    icona: 'sorpassi',
    lezione:
      'Il sorpasso è vietato in prossimità di curve, dossi, incroci e in tutte le situazioni di visibilità ridotta. Prima di sorpassare occorre verificare lo spazio libero sufficiente per rientrare in sicurezza, considerando anche la velocità del veicolo che si sta per sorpassare.',
    truccoMnemonico:
      'Se non vedi la fine della manovra prima di iniziarla, non è un sorpasso: è un rischio.',
    erroriFrequenti: [
      'Iniziare un sorpasso senza aver valutato lo spazio necessario per rientrare in sicurezza.',
      'Sorpassare in prossimità di un incrocio, dove la visibilità e la prevedibilità del traffico sono ridotte.',
    ],
    flashcard: [
      { fronte: 'Linea continua', retro: 'Sorpasso vietato: non è consentito superare la linea di mezzeria.' },
      { fronte: 'Prossimità di un dosso o curva cieca', retro: 'Sorpasso vietato per visibilità insufficiente.' },
    ],
    quiz: [
      {
        domanda: 'Il sorpasso è vietato quando:',
        risposte: ['La visibilità è ridotta, ad esempio in curva', 'Il veicolo davanti procede lentamente', 'Si è su una strada a due corsie'],
        corretta: 0,
        spiegazione: 'La visibilità insufficiente non permette di valutare in sicurezza lo spazio necessario a completare la manovra.',
        erroreComune: 'Si pensa che un veicolo lento davanti giustifichi sempre il sorpasso, indipendentemente dalla visibilità.',
      },
      {
        domanda: 'Prima di sorpassare, è fondamentale valutare:',
        risposte: ['Solo la propria velocità', 'Lo spazio necessario per completare la manovra e rientrare', 'Il colore del veicolo da sorpassare'],
        corretta: 1,
        spiegazione: 'Il sorpasso sicuro richiede di valutare distanza, velocità relativa e spazio di rientro, non solo la propria velocità.',
        erroreComune: 'Si sottovaluta spesso il tempo necessario per rientrare in sicurezza nella propria corsia.',
      },
      {
        domanda: 'Una linea continua al centro della carreggiata indica che il sorpasso è:',
        risposte: ['Consentito con prudenza', 'Vietato', 'Consentito solo di giorno'],
        corretta: 1,
        spiegazione: 'La linea continua non va mai oltrepassata: il sorpasso in quel tratto è vietato.',
        erroreComune: 'Si crede che, in assenza di traffico visibile, oltrepassare la linea continua sia comunque accettabile.',
      },
    ],
  },
  {
    id: 'ripasso',
    numero: 6,
    titolo: 'Ripasso',
    icona: 'ripasso',
    lezione:
      'Questo livello raccoglie le domande più frequenti dei livelli precedenti (segnali, precedenze, incroci, velocità, sorpassi) in un unico ripasso trasversale, utile nei giorni finali del metodo per consolidare quanto studiato.',
    truccoMnemonico:
      'Se in un ripasso esiti su una domanda, quello è l\'argomento su cui tornare prima dell\'esame — non quello su cui hai già risposto giusto.',
    erroriFrequenti: [
      'Ripassare solo gli argomenti già padroneggiati, evitando quelli più ostici.',
      'Fare il ripasso una volta sola invece di ripeterlo a distanza di un giorno.',
    ],
    flashcard: [
      { fronte: 'Metodo di ripasso efficace', retro: 'Rivedere prima le domande sbagliate, poi tutte le altre a campione.' },
    ],
    quiz: [
      {
        domanda: 'Durante il ripasso, conviene concentrarsi principalmente su:',
        risposte: ['Le domande già risposte correttamente', 'Le domande sbagliate nei livelli precedenti', 'Le domande più lunghe da leggere'],
        corretta: 1,
        spiegazione: 'Il ripasso è più efficace quando si concentra sulle lacune reali, non su ciò che si conosce già.',
        erroreComune: 'Si tende a ripetere ciò che si sa già perché dà più sicurezza, ma non migliora la preparazione.',
      },
      {
        domanda: 'Un errore comune sulla precedenza in rotatoria, spesso rivisto nel ripasso, è:',
        risposte: ['Dare precedenza a chi è già nell\'anello', 'Pensare che abbia precedenza chi entra', 'Fermarsi sempre prima di entrare'],
        corretta: 1,
        spiegazione: 'È un errore tipico segnalato anche nel livello Precedenze: chi entra deve cedere il passo a chi già circola.',
        erroreComune: 'Questo errore è tra i più frequenti nei quiz ufficiali, per questo torna spesso nei ripassi.',
      },
      {
        domanda: 'Il sorpasso in prossimità di un incrocio è generalmente:',
        risposte: ['Consentito con cautela', 'Vietato', 'Consentito solo per i motocicli'],
        corretta: 1,
        spiegazione: 'Come visto nel livello Sorpassi, la scarsa prevedibilità del traffico in prossimità di un incrocio rende il sorpasso vietato.',
        erroreComune: 'Si dimentica questa regola perché si concentra l\'attenzione solo su curve e dossi.',
      },
    ],
  },
  {
    id: 'finale',
    numero: 7,
    titolo: 'Simulazione finale',
    icona: 'finale',
    lezione:
      'La missione finale simula le condizioni dell\'esame reale: domande estratte da tutti i livelli precedenti, senza spiegazioni intermedie, con il punteggio finale mostrato solo al termine — esattamente come accadrà il giorno del quiz ufficiale.',
    truccoMnemonico:
      'Simula l\'esame come se fosse reale: niente pause, niente distrazioni, tempo scandito.',
    erroriFrequenti: [
      'Affrontare la simulazione come un livello qualsiasi, senza le condizioni di concentrazione dell\'esame vero.',
      'Saltare la simulazione finale pensando che i livelli singoli siano sufficienti.',
    ],
    flashcard: [
      { fronte: 'Obiettivo della simulazione finale', retro: 'Verificare la preparazione complessiva nelle stesse condizioni dell\'esame ufficiale.' },
    ],
    quiz: [
      {
        domanda: 'Un cerchio blu pieno con una freccia bianca indica un segnale di:',
        risposte: ['Divieto', 'Obbligo', 'Indicazione'],
        corretta: 1,
        spiegazione: 'Come visto nel livello Segnali, i cerchi blu pieni appartengono alla famiglia dell\'obbligo.',
        erroreComune: 'Si confonde spesso con i pannelli di indicazione, di forma diversa.',
      },
      {
        domanda: 'In assenza di segnaletica, la precedenza spetta:',
        risposte: ['A chi arriva da destra', 'A chi arriva da sinistra', 'A chi è più vicino all\'incrocio'],
        corretta: 0,
        spiegazione: 'La regola generale della precedenza a destra si applica quando non c\'è segnaletica specifica.',
        erroreComune: 'Si sottovaluta questa regola quando l\'incrocio sembra "poco trafficato".',
      },
      {
        domanda: 'Il sorpasso è vietato in prossimità di:',
        risposte: ['Un rettilineo lungo', 'Una curva con visibilità ridotta', 'Un parcheggio vuoto'],
        corretta: 1,
        spiegazione: 'La visibilità insufficiente in curva non permette di valutare la manovra in sicurezza.',
        erroreComune: 'Si pensa che basti "non vedere auto in arrivo" per sorpassare in sicurezza.',
      },
      {
        domanda: 'La velocità va sempre adeguata:',
        risposte: ['Solo al limite indicato dal cartello', 'Anche alle condizioni reali della strada', 'Solo al tipo di veicolo'],
        corretta: 1,
        spiegazione: 'Il limite è un tetto massimo: le condizioni reali possono richiedere una velocità inferiore.',
        erroreComune: 'Si crede che rispettare il numero sul cartello equivalga sempre a guidare in sicurezza.',
      },
      {
        domanda: 'Chi svolta a sinistra in un incrocio, rispetto al traffico in senso opposto che procede dritto, deve:',
        risposte: ['Avere la precedenza', 'Dare la precedenza', 'Suonare il clacson e procedere'],
        corretta: 1,
        spiegazione: 'Come visto nel livello Incroci, chi svolta attraversa la traiettoria altrui e deve generalmente cedere il passo.',
        erroreComune: 'Si pensa che segnalare la svolta con la freccia garantisca automaticamente la precedenza.',
      },
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
