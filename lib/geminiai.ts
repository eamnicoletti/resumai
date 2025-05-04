import { SUMMARY_SYSTEM_PROMPT } from '@/utils/prompts'
import { GoogleGenAI } from '@google/genai'

const genAI = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY || '' })

export const generateSummaryFromGemini = async (pdfText: string) => {
  try {
    const prompt = [
      {
        role: 'user',
        parts: [
          { text: SUMMARY_SYSTEM_PROMPT },
          {
            text: `\n\nTransform this document into an engaging, easy-to-read 
              summary with contextually relevant emojis and proper markdown 
              formatting:\n\n${pdfText}`,
          },
        ],
      },
    ]

    const response = await genAI.models.generateContent({
      model: 'gemini-1.5-pro-002',
      contents: prompt,
      config: {
        temperature: 0.7,
        maxOutputTokens: 1500,
      },
    })

    if (!response.text) {
      throw new Error('No response text received')
    }

    return response.text
  } catch (error: any) {
    console.error('gemini API Error:', error)
    throw error
  }
}
