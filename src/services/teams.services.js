import { pool } from '../database/db.js';

export const getTeams = async () => {
  return await pool.query(`CALL get_all('teams')`);
};

export const createTeam = async (newTeam) => {
  const teamToInsert = {
    ...newTeam,
    created_at: new Date(),
    updated_at: new Date()
  };
  return await pool.query(
    'INSERT INTO teams(team_name, badge, created_at, updated_at) VALUES(?, ?, ?, ?)',
    Object.values(teamToInsert)
  );
};

export const updateTeam = async (teamId, changes) => {
  const teamToUpdate = {
    ...changes,
    updated_at: new Date()
  };
  return await pool.query(
    'UPDATE teams SET team_name = ?, badge = ?, updated_at = ? WHERE team_id = ?',
    [...Object.values(teamToUpdate), teamId]
  );
}

export const deleteTeam = async (teamId) => {
  return await pool.query('DELETE FROM teams WHERE team_id = ?', [teamId]);
};

export default { getTeams, createTeam, updateTeam, deleteTeam };