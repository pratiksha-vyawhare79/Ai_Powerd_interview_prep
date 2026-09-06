# PrepAI - AI Interview Preparation Platform

PrepAI is a full-stack, AI-powered web application designed to help candidates prepare for professional job interviews. Powered by generative AI (OpenAI & Google Gemini), it dynamically generates role-tailored questions, evaluates responses in real-time, provides constructive critiques, scores clarity and relevance, and suggests model answers.

---

## 🚀 Quick Reference

| Service | Address | Start Command | Notes |
| :--- | :--- | :--- | :--- |
| **Frontend Web App** | [http://localhost:3000](http://localhost:3000) | `cd client && npm run dev` | **Open this URL in your browser to use the app** |
| **Backend API** | [http://localhost:5000](http://localhost:5000) | `cd server && npm run dev` | Express.js REST API (`/health`, `/api/*`) |
| **MongoDB** | `mongodb://localhost:27017` | Runs as Windows service or Docker | Database for users, sessions, and reports |

> [!IMPORTANT]
> **To use the application, open [http://localhost:3000](http://localhost:3000) in your browser.**
> Port `5000` is the backend REST API server. Visiting `http://localhost:5000` will return API status information rather than the interactive user interface.

---

## 📋 Prerequisites

Before running the project, make sure you have:

1. **Node.js**: v18.0.0 or higher ([Download Node.js](https://nodejs.org/))
2. **MongoDB**: Local MongoDB Community Server installed and running on port `27017`, or a free [MongoDB Atlas](https://www.mongodb.com/atlas) cluster.
3. **Web Browser**: Google Chrome or Microsoft Edge is recommended for full **Web Speech API** (Voice-to-Text) support.

---

## 🛠️ How to Run the Project (Step-by-Step)

### Step 1: Ensure MongoDB is Running

- **Windows (as a Service):**
  MongoDB usually runs automatically. You can verify in PowerShell:
  ```powershell
  Get-Service -Name "*mongo*"
  ```
  If stopped, start it with:
  ```powershell
  Start-Service MongoDB
  ```
- **macOS / Linux:**
  ```bash
  sudo systemctl status mongod
  # or
  brew services start mongodb-community
  ```

---

### Step 2: Start the Backend Server

Open a new terminal window / command prompt:

1. Navigate to the `server` directory:
   ```bash
   cd server
   ```
2. Install dependencies (first time only):
   ```bash
   npm install
   ```
3. Configure the environment variables:
   Ensure a `.env` file exists in `server/.env` with your settings (see [Environment Variables](#environment-variables) below).
4. Start the backend in development mode:
   ```bash
   npm run dev
   ```

You should see:
```text
MongoDB Connected: localhost
Server is running on port 5000
```

---

### Step 3: Start the Frontend Client

Open a **second terminal window** (leave the backend running):

1. Navigate to the `client` directory:
   ```bash
   cd client
   ```
2. Install dependencies (first time only):
   ```bash
   npm install
   ```
3. Ensure `client/.env` exists:
   ```env
   VITE_API_URL=http://localhost:5000/api
   ```
4. Start the Vite development server:
   ```bash
   npm run dev
   ```

You should see:
```text
  VITE v5.x ready in ... ms

  ➜  Local:   http://localhost:3000/
  ➜  Network: http://...
```

---

### Step 4: Open in Your Browser

Open Google Chrome or Edge and navigate to:

👉 **[http://localhost:3000](http://localhost:3000)**

---

## 🐳 Alternative: Running with Docker Compose

If you have Docker and Docker Compose installed, you can start the entire stack (MongoDB, Backend, and Frontend) with a single command:

1. From the project root (`ai-interview-prep-platform`):
   ```bash
   docker-compose up --build
   ```
2. Access the application at [http://localhost:3000](http://localhost:3000).
3. To stop all containers:
   ```bash
   docker-compose down
   ```

---

## ⚙️ Environment Variables

### Backend (`server/.env`)

Create or update `server/.env`:

```env
PORT=5000
MONGO_URI=mongodb://localhost:27017/ai-interview-prep
JWT_SECRET=your_super_secret_jwt_key
OPENAI_API_KEY=your_openai_api_key_here
GEMINI_API_KEY=your_gemini_api_key_here
```

| Variable | Description |
| :--- | :--- |
| `PORT` | Port for the Express backend (default: `5000`) |
| `MONGO_URI` | MongoDB connection string (Local or MongoDB Atlas) |
| `JWT_SECRET` | Secret key for signing authentication tokens |
| `OPENAI_API_KEY` | Optional: OpenAI API Key |
| `GEMINI_API_KEY` | Optional: Google Gemini API Key for question generation & scoring |

> [!NOTE]
> If neither `OPENAI_API_KEY` nor `GEMINI_API_KEY` is provided, the backend will automatically operate in **Mock Mode**, providing built-in sample questions and simulated evaluations for testing without API costs.

### Frontend (`client/.env`)

Create or update `client/.env`:

```env
VITE_API_URL=http://localhost:5000/api
```

---

## 🎯 How to Use the Application

1. **Sign Up / Login**: Register a new account or log into an existing one.
2. **Setup Your Interview**:
   - Choose a target role (e.g. Frontend Developer, Backend Developer, Full Stack, Data Scientist, or type a custom role).
   - Select the interview type (Technical, Behavioral, System Design) and difficulty.
3. **Practice Answering Questions**:
   - Click the **Microphone** icon to speak your answers aloud via Web Speech voice-to-text.
   - Or type your answers directly into the text editor.
4. **Instant AI Feedback**:
   - Get immediate per-question scoring, relevancy feedback, suggestions, and model answers.
5. **View Reports & Analytics**:
   - Check your comprehensive session performance breakdown on the **Dashboard** and **Report** pages.

---

## ❓ Troubleshooting & FAQs

### Q: Why do I see `{"message":"PrepAI Backend API is running..."}` or `Cannot GET /`?
> **Answer**: You are visiting [http://localhost:5000](http://localhost:5000) (the backend API). Open **[http://localhost:3000](http://localhost:3000)** instead to view the frontend interface.

### Q: Port 5000 or Port 3000 is already in use
> **Answer**: Stop any existing processes listening on those ports:
> - On Windows (PowerShell):
>   ```powershell
>   Stop-Process -Id (Get-NetTCPConnection -LocalPort 5000).OwningProcess -Force
>   Stop-Process -Id (Get-NetTCPConnection -LocalPort 3000).OwningProcess -Force
>   ```

### Q: Voice recording / Speech-to-text doesn't transcribe
> **Answer**: 
> 1. Ensure you are using **Google Chrome** or **Microsoft Edge** (browsers supporting the Web Speech API).
> 2. Allow microphone access when prompted by the browser.

### Q: Database connection error (`MongoDB Connection Error`)
> **Answer**: Ensure your MongoDB service is running locally (`Get-Service -Name "*mongo*"` on Windows) or verify that your `MONGO_URI` in `server/.env` is correct.

---

## 📁 Project Architecture

```text
ai-interview-prep-platform/
├── client/                     # Frontend (Vite + React + Tailwind CSS)
│   ├── src/
│   │   ├── components/         # Reusable UI components & VoiceRecorder
│   │   ├── pages/              # Dashboard, Interview, Report, Login, Register
│   │   ├── hooks/              # Speech-to-text & custom hooks
│   │   └── services/           # Axios API client & endpoints
│   ├── .env                    # Frontend environment configuration
│   └── vite.config.js          # Vite config (runs on port 3000)
│
├── server/                     # Backend (Node.js + Express + Mongoose)
│   ├── src/
│   │   ├── config/             # Database connection setup
│   │   ├── controllers/        # Route controllers (Auth, Interview, Dashboard)
│   │   ├── models/             # Mongoose schemas (User, Interview, Session)
│   │   ├── routes/             # Express API route declarations
│   │   └── services/           # AI services (OpenAI & Google Gemini)
│   ├── .env                    # Backend environment configuration
│   └── server.js               # Express application entry point (port 5000)
│
├── docker-compose.yml          # Container orchestration setup
└── README.md                   # Project documentation
```
