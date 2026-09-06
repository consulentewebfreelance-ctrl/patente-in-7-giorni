import { cn } from '@/lib/utils';

type CardProps = {
  children: React.ReactNode;
  className?: string;
  hover?: boolean;
  evidenziata?: boolean;
};

export function Card({ children, className, hover = false, evidenziata = false }: CardProps) {
  return (
    <div
      className={cn(
        'rounded-lg border bg-segnaletica p-6 shadow-md md:p-8',
        evidenziata ? 'border-[1.5px] border-superato' : 'border-asfalto/[0.06]',
        hover &&
          'transition-all duration-[250ms] [transition-timing-function:cubic-bezier(0.22,1,0.36,1)] hover:-translate-y-1 hover:shadow-lg',
        className
      )}
    >
      {children}
    </div>
  );
}
