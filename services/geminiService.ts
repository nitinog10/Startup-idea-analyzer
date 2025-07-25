
import { GoogleGenAI, GenerateContentResponse } from "@google/genai";
import { AnalysisFeedback } from '../types';
import { GEMINI_MODEL_NAME, STARTUP_ANALYSIS_PROMPT_TEMPLATE } from '../constants';

// Ensure process.env.API_KEY is available or provide a fallback for development.
// In a real production deployment, this should be securely managed.
const API_KEY = process.env.API_KEY;

if (!API_KEY) {
  console.warn(
    "API_KEY environment variable not found. Using a placeholder. Gemini API calls will likely fail."
  );
}

const ai = new GoogleGenAI({ apiKey: API_KEY || "YOUR_API_KEY_PLACEHOLDER" });

export const analyzeStartupIdea = async (idea: string): Promise<AnalysisFeedback> => {
  if (!API_KEY) {
    throw new Error("Gemini API Key is not configured. Please set the API_KEY environment variable.");
  }

  const prompt = STARTUP_ANALYSIS_PROMPT_TEMPLATE.replace("{USER_IDEA}", idea);

  try {
    const response: GenerateContentResponse = await ai.models.generateContent({
      model: GEMINI_MODEL_NAME,
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        temperature: 0.7, // Adjust for creativity vs. predictability
      },
    });

    let jsonStr = response.text.trim();
    
    // Remove markdown fences if present
    const fenceRegex = /^```(?:json)?\s*\n?(.*?)\n?\s*```$/s;
    const match = jsonStr.match(fenceRegex);
    if (match && match[1]) {
      jsonStr = match[1].trim();
    }

    try {
      const parsedData = JSON.parse(jsonStr) as AnalysisFeedback;
      // Basic validation for critical fields
      if (typeof parsedData.feasibilityScore !== 'number' || !parsedData.uniqueness || !parsedData.competition || !parsedData.goToMarketStrategy || !parsedData.overallAssessment) {
        console.error("Parsed data is missing required fields:", parsedData);
        throw new Error("Received malformed analysis data from AI. Key fields are missing.");
      }
      return parsedData;
    } catch (e) {
      console.error("Failed to parse JSON response from Gemini:", jsonStr, e);
      throw new Error(`Failed to parse the analysis data received from AI. Raw response: ${jsonStr.substring(0,100)}...`);
    }

  } catch (error) {
    console.error("Error calling Gemini API:", error);
    if (error instanceof Error) {
        throw new Error(`Failed to get analysis from AI: ${error.message}`);
    }
    throw new Error("An unknown error occurred while communicating with the AI.");
  }
};
