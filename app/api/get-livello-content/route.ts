// Route Handler Next.js (Vercel Functions native). Restituisce il contenuto
// reale di un livello SOLO se il token è valido, applicando i limiti del
// piano (lib/tiers.ts). Il contenuto vive in lib/server/livelli-content.ts,
// mai importato da app/(marketing) o da componenti 'use client': non finisce
// mai nel bundle inviato al browser.

import { NextRequest, NextResponse } from 'next/server';
import { verificaToken } from '@/lib/server/token';
import { getLivelloById } from '@/lib/server/livelli-content';
import { LIMITI_CONTENUTO, puoAccedereASimulazioneFinale } from '@/lib/tiers';

export const runtime = 'nodejs';

export async function GET(req: NextRequest) {
  const token = req.nextUrl.searchParams.get('token');
  const id = req.nextUrl.searchParams.get('id');

  if (!id) {
    return NextResponse.json({ error: 'Parametro "id" mancante' }, { status: 400 });
  }

  const payload = verificaToken(token);
  if (!payload) {
    return NextResponse.json({ error: 'Accesso non valido o scaduto' }, { status: 401 });
  }

  if (id === 'esame' && !puoAccedereASimulazioneFinale(payload.tier)) {
    return NextResponse.json(
      { error: 'upgrade_richiesto', messaggio: 'La Preparazione Esame è inclusa da Premium in su.' },
      { status: 403 }
    );
  }

  const livelloCompleto = getLivelloById(id);
  if (!livelloCompleto) {
    return NextResponse.json({ error: 'Livello non trovato' }, { status: 404 });
  }

  const limiti = LIMITI_CONTENUTO[payload.tier];
  const livello = {
    ...livelloCompleto,
    quiz: limiti.quizPerLivello !== null ? livelloCompleto.quiz.slice(0, limiti.quizPerLivello) : livelloCompleto.quiz,
    flashcard:
      limiti.flashcardPerLivello !== null
        ? livelloCompleto.flashcard.slice(0, limiti.flashcardPerLivello)
        : livelloCompleto.flashcard,
  };

  return NextResponse.json({ livello, tier: payload.tier }, { status: 200, headers: { 'Cache-Control': 'no-store' } });
}
