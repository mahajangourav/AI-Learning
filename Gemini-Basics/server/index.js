import express from "express";
import cors from "cors";
import { askGemini } from "../gemini.js";
import path from "path";
import { fileURLToPath } from "url";
import rateLimit from "express-rate-limit";
import fs from "fs";

// Fix for ES Modules __dirname
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

// ==============================
// MIDDLEWARES
// ==============================
app.use(cors()); // Allow frontend (React/HTML) to call backend
app.use(express.json()); // Parse incoming JSON requests

// Serve frontend static files from "public" folder
app.use(express.static(path.join(__dirname, "../public")));

// ==============================
// RATE LIMITERS
// ==============================

// 1️⃣ Per-minute limiter (max 4 requests per minute)
const minuteLimiter = rateLimit({
  windowMs: 60 * 1000, // 1 minute window
  max: 4, // limit each IP to 4 requests per window
  message: {
    type: "minute",
    reply: "⏱ Free plan: Too many requests! Wait 1 minute."
  },
  standardHeaders: true, // Include rate limit info in headers
  legacyHeaders: false   // Disable legacy X-RateLimit-* headers
});

// 2️⃣ Daily limiter (max 19 requests per 24h)
const dailyLimiter = rateLimit({
  windowMs: 24 * 60 * 60 * 1000, // 24 hours
  max: 19, // limit each IP to 19 requests per day
  message: {
    type: "daily",
    reply: "🚫 Daily limit reached! Try again tomorrow."
  },
  standardHeaders: true,
  legacyHeaders: false
});

// ==============================
// CHAT API ROUTE
// ==============================

// Apply both limiters to this endpoint
app.post("/chat", minuteLimiter, dailyLimiter, async (req, res) => {
  const userMsg = req.body.message;

  // Return error if user sends empty message
  if (!userMsg) {
    return res.status(400).json({ reply: "Please say something! 😄" });
  }

  // ==============================
  // LOG USER REQUEST
  // ==============================
  fs.appendFileSync(
    "request-log.txt", 
    `${new Date().toISOString()} - ${userMsg}\n`
  );

  try {
    // Call Gemini AI to get response
    const botReply = await askGemini(userMsg);

    // Send AI response to frontend
    return res.json({ reply: botReply });

  } catch (error) {
    // Catch errors from Gemini API
    console.error("Gemini Error:", error);
    return res.status(500).json({
      reply: "Oops! Something went wrong 🥲"
    });
  }
});

// ==============================
// START SERVER
// ==============================
app.listen(5000, () =>
  console.log("🚀 Server running on http://localhost:5000")
);
