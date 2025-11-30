import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import influencerRoutes from "./routes/influencerRoutes.js";
import campaignRoutes from "./routes/campaignRoutes.js";
import { errorHandler } from "./middleware/errorHandler.js";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.json({ message: "Micro Influencer Platform API Running..." });
});

app.use("/api/influencers", influencerRoutes);
app.use("/api/campaigns", campaignRoutes);

// Global error handler
app.use(errorHandler);

const PORT = process.env.PORT || 5001;
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
