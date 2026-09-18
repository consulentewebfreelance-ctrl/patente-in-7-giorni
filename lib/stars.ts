/** Calcola le stelle (1-3) di un livello in base a precisione ed errori/tempo (Fase 3). */
export function calcolaStelle(corrette: number, totale: number, secondiImpiegati: number, tempoStimatoMinuti: number): 1 | 2 | 3 {
  if (totale === 0) return 1;
  const precisione = corrette / totale;
  const entroTempo = secondiImpiegati <= tempoStimatoMinuti * 60 * 1.5; // margine ragionevole sul tempo stimato
  if (precisione === 1 && entroTempo) return 3;
  if (precisione >= 0.7) return 2;
  return 1;
}
