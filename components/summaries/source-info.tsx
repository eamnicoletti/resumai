import { Button } from '@/components/ui/button'
import { ExternalLink, FileText } from 'lucide-react'
import DownloadSummaryButton from './download-summary'

export default function SourceInfo({
  fileName,
  originalFileUrl,
  title,
  summaryText,
  createdAt,
}: {
  fileName: string
  originalFileUrl: string
  title: string
  summaryText: string
  createdAt: string
}) {
  return (
    <div className="flex flex-col lg:flex-row items-center justify-between gap-4 text-sm text-muted-foreground">
      <div className="flex items-center justify-center">
        <FileText className="h-4 w-4 text-rose-400" />
        <span>Fonte: {fileName}</span>
      </div>
      <div className="flex gap-2">
        <Button
          variant="ghost"
          size="sm"
          className="h-8 px-3 text-rose-600 hover:text-rose-700 hover:bg-rose-50"
          asChild
        >
          <a href={originalFileUrl} target="_blank" rel="noopener noreferrer">
            <ExternalLink className="h-4 w-4 mr-1" />
            <span>Visualizar PDF</span>
          </a>
        </Button>
        <DownloadSummaryButton
          title={title}
          summaryText={summaryText}
          fileName={fileName}
          createdAt={createdAt}
        />
      </div>
    </div>
  )
}
