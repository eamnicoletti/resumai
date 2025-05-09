import { ArrowLeft } from 'lucide-react'
import Link from 'next/link'

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[70vh] px-4 text-center">
      <div className="space-y-6 max-w-md">
        <h1 className="text-6xl font-bold text-primary">404</h1>

        <h2 className="text-2xl font-semibold">Página Não Encontrada</h2>

        <div className="h-1 w-20 bg-primary mx-auto rounded-full"></div>

        <p className="text-muted-foreground text-lg">
          Desculpe, não conseguimos encontrar a página que você está procurando.
        </p>

        <Link
          href="/"
          className="inline-flex items-center gap-2 bg-primary hover:bg-primary/90 text-primary-foreground px-6 py-3 rounded-md font-medium transition-colors duration-200"
        >
          <ArrowLeft size={18} />
          Voltar para a Home
        </Link>
      </div>
    </div>
  )
}
