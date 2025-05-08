import BgGradient from '@/components/common/bg-gradient'
import {
  MotionDiv,
  MotionH1,
  MotionP,
} from '@/components/common/motion-warpper'
import EmptySummaryState from '@/components/summaries/empty-summary-state'
import SummaryCard from '@/components/summaries/summary-card'
import { Button } from '@/components/ui/button'
import { getSummaries } from '@/lib/summaries'
import { hasReachedUpUploadLimit } from '@/lib/user'
import { itemVariants } from '@/utils/constants'
import { currentUser } from '@clerk/nextjs/server'
import { ArrowRight, Plus } from 'lucide-react'
import Link from 'next/link'
import { redirect } from 'next/navigation'

export default async function Dashboard() {
  const user = await currentUser()
  const userId = user?.id

  if (!userId) return redirect('/sign-in')

  const { hasReachedLimit, uploadLimit } = await hasReachedUpUploadLimit(userId)
  const summaries = await getSummaries(userId)

  return (
    <main className="min-h-screen">
      <BgGradient className="from-emerald-200 via-teal-200 to-cyan-200" />
      <MotionDiv
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="container mx-auto flex flex-col gap-4"
      >
        <div className="px-2 py-12 sm:py-24">
          <div className="flex gap-4 mb-8 justify-between">
            <div className="flex flex-col gap-2">
              <MotionH1
                variants={itemVariants}
                initial="hidden"
                whileInView="visible"
                className="text-4xl font-bold tracking-tight bg-linear-to-r
              from-gray-600 to-gray-900 bg-clip-text text-transparent"
              >
                Meus Resumos
              </MotionH1>
              <MotionP
                variants={itemVariants}
                initial="hidden"
                animate="visible"
                className="text-gray-600"
              >
                Transforme seus PDFs em resumos práticos e objetivos
              </MotionP>
            </div>
            {!hasReachedLimit && (
              <MotionDiv
                variants={itemVariants}
                initial="hidden"
                animate="visible"
                whileHover={{ scale: 1.05 }}
                className="self-start"
              >
                <Button
                  className="bg-linear-to-r from-rose-500 to-rose-700 
                hover:from-rose-600 hover:to-rose-800 hover:scale-105
                transition-all duration-300 group hover:no-underline"
                >
                  <Link href="/upload" className="flex items-center text-white">
                    <Plus className="w-5 h-5 mr-2" />
                    Novo Resumo
                  </Link>
                </Button>
              </MotionDiv>
            )}
          </div>
          {hasReachedLimit && (
            <MotionDiv
              variants={itemVariants}
              initial="hidden"
              animate="visible"
              className="mb-6"
            >
              <div
                className="bg-rose-50 border border-rose-200 rounded-2xl 
            p-4 text-rose-800"
              >
                <p className="text-sm">
                  Você atingiu o limite de {uploadLimit} uploads do plano
                  Básico.{' '}
                  <Link
                    href="/#pricing"
                    className="text-rose-800 underline font-medium 
                underline-offset-4 inline-flex items-center"
                  >
                    {' '}
                    Clique aqui e atualize para o Pro{' '}
                    <ArrowRight className="w-4 h-4 ml-1 inline-block" />
                  </Link>{' '}
                  para uploads ilimitados.
                </p>
              </div>
            </MotionDiv>
          )}
          {summaries.length === 0 ? (
            <EmptySummaryState />
          ) : (
            <div
              className="grid grid-cols-1 gap-4 sm:gap-6 md:grid-cols-2 
          lg:grid-cols-3 sm:px-0"
            >
              {summaries.map((summary, index) => (
                <SummaryCard key={index} summary={summary} />
              ))}
            </div>
          )}
        </div>
      </MotionDiv>
    </main>
  )
}
