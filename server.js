import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import influencerRoutes from "./routes/influencerRoutes.js";
import campaignRoutes from "./routes/campaignRoutes.js";
import { errorHandler } from "./middleware/errorHandler.js";

dotenv.config();

const app = express();

// --------------------------------------------------
// ✅ CORS (works even if frontend is not created yet)
// --------------------------------------------------
app.use(cors({
  origin: "*",   // Allow all for now until frontend is deployed
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: false,   // No cookies needed yet
}));

// ❗ FIX: Express 5 does NOT allow "*" in OPTIONS — use "/*"
app.options("/*", cors());

// Body parser
app.use(express.json());

// Health check route
app.get("/", (req, res) => {
  res.json({ message: "Micro Influencer Platform API Running..." });
});

// API routes
app.use("/api/influencers", influencerRoutes);
app.use("/api/campaigns", campaignRoutes);

// Global error handler
app.use(errorHandler);

// Server start
const PORT = process.env.PORT || 5001;
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
