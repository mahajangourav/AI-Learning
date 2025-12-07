import readline from "readline";
import fs from "fs";
import { askGemini } from "./gemini.js";

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const exitWords = ["exit", "bye", "goodbye", "see you"];

// Sentiment rules
const sentimentRules = [
  {
    keywords: ["happy", "great", "awesome", "good"],
    reply: "I'm happy to hear that! 😄 Keep smiling!"
  },
  {
    keywords: ["sad", "unhappy", "depressed", "upset"],
    reply: "I'm here for you. Everything will be alright 💛"
  },
  {
    keywords: ["angry", "mad", "furious"],
    reply: "Take a deep breath… calming down really helps 😌"
  }
];

function detectSentiment(userInput) {
  for (const rule of sentimentRules) {
    if (rule.keywords.some(k => userInput.toLowerCase().includes(k))) {
      return rule.reply;
    }
  }
  return null;
}

function logMessage(role, msg) {
  fs.appendFileSync("chat-history.txt", `${role}: ${msg}\n`);
}

async function chat() {
  rl.question("You: ", async (userInput) => {
    logMessage("User", userInput);

    if (exitWords.some(w => userInput.toLowerCase().includes(w))) {
      const bye = "Goodbye! 👋";
      console.log("Bot:", bye);
      logMessage("Bot", bye);
      return rl.close();
    }

    // Check sentiment first
    const sentimentReply = detectSentiment(userInput);
    if (sentimentReply) {
      console.log("Bot:", sentimentReply);
      logMessage("Bot", sentimentReply);
      return chat();
    }

    console.log("Bot is thinking... 💭")
    const botReply = await askGemini(userInput);
    console.log("Bot:", botReply);
    logMessage("Bot", botReply);

    chat();
  });
}

chat();
