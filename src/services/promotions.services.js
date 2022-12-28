import { pool } from '../database/db.js';

export const getPromotions = async () => {
  return await pool.query(`CALL get_all('ads')`);
};

export const createPromotion = async (newPromotion) => {
  const promotionToInsert = {
    ...newPromotion,
    created_at: new Date(),
    updated_at: new Date(),
  };
  return await pool.query(
    `INSERT INTO ads(alias, promotion_type, redirect_to, img, description, created_at, updated_at) 
    VALUES(?, ?, ?, ?, ?, ?, ?)`,
    Object.values(promotionToInsert)
  );
};

export default { getPromotions, createPromotion };