import { Button } from '@/components/ui/button'
import { Calendar, ChevronLeft, Clock, Sparkle } from 'lucide-react'
import Link from 'next/link'
import { Badge } from '../ui/badge'
export default function SummaryHeader({
  title,
  createdAt,
  readingTime,
}: {
  title: string
  createdAt: string
  readingTime: number
}) {
  return (
    <div className="flex gap-4 mb-4 justify-between">
      <div className="space-y-6">
        <div className="flex flex-wrap gap-4 items-center">
          <Badge
            variant="secondary"
            className="relative px-4 py-1.5 text-sm font-medium 
             bg-white/80 backdrop-blur-xs rounded-full transition-all duration-200 shadow-xs hover:shadow-md"
          >
            <Sparkle />
            Powered by AI
          </Badge>
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Calendar className="h-4 w-4 text-rose-400" />
            {new Date(createdAt).toLocaleDateString('pt-BR', {
              year: 'numeric',
              month: 'long',
              day: 'numeric',
            })}
          </div>
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Clock className="h-4 w-4 text-rose-400" />
            {readingTime} min de leitura
          </div>
        </div>
        <h1 className="text-3xl font-bold lg:text-4xl lg:tracking-tight">
          <span className="bg-linear-to-r from-rose-600 to-orange-600 bg-clip-text text-transparent">
            {title}
          </span>
        </h1>
      </div>
      <div className="self-start">
        <Link href={'/dashboard'}>
          <Button
            variant={'link'}
            size="sm"
            className="group flex items-center gap-1 sm:gap-2 hover:bg-white/80 backdrop-blur-xs rounded-full transition-all duration-200 shadow-xs hover:shadow-md border
           border-rose-100/30 bg-rose-100 px-2 sm:px-3 group hover:no-underline"
          >
            <ChevronLeft className="h-3 w-3 sm:h-4 sm:w-4 text-rose-500 transition-transform group-hover:translate-x-0.5" />
            <span className="text-xs sm:text-sm text-muted-foreground font-medium">
              <span className="hidden sm:inline">Dashboard</span>
            </span>
          </Button>
        </Link>
      </div>
    </div>
  )
}
