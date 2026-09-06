type ClassValue = string | number | null | undefined | false | ClassValue[];

/**
 * Piccola utility per unire classi condizionali senza dipendenze esterne
 * (equivalente minimale di clsx).
 */
export function cn(...inputs: ClassValue[]): string {
  const out: string[] = [];
  for (const input of inputs) {
    if (!input) continue;
    if (Array.isArray(input)) {
      const nested = cn(...input);
      if (nested) out.push(nested);
    } else {
      out.push(String(input));
    }
  }
  return out.join(' ');
}
