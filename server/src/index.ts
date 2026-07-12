import express from "express";
import cors from "cors";
import dotenv from "dotenv";

import analyzeRouter from "./routes/analyze";
import quotesRouter from "./routes/quotes";

// Load environment variables from .env.local if present, else .env
dotenv.config({ path: "../.env.local" });

const app = express();
const PORT = process.env.PORT || 5000;

// Enable CORS so the React frontend can fetch data
app.use(cors());
app.use(express.json());

// Register API routes
app.use("/api/analyze", analyzeRouter);
app.use("/api/quotes", quotesRouter);

app.get("/api/health", (req, res) => {
  res.json({ status: "ok" });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
