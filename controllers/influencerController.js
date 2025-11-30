import db from "../db/db.js";
import {
  getAllInfluencersModel,
  updateInfluencerModel,
  deleteInfluencerModel,
} from "../models/influencerModel.js";


// ==============================
// GET ALL INFLUENCERS
// ==============================
export const getAllInfluencers = async (req, res) => {
  try {
    const [rows] = await getAllInfluencersModel();
    res.json(rows);
  } catch (err) {
    console.log("GET INFLUENCERS ERROR:", err);
    res.status(500).json({ error: "Failed to fetch influencers" });
  }
};


// ==============================
// CREATE INFLUENCER (AUTO-CREATE USER)
// ==============================
export const createInfluencer = async (req, res) => {
  const { name, email, platform, niche, followers, rate_per_post, bio } = req.body;

  try {
    // 1️⃣ Check if user already exists
    const [existing] = await db.query(
      "SELECT id FROM users WHERE email = ?",
      [email]
    );

    let userId;

    if (existing.length > 0) {
      // User exists — use existing id
      userId = existing[0].id;
    } else {
      // 2️⃣ Create new user
      const [userResult] = await db.query(
        `INSERT INTO users (name, email, role)
         VALUES (?, ?, 'influencer')`,
        [name, email]
      );
      userId = userResult.insertId;
    }

    // 3️⃣ Create influencer profile
    await db.query(
      `INSERT INTO influencer_profiles
        (user_id, platform, niche, followers, rate_per_post, bio)
       VALUES (?, ?, ?, ?, ?, ?)`,
      [userId, platform, niche, followers, rate_per_post, bio]
    );

    res.status(201).json({
      message: "Influencer created successfully",
      user_id: userId,
    });

  } catch (err) {
    console.log("CREATE INFLUENCER ERROR:", err);
    res.status(500).json({ error: "Failed to create influencer" });
  }
};



// ==============================
// UPDATE INFLUENCER
// ==============================
export const updateInfluencer = async (req, res) => {
  try {
    await updateInfluencerModel(req.params.id, req.body);
    res.json({ message: "Profile updated" });
  } catch (err) {
    console.log("UPDATE ERROR:", err);
    res.status(500).json({ error: "Failed to update influencer" });
  }
};


// ==============================
// DELETE INFLUENCER
// ==============================
export const deleteInfluencer = async (req, res) => {
  try {
    await deleteInfluencerModel(req.params.id);
    res.json({ message: "Influencer deleted" });
  } catch (err) {
    console.log("DELETE ERROR:", err);
    res.status(500).json({ error: "Failed to delete influencer" });
  }
};

