// STUB — architettura pronta, non ancora collegata a un provider AI reale.
//
// Per attivare il Tutor AI con l'API di Claude:
//   1. `npm install @anthropic-ai/sdk`
//   2. Aggiungi ANTHROPIC_API_KEY alle variabili d'ambiente (Vercel → Settings → Environment Variables)
//   3. Sostituisci il corpo della funzione qui sotto con una vera chiamata:
//
//      import Anthropic from '@anthropic-ai/sdk';
//      const anthropic = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });
//      const risposta = await anthropic.messages.create({
//        model: 'claude-sonnet-4-6',
//        max_tokens: 1000,
//        messages, // gli stessi messaggi ricevuti dal client, stesso formato
//      });
//
// Il controllo di accesso (token + piano minimo Premium) è già pronto e non va toccato.

import { NextRequest, NextResponse } from 'next/server';
import { verificaToken } from '@/lib/server/token';
import { tierMaggioreOuguale } from '@/lib/tiers';

export const runtime = 'nodejs';

export async function POST(req: NextRequest) {
  let token: string | undefined;
  try {
    const body = await req.json();
    token = body?.token;
  } catch {
    return NextResponse.json({ error: 'Richiesta non valida' }, { status: 400 });
  }

  const payload = verificaToken(token);
  if (!payload) {
    return NextResponse.json({ error: 'accesso_non_valido' }, { status: 401 });
  }
  if (!tierMaggioreOuguale(payload.tier, 'premium')) {
    return NextResponse.json({ error: 'upgrade_richiesto' }, { status: 403 });
  }

  return NextResponse.json(
    { error: 'not_implemented', messaggio: 'Il Tutor AI non è ancora collegato a un motore AI. Torna presto!' },
    { status: 501 }
  );
}
