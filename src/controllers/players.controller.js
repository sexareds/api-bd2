import { getAll, getById, create, remove } from '../helper/methods.js';

const TABLE_NAME = 'players';
const TABLE_ID = 'player_id';
const COLUMNS = 'first_name, last_name, team_id';

//method that gets all players from the database
export const getPlayers = (req, res) => {
  getAll(req, res, TABLE_NAME);
};

//method that gets a player by id from the database
export const getPlayerById = (req, res) => {
  getById(req, res, TABLE_NAME, TABLE_ID);
};

//method that creates a new player in the database
export const createPlayer = (req, res) => {
  const { first_name, last_name, team_id } = req.body;
  create(req, res, TABLE_NAME, COLUMNS, [first_name, last_name, team_id]);
};

//method that updates a player by id in the database
export const updatePlayer = (req, res) => {
  const { first_name, last_name, team_id } = req.body;
  const columns = 'first_name = ?, last_name = ?, team_id = ?';
  update(req, res, TABLE_NAME, TABLE_ID, columns, [first_name, last_name, team_id]);
};

//method that deletes a player by id from the database
export const deletePlayer = (req, res) => {
  remove(req, res, TABLE_NAME, TABLE_ID);
};