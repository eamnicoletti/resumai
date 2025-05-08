import BgGradient from '@/components/common/bg-gradient'
import { MotionDiv } from '@/components/common/motion-warpper'
import SourceInfo from '@/components/summaries/source-info'
import SummaryHeader from '@/components/summaries/summary-header'
import { SummaryViewer } from '@/components/summaries/summary-viewer'
import { getSummaryById } from '@/lib/summaries'
import { FileText } from 'lucide-react'
import { notFound } from 'next/navigation'
// prettier-ignore
export default async function SummaryPage ( // prettier-ignore-file

props:   {
    params: Promise<{ id: string }>;
      }
)
{
  const params = await props.params;
  const id = params.id;
  const summary = await getSummaryById(id);

  if (!summary) {
    return notFound();
  }

  const {
    title,
    summary_text,
    word_count,
    file_name,
    created_at,
  } = summary;
  const readingTime = Math.ceil((word_count || 0) / 200);

  return (
    <div className="relative isolate min-h-screen bg-gradient-to-b 
    from-rose-50/40 to-white">
      <BgGradient className="from-rose-400 via-rose-300 to-orange-200" />
      <div className="container mx-auto flex flex-col gap-4">
        <div className="px-4 sm:px-6 lg:px-8 py-6 sm:py-12">
          <MotionDiv 
          initial={{opacity: 0, y:20}}
          animate={{opacity: 1}}
          transition={{duration: 0.5}}
          className="flex flex-col">
            <SummaryHeader
              title={title}
              createdAt={created_at}
              readingTime={readingTime}
            /> 
         

            {file_name && (
              <SourceInfo
                fileName={file_name}
                originalFileUrl={summary.original_file_url}
                title={title}
                summaryText={summary_text}
                createdAt={created_at}
              />
            )}

            <MotionDiv 
          initial={{opacity: 0, y:20}}
          animate={{opacity: 1}}
          transition={{duration: 0.5}}className="relative mt-4 sm:mt-8 lg:mt-16 max-w-4xl mx-auto">
              <div className="relative bg-white/80 backdrop-blur-md 
              rounded-2xl sm:rounded-3xl shadow-xl border border-rose-100/30 
              transition-all duration-300 hover:shadow-2xl hover:bg-white/90">
                {/* Gradient Background Overlay */}
                <div className="absolute inset-0 bg-gradient-to-br 
                from-rose-50/50 via-orange-50/30 to-transparent opacity-50 
                rounded-2xl sm:rounded-3xl pointer-events-none z-0" />

                {/* Word Count Badge */}
                <div className="absolute top-4 right-4 z-10">
                  <div className="flex items-center gap-2 text-xs sm:text-sm 
                  text-muted-foreground bg-white/90 px-3 py-1.5 rounded-full 
                  shadow-md">
                    <FileText className="h-4 w-4 text-rose-400" />
                    <span>{word_count?.toLocaleString()} words</span>
                  </div>
                </div>

                {/* Summary Content */}
                <div className="relative z-10 pt-16 px-6 sm:px-8 lg:px-10 pb-6">
                  <SummaryViewer summary={summary_text} />
                </div>
              </div>
            </MotionDiv>
            </MotionDiv>
        </div>
      </div>
    </div>
  );
}
