import db from "../db/db.js";
import {
  getAllCampaignsModel,
  createCampaignModel,
  updateCampaignModel,
  deleteCampaignModel,
} from "../models/campaignModel.js";

// ==============================
// GET ALL CAMPAIGNS
// ==============================
export const getAllCampaigns = async (req, res) => {
  try {
    const [rows] = await getAllCampaignsModel();
    res.json(rows);
  } catch (err) {
    console.log("GET CAMPAIGNS ERROR:", err);
    res.status(500).json({ error: "Failed to fetch campaigns" });
  }
};

// ==============================
// CREATE CAMPAIGN (AUTO-CREATE BRAND USER)
// ==============================
export const createCampaign = async (req, res) => {
  const {
    brand_name,
    brand_email,
    title,
    description,
    budget,
    status,
  } = req.body;

  try {
    // 1️⃣ CHECK IF BRAND USER ALREADY EXISTS
    const [existingBrand] = await db.query(
      "SELECT id FROM users WHERE email = ?",
      [brand_email]
    );

    let brandId;

    if (existingBrand.length > 0) {
      // Brand already exists — reuse ID
      brandId = existingBrand[0].id;
    } else {
      // 2️⃣ CREATE NEW BRAND USER
      const [newBrand] = await db.query(
        `INSERT INTO users (name, email, role)
         VALUES (?, ?, 'brand')`,
        [brand_name, brand_email]
      );
      brandId = newBrand.insertId;
    }

    // 3️⃣ INSERT CAMPAIGN WITH VALID brand_id
    const [result] = await createCampaignModel({
      brand_id: brandId,
      title,
      description,
      budget,
      status,
    });

    res.status(201).json({
      id: result.insertId,
      brand_id: brandId,
      message: "Campaign created successfully",
    });

  } catch (err) {
    console.log("CREATE CAMPAIGN ERROR:", err);
    res.status(500).json({ error: "Failed to create campaign" });
  }
};

// ==============================
// UPDATE CAMPAIGN
// ==============================
export const updateCampaign = async (req, res) => {
  try {
    await updateCampaignModel(req.params.id, req.body);
    res.json({ message: "Campaign updated" });
  } catch (err) {
    console.log("UPDATE CAMPAIGN ERROR:", err);
    res.status(500).json({ error: "Failed to update campaign" });
  }
};

// ==============================
// DELETE CAMPAIGN
// ==============================
export const deleteCampaign = async (req, res) => {
  try {
    await deleteCampaignModel(req.params.id);
    res.json({ message: "Campaign deleted" });
  } catch (err) {
    console.log("DELETE CAMPAIGN ERROR:", err);
    res.status(500).json({ error: "Failed to delete campaign" });
  }
};
