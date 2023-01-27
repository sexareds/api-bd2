import { pool } from '../database/db.js';

const getUsers = async () => {
  return await pool.query(`CALL get_all('users')`);
};

// a service method that gets a paginated list of users from the database
const getUsersPaginated = async (page, limit) => {
  return await pool.query(`CALL get_all_paginated('users', ?, ?)`, [page, limit]);
};

const getUserById = async (userId) => {
  return await pool.query(`CALL get_by_id('users', ?)`, [userId]);
};

// a service method that creates a new user in the database
const createUser = async (newUser) => {
  const userToInsert = {
    ...newUser,
    created_at: new Date(),
    updated_at: new Date()
  };
  return await pool.query(
    'INSERT INTO users(user_name, user_role, email, user_password, created_at, updated_at) VALUES(?, ?, ?, ?, ?, ?)', 
    Object.values(userToInsert)
  );
};

// a service method that updates an user in the database
const updateUser = async (userId, changes) => {
  const userToUpdate = {
    ...changes,
    updated_at: new Date()
  };
  return await pool.query(
    'UPDATE users SET user_name = ?, user_role = ?, email = ?, user_password = ?, updated_at = ? WHERE user_id = ?',
    [...Object.values(userToUpdate), userId]
  );
};

// a service method that deletes an user in the database
const deleteUser = async (userId) => {
  return await pool.query('DELETE FROM users WHERE user_id = ?', [userId]);
};

export const findUser = async (email) => {
  return await pool.query('SELECT * FROM users WHERE email = ?', [email]);
};

export const checkDailyReward = async (email) => {
  return await pool.query('SELECT daily_reward FROM users WHERE email = ?', [email]);
};

export default { getUsers, getUsersPaginated, getUserById, createUser, updateUser, deleteUser, findUser, checkDailyReward };
