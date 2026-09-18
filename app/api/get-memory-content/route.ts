// Route Handler Next.js — contenuto per il Memory Game. Le coppie fronte/retro
// vengono da lib/server/livelli-content.ts (mai esposto al client), filtrate
// per piano: Starter vede solo le "categorie iniziali" (lib/tiers.ts).

import { NextRequest, NextResponse } from 'next/server';
import { verificaToken } from '@/lib/server/token';
import { getLivelloById, livelli as livelliProtetti } from '@/lib/server/livelli-content';
import { LIMITI_CONTENUTO, livelliMemoryDisponibili } from '@/lib/tiers';

export const runtime = 'nodejs';

export async function GET(req: NextRequest) {
  const token = req.nextUrl.searchParams.get('token');
  const id = req.nextUrl.searchParams.get('id');

  const payload = verificaToken(token);
  if (!payload) {
    return NextResponse.json({ error: 'Accesso non valido o scaduto' }, { status: 401 });
  }

  const tuttiGliId = livelliProtetti.map((l) => l.id);
  const disponibili = livelliMemoryDisponibili(payload.tier, tuttiGliId);

  if (!id) {
    // Elenco dei livelli giocabili (solo id + titolo, non il contenuto).
    const elenco = livelliProtetti.filter((l) => disponibili.includes(l.id)).map((l) => ({ id: l.id, titolo: l.titolo }));
    return NextResponse.json({ livelli: elenco }, { status: 200, headers: { 'Cache-Control': 'no-store' } });
  }

  if (!disponibili.includes(id)) {
    return NextResponse.json({ error: 'upgrade_richiesto', messaggio: 'Questa categoria è inclusa da Premium in su.' }, { status: 403 });
  }

  const livello = getLivelloById(id);
  if (!livello) {
    return NextResponse.json({ error: 'Livello non trovato' }, { status: 404 });
  }

  const limite = LIMITI_CONTENUTO[payload.tier].flashcardPerLivello;
  const coppie = (limite !== null ? livello.flashcard.slice(0, limite) : livello.flashcard).map((f, i) => ({
    id: `${livello.id}-${i}`,
    fronte: f.fronte,
    retro: f.retro,
  }));

  return NextResponse.json({ titolo: livello.titolo, coppie }, { status: 200, headers: { 'Cache-Control': 'no-store' } });
}
