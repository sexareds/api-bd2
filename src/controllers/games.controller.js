import { getAll, getById, create, update, remove } from '../helper/methods.js';

const tableName = 'games';
const tableId = 'game_id';
const columns = 'event_id, team_1_id, team_2_id, matched_at';

// Get all games
export const getGames = (req, res) => {
  getAll(req, res, tableName);
};

// Get a game by id
export const getGameById = (req, res) => {
  getById(req, res, tableName, tableId);
};

// Create a game
export const createGame = (req, res) => {
  const { event_id, team_1_id, team_2_id, matched_at } = req.body;
  create(req, res, tableName, columns, [event_id, team_1_id, team_2_id, matched_at]);
};

//update a game by id
export const updateGame = (req, res) => {
  const { event_id, team_1_id, team_2_id, matched_at } = req.body;
  const columns = 'event_id = ?, team_1_id = ?, team_2_id = ?, matched_at = ?';
  update(req, res, tableName, tableId, columns, [event_id, team_1_id, team_2_id, matched_at]);
};

// Delete a game by id
export const deleteGame = (req, res) => {
  remove(req, res, tableName, tableId);
};