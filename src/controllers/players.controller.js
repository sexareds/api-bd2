import { pool } from '../db.js';
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
export const updatePlayer = async (req, res) => {
  const { first_name, last_name, team_id } = req.body;
  try {
    const response = await pool.query(`UPDATE ${tableName} SET first_name = ?, last_name = ?, team_id = ? WHERE ${tableId} = ?`, [first_name, last_name, team_id, req.params.id]);
    if (!response[0].affectedRows) {
      return res.status(404).json({success: false, message: 'Team not found'});
    }
    res.status(200).json({
      success: true,
      message: `${tableName} updated successfully`,
      body: {
        team: { first_name, last_name, team_id }
      }
    });
  } catch (e) {
    console.log(e);
    res.status(500).json('Internal Server Error');
  }
};

//method that deletes a player by id from the database
export const deletePlayer = (req, res) => {
  remove(req, res, tableName, tableId);
};