// Verifica un acquisto Stripe e, se valido, rilascia un token di accesso
// firmato (30 giorni). Chiamata da /successo dopo il redirect da Stripe, e
// automaticamente ogni tot ore dal client per rinnovare il token.
//
// Richiede la variabile d'ambiente STRIPE_SECRET_KEY (chiave segreta, MAI
// quella pubblicabile) e ACCESS_TOKEN_SECRET (una stringa a caso, lunga,
// generata una volta sola). Vedi README, sezione "Sicurezza dashboard".

import type { Handler } from '@netlify/functions';
import Stripe from 'stripe';
import { firmaToken } from './_shared/token';

const DURATA_TOKEN_MS = 30 * 24 * 60 * 60 * 1000; // 30 giorni

function json(statusCode: number, body: unknown) {
  return {
    statusCode,
    headers: { 'Content-Type': 'application/json', 'Cache-Control': 'no-store' },
    body: JSON.stringify(body),
  };
}

export const handler: Handler = async (event) => {
  const sessionId = event.queryStringParameters?.session_id;

  if (!sessionId || !sessionId.startsWith('cs_')) {
    return json(400, { valid: false, error: 'session_id mancante o non valido' });
  }

  const stripeSecretKey = process.env.STRIPE_SECRET_KEY;
  if (!stripeSecretKey) {
    return json(500, { valid: false, error: 'STRIPE_SECRET_KEY non configurata sul server' });
  }

  const stripe = new Stripe(stripeSecretKey);

  try {
    const session = await stripe.checkout.sessions.retrieve(sessionId);
    const pagato = session.payment_status === 'paid' || session.status === 'complete';

    if (!pagato) {
      return json(200, { valid: false });
    }

    const token = firmaToken({ sid: session.id, exp: Date.now() + DURATA_TOKEN_MS });
    return json(200, { valid: true, token });
  } catch {
    return json(404, { valid: false, error: 'Sessione di pagamento non trovata' });
  }
};
