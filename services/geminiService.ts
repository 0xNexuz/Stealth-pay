
import { GoogleGenAI } from "@google/genai";
import { ChatMessage } from "../types";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || "" });

export const getPrivacyAdvice = async (history: ChatMessage[]) => {
  try {
    const lastMessage = history[history.length - 1].content;
    const systemInstruction = `
      You are the StealthPay Privacy Advisor, an expert in Ethereum protocol design, Zero-Knowledge Proofs, and EIP-7503 (Zero-Knowledge Wormholes).
      Your goal is to explain how StealthPay achieves privacy through burning and reminting ETH.
      
      Technical Context for you:
      - EIP-7503 allows users to prove they burned ETH in the past to a pre-computed address.
      - A ZK proof (like Halo2 or Plonky2) is used to verify the burn happened without revealing which specific burn event it was.
      - The receiver gets "new" ETH from the system contract.
      - This breaks the link between the original sender and the new recipient.

      Keep answers concise, technical yet accessible, and professional. 
      Encourage users to explore the demo.
    `;

    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: lastMessage,
      config: {
        systemInstruction,
        temperature: 0.7,
      },
    });

    return response.text || "I'm having trouble connecting to my neural net. Please try again.";
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "The advisor is currently unavailable. Please check your connection.";
  }
};
