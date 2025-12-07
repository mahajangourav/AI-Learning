import express from "express";
import cors from "cors";
import { askGemini } from "./gemini.js";
import path from "path";
import { fileURLToPath } from "url";

// Fix for ES Modules path
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

// Middlewares
app.use(cors()); // Allow frontend to call backend
app.use(express.json()); // Parse JSON request bodies

// Serve frontend UI from "public" folder
app.use(express.static(path.join(__dirname, "../public")));

// Chat API route
app.post("/chat", async (req, res) => {
  const userMsg = req.body.message;

  // If no message
  if (!userMsg) {
    return res.status(400).json({ reply: "Please say something! 😄" });
  }

  try {
    const botReply = await askGemini(userMsg);

    return res.json({ reply: botReply });
  } catch (error) {
    console.error("Gemini Error:", error);
    return res.json({ reply: "Oops! Something went wrong 🥲" });
  }
});

app.listen(5000, () => console.log("🚀 Server running on http://localhost:5000"));
