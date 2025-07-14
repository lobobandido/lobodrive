
import { GoogleGenAI } from "@google/genai";

// Ensure API_KEY is available in the environment. In a real app, this would be handled by a build process or server.
const API_KEY = process.env.API_KEY;

if (!API_KEY) {
  // In a real app, you might want to handle this more gracefully.
  // For this example, we'll proceed, but API calls will fail.
  console.warn("Gemini API key not found. AI features will be disabled.");
}

const ai = new GoogleGenAI({ apiKey: API_KEY! });

export const generateAnalysisPlan = async (fileName: string): Promise<string> => {
  if (!API_KEY) {
    return Promise.resolve("API Key for Gemini is not configured. Please set the API_KEY environment variable to enable this feature.");
  }
  
  try {
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

    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
    });
    
    return response.text;
  } catch (error) {
    console.error("Error generating analysis plan from Gemini:", error);
    return "There was an error communicating with the AI. Please check the console for details and ensure your API key is correctly configured.";
  }
};
