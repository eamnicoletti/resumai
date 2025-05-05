'use server'

import { getDbConnection } from '@/lib/db'
import { generateSummaryFromGemini } from '@/lib/geminiai'
import { fetchAndExtractPdfText } from '@/lib/langchain'
import { generateSummaryFromOpenAI } from '@/lib/openai'
import { formatFileNameAsTitle } from '@/utils/format-utils'
import { auth } from '@clerk/nextjs/server'
import { revalidatePath } from 'next/cache'

interface PdfSummaryType {
  userId?: string
  fileUrl: string
  summary: string
  title: string
  fileName: string
}

export async function generatePDFSummary(
  uploadResponse: [
    {
      serverData: {
        userId: string
        file: {
          url: string
          name: string
        }
      }
    }
  ]
) {
  if (!uploadResponse) {
    return {
      success: false,
      message: 'Falha ao fazer upload',
      data: null,
    }
  }

  const {
    serverData: {
      userId,
      file: { url: pdfUrl, name: fileName },
    },
  } = uploadResponse[0]

  if (!pdfUrl) {
    return {
      success: false,
      message: 'Falha ao fazer upload',
      data: null,
    }
  }

  try {
    const pdfText = await fetchAndExtractPdfText(pdfUrl)
    console.log({ pdfText })

    let summary
    try {
      summary = await generateSummaryFromOpenAI(pdfText)
      console.log({ summary })
    } catch (error) {
      console.error('Error generating summary:', error)
      // call Gemini
      if (error instanceof Error && error.message === 'RATE_LIMIT_EXCEEDED') {
        try {
          summary = await generateSummaryFromGemini(pdfText)
        } catch (geminiError) {
          console.error(
            'Gemini API failed after OpenAI quote exceeded',
            geminiError
          )
          throw new Error(
            'Erro ao gerar resumo com os provedores de IA disponíveis'
          )
        }
      }
    }

    if (!summary) {
      return {
        success: false,
        message: 'Falha ao gerar o resumo',
        data: null,
      }
    }

    const formattedFileName = formatFileNameAsTitle(fileName)

    return {
      success: true,
      message: 'Resumo gerado com sucesso',
      data: {
        title: formattedFileName,
        summary,
      },
    }
  } catch (err) {
    return {
      success: false,
      message: 'Falha ao fazer upload',
      data: null,
    }
  }
}

async function savePdfSummary({
  userId,
  fileUrl,
  summary,
  title,
  fileName,
}: PdfSummaryType) {
  // sql inserting pdf summary
  try {
    const sql = await getDbConnection()
    const result = await sql`
      INSERT INTO pdf_summaries (
        user_id,
        original_file_url,
        summary_text,
        title,
        file_name
      ) VALUES (
        ${userId},
        ${fileUrl},
        ${summary},
        ${title},
        ${fileName}
      ) RETURNING id;`

    return result[0].id
  } catch (error) {
    console.error('Error saving PDF summary', error)
    throw error
  }
}

export async function storePdfSummaryAction({
  fileUrl,
  summary,
  title,
  fileName,
}: PdfSummaryType) {
  // user is logged in and has a userId
  // savePdfSummary
  // savePdfSummary()

  let savedSummary: any
  try {
    const { userId } = await auth()
    if (!userId) {
      return {
        success: false,
        message: 'Usuário não encontrado',
      }
    }

    savedSummary = await savePdfSummary({
      userId,
      fileUrl,
      summary,
      title,
      fileName,
    })

    if (!savedSummary) {
      return {
        success: false,
        message: 'Falha ao salvar o resumo! Por favor, tente novamente...',
      }
    }
  } catch (error) {
    return {
      success: false,
      message:
        error instanceof Error ? error.message : 'Falha ao salvar o resumo',
    }
  }

  // Revalidate our cache
  revalidatePath(`/summaries/${savedSummary.id}`)

  return {
    success: true,
    message: 'Resumo salvo com sucesso!',
    data: {
      id: savedSummary.id,
    },
  }
}
