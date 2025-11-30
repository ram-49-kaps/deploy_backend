import db from "../db/db.js";

// ==============================
// GET ALL INFLUENCERS
// ==============================
export const getAllInfluencersModel = () => {
  return db.query(`
    SELECT ip.id, u.name, u.email, ip.platform, ip.niche,
           ip.followers, ip.rate_per_post, ip.bio
    FROM influencer_profiles ip
    JOIN users u ON ip.user_id = u.id
    WHERE u.role = 'influencer'
  `);
};


// ==============================
// UPDATE INFLUENCER PROFILE
// ==============================
export const updateInfluencerModel = (id, data) => {
  return db.query(
    `UPDATE influencer_profiles
     SET platform = ?, niche = ?, followers = ?, rate_per_post = ?, bio = ?
     WHERE id = ?`,
    [
      data.platform,
      data.niche,
      data.followers,
      data.rate_per_post,
      data.bio,
      id,
    ]
  );
};


// ==============================
// DELETE INFLUENCER PROFILE
// ==============================
export const deleteInfluencerModel = (id) => {
  return db.query(
    "DELETE FROM influencer_profiles WHERE id = ?",
    [id]
  );
};

