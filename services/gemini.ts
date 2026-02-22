import { GoogleGenAI, GenerateContentResponse } from "@google/genai";
import { Subject, Standard } from '../types';

let aiClient: GoogleGenAI | null = null;

const getClient = (): GoogleGenAI => {
  if (!aiClient) {
    const apiKey = process.env.API_KEY || '';
    aiClient = new GoogleGenAI({ apiKey });
  }
  return aiClient;
};

export const generateStudyHelp = async (
  subject: Subject,
  standard: Standard,
  query: string,
  history: { role: string; parts: { text: string }[] }[],
  imagePart?: { inlineData: { data: string; mimeType: string } }
): Promise<string> => {
  try {
    const ai = getClient();
    const model = 'gemini-2.5-flash';

    const systemInstruction = `You are a helpful, encouraging, and knowledgeable tutor for the "Scholar Hub" academy. 
    The student is in ${standard} studying ${subject}.
    Keep your answers concise, clear, and age-appropriate. 
    Use formatting like bullet points and bold text to make learning easier.
    If the user uploads a file context, refer to it as "your uploaded material".
    
    If asked to generate notes from an image:
    1. Summarize the key concepts visible in the image.
    2. Provide a structured list of bullet points.
    3. Highlight any definitions or formulas.
    `;

    // If there's an image, we use generateContent directly as chats with images in history are complex
    if (imagePart) {
      const response: GenerateContentResponse = await ai.models.generateContent({
        model,
        contents: {
          parts: [
            imagePart,
            { text: query }
          ]
        },
        config: { systemInstruction }
      });
      return response.text || "Could not analyze the image.";
    }

    // Standard Text Chat
    const chat = ai.chats.create({
      model,
      config: {
        systemInstruction,
      },
      history: history.map(h => ({
        role: h.role,
        parts: h.parts
      }))
    });

    const response: GenerateContentResponse = await chat.sendMessage({
      message: query
    });

    return response.text || "I couldn't generate a response. Please try again.";
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "I'm having trouble connecting to the knowledge base right now. Please check your internet or API key.";
  }
};