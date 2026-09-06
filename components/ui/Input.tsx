import { InputHTMLAttributes, forwardRef } from 'react';
import { cn } from '@/lib/utils';

type InputProps = InputHTMLAttributes<HTMLInputElement> & {
  errore?: string;
  label?: string;
};

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className, errore, label, id, ...rest }, ref) => (
    <div className="flex flex-col gap-1.5">
      {label && (
        <label htmlFor={id} className="text-[13px] font-medium text-ardesia">
          {label}
        </label>
      )}
      <input
        ref={ref}
        id={id}
        className={cn(
          'h-[52px] rounded-sm border-[1.5px] border-nebbia bg-segnaletica px-4 text-[16px] text-asfalto outline-none transition-colors placeholder:text-ardesia/60',
          'focus:border-segnale focus:shadow-sm',
          errore && 'border-erroreLieve',
          className
        )}
        {...rest}
      />
      {errore && <span className="text-[13px] text-erroreLieve">{errore}</span>}
    </div>
  )
);
Input.displayName = 'Input';
