import { Brain } from 'lucide-react';

export function MnemonicTrick({ testo }: { testo: string }) {
  return (
    <div className="rounded-lg bg-nebbia p-5">
      <div className="flex items-center gap-2 text-ardesia">
        <Brain className="h-4 w-4" strokeWidth={2} />
        <span className="text-[13px] font-medium">Trucco mnemonico</span>
      </div>
      <p className="mt-2 text-[15px] font-medium text-asfalto">{testo}</p>
    </div>
  );
}
