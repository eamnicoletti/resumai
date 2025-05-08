import { validate as uuidValidate } from 'uuid'
import { getDbConnection } from './db'

export async function getSummaries(userId: string) {
  const sql = await getDbConnection()
  const summaries =
    await sql`SELECT * FROM pdf_summaries WHERE user_id = ${userId} 
  ORDER BY created_at DESC`

  return summaries
}

// Function to get a specific summary by its ID
export async function getSummaryById(id: string) {
  console.log('Fetching summary for id:', id)

  try {
    // Validate if the ID is a valid UUID
    if (!uuidValidate(id)) {
      console.error('Invalid UUID format:', id) // Log the invalid ID for debugging
      return null // Return null if the ID is not a valid UUID
    }

    const sql = await getDbConnection()

    // Query to fetch the summary by ID, calculating word_count on the fly
    const [summary] = await sql`
          SELECT 
              id, 
              user_id, 
              title, 
              original_file_url, 
              summary_text, 
              created_at, 
              updated_at, 
              status, 
              file_name, 
              LENGTH(summary_text) - LENGTH(REPLACE(summary_text, ' ', '')) + 1 AS word_count
          FROM pdf_summaries
          WHERE id = ${id}::uuid
      `

    // If no summary is found, return null
    if (!summary) {
      console.error('Summary not found for id:', id) // Log when no summary is found
      return null // Return null if summary is not found
    }

    return summary
  } catch (error) {
    console.error('Error fetching summary by id', error)
    return null // Return null in case of an error
  }
}

export async function getUserUploadCount(userId: string) {
  const sql = await getDbConnection()

  try {
    const [result] = await sql`SELECT COUNT(*) as count
      FROM pdf_summaries 
      WHERE user_id = ${userId}`

    return result.count || 0
  } catch (err) {
    console.error('Error fetching user upload count', err)
    return 0
  }
}
