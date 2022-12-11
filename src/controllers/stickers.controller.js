import { pool } from '../db.js';
import { getAll, getById, create, remove } from '../helper/methods.js';

const tableName = 'stickers';
const tableId = 'sticker_id';

//a method that gets all stickers from the database
export const getAllStickers = (req, res) => {
  getAll(req, res, tableName);
};

//a method that gets a sticker by id from the database
export const getStickerById = (req, res) => {
  getById(req, res, tableName, tableId);
};

//a method that creates a new sticker in the database
export const createSticker = (req, res) => {
  const { player_id, img, height, weight, event_id, team_id, position, appearance_rate } = req.body;
  create(req, res, tableName, 'player_id, img, height, weight, event_id, team_id, position, appearance_rate', [player_id, img, height, weight, event_id, team_id, position, appearance_rate]);
};

//a method that updates a sticker in the database
export const updateSticker = async (req, res) => {
  try {
    const { player_id, img, height, weight, event_id, team_id, position, appearance_rate } = req.body;
    const response = await pool.query('UPDATE stickers SET player_id = ?, img = ?, height = ?, weight = ?, event_id = ?, team_id = ?, position = ?, appearance_rate = ? WHERE sticker_id = ?', [player_id, img, height, weight, event_id, team_id, position, appearance_rate, req.params.id]);
    if (!response[0].affectedRows) {
      return res.status(404).json({Success: false, message: 'Sticker not found'});
    }
    res.status(200).json({
      Success: true, 
      message: 'Sticker updated successfully',
      body: {
        sticker: { player_id, img, height, weight, event_id, team_id, position, appearance_rate }
      }
    });
  } catch (e) {
    console.log(e);
    res.status(500).json('Internal Server Error');
  }
};

//a method that deletes a sticker by id from the database
export const deleteSticker = (req, res) => {
  remove(req, res, tableName, tableId);
};