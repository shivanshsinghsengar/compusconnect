import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);

export async function generateNoteSummary(
  title: string,
  subject: string,
  description?: string
): Promise<string> {
  try {
    const model = genAI.getGenerativeModel({ model: "gemini-pro" });

    const prompt = `Generate a concise 3-4 sentence summary for academic notes with the following details:
Title: ${title}
Subject: ${subject}
${description ? `Description: ${description}` : ""}

The summary should highlight key topics, concepts, and what students will learn. Keep it friendly and informative.`;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();

    return text;
  } catch (error) {
    console.error("Error generating AI summary:", error);
    return "Unable to generate summary at this time.";
  }
}

export async function generatePlacementInsights(
  company: string,
  role: string,
  experience: string
): Promise<string> {
  try {
    const model = genAI.getGenerativeModel({ model: "gemini-pro" });

    const prompt = `Based on this interview experience for ${company} - ${role}, provide 2-3 key takeaways and preparation tips:

Experience: ${experience}

Format the response as bullet points focusing on what future candidates should know.`;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();

    return text;
  } catch (error) {
    console.error("Error generating placement insights:", error);
    return "";
  }
}
