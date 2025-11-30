import db from "../db/db.js";

export const getAllCampaignsModel = () => {
  return db.query(`
    SELECT c.id, c.title, c.description, c.budget, c.status,
           c.created_at, u.name AS brand_name
    FROM campaigns c
    JOIN users u ON c.brand_id = u.id
    WHERE u.role = 'brand'
  `);
};

export const createCampaignModel = (data) => {
  return db.query(
    `INSERT INTO campaigns (brand_id, title, description, budget, status)
     VALUES (?, ?, ?, ?, ?)`,
    [data.brand_id, data.title, data.description, data.budget, data.status]
  );
};

export const updateCampaignModel = (id, data) => {
  return db.query(
    `UPDATE campaigns
     SET title=?, description=?, budget=?, status=?
     WHERE id=?`,
    [
      data.title,
      data.description,
      data.budget,
      data.status,
      id,
    ]
  );
};

export const deleteCampaignModel = (id) => {
  return db.query(`DELETE FROM campaigns WHERE id=?`, [id]);
};
