// Route Handler Next.js (Vercel Functions native, zero configurazione).
// Verifica un acquisto Stripe, ne ricava il PIANO dal price id acquistato, e
// se valido rilascia un token di accesso firmato (30 giorni, rinnovo
// automatico lato client). Vedi README, sezione "Sicurezza e piani".

import { NextRequest, NextResponse } from 'next/server';
import Stripe from 'stripe';
import { firmaToken } from '@/lib/server/token';
import { tierDaPriceId } from '@/lib/server/tier-map';

export const runtime = 'nodejs';
const DURATA_TOKEN_MS = 30 * 24 * 60 * 60 * 1000; // 30 giorni

export async function GET(req: NextRequest) {
  const sessionId = req.nextUrl.searchParams.get('session_id');

  if (!sessionId || !sessionId.startsWith('cs_')) {
    return NextResponse.json({ valid: false, error: 'session_id mancante o non valido' }, { status: 400 });
  }

  const stripeSecretKey = process.env.STRIPE_SECRET_KEY;
  if (!stripeSecretKey) {
    return NextResponse.json({ valid: false, error: 'STRIPE_SECRET_KEY non configurata sul server' }, { status: 500 });
  }

  const stripe = new Stripe(stripeSecretKey);

  try {
    const session = await stripe.checkout.sessions.retrieve(sessionId, {
      expand: ['line_items'],
    });
    const pagato = session.payment_status === 'paid' || session.status === 'complete';
    if (!pagato) {
      return NextResponse.json({ valid: false }, { status: 200 });
    }

    const priceId = session.line_items?.data?.[0]?.price?.id;
    const tier = tierDaPriceId(priceId);
    if (!tier) {
      return NextResponse.json(
        { valid: false, error: 'Prodotto non riconosciuto: controlla la mappa dei prezzi in lib/server/tier-map.ts' },
        { status: 200 }
      );
    }

    const token = firmaToken({ sid: session.id, tier, exp: Date.now() + DURATA_TOKEN_MS });
    return NextResponse.json({ valid: true, token, tier }, { status: 200, headers: { 'Cache-Control': 'no-store' } });
  } catch {
    return NextResponse.json({ valid: false, error: 'Sessione di pagamento non trovata' }, { status: 404 });
  }
}
