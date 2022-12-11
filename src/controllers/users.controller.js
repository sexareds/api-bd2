import { getAll, getById, create, update, remove } from '../helper/methods.js';

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
export const updateUser = (req, res) => {
  const { user_name, user_role, email, user_password } = req.body;
  const columns = 'user_name = ?, user_role = ?, email = ?, user_password = ?';
  update(req, res, tableName, tableId, columns, [user_name, user_role, email, user_password]);
};

//a method that deletes an user by id from the database
export const deleteUser = (req, res) => {
  remove(req, res, tableName, tableId);
};