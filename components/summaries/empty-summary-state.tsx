import { Button } from '@/components/ui/button'
import { FileText } from 'lucide-react'
import Link from 'next/link'

export default function EmptySummaryState() {
  return (
    <div className="text-center py-12">
      <div className="flex flex-col items-center justify-center gap-4">
        <FileText className="w-16 h-16 text-gray-400" />
        <h2 className="text-xl font-semibold text-gray-700">
          Nenhum resumo encontrado.
        </h2>
        <p className="text-gray-500 max-w-md">
          Envie seu primeiro PDF e veja como nossa Inteligência Artificial pode
          resumir seus documentos em segundos.
        </p>
        <Link href="/upload">
          <Button
            variant={'link'}
            className="mt-4 text-white bg-linear-to-r from-rose-500 to-rose-700 hover:from-rose-600 hover:to-rose-800 hover:no-underline"
          >
            Criar meu primeiro resumo
          </Button>
        </Link>
      </div>
    </div>
  )
}
