// Route Handler Next.js — pool di domande per la Speed Challenge. Pesca da
// TUTTI i livelli, rispettando lo stesso limite quiz-per-livello del piano
// (lib/tiers.ts): più il piano è alto, più ampio il pool da cui si pesca.
// Il pool cresce automaticamente man mano che si aggiungono domande in
// lib/server/livelli-content.ts, nessun codice da toccare.

import { NextRequest, NextResponse } from 'next/server';
import { verificaToken } from '@/lib/server/token';
import { livelli as livelliProtetti } from '@/lib/server/livelli-content';
import { LIMITI_CONTENUTO } from '@/lib/tiers';

export const runtime = 'nodejs';
const NUMERO_DOMANDE_SESSIONE = 20;

function mescola<T>(arr: T[]): T[] {
  const copia = [...arr];
  for (let i = copia.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copia[i], copia[j]] = [copia[j], copia[i]];
  }
  return copia;
}

export async function GET(req: NextRequest) {
  const token = req.nextUrl.searchParams.get('token');
  const livelloId = req.nextUrl.searchParams.get('livelloId');
  const payload = verificaToken(token);
  if (!payload) {
    return NextResponse.json({ error: 'Accesso non valido o scaduto' }, { status: 401 });
  }

  const limite = LIMITI_CONTENUTO[payload.tier].quizPerLivello;
  const sorgente = livelloId ? livelliProtetti.filter((l) => l.id === livelloId) : livelliProtetti;
  const pool = sorgente.flatMap((l) => {
    const domande = limite !== null ? l.quiz.slice(0, limite) : l.quiz;
    return domande.map((d, i) => ({ ...d, id: `${l.id}-${i}` }));
  });

  const mescolato = mescola(pool);
  const domande = mescolato.slice(0, Math.min(NUMERO_DOMANDE_SESSIONE, mescolato.length));

  return NextResponse.json(
    { domande, totaleDisponibili: pool.length },
    { status: 200, headers: { 'Cache-Control': 'no-store' } }
  );
}
