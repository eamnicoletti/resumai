'use server'

import { generateSummaryFromGemini } from '@/lib/geminiai'
import { fetchAndExtractPdfText } from '@/lib/langchain'
import { generateSummaryFromOpenAI } from '@/lib/openai'

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

    return {
      success: true,
      message: 'Resumo gerado com sucesso',
      data: { summary },
    }
  } catch (err) {
    return {
      success: false,
      message: 'Falha ao fazer upload',
      data: null,
    }
  }
}
