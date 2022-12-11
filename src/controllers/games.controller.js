import { getAll, getById, create, update, remove } from '../helper/methods.js';

const TABLE_NAME = 'games';
const TABLE_ID = 'game_id';
const COLUMNS = 'event_id, team_1_id, team_2_id, matched_at';

// Get all games
export const getGames = (req, res) => {
  getAll(req, res, TABLE_NAME);
};

// Get a game by id
export const getGameById = (req, res) => {
  getById(req, res, TABLE_NAME, TABLE_ID);
};

// Create a game
export const createGame = (req, res) => {
  const { event_id, team_1_id, team_2_id, matched_at } = req.body;
  create(req, res, TABLE_NAME, COLUMNS, [event_id, team_1_id, team_2_id, matched_at]);
};

//update a game by id
export const updateGame = (req, res) => {
  const { event_id, team_1_id, team_2_id, matched_at } = req.body;
  const columns = 'event_id = ?, team_1_id = ?, team_2_id = ?, matched_at = ?';
  update(req, res, TABLE_NAME, TABLE_ID, columns, [event_id, team_1_id, team_2_id, matched_at]);
};

// Delete a game by id
export const deleteGame = (req, res) => {
  remove(req, res, TABLE_NAME, TABLE_ID);
};