'use client';
import { useEffect } from 'react';
import Link from 'next/link';
import { CheckCircle2 } from 'lucide-react';
export default function SuccessoPage(){
 useEffect(()=>{localStorage.setItem('patente7_access','premium');},[]);
 return (<main className="min-h-screen flex items-center justify-center p-6"><div className="max-w-md text-center"><CheckCircle2 className="mx-auto mb-4 h-16 w-16 text-green-500"/><h1 className="text-3xl font-bold mb-3">Pagamento confermato!</h1><p className="mb-6">Il tuo accesso Premium è stato sbloccato.</p><Link href="/dashboard" className="rounded-xl bg-blue-600 px-6 py-3 text-white inline-block">Vai alla Dashboard</Link></div></main>);
}
