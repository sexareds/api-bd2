import { getAll, getById, create, update, remove } from '../helper/methods.js';

const TABLE_NAME = 'teams';
const TABLE_ID = 'team_id';
const COLUMNS = 'team_name, event_id, badge';

//method that gets all teams from the database
export const getTeams = (req, res) => {
  getAll(req, res, TABLE_NAME);
};

//method that gets a team by id from the database
export const getTeamById = (req, res) => {
  getById(req, res, TABLE_NAME, TABLE_ID);
};

//method that creates a new team in the database
export const createTeam = (req, res) => {
  const { team_name, event_id, badge } = req.body;
  create(req, res, TABLE_NAME, COLUMNS, [team_name, event_id, badge]);
}

//method that updates a team by id in the database
export const updateTeam = (req, res) => {
  const { team_name, event_id, badge } = req.body;
  const columns = 'team_name = ?, event_id = ?, badge = ?';
  update(req, res, TABLE_NAME, TABLE_ID, [team_name, event_id, badge], columns);
};

//method that deletes a team by id from the database
export const deleteTeam = (req, res) => {
  remove(req, res, TABLE_NAME, TABLE_ID);
};