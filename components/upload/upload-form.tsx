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
import LoadingSkeleton from './loading-skeleton'
import UploadFormInput from './upload-form-input'

// Definimos o schema dentro de um hook para garantir que seja executado apenas no cliente
function useFileValidationSchema() {
  // Este hook só será executado no lado do cliente
  return z.object({
    file: z
      .custom<File>((value) => value instanceof File, {
        message: 'Arquivo inválido',
      })
      .optional()
      .refine(
        (file) => !file || file.size <= 20 * 1024 * 1024,
        'O tamanho do arquivo deve ser menor que 20MB'
      )
      .refine(
        (file) => !file || file.type.startsWith('application/pdf'),
        'O arquivo deve ser um PDF'
      ),
  })
}

export default function UploadForm() {
  const formRef = useRef<HTMLFormElement>(null)
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()
  const schema = useFileValidationSchema() // Usando o hook para obter o schema

  const { startUpload } = useUploadThing('pdfUploader', {
    onClientUploadComplete: () => {
      toast.message('✅ Upload concluído!', {
        description: 'Seu PDF foi enviado com sucesso.',
      })
    },
    onUploadError: (err) => {
      console.error('Error occurred while uploading', err)
      toast.message('❌ Falha no upload!', {
        description:
          err.message || 'Ocorreu um erro inesperado durante o upload.',
      })
    },
    //@ts-ignore
    onUploadBegin: ({ file }) => {
      toast.message('📤 Upload iniciado', {
        description: file?.name
          ? `Enviando ${file.name}...`
          : 'Iniciando upload...',
      })
    },
  })

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    try {
      setIsLoading(true)
      const formData = new FormData(e.currentTarget)
      const file = formData.get('file') as File

      const validatedFields = schema.safeParse({ file })

      if (!validatedFields.success) {
        const errorMessage =
          validatedFields.error.flatten().fieldErrors.file?.[0] ??
          'Arquivo inválido'
        toast.message('⚠️ Arquivo inválido', {
          description: errorMessage,
        })
        setIsLoading(false)
        return
      }

      toast.message('⏳ Processando seu arquivo...', {
        description: 'Isso pode levar alguns segundos...',
      })

      const response = await startUpload([file])

      if (!response || response.length === 0) {
        toast.message('⚠️ Falha no upload', {
          description: 'Algo deu errado. Por favor, tente novamente.',
        })
        setIsLoading(false)
        return
      }

      const uploadedFile = response[0]
      const uploadedFileUrl = uploadedFile.ufsUrl

      if (!uploadedFileUrl) {
        toast.message('⚠️ URL do arquivo ausente', {
          description:
            'O upload foi bem-sucedido, mas a URL do arquivo não foi recebida.',
        })
        setIsLoading(false)
        return
      }

      const summaryResult = await generatePDFSummary([
        {
          serverData: {
            file: {
              url: uploadedFileUrl,
              name: uploadedFile.name || 'Uploaded PDF',
            },
          },
        },
      ])

      if (summaryResult?.success && summaryResult.data) {
        toast.message('📄 Resumo Pronto!', {
          description: summaryResult.message,
        })

        const saveResult = await storePdfSummaryAction({
          summary: summaryResult.data.summary,
          title: summaryResult.data.title,
          fileUrl: uploadedFileUrl,
          fileName: file.name,
        })

        if (saveResult.success) {
          toast.message('✅ Upload completo!', {
            description: 'Redirecionando para o painel...',
          })

          formRef.current?.reset()
          setIsLoading(false)
          router.push(`/summaries/${saveResult.id}`) // Redirect to dashboard after success
          return
        } else {
          toast.message('❌ Falha ao salvar', {
            description: saveResult.message,
          })
          setIsLoading(false)
        }
      } else {
        toast.message('⚠️ Falha na geração do resumo', {
          description:
            summaryResult?.message || 'Não foi possível gerar o resumo.',
        })
      }

      setIsLoading(false)
    } catch (error: any) {
      setIsLoading(false)
      console.error('Unexpected error in form submission:', error)
      toast.message('❌ Erro inesperado', {
        description:
          error?.message || 'Algo deu errado. Por favor, tente novamente.',
      })
    }
  }

  return (
    <div className="flex flex-col gap-8 w-full max-w-2xl mx-auto">
      <UploadFormInput
        ref={formRef}
        onSubmit={handleSubmit}
        isLoading={isLoading}
      />
      {isLoading && (
        <>
          <div className="relative">
            <div
              className="absolute inset-0 flex items-center"
              aria-hidden="true"
            >
              <div
                className="w-full border-t border-gray-200 
      dark:border-gray-800"
              ></div>
              <div className="relative flex justify-center">
                <span
                  className="bg-background px-3 text-muted-foreground 
          text-sm"
                >
                  Processando
                </span>
              </div>
            </div>
          </div>
          <LoadingSkeleton />
        </>
      )}
    </div>
  )
}
