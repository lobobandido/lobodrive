
export const generateAnalysisPlan = async (fileName: string): Promise<string> => {
  try {
    const response = await fetch('/api/analyze', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ fileName }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || 'Failed to fetch analysis plan from the server.');
    }

    const data = await response.json();
    return data.plan;
  } catch (error) {
    console.error("Error generating analysis plan:", error);
    if (error instanceof Error) {
        return `There was an error communicating with the server: ${error.message}`;
    }
    return "An unknown error occurred while communicating with the server.";
  }
};
