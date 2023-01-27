import { pool } from '../database/db.js';

export const getGames = async () => {
  return await pool.query(`CALL get_all('games')`);
};

const getGamesPaginated = async (page, limit) => {
  return await pool.query(`CALL get_all_paginated('games', ?, ?)`, [page, limit]);
};

const getGameById = async (gameId) => {
  return await pool.query(`CALL get_by_id('games', ?)`, [gameId]);
};

export const createGame = async (newGame) => {
  const gameToInsert = {
    ...newGame,
    created_at: new Date(),
    updated_at: new Date()
  };
  return await pool.query(
    'INSERT INTO games(team_1_id, team_2_id, matched_at, event_id, result, winner) VALUES(?, ?, ?, ?, ?, ?)', 
    Object.values(gameToInsert)
  );
};

export const updateGame = async (gameId, changes) => {
  return await pool.query(
    'UPDATE games SET team_1_id = ?, team_2_id = ?, matched_at = ?, event_id = ?, result = ?, winner = ? WHERE game_id = ?',
    [...Object.values(changes), gameId]
  );
};

export const deleteGame = async (gameId) => {
  return await pool.query('DELETE FROM games WHERE game_id = ?', [gameId]);
};

export default { getGames, getGamesPaginated, getGameById, createGame, updateGame, deleteGame };