import readline from "readline";
import fs from "fs";
import { askGemini } from "./gemini.js";

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

const exitWords = ["exit", "bye", "goodbye", "see you"];

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

    console.log("Bot is thinking... 💭");
    const botReply = await askGemini(userInput);

    console.log("Bot:", botReply);
    logMessage("Bot", botReply);

    chat(); // recursive call for next input
  });
}

// Start chatbot
chat();
