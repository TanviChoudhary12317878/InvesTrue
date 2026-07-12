"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = __importDefault(require("dotenv"));
const analyze_1 = __importDefault(require("./routes/analyze"));
const quotes_1 = __importDefault(require("./routes/quotes"));
// Load environment variables from .env.local if present, else .env
dotenv_1.default.config({ path: "../.env.local" });
const app = (0, express_1.default)();
const PORT = process.env.PORT || 5000;
// Enable CORS so the React frontend can fetch data
app.use((0, cors_1.default)());
app.use(express_1.default.json());
// Register API routes
app.use("/api/analyze", analyze_1.default);
app.use("/api/quotes", quotes_1.default);
app.get("/api/health", (req, res) => {
    res.json({ status: "ok" });
});
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
