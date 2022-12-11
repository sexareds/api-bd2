import { getAll, getById, create, remove } from '../helper/methods.js';

const tableName = 'players';
const tableId = 'player_id';

//method that gets all players from the database
export const getPlayers = (req, res) => {
  getAll(req, res, tableName);
};

//method that gets a player by id from the database
export const getPlayerById = (req, res) => {
  getById(req, res, tableName, tableId);
};

//method that creates a new player in the database
export const createPlayer = (req, res) => {
  const { first_name, last_name, team_id } = req.body;
  create(req, res, tableName, 'first_name, last_name, team_id', [first_name, last_name, team_id]);
};

//method that updates a player by id in the database
export const updatePlayer = (req, res) => {
  const { first_name, last_name, team_id } = req.body;
  const columns = 'first_name = ?, last_name = ?, team_id = ?';
  update(req, res, tableName, tableId, columns, [first_name, last_name, team_id]);
};

//method that deletes a player by id from the database
export const deletePlayer = (req, res) => {
  remove(req, res, tableName, tableId);
};