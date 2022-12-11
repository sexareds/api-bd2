import { getAll, getById, create, update, remove } from '../helper/methods.js';

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
export const updateTeam = (req, res) => {
  const { team_name, event_id, badge } = req.body;
  const columns = 'team_name = ?, event_id = ?, badge = ?';
  update(req, res, tableName, tableId, [team_name, event_id, badge], columns);
};

//method that deletes a team by id from the database
export const deleteTeam = (req, res) => {
  remove(req, res, 'teams', 'team_id');
};