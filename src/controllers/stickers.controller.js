import { getAll, getById, create, remove } from '../helper/methods.js';

const TABLE_NAME = 'stickers';
const TABLE_ID = 'sticker_id';
const COLUMNS = 'player_id, img, height, weight, event_id, team_id, position, appearance_rate';

//a method that gets all stickers from the database
export const getAllStickers = (req, res) => {
  getAll(req, res, TABLE_NAME);
};

//a method that gets a sticker by id from the database
export const getStickerById = (req, res) => {
  getById(req, res, TABLE_NAME, TABLE_ID);
};

//a method that creates a new sticker in the database
export const createSticker = (req, res) => {
  const { player_id, img, height, weight, event_id, team_id, position, appearance_rate } = req.body;
  create(req, res, TABLE_NAME, COLUMNS, [player_id, img, height, weight, event_id, team_id, position, appearance_rate]);
};

//a method that updates a sticker in the database
export const updateSticker = (req, res) => {
  const { player_id, img, height, weight, event_id, team_id, position, appearance_rate } = req.body;
  const columns = 'player_id = ?, img = ?, height = ?, weight = ?, event_id = ?, team_id = ?, position = ?, appearance_rate = ?';
  update(req, res, TABLE_NAME, TABLE_ID, columns, [player_id, img, height, weight, event_id, team_id, position, appearance_rate]);
};

//a method that deletes a sticker by id from the database
export const deleteSticker = (req, res) => {
  remove(req, res, TABLE_NAME, TABLE_ID);
};