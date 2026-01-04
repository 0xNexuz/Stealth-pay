
import { GoogleGenAI } from "@google/genai";
import { ChatMessage } from "../types";

// Always initialize with the exact pattern requested
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const getPrivacyAdvice = async (history: ChatMessage[]) => {
  try {
    // Convert our internal ChatMessage format to the API's expected parts structure
    const contents = history.map(msg => ({
      role: msg.role === 'assistant' ? 'model' : 'user',
      parts: [{ text: msg.content }]
    }));

    const systemInstruction = `
      You are the StealthPay Privacy Advisor, an expert in Ethereum protocol design, Zero-Knowledge Proofs, and EIP-7503 (Zero-Knowledge Wormholes).
      Your goal is to explain how StealthPay achieves privacy through burning and reminting ETH.
      
      Technical Context:
      - EIP-7503 allows users to prove they burned ETH in the past to a pre-computed address.
      - A ZK proof (like Halo2 or Plonky2) is used to verify the burn happened without revealing which specific burn event it was.
      - The receiver gets "new" ETH from the system contract.
      - This breaks the link between the original sender and the new recipient.

      Keep answers concise, technical yet accessible, and professional. 
      Encourage users to explore the demo. Always maintain a helpful, secure, and privacy-focused persona.
    `;

    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: contents,
      config: {
        systemInstruction,
        temperature: 0.7,
        topP: 0.95,
        topK: 40
      },
    });

    return response.text || "I apologize, I couldn't process that technical query. Could you rephrase?";
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "The privacy advisor is currently under maintenance. Please try again in a moment.";
  }
};
