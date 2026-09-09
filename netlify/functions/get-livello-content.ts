// Restituisce il contenuto reale di un livello (lezione, trucco mnemonico,
// errori frequenti, flashcard, quiz) SOLO se il token di accesso è valido.
// Il contenuto vive in _data/livelli-content.ts, mai importato da app/ o
// components/: non finisce mai nel bundle statico del sito.

import type { Handler } from '@netlify/functions';
import { verificaToken } from './_shared/token';
import { getLivelloById } from './_data/livelli-content';

function json(statusCode: number, body: unknown) {
  return {
    statusCode,
    headers: { 'Content-Type': 'application/json', 'Cache-Control': 'no-store' },
    body: JSON.stringify(body),
  };
}

export const handler: Handler = async (event) => {
  const token = event.queryStringParameters?.token;
  const id = event.queryStringParameters?.id;

  if (!id) {
    return json(400, { error: 'Parametro "id" mancante' });
  }

  const payload = verificaToken(token);
  if (!payload) {
    return json(401, { error: 'Accesso non valido o scaduto' });
  }

  const livello = getLivelloById(id);
  if (!livello) {
    return json(404, { error: 'Livello non trovato' });
  }

  return json(200, { livello });
};
