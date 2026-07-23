import { GoogleGenAI } from "@google/genai";
import dotenv from "dotenv";

dotenv.config();



const ai = new GoogleGenAI({
  apiKey: process.env.GOOGLE_GENAI_API_KEY,
});

async function invokeGenAi() {
  const response = await ai.models.generateContent({
    model: "gemini-2.5-flash-lite",
    contents: "hey Gemini ! Explain what is .net ? why is created?",
  });

  console.log(response.text);
}

export default invokeGenAi;

