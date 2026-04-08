import { GoogleGenAI } from "@google/genai";

const apiKey = process.env.GEMINI_API_KEY || "";
const ai = new GoogleGenAI({ apiKey });

export const getBusinessInsight = async (data: any) => {
  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: `Sebagai konsultan bisnis untuk toko beras SIBERAS, berikan 3 saran singkat berdasarkan data berikut: ${JSON.stringify(data)}. Gunakan bahasa Indonesia yang profesional.`,
    });
    return response.text;
  } catch (error) {
    console.error("Gemini Error:", error);
    return "Gagal mendapatkan insight saat ini.";
  }
};
