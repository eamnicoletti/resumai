import { ArrowRight, Sparkles } from 'lucide-react'
import Link from 'next/link'
import { Badge } from '../ui/badge'
import { Button } from '../ui/button'

export default function HeroSection() {
  return (
    <section
      className="relative mx-auto flex flex-col z-0 items-center 
    justify-center py-16 sm:py-20 lg:pb-28 transition-all animate-in lg:px-12 
    max-w-7xl"
    >
      <div className="flex flex-col items-center justify-center w-full">
        <div className="flex justify-center w-full">
          <div
            className="relative p-[1px] overflow-hidden rounded-full 
          bg-linear-to-r from-rose-200 via-rose-500 to-rose-800
          animate-gradient-x group"
          >
            <Badge
              variant={'secondary'}
              className="relative px-6 py-2 text-base font-medium 
            bg-white rounded-full hover:bg-rose-400 
            transition-colors duration-200 group [&>svg]:!size-4"
            >
              <Sparkles
                className="h-6 w-6 mr-2 text-rose-600 group-hover:text-white 
                  animate-pulse scale-150 transform transition-colors 
                  duration-200"
              />
              <p
                className="text-base text-rose-600 group-hover:text-white 
              transition-colors duration-200"
              >
                Powered by AI
              </p>
            </Badge>
          </div>
        </div>
        <h1 className="font-bold py-6 text-center">
          Seus PDFs{' '}
          <span className="relative inline-block">
            <span className="relative z-10 px-2">resumidos</span>
            <span
              className="absolute inset-0 bg-rose-200/50 -rotate-2 
          rounded-lg  transform -skew-y-1"
              aria-hidden="true"
            ></span>
          </span>{' '}
          em segundos
        </h1>
        <h2
          className="text-lg sm:text-xl lg:text-2xl text-center px-4 
        lg:px-0 lg:max-w-4xl"
        >
          Transforme documentos em resumos consistentes.
        </h2>
        <div className="flex justify-center mt-6">
          <Button
            variant={'link'}
            className="text-white mt-6 text-base 
          sm:text-lg lg:text-xl rounded-full px-8 sm:px-10 lg:px-12 py-6 sm:py-7 
          lg:py-8 lg:mt-12 bg-linear-to-r from-slate-900 to-rose-500 
          hover:from-rose-500 hover:to-slate-900 hover:no-underline 
          font-bold shadow-lg transition-all duration-300"
          >
            <Link href={'/#pricing'} className="flex gap-2 items-center">
              <span>Resuma agora</span>
              <ArrowRight className='"animate-pulse' />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  )
}
