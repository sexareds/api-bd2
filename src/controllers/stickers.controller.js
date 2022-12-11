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
export const updateSticker = (req, res) => {
  const { player_id, img, height, weight, event_id, team_id, position, appearance_rate } = req.body;
  const columns = 'player_id = ?, img = ?, height = ?, weight = ?, event_id = ?, team_id = ?, position = ?, appearance_rate = ?';
  update(req, res, tableName, tableId, columns, [player_id, img, height, weight, event_id, team_id, position, appearance_rate]);
};

//a method that deletes a sticker by id from the database
export const deleteSticker = (req, res) => {
  remove(req, res, tableName, tableId);
};