import express from "express";
import cors from "cors";
import { askGemini } from "../gemini.js";
import path from "path";
import { fileURLToPath } from "url";
import rateLimit from "express-rate-limit";

// Fix for ES Modules path
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());

// Serve frontend
app.use(express.static(path.join(__dirname, "../public")));

// Rate Limiters
const minuteLimiter = rateLimit({
  windowMs: 60 * 1000, // 1 minute
  max: 4, // Max 4 request per minute
  message: {
    type: "minute",
    reply: "⏱ Free plan: Too many requests! Wait 1 minute."
  },
  standardHeaders: true,
  legacyHeaders: false
});

const dailyLimiter = rateLimit({
  windowMs: 24 * 60 * 60 * 1000, // 24 hours
  max: 19, // Max 19 request per day
  message: {
    type: "daily",
    reply: "🚫 Daily limit reached! Try again tomorrow."
  },
  standardHeaders: true,
  legacyHeaders: false
});

// Chat API Route with rate limiters applied
app.post("/chat", minuteLimiter, dailyLimiter, async (req, res) => {
  const userMsg = req.body.message;

  if (!userMsg) {
    return res.status(400).json({ reply: "Please say something! 😄" });
  }

  try {
    const botReply = await askGemini(userMsg);
    return res.json({ reply: botReply });
  } catch (error) {
    console.error("Gemini Error:", error);
    return res.status(500).json({
      reply: "Oops! Something went wrong 🥲"
    });
  }
});

app.listen(5000, () =>
  console.log("🚀 Server running on http://localhost:5000")
);
