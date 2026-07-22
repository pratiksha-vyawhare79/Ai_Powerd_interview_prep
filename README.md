# PrepAI - AI Interview Preparation Platform

PrepAI is a full-stack, containerized web application designed to help candidates prepare for professional interviews. Leveraging the OpenAI API, it generates customized, role-specific questions and evaluates candidates' responses in real-time, providing immediate score breakdowns, detailed critique, and model suggested answers.

## Key Features

- **Dynamic Role Customization**: Select standard industry roles or type in your custom role.
- **Voice Transcription**: Use speech-to-text powered by the Web Speech API to answer questions by speaking naturally.
- **AI Assessment & Scoring**: Instant critique on question relevance and clarity, paired with overall scores (0-100%).
- **Interactive Dashboard**: Keep track of your practice history and view analytics of past sessions.
- **Responsive Design**: Modern, beautiful dark-themed interface built using Tailwind CSS.
- **Docker-Compose Ready**: Simple single-command setup for development.

---

## Folder Structure

```text
ai-interview-prep-platform/
├── client/                     # Vite + React + Tailwind Frontend
├── server/                     # Express.js + Mongoose Backend
├── .github/                    # CI/CD Workflows
├── docker-compose.yml          # Docker Orchestration config
└── README.md                   # This documentation
```

---

## Environment Variables

### Backend (`server/.env`)
Create a file named `.env` in the `server/` directory and configure the following variables:

```env
PORT=5000
MONGO_URI=mongodb://localhost:27017/ai-interview-prep # Use mongodb://mongo:27017/ai-interview-prep for Docker Compose
JWT_SECRET=your_super_secret_jwt_key
OPENAI_API_KEY=your_openai_api_key_here
```

### Frontend (`client/.env`)
Create a file named `.env` in the `client/` directory:

```env
VITE_API_URL=http://localhost:5000/api
```

---

## How to Run

### Method 1: Local Development (Without Docker)

You will need **Node.js** (v18+) and **MongoDB** installed on your system.

#### 1. Start MongoDB
Ensure MongoDB is running locally on port `27017`.

#### 2. Start the Backend Server
```bash
cd server
npm install
npm run dev
```
The server will start on [http://localhost:5000](http://localhost:5000).

#### 3. Start the Frontend
```bash
cd client
npm install
npm run dev
```
The application will be accessible at [http://localhost:3000](http://localhost:3000).

---

### Method 2: Running with Docker Compose

Ensure you have **Docker** and **Docker Compose** installed.

1. Navigate to the project root directory.
2. Edit the `docker-compose.yml` file or set the required environment variables:
   - Provide your `OPENAI_API_KEY` under the `server` environment block in `docker-compose.yml` (or create a `.env` file in the root directory to populate it).
3. Build and launch the containers:
   ```bash
   docker-compose up --build
   ```
4. Access the web interface at [http://localhost:3000](http://localhost:3000). The API runs on [http://localhost:5000](http://localhost:5000) and MongoDB binds to port `27017`.

To stop the containers, press `Ctrl+C` or run:
```bash
docker-compose down
```

---

## CI/CD Pipeline

The platform uses GitHub Actions (`.github/workflows/ci-cd.yml`) to:
1. Run builds for both `client/` and `server/` on every push/PR to `main`.
2. Verify Docker image builds to prevent container regressions.
3. Feature comments detailing custom server/virtual machine SSH deployment processes.
