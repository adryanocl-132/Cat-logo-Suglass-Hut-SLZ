import { GoogleGenAI } from "@google/genai";

/**
 * Service to interact with the Gemini API.
 * The API Key is injected via environment variables defined in vite.config.ts
 */
const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY || "" });

export default ai;
