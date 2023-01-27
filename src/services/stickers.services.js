import { pool } from '../database/db.js';

export const getStickers = async () => {
  return await pool.query(`CALL get_all('stickers')`);
};

const getStickersPaginated = async (page, limit) => {
  return await pool.query(`CALL get_all_paginated('stickers', ?, ?)`, [page, limit]);
};

const getStickerById = async (stickerId) => {
  return await pool.query(`CALL get_by_id('stickers', ?)`, [stickerId]);
};

export const createSticker = async (newSticker) => {
  const stickerToInsert = {
    ...newSticker,
    created_at: new Date(),
    updated_at: new Date()
  };
  console.log(stickerToInsert);
  return await pool.query(
    'INSERT INTO stickers(player_id, img, event_id, team_id, appearance_rate, created_at, updated_at) VALUES(?, ?, ?, ?, ?, ?, ?)', 
    Object.values(stickerToInsert)
  );
};

export const updateSticker = async (stickerId, changes) => {
  const stickerToUpdate = {
    ...changes,
    updated_at: new Date()
  };
  return await pool.query(
    'UPDATE stickers SET player_id = ?, img = ?, event_id = ?, team_id = ?, appearance_rate = ?, updated_at = ? WHERE sticker_id = ?',
    [...Object.values(stickerToUpdate), stickerId]
  );
};

export const deleteSticker = async (stickerId) => {
  return await pool.query('DELETE FROM stickers WHERE sticker_id = ?', [stickerId]);
};

export const getUserStickers = async (email) => {
  return await pool.query('CALL get_all_stickers_of_user(?)', [email]);
};

export default { getStickers, createSticker, updateSticker, deleteSticker, getUserStickers };
