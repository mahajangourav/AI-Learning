import 'dotenv/config';
import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

async function run() {
  const prompt = "Explain LLM in just 2 sentences.";
  const result = await model.generateContent(prompt);
  console.log(result.response.text());
}

run();
