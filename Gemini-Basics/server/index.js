import express from "express";
import cors from "cors";
import { askGemini } from "../gemini.js"; // reuse same function

const app = express();
app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("🤖 Gemini Chatbot API is running!");
});

// Chat API
app.post("/chat", async (req, res) => {
  try {
    const userMessage = req.body.message;

    if (!userMessage) {
      return res.status(400).json({ error: "Message is required" });
    }

    const reply = await askGemini(userMessage);
    res.json({ reply });

  } catch (err) {
    res.status(500).json({ error: "AI failed to respond 😢" });
  }
});

const PORT = 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
