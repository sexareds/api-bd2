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

export const updatePromotion = async (promotionId, changes) => {
  const promotionToUpdate = {
    ...changes,
    updated_at: new Date()
  };
  return await pool.query(
    `UPDATE promotions SET alias = ?, promotion_type = ?, redirect_to = ?, img = ?, description = ?, updated_at = ? 
    WHERE promotion_id = ?`,
    [...Object.values(promotionToUpdate), promotionId]
  );
};

export const deletePromotion = async (promotionId) => {
  return await pool.query('DELETE FROM promotions WHERE promotion_id = ?', [promotionId]);
};

export default { getPromotions, createPromotion, updatePromotion, deletePromotion };