import { pool } from '../db.js';
import { getAll, getById, create, remove } from '../helper/methods.js';

const tableName = 'users';
const tableId = 'user_id';

//a method that gets all users from the database
export const getUsers = (req, res) => {
  getAll(req, res, tableName);
};

//a method that gets an user by id from the database
export const getUserById = (req, res) => {
  getById(req, res, tableName, tableId);
};

//a method that creates a new user in the database
export const createUser = (req, res) => {
  const { user_name, user_role, email, user_password } = req.body;
  create(req, res, tableName, 'user_name, user_role, email, user_password', [user_name, user_role, email, user_password]);
};

//a method that updates and user by id in the database
export const updateUser = async (req, res) => {
  try {
    const id = req.params.id;
    const { user_name, user_role, email, user_password } = req.body;
    const response = await pool.query('UPDATE users SET user_name = ?, user_role = ?, email = ?, user_password = ? WHERE user_id = ?', [user_name, user_role, email, user_password, id]);
    if (!response[0].affectedRows) {
      return res.status(404).json({Success: false, message: 'User not found'});
    }
    res.status(200).json({
      success: true,
      message: 'User updated successfully',
      body: {
        user: { user_name, user_role, email, user_password }
      }
    });
  } catch (e) {
    console.log(e);
    res.status(500).json('Internal Server Error');
  }
};

//a method that deletes an user by id from the database
export const deleteUser = (req, res) => {
  remove(req, res, tableName, tableId);
};