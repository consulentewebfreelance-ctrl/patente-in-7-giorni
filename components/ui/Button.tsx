'use client';

import { ButtonHTMLAttributes, forwardRef } from 'react';
import Link from 'next/link';
import { cn } from '@/lib/utils';

type Variante = 'primario' | 'secondario' | 'successo';

type PropsComuni = {
  variante?: Variante;
  className?: string;
  fullWidth?: boolean;
  children: React.ReactNode;
};

const stiliBase =
  'inline-flex items-center justify-center h-[52px] px-7 rounded-md font-sans font-extrabold text-[16px] tracking-[0.2px] transition-all duration-200 [transition-timing-function:cubic-bezier(0.22,1,0.36,1)] active:scale-[0.98] disabled:opacity-40 disabled:pointer-events-none focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-segnale';

const stiliVariante: Record<Variante, string> = {
  primario: 'bg-asfalto text-segnaletica hover:bg-[#1c1c1f] hover:shadow-md',
  secondario: 'bg-transparent text-asfalto border-[1.5px] border-asfalto hover:bg-nebbia',
  successo: 'bg-superato text-segnaletica hover:brightness-95 hover:shadow-md',
};

type ButtonProps = PropsComuni & ButtonHTMLAttributes<HTMLButtonElement>;

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ variante = 'primario', className, fullWidth, children, ...rest }, ref) => (
    <button
      ref={ref}
      className={cn(stiliBase, stiliVariante[variante], fullWidth && 'w-full', className)}
      {...rest}
    >
      {children}
    </button>
  )
);
Button.displayName = 'Button';

type ButtonLinkProps = PropsComuni & {
  href: string;
  target?: string;
  rel?: string;
};

/** Stessa identità visiva del Button, ma per link (es. CTA verso pagina prodotto). */
export function ButtonLink({ variante = 'primario', className, fullWidth, children, href, ...rest }: ButtonLinkProps) {
  return (
    <Link
      href={href}
      className={cn(stiliBase, stiliVariante[variante], fullWidth && 'w-full', className)}
      {...rest}
    >
      {children}
    </Link>
  );
}
