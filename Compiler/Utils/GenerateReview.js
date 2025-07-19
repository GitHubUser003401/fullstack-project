import { GoogleGenAI } from "@google/genai";
import dotenv from "dotenv";
dotenv.config();
// Initialize GoogleGenAI with the API key from environment variables
const ai = new GoogleGenAI({apiKey: process.env.GOOGLE_GEMINI_API});


export const generateAIReview = async (code, description) => {
    const response = await ai.models.generateContent({
    model: "gemini-2.0-flash",
    contents: `Analyze Below Code and provide short and crisp feedback.
    Here is the code:
    ${code}
    Given the problem description:
    ${description}
    At the End, don't give answers of given problems to the Users. Give them a short hint.`,
  });
  return response.text;
}