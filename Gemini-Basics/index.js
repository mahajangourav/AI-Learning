import { askGemini } from './gemini.js';

async function main() {
  const prompt = `
    Extract name, email, and date from:
    Name: Gourav Kumar, Email: gourav@gmail.com, Date: 05-12-2025
    Return ONLY JSON without any markdown.
  `;

  const output = await askGemini(prompt);
  console.log(output);
}

main();
