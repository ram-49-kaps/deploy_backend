import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import influencerRoutes from "./routes/influencerRoutes.js";
import campaignRoutes from "./routes/campaignRoutes.js";
import { errorHandler } from "./middleware/errorHandler.js";

dotenv.config();

const app = express();

// 🔥 CORS (no wildcard path needed)
app.use(cors({
  origin: "*",  // allow everything until frontend is ready
  methods: ["GET", "POST", "PUT", "DELETE"],
}));

app.use(express.json());

// Health route
app.get("/", (req, res) => {
  res.json({ message: "Micro Influencer Platform API Running..." });
});

// API routes
app.use("/api/influencers", influencerRoutes);
app.use("/api/campaigns", campaignRoutes);

// Global error handler
app.use(errorHandler);

const PORT = process.env.PORT || 5001;
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
