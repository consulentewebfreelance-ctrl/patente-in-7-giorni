'use client';

import { useEffect } from 'react';
import { X } from 'lucide-react';

type ModalProps = {
  aperto: boolean;
  onChiudi: () => void;
  children: React.ReactNode;
  titolo?: string;
};

export function Modal({ aperto, onChiudi, children, titolo }: ModalProps) {
  useEffect(() => {
    if (!aperto) return;
    const onEsc = (e: KeyboardEvent) => e.key === 'Escape' && onChiudi();
    window.addEventListener('keydown', onEsc);
    document.body.style.overflow = 'hidden';
    return () => {
      window.removeEventListener('keydown', onEsc);
      document.body.style.overflow = '';
    };
  }, [aperto, onChiudi]);

  if (!aperto) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-end justify-center bg-asfalto/60 backdrop-blur-sm animate-[fadeIn_200ms_ease-out] md:items-center"
      onClick={onChiudi}
      role="dialog"
      aria-modal="true"
      aria-labelledby={titolo ? 'modal-titolo' : undefined}
      aria-label={titolo ? undefined : 'Finestra'}
    >
      <div
        className="w-full max-w-[480px] animate-slide-up rounded-lg bg-segnaletica p-6 shadow-lg md:animate-none md:scale-100"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="mb-4 flex items-center justify-between">
          {titolo && (
            <h3 id="modal-titolo" className="font-display text-[20px] font-bold">
              {titolo}
            </h3>
          )}
          <button
            onClick={onChiudi}
            aria-label="Chiudi"
            className="ml-auto flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-full hover:bg-nebbia focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-segnale"
          >
            <X className="h-5 w-5" />
          </button>
        </div>
        {children}
      </div>
    </div>
  );
}
