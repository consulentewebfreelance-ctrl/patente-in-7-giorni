import { livelli } from './livelli-data';
import type { Progresso } from './xp';
import type { Streak } from './streak';

export type Achievement = {
  id: string;
  titolo: string;
  descrizione: string;
  emoji: string;
  sbloccato: (ctx: { progresso: Progresso; streak: Streak; quizCompletatiTotali: number }) => boolean;
};

// Badge derivati sempre dallo stato esistente (XP, livelli, streak):
// nessun dato aggiuntivo da salvare, quindi nessun rischio di disallineamento.
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
];

export function calcolaBadgeSbloccati(progresso: Progresso, streak: Streak) {
  const quizCompletatiTotali = Object.values(progresso.livelli).reduce(
    (tot, l) => tot + l.domandeCorrette.length,
    0
  );
  return achievements.map((a) => ({
    ...a,
    ottenuto: a.sbloccato({ progresso, streak, quizCompletatiTotali }),
  }));
}
