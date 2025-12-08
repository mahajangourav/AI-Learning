const chatBox = document.getElementById("chat");
const input = document.getElementById("userInput");

// Cooldown variables
let cooldown = 0;
let cooldownInterval;

// Called when user clicks "Send" button
async function sendMessage() {
  // Prevent sending if cooldown is active
  if (cooldown > 0) return;

  const text = input.value.trim();
  if (!text) return; // Ignore empty input

  addMessage(text, "me"); // Show user's message in chat
  input.value = "";

  // Show temporary "Bot is typing..." message
  addMessage("Bot is typing…", "bot", true);

  try {
    // Send message to backend API
    const res = await fetch("/chat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ message: text }),
    });

    const data = await res.json();
    removeTyping(); // Remove temporary "typing" message

    // Handle per-minute rate limit response
    if (data.type === "minute") {
      cooldown = 60; // 60 seconds cooldown
      addMessage("⏳ Too many requests! Please wait 1 minute.", "bot");
      startCooldown(); // Start countdown UI
      return;
    }

    // Handle daily rate limit response
    if (data.type === "daily") {
      addMessage("🚫 Free plan daily limit reached! Try again tomorrow.", "bot");
      return;
    }

    // Normal Gemini response
    addMessage(data.reply, "bot");

  } catch (error) {
    removeTyping();
    addMessage("⚠ Something went wrong! Try again later.", "bot");
    console.error(error);
  }
}

// Start cooldown countdown and disable input
function startCooldown() {
  input.disabled = true; // Disable input during cooldown

  cooldownInterval = setInterval(() => {
    if (cooldown <= 0) {
      clearInterval(cooldownInterval); // Stop interval
      input.disabled = false;          // Re-enable input
      input.placeholder = "Type your message..."; // Reset placeholder
      return;
    }

    // Update placeholder to show remaining cooldown
    input.placeholder = `⏳ Wait ${cooldown}s before sending another message`;
    cooldown--;
  }, 1000); // Run every second
}

// Add message to chat box
function addMessage(msg, type, typing = false) {
  const div = document.createElement("div");
  div.className = `msg ${type}`;
  if (typing) div.id = "typing"; // Mark typing messages for removal
  div.textContent = msg;
  chatBox.appendChild(div);
  chatBox.scrollTop = chatBox.scrollHeight; // Auto-scroll to bottom
}

// Remove "Bot is typing..." message
function removeTyping() {
  const typingDiv = document.getElementById("typing");
  if (typingDiv) typingDiv.remove();
}
