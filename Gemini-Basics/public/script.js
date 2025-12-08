const chatBox = document.getElementById("chat");
const input = document.getElementById("userInput");
// Called when user clicks "Send" button
async function sendMessage() {
  const text = input.value.trim();
  if (!text) return; // Ignore empty input

  addMessage(text, "me"); // Show user message
  input.value = "";

  addMessage("Bot is typing…", "bot", true);

  try {
    // Send message to backend API
    const res = await fetch("/chat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ message: text }),
    });

    const data = await res.json();

    removeTyping(); // remove "typing..."

    // Handle Rate Limits
    if (data.type === "minute") {
      addMessage("⏳ Too many requests! Please wait 1 minute.", "bot");
      return;
    }

    if (data.type === "daily") {
      addMessage("🚫 Free plan daily limit reached! Try again tomorrow.", "bot");
      return;
    }

    addMessage(data.reply, "bot");

  } catch (error) {
    removeTyping();
    addMessage("⚠ Something went wrong! Try again later.", "bot");
    console.error(error);
  }
}

// Display messages in UI chat section
function addMessage(msg, type, typing = false) {
  const div = document.createElement("div");
  div.className = `msg ${type}`;
  if (typing) div.id = "typing"; // mark temporary element
  div.textContent = msg;
  chatBox.appendChild(div);
  chatBox.scrollTop = chatBox.scrollHeight; // auto-scroll
}

// Remove "Bot is typing" message
function removeTyping() {
  const typingDiv = document.getElementById("typing");
  if (typingDiv) typingDiv.remove();
}
