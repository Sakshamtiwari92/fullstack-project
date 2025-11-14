import { GoogleGenAI, Chat, Part } from "@google/genai";

let chat: Chat | null = null;

function getChatInstance(): Chat {
    if (!chat) {
        if (!process.env.API_KEY) {
            throw new Error("API_KEY environment variable not set.");
        }
        const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
        // Use a model that supports multimodal inputs
        chat = ai.chats.create({
            model: 'gemini-2.5-flash',
            config: {
                systemInstruction: 'You are a helpful and friendly chatbot named Dit Navneet. Keep your responses concise and easy to understand. When a user provides an image, analyze it and answer any questions they have about it.',
            },
        });
    }
    return chat;
}

export const sendMessageToGemini = async (message: string, imageBase64: string | null): Promise<string> => {
    try {
        const chatInstance = getChatInstance();
        
        const parts: Part[] = [{ text: message }];

        if (imageBase64) {
            const mimeType = imageBase64.match(/data:(.*);base64,/)?.[1] ?? 'image/jpeg';
            const data = imageBase64.split(',')[1];
            parts.unshift({ // Add image before text for better context
                inlineData: {
                    mimeType,
                    data
                }
            });
        }

        // FIX: The `sendMessage` method expects an object with a `message` property containing the parts.
        const response = await chatInstance.sendMessage({ message: parts });
        return response.text;

    } catch (error) {
        console.error("Gemini API error:", error);
        // Reset chat instance on error in case it's a session issue
        chat = null;
        if (error instanceof Error && error.message.includes('API key not valid')) {
             throw new Error("The provided API key is not valid. Please check your configuration.");
        }
        throw new Error("Could not communicate with the Gemini API.");
    }
};