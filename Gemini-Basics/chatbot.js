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

function chat() {
  rl.question("You: ", (userInput) => {
    logMessage("User", userInput);
    if (userInput.toLowerCase() === "exit") {
      console.log("Bot: Goodbye! 👋");
      return rl.close();
    }

    let botReply = "";

    if (userInput.includes("hi") || userInput.includes("hello")) {
      botReply = "Hello! How can I help you today?";
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
