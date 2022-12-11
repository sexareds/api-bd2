import { pool } from '../db.js';
import { getAll, getById, create, remove } from '../helper/methods.js';

const tableName = 'teams';
const tableId = 'team_id';

//method that gets all teams from the database
export const getTeams = (req, res) => {
  getAll(req, res, tableName);
};

//method that gets a team by id from the database
export const getTeamById = (req, res) => {
  getById(req, res, tableName, tableId);
};

//method that creates a new team in the database
export const createTeam = (req, res) => {
  const { team_name, event_id, badge } = req.body;
  create(req, res, tableName, 'team_name, event_id, badge', [team_name, event_id, badge]);
}

//method that updates a team by id in the database
export const updateTeam = async (req, res) => {
  const { team_name, event_id, badge } = req.body;
  try {
    const response = await pool.query(`UPDATE ${tableName} SET team_name = ?, event_id = ?, badge = ? WHERE ${tableId} = ?`, [team_name, event_id, badge, req.params.id]);
    if (!response[0].affectedRows) {
      return res.status(404).json({success: false, message: 'Team not found'});
    }
    res.status(200).json({
      success: true,
      message: `${tableName} updated successfully`,
      body: {
        team: { team_name, event_id, badge }
      }
    });
  } catch (e) {
    console.log(e);
    res.status(500).json('Internal Server Error');
  }
};

//method that deletes a team by id from the database
export const deleteTeam = (req, res) => {
  remove(req, res, 'teams', 'team_id');
};