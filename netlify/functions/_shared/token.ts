// Firma e verifica un token di accesso HMAC-SHA256, senza dipendenze esterne
// (usa il modulo "crypto" nativo di Node). Il segreto vive SOLO lato server
// (variabile d'ambiente ACCESS_TOKEN_SECRET): senza di esso non è possibile
// falsificare un token valido, a differenza di un semplice flag in localStorage.

import { createHmac, timingSafeEqual } from 'crypto';

type Payload = {
  sid: string; // Stripe checkout session id verificata
  exp: number; // scadenza, epoch ms
};

function base64url(input: Buffer | string): string {
  return Buffer.from(input).toString('base64url');
}

function getSecret(): string {
  const secret = process.env.ACCESS_TOKEN_SECRET;
  if (!secret) {
    throw new Error('ACCESS_TOKEN_SECRET non configurata nelle variabili d\'ambiente');
  }
  return secret;
}

export function firmaToken(payload: Payload): string {
  const secret = getSecret();
  const body = base64url(JSON.stringify(payload));
  const firma = createHmac('sha256', secret).update(body).digest('base64url');
  return `${body}.${firma}`;
}

export function verificaToken(token: string | null | undefined): Payload | null {
  if (!token || !token.includes('.')) return null;
  const [body, firma] = token.split('.');
  if (!body || !firma) return null;

  let secret: string;
  try {
    secret = getSecret();
  } catch {
    return null;
  }

  const firmaAttesa = createHmac('sha256', secret).update(body).digest('base64url');
  const a = Buffer.from(firma);
  const b = Buffer.from(firmaAttesa);
  if (a.length !== b.length || !timingSafeEqual(a, b)) return null;

  try {
    const payload = JSON.parse(Buffer.from(body, 'base64url').toString('utf-8')) as Payload;
    if (typeof payload.exp !== 'number' || Date.now() > payload.exp) return null;
    return payload;
  } catch {
    return null;
  }
}
