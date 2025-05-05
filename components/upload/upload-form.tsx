'use client'

import {
  generatePDFSummary,
  storePdfSummaryAction,
} from '@/actions/upload-actions'
import { useUploadThing } from '@/utils/uploadthing'
import { useRouter } from 'next/navigation'
import { useRef, useState } from 'react'
import { toast } from 'sonner'
import { z } from 'zod'
import UploadFormInput from './upload-form-input'

export default function UploadForm() {
  const formRef = useRef<HTMLFormElement>(null)
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()

  const { startUpload, routeConfig } = useUploadThing('pdfUploader', {
    onClientUploadComplete: (response) => {
      console.log('Upload complete:', response)
    },
    onUploadError: (error) => {
      console.error('Upload error:', error)
      toast.error('Ocorreu um erro durante o uploading', {
        description: error.message,
      })
    },
    onUploadBegin: (file) => {
      console.log('Upload started', file)
    },
  })

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    try {
      setIsLoading(true)

      const schema = z.object({
        file: z
          .instanceof(File, { message: 'Arquivo inválido' })
          .refine((file) => file.size <= 20 * 1024 * 1024, {
            message: 'O arquivo deve ter no máximo 20MB',
          })
          .refine((file) => file.type.startsWith('application/pdf'), {
            message: 'O arquivo deve estar no formato PDF',
          }),
      })

      const formData = new FormData(e.currentTarget)
      const file = formData.get('file') as File

      // Validating the fields
      const validatedFields = schema.safeParse({ file })

      console.log(validatedFields)

      if (!validatedFields.success) {
        toast.error('❌ Algo de errado aconteceu!', {
          description:
            validatedFields.error.flatten().fieldErrors.file?.[0] ??
            'Arquivo inválido',
        })

        setIsLoading(false)
        return
      }

      toast('✈️ Uploading PDF...', {
        description: 'Estamos fazendo upload do seu PDF!',
      })

      // upload the file to uploadThing
      const resp = await startUpload([file])

      if (!resp) {
        toast.error('❌ Algo de errado aconteceu!', {
          description: 'Por favor, use um arquivo diferente.',
        })

        setIsLoading(false)
        return
      }

      toast('📄 Processando PDF...', {
        description: 'Só um instante! Nossa IA está lendo o seu documento! ✨',
      })

      // parse the pdf using lang chain
      const result = await generatePDFSummary(resp)

      const { data = null, message = null } = result || {}

      if (data) {
        let storeResult: any
        toast('💾 Salvando PDF...', {
          description: 'Mais um momento! Estamos salvando seu resumo! ⬇️',
        })

        if (data.summary) {
          // save the summary to the database
          storeResult = await storePdfSummaryAction({
            fileUrl: resp[0].serverData.file.url,
            summary: data.summary,
            title: data.title,
            fileName: file.name,
          })

          toast.success('😃 Resumo gerado!', {
            description: 'Seu resumo foi gerado e salvo com sucesso! 💾',
          })

          formRef.current?.reset()

          router.push(`/summaries/${storeResult.id}`)
        }
      }

      // summarize the pdf using AI
      // save the summary to the database
      // redirect to the [id] summary page
    } catch (error) {
      setIsLoading(false)
      console.error('An error occurred during file upload:', error)
      formRef.current?.reset()
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="flex flex-col gap-8 w-full max-w-2xl mx-auto">
      <UploadFormInput
        isLoading={isLoading}
        ref={formRef}
        onSubmit={handleSubmit}
      />
    </div>
  )
}
