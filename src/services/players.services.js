import { pool } from '../database/db.js';

export const getPlayers = async () => {
  return await pool.query(`CALL get_all('players')`);
};

export const createPlayer = async (newPlayer) => {
  return await pool.query(
    'INSERT INTO players(first_name, last_name, team_id, height, weight, position) VALUES(?, ?, ?, ?, ?, ?)', 
    Object.values(newPlayer)
  );
};

export const updatePlayer = async (playerId, changes) => {
  return await pool.query(
    'UPDATE players SET first_name = ?, last_name = ?, team_id = ?, height = ?, weight = ?, position = ? WHERE player_id = ?',
    [...Object.values(changes), playerId]
  );
};

export const deletePlayer = async (playerId) => {
  return await pool.query('DELETE FROM players WHERE player_id = ?', [playerId]);
};

export default { getPlayers, createPlayer, updatePlayer, deletePlayer };