import { Alert } from '@/components/ui/Alert';

export function CommonMistakes({ errori }: { errori: string[] }) {
  return (
    <div className="flex flex-col gap-2">
      <span className="text-[13px] font-medium text-ardesia">Errori frequenti</span>
      {errori.map((errore) => (
        <Alert key={errore} variante="attenzione">
          {errore}
        </Alert>
      ))}
    </div>
  );
}
