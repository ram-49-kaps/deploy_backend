import express from "express";
import {
  getAllInfluencers,
  createInfluencer,
  updateInfluencer,
  deleteInfluencer,
} from "../controllers/influencerController.js";

const router = express.Router();

router.get("/", getAllInfluencers);
router.post("/", createInfluencer);
router.put("/:id", updateInfluencer);
router.delete("/:id", deleteInfluencer);

export default router;
