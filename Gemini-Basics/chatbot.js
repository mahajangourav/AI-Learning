import readline from "readline";
import fs from "fs";

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

console.log("🤖 Gemini CLI Chatbot v1.0");
console.log("Type 'exit' to quit.\n");

// Save conversation to file
function logMessage(role, message) {
  const log = `${role}: ${message}\n`;
  fs.appendFileSync("chat-history.txt", log, "utf8");
}
const exitWords = ["exit", "bye", "goodbye", "see you"];
function chat() {
  rl.question("You: ", (userInput) => {
    logMessage("User", userInput);

   if (exitWords.some(word => userInput.toLowerCase().includes(word))) {
      console.log("Bot: Goodbye! 👋");
      return rl.close();
    }

    let botReply = "";

    if (userInput.includes("hi") || userInput.includes("hello")) {
      botReply = "Hello! How can I help you today?";
    } else if (userInput.includes("happy")) {
      botReply = "Yay! I'm happy to hear that! 😄";
    } else if (
      userInput.includes("sad") ||
      userInput.includes("upset") ||
      userInput.includes("depressed")
    ) {
      botReply = "I'm sorry you're feeling that way. I'm here to chat if it helps! 🤗";
    } else if (userInput.includes("name")) {
      botReply = "I am Gemini-style CLI Bot!";
    } else {
      botReply = "Interesting! Tell me more…";
    }


    console.log("Bot:", botReply);
    logMessage("Bot", botReply);
    chat(); // repeat
  });
}

chat();
