import { Button } from '@/components/ui/button'
import { ArrowRight, Sparkle } from 'lucide-react'
import Link from 'next/link'
import BgGradient from './bg-gradient'

export default function UpgradeRequired() {
  return (
    <div className="relative min-h-[50vh] flex items-center justify-center">
      <BgGradient className="from-rose-400 via-rose-3000 to-orange-200" />

      <div
        className="container px-8 py-16 flex flex-col items-center 
      justify-center gap-8 text-center"
      >
        <div className="flex flex-col items-center gap-2 text-rose-500">
          <Sparkle className="w-6 h-6" />
          <span className="text-sm font-medium uppercase tracking-wider">
            Recurso Premium
          </span>
        </div>

        <h1
          className="text-4xl font-bold tracking-tight bg-gradient-to-r 
        from-gray-900 to-gray-600 text-transparent bg-clip-text"
        >
          Assine seu plano agora!
        </h1>

        <p
          className="text-lg leading-8 text-gray-600 border-2 
        border-rose-200 bg-white/50 backdrop-blur-xs rounded-2xl p-6 
        border-dashed max-w-xl"
        >
          Faça upgrade para o plano que melhor se adapte a você para ter acesso
          este recurso 💖
        </p>

        <Button
          className="bg-gradient-to-r from-rose-500 to-rose-700 
        hover:from-rose-600 hover:to-rose-800 text-white"
        >
          <Link href="/#pricing" className="flex gap-2 items-center">
            Ver Planos e Preços <ArrowRight className="w-4 h-4" />
          </Link>
        </Button>
      </div>
    </div>
  )
}
