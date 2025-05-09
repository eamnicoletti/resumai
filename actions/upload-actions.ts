'use server'

import { getDbConnection } from '@/lib/db'
import { generateSummaryFromGemini } from '@/lib/geminiai'
import { fetchAndExtractPdfText } from '@/lib/langchain'
import { generateSummaryFromOpenAI } from '@/lib/openai'
import { auth } from '@clerk/nextjs/server'
import { revalidatePath } from 'next/cache'

interface pdfSummaryType {
  userId?: string
  fileUrl: string
  summary: string
  title: string
  fileName: string
}

export async function generatePdfText(fileUrl: string) {
  if (!fileUrl) {
    return {
      success: false,
      error: 'Não foi possível enviar o arquivo. Por favor, tente novamente.',
      data: null,
    }
  }
  try {
    const pdfText = await fetchAndExtractPdfText(fileUrl)

    if (!pdfText) {
      return {
        success: false,
        error: 'Falha ao buscar e extrair o texto do PDF.',
        data: null,
      }
    }

    return {
      success: true,
      message: 'Texto do PDF gerado com sucesso!',
      data: {
        pdfText,
      },
    }
  } catch (error) {
    return {
      success: false,
      error: 'Não foi possível buscar e extrair o texto do PDF.',
      data: null,
    }
  }
}

export async function generatePdfSummary({
  pdfText,
  fileName,
}: {
  pdfText: string
  fileName: string
}) {
  try {
    let summary = null

    try {
      summary = await generateSummaryFromGemini(pdfText)
    } catch (geminiError) {
      console.error('Erro ao gerar o resumo com Gemini:', geminiError)
    }

    // Se OpenAI falhou ou retornou null, tenta Gemini
    if (!summary) {
      console.warn('Tentando com Gemini após falha na OpenAI...')
      try {
        summary = await generateSummaryFromOpenAI(pdfText)
      } catch (openAIError: any) {
        console.error('Erro ao tentar gerar resumo com OpenAI:', openAIError)
        throw new Error(
          'Erro ao gerar resumo com os provedores de IA disponíveis.'
        )
      }
    }

    if (!summary) {
      return {
        success: false,
        error: 'Falha ao gerar o resumo.',
        data: null,
      }
    }

    return {
      success: true,
      message: 'Resumo gerado com sucesso!',
      data: {
        title: fileName,
        summary,
      },
    }
  } catch (error) {
    return {
      success: false,
      error: 'Falha ao gerar o resumo do PDF.',
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
}: pdfSummaryType) {
  try {
    const sql = await getDbConnection()
    const [savedSummary] = await sql`
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
        ) RETURNING id, summary_text`
    return savedSummary
  } catch (error) {
    console.error('Erro ao salvar o resumo do PDF', error)
    throw error
  }
}

export async function storePdfSummaryAction({
  fileUrl,
  summary,
  title,
  fileName,
}: pdfSummaryType) {
  let savedSummary: any
  try {
    const { userId } = await auth()
    if (!userId) {
      return {
        success: false,
        message: 'Usuário não autenticado.',
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
        message: 'Erro ao salvar o resumo do PDF, por favor tente novamente.',
      }
    }
  } catch (error) {
    return {
      success: false,
      message:
        error instanceof Error
          ? error.message
          : 'Erro ao salvar o resumo do PDF.',
    }
  }

  // Revalidar o cache
  revalidatePath(`/summaries/${savedSummary.id}`)

  return {
    success: true,
    message: 'Resumo salvo com sucesso!',
    data: {
      id: savedSummary.id,
    },
  }
}
