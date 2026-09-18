// SOLO SERVER. Associa ogni Stripe Price ID al piano corrispondente.
//
// Come compilarla: Stripe Dashboard → Product catalog → apri ciascuno dei 3
// prodotti (Starter/Premium/Pro) → copia il "Price ID" (inizia con "price_"),
// NON il Payment Link. Ogni piano deve avere un Price ID diverso, altrimenti
// non è possibile distinguerli dopo il pagamento.
import type { Tier } from '@/lib/tiers';

export const TIER_BY_PRICE_ID: Record<string, Tier> = {
  price_STARTER_DA_SOSTITUIRE: 'starter',
  price_PREMIUM_DA_SOSTITUIRE: 'premium',
  price_PRO_DA_SOSTITUIRE: 'pro',
};

export function tierDaPriceId(priceId: string | undefined | null): Tier | null {
  if (!priceId) return null;
  return TIER_BY_PRICE_ID[priceId] ?? null;
}
