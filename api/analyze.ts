
import type { VercelRequest, VercelResponse } from '@vercel/node';
import { GoogleGenAI } from "@google/genai";

export default async function handler(
  request: VercelRequest,
  response: VercelResponse,
) {
  if (request.method !== 'POST') {
    return response.status(405).json({ error: 'Method Not Allowed' });
  }

  const apiKey = process.env.API_KEY;
  if (!apiKey) {
    return response.status(500).json({ error: 'API key is not configured on the server.' });
  }

  const { fileName } = request.body;
  if (!fileName) {
    return response.status(400).json({ error: 'fileName is required in the request body.' });
  }

  try {
    const ai = new GoogleGenAI({ apiKey });
    
    const prompt = `
      As a senior frontend engineer, provide a high-level technical implementation plan for a feature in a React/TypeScript web app.
      The feature is to analyze an uploaded office document, specifically '${fileName}'.
      The user needs to be able to:
      1.  **Parse the Document**: Read the content of an Excel (.xlsx) or Word (.docx) file in the browser.
      2.  **Filter Data (Excel)**: For Excel files, allow users to select columns to display and filter rows based on cell values (e.g., show all rows where 'Status' is 'Complete').
      3.  **Group Data (Excel)**: Allow users to group rows based on a selected column.
      4.  **Extract Content (Word/Excel)**: Allow users to select the filtered/grouped data and extract it (e.g., copy to clipboard or download as a new file).

      Please structure your answer clearly. Suggest specific, popular libraries (e.g., from npm) that would be suitable for each major task (parsing, UI, etc.). The output should be in markdown format.
    `;

    const geminiResponse = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
    });

    const plan = geminiResponse.text;
    
    return response.status(200).json({ plan });

  } catch (error) {
    console.error('Error calling Gemini API:', error);
    return response.status(500).json({ error: 'An error occurred while communicating with the AI service.' });
  }
}
