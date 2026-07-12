<div align="center">

<img src="client/public/logo1.png" alt="InvesTrue Logo" width="120" />

# InvesTrue — AI Investment Research Platform

**Intelligence · Discovery · Growth**

[![Live Demo](https://img.shields.io/badge/Live%20Demo-Vercel-black?style=for-the-badge&logo=vercel)](https://inves-true-h05dr4k89-tc12317878-5580s-projects.vercel.app)
[![Backend](https://img.shields.io/badge/Backend-Render-46E3B7?style=for-the-badge&logo=render)](https://investrue.onrender.com)
[![GitHub](https://img.shields.io/badge/GitHub-Repository-181717?style=for-the-badge&logo=github)](https://github.com/TanviChoudhary12317878/InvesTrue)
[![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)](https://reactjs.org/)

</div>

---

## 📌 Overview

**InvesTrue** is a full-stack AI-powered investment research platform that simulates a professional investment committee. For any publicly traded stock, it synthesises live market data, a deterministic quantitative scoring engine, and a Gemini AI language model to deliver a structured **Bull vs Bear debate** with an explainable final recommendation.

The platform is designed around a core principle: **AI should augment quantitative analysis, never replace it.** The BUY / HOLD / SELL verdict is always derived from hard math first. The AI is then used to construct the qualitative thesis around that verdict.

> **Live Demo:** https://inves-true-h05dr4k89-tc12317878-5580s-projects.vercel.app

---

## 🚨 Problem Statement

Retail investors are flooded with contradictory opinions, clickbait headlines, and emotionally-driven market commentary. Professional-grade investment research tools (Bloomberg Terminal, FactSet) cost thousands of dollars per month and are inaccessible to most individuals.

InvesTrue solves this by providing:
- Institutional-quality quantitative scoring using live market data
- Structured Bull vs Bear argumentation to surface both sides of the trade
- An explainable, score-backed recommendation — not a black-box AI guess

---

## ✨ Key Features

### 🤖 AI Investment Committee
A panel of 12 simulated AI agents collaborates to produce a final investment thesis. Powered by Google Gemini, it generates bullish arguments, bearish counter-arguments, and a synthesised judge summary — all grounded in live data.

### ⚖️ Bull vs Bear Debate Engine
Every analysis surfaces a structured debate:
- **Bull Case** — quantitative and qualitative arguments supporting the long thesis
- **Bear Case** — risk factors and arguments against the position
- **Confidence scores** for each side, calculated independently

### 🧮 Deterministic Weighted Scoring Engine
The recommendation is never an AI hallucination. It is computed mathematically from 5 weighted factors using live Yahoo Finance data:

| Factor | Weight | Description |
|---|---|---|
| Momentum (52W Position) | 30% | Where the price sits in its yearly range |
| Market Cap Stability | 25% | Larger cap → more institutional backing |
| Daily Trend | 20% | Today's percentage price movement |
| Volatility (Beta) | 15% | How aggressively the stock swings |
| Sector Strength | 10% | Technology scores higher than Utilities, etc. |

Each factor is scored 0–5 and the weighted sum is normalised to a 0–100 confidence score, which maps to a **BUY / HOLD / SELL** recommendation.

### 📊 Explainable Recommendations
The score breakdown is fully transparent. Investors can see exactly which factors contributed to the final verdict and by how much — no black-box decisions.

### 📡 Live Market Data
All prices, market cap, 52-week ranges, beta, sector, and volume data are fetched in real-time from Yahoo Finance via the backend API. Data is cached for 5 minutes to optimise performance.

### 🌗 Dark / Light Theme
Premium responsive UI with smooth dark/light mode toggle, glassmorphism effects, and dynamic micro-animations.

---

## 🏗️ Architecture & Workflow

```
User enters a stock ticker (e.g. AAPL)
        │
        ▼
Frontend (React + Vite)
  → Sends GET /api/analyze/:ticker to backend
        │
        ▼
Backend (Node.js + Express)
  ┌─────────────────────────────────────────┐
  │  Step 1: Fetch live data from Yahoo      │
  │          Finance (price, market cap,     │
  │          52W high/low, beta, sector)     │
  │                                          │
  │  Step 2: Run Deterministic Scoring       │
  │          Engine (pure math, 5 factors,   │
  │          weighted → 0–100 score)         │
  │                                          │
  │  Step 3: Call Google Gemini AI with      │
  │          the live data + score to        │
  │          generate bull/bear thesis       │
  │                                          │
  │  Step 4: Assemble final JSON response    │
  └─────────────────────────────────────────┘
        │
        ▼
Frontend renders:
  - BUY / HOLD / SELL verdict
  - Confidence score
  - Bull Case panel
  - Bear Case panel
  - Score breakdown
  - Live market stats
  - AI Research Pipeline (12 agents)
```

---

## 🛠️ Tech Stack

### Frontend
| Technology | Purpose |
|---|---|
| React 19 + TypeScript | UI framework |
| Vite | Build tool & dev server |
| React Router v7 | Client-side routing |
| Vanilla CSS (CSS Variables) | Theming, dark mode, animations |
| Lucide React | Icon library |

### Backend
| Technology | Purpose |
|---|---|
| Node.js + Express 5 | REST API server |
| TypeScript | Type-safe backend |
| Google Gemini AI (`@google/generative-ai`) | Bull/bear thesis generation |
| yahoo-finance2 | Live market data |
| dotenv | Environment variable management |
| CORS | Cross-origin request handling |

### Deployment
| Service | Role |
|---|---|
| Vercel | Frontend hosting (CDN, global edge) |
| Render | Backend hosting (Node.js server) |
| GitHub | Source control & CI/CD |

---

## 🚀 Local Setup

### Prerequisites
- Node.js 18+ and npm
- A Google Gemini API key (free at https://ai.google.dev)

### 1. Clone the repository
```bash
git clone https://github.com/TanviChoudhary12317878/InvesTrue.git
cd InvesTrue
```

### 2. Configure environment variables
Create `server/.env`:
```env
GEMINI_API_KEY=your_gemini_api_key_here
```

### 3. Install dependencies and start both servers
```bash
npm install
npm run dev
```

This starts:
- **Frontend** at `http://localhost:5173`
- **Backend** at `http://localhost:5000`

> The root `package.json` uses `concurrently` to run both with a single command.

---

## 🌐 Deployment

| Layer | Platform | URL |
|---|---|---|
| Frontend | Vercel | https://inves-true-h05dr4k89-tc12317878-5580s-projects.vercel.app |
| Backend | Render | https://investrue.onrender.com |

### Environment Variables in Production
**Render (Backend):**
```
GEMINI_API_KEY = your_gemini_api_key
```

**Vercel (Frontend):**
```
VITE_API_URL = https://investrue.onrender.com
```

---

## 🔭 Future Improvements

- **Portfolio Tracker** — Allow users to add stocks to a watchlist and track aggregate portfolio risk score
- **Historical Analysis** — Time-series charts with annotated buy/sell signal markers
- **News Sentiment Layer** — Real-time news feed integrated into the AI thesis with source citations
- **Options Flow Integration** — Unusual options activity as an additional scoring signal
- **PDF Report Export** — Generate a one-page investment memo in PDF format for sharing
- **User Authentication** — Saved watchlists, custom alerts, and personalised feed
- **Multi-model Committee** — Allow the user to choose between Gemini, GPT-4o, and Claude for the AI committee

---

## 👩‍💻 Author

**Tanvi Choudhary**

[![GitHub](https://img.shields.io/badge/GitHub-TanviChoudhary12317878-181717?style=flat-square&logo=github)](https://github.com/TanviChoudhary12317878)

---

## 📄 License

This project was built as an independent learning and portfolio project. All rights reserved.

---

<div align="center">

Built with ❤️ using React, Node.js, and Google Gemini AI

⭐ If you found this useful, consider starring the repository!

</div>
