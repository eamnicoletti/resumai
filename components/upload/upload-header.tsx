import { itemVariants } from '@/utils/constants'
import { Sparkles } from 'lucide-react'
import { MotionDiv } from '../common/motion-warpper'
import { Badge } from '../ui/badge'

export default function UploadHeader() {
  return (
    <div
      className="flex flex-col items-center justify-center gap-6 
        text-center "
    >
      <MotionDiv
        variants={itemVariants}
        className="relative p-[1px] overflow-hidden rounded-full 
          bg-linear-to-r  from-rose-200 via-rose-500 to-rose-800
          animate-gradient-x group"
      >
        <Badge
          variant={'secondary'}
          className="relative px-6 py-2 text-base font-medium bg-white 
            rounded-full group-hover:bg-gray-50 transition-colors group 
            [&>svg]:!size-5.5"
        >
          <Sparkles className="h-6 w-6 mr-2 text-rose-600 animate-pulse" />
          <p className="text-base">Criação de conteúdo com Tecnologia de IA</p>
        </Badge>
      </MotionDiv>
      <MotionDiv
        variants={itemVariants}
        className="capitalize text-3xl font-bold tracking-tight 
          text-gray-900 sm:text-4xl"
      >
        Comece com o upload de{' '}
        <span className="relative inline-block">
          <span className="relative z-10 px-2">seus PDF's</span>
          <span
            className="absolute inset-0 bg-rose-200/50 -rotate-2 
          rounded-2xl  transform -skew-y-1"
            aria-hidden="true"
          ></span>
        </span>
      </MotionDiv>
      <MotionDiv
        variants={itemVariants}
        className="mt-2 text-lg leading-8 text-gray-600 max-w-2xl
            text-center"
      >
        <p>
          Faça o upload do seu documento e deixe nossa IA fazer a mágica! ✨
        </p>
      </MotionDiv>
    </div>
  )
}
