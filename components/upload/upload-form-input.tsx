'use client'

import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import { Loader2 } from 'lucide-react'
import { forwardRef } from 'react'
import { Input } from '../ui/input'

interface UploadFormInputProps {
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void
  isLoading: boolean
}

const UploadFormInput = forwardRef<HTMLFormElement, UploadFormInputProps>(
  ({ onSubmit, isLoading }, ref) => {
    return (
      <div>
        <div className="flex items-center justify-center w-full py-5">
          <div className="h-px bg-gray-300 flex-grow"></div>
          <span className="px-4 text-gray-400 font-medium">Upload de PDF</span>
          <div className="h-px bg-gray-300 flex-grow"></div>
        </div>
        <form ref={ref} className="flex flex-col gap-6" onSubmit={onSubmit}>
          <div className="flex flex-col items-stretch gap-1.5">
            <div className="flex items-center gap-1.5">
              <Input
                id="file"
                type="file"
                name="file"
                accept="application/pdf"
                required
                className={cn(
                  'flex-grow',
                  isLoading && 'opacity-50 cursor-not-allowed'
                )}
                disabled={isLoading}
              />
              <Button disabled={isLoading}>
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Processando...
                  </>
                ) : (
                  'Enviar PDF'
                )}
              </Button>
            </div>
            <p className="text-xs text-slate-400 text-right mr-28">
              Tamanho máximo: 20MB
            </p>
          </div>
        </form>
      </div>
    )
  }
)

UploadFormInput.displayName = 'UploadFormInput'

export default UploadFormInput
