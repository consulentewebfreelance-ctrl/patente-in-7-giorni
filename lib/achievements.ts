import { livelli } from './livelli-data';
import type { Progresso } from './xp';
import type { Streak } from './streak';
import type { RecordGiochi } from './gameRecords';

export type Achievement = {
  id: string;
  titolo: string;
  descrizione: string;
  emoji: string;
  sbloccato: (ctx: { progresso: Progresso; streak: Streak; quizCompletatiTotali: number; record: RecordGiochi }) => boolean;
};

// Badge derivati sempre dallo stato esistente (XP, livelli, streak, record di
// gioco): nessun dato aggiuntivo da salvare, quindi nessun rischio di
// disallineamento.
export const achievements: Achievement[] = [
  {
    id: 'primo-passo',
    titolo: 'Primo passo',
    descrizione: 'Rispondi correttamente alla tua prima domanda.',
    emoji: '🎯',
    sbloccato: ({ quizCompletatiTotali }) => quizCompletatiTotali >= 1,
  },
  {
    id: 'primo-livello',
    titolo: 'Primo livello',
    descrizione: 'Completa il tuo primo livello.',
    emoji: '✅',
    sbloccato: ({ progresso }) => Object.values(progresso.livelli).some((l) => l.stato === 'completato'),
  },
  {
    id: 'a-meta-strada',
    titolo: 'A metà strada',
    descrizione: 'Completa almeno 4 dei 7 livelli.',
    emoji: '🚦',
    sbloccato: ({ progresso }) =>
      Object.values(progresso.livelli).filter((l) => l.stato === 'completato').length >= 4,
  },
  {
    id: 'metodo-completo',
    titolo: 'Metodo completo',
    descrizione: 'Completa tutti e 7 i livelli, simulazione finale inclusa.',
    emoji: '🏁',
    sbloccato: ({ progresso }) => livelli.every((l) => progresso.livelli[l.id]?.stato === 'completato'),
  },
  {
    id: 'streak-3',
    titolo: 'Costanza',
    descrizione: 'Torna a studiare per 3 giorni consecutivi.',
    emoji: '🔥',
    sbloccato: ({ streak }) => streak.giorniConsecutivi >= 3,
  },
  {
    id: 'cento-xp',
    titolo: 'Oltre i 100 XP',
    descrizione: 'Raggiungi 100 XP totali.',
    emoji: '⭐',
    sbloccato: ({ progresso }) => progresso.xpTotale >= 100,
  },
  // --- Nuovi badge, Masterplan 2.0 — Fase 2 (Core Gameplay + Mini Giochi) ---
  {
    id: 'primo-memory',
    titolo: 'Primo Memory',
    descrizione: 'Completa la tua prima partita al Memory Game.',
    emoji: '🧠',
    sbloccato: ({ record }) => record.partiteMemory >= 1,
  },
  {
    id: 'primo-speed',
    titolo: 'Primo Speed',
    descrizione: 'Completa la tua prima Speed Challenge.',
    emoji: '⚡',
    sbloccato: ({ record }) => record.partiteSpeed >= 1,
  },
  {
    id: 'combo-master',
    titolo: 'Combo Master',
    descrizione: 'Raggiungi una combo di almeno 10 risposte corrette di fila in Speed Challenge.',
    emoji: '🔗',
    sbloccato: ({ record }) => record.speedMiglioreCombo >= 10,
  },
  {
    id: 'zero-errori',
    titolo: 'Zero Errori',
    descrizione: 'Vinci una Boss Fight senza sbagliare nemmeno una domanda.',
    emoji: '💎',
    sbloccato: ({ record }) => record.bossPerfette >= 1,
  },
  {
    id: 'sette-giorni',
    titolo: '7 Giorni',
    descrizione: 'Torna a studiare per 7 giorni consecutivi.',
    emoji: '📅',
    sbloccato: ({ streak }) => streak.giorniConsecutivi >= 7,
  },
  {
    id: 're-dei-segnali',
    titolo: 'Re dei Segnali',
    descrizione: 'Rispondi correttamente a tutte le domande del livello Segnali.',
    emoji: '👑',
    sbloccato: ({ progresso }) => {
      const segnali = progresso.livelli['segnali'];
      const meta = livelli.find((l) => l.id === 'segnali');
      return Boolean(segnali && meta && segnali.domandeCorrette.length >= meta.quizCount);
    },
  },
  {
    id: 'boss-killer',
    titolo: 'Boss Killer',
    descrizione: 'Vinci la tua prima Boss Fight.',
    emoji: '⚔️',
    sbloccato: ({ record }) => record.bossVinte >= 1,
  },
];

export function calcolaBadgeSbloccati(progresso: Progresso, streak: Streak, record: RecordGiochi) {
  const quizCompletatiTotali = Object.values(progresso.livelli).reduce(
    (tot, l) => tot + l.domandeCorrette.length,
    0
  );
  return achievements.map((a) => ({
    ...a,
    ottenuto: a.sbloccato({ progresso, streak, quizCompletatiTotali, record }),
  }));
}
