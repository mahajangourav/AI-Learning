Gemini AI Chatbot

An AI-powered chatbot that uses Google Gemini API to respond in real-time.
Built with a modern Node.js + Express.js backend and a simple clean frontend UI.

🚀 Live Preview

🔗 (You can add link here after deployment)

🛠 Tech Stack
Area	Technology
Frontend	HTML, CSS, JavaScript
Backend	Node.js, Express.js
AI Model	Google Gemini API
Others	Rate Limiting, Request Logging
✨ Features

✔ Chat with Gemini AI in real time
✔ Clean UI with typing indicator
✔ ⏱ Rate limiting support:
 · Max 4 requests/min (free plan-friendly)
 · Max 19 requests/day
✔ Error message UI handling
✔ Logs user prompts to request-log.txt
✔ Fully structured server with modular code

📁 Project Structure
📦 Gemini-AI-Chatbot
 ┣ 📂 public
 ┃ ┣ index.html
 ┃ ┗ script.js
 ┣ 📜 gemini.js
 ┣ 📜 server.js
 ┣ 📜 request-log.txt
 ┗ 📜 README.md

⚙️ Setup & Run
🔹 1️⃣ Install dependencies
npm install

🔹 2️⃣ Add your Gemini API Key

Create .env file:

GEMINI_API_KEY=your_api_key_here

🔹 3️⃣ Start server
npm start


Server will run on:

http://localhost:5000

📌 API Endpoint
Method	Endpoint	Description
POST	/chat	Send a message & get Gemini response

Request Body:

{
  "message": "Hello AI!"
}


Response:

{
  "reply": "Hello! How can I help you today?"
}

🧠 Future Enhancements (Day-10 & Beyond)

🔹 Chat history & conversation memory
🔹 Improved UI with styling animations
🔹 User authentication & usage tracking
🔹 Deploy to Render / Vercel / Netlify
🔹 Upload Knowledge Base → Custom RAG chatbot

📸 Screenshots

(Add here once you take UI screenshots)

💡 Motivation

This is part of my 100 Days of AI Developer Journey.
Goal: Become highly skilled in MERN + AI integrations.

🤝 Contributions

Feel free to submit pull requests or new ideas!

⭐ Don't Forget to Star!

If you like this project, support by giving a ⭐ on GitHub!