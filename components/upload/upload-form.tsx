'use client'

import { z } from 'zod'
import UploadFormInput from './upload-form-input'

export default function UploadForm() {
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

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

    console.log('Form submitted')
    const formData = new FormData(e.currentTarget)
    const file = formData.get('file') as File

    // Validating the fields
    const validatedFields = schema.safeParse({ file })

    console.log(validatedFields)

    if (!validatedFields.success) {
      console.log(
        validatedFields.error.flatten().fieldErrors.file?.[0] ??
          'Arquivo inválido'
      )
      return
    }
  }

  return (
    <div className="flex flex-col gap-8 w-full max-w-2xl mx-auto">
      <UploadFormInput onSubmit={handleSubmit} />
    </div>
  )
}
