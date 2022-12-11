import { getAll, getById, create, update, remove } from '../helper/methods.js';

const tableName = 'promotions';
const table_id = 'promotion_id';
const columns = 'alias, promotion_type, redirect_to, img, description';

// GET all promotions
export const getPromotions = (req, res) => {
  getAll(req, res, tableName);
};

// method that creates a new promotion in the database
export const createPromotion = (req, res) => {
  const { alias, promotion_type, redirect_to, img, description } = req.body;
  create(req, res, tableName, columns, [alias, promotion_type, redirect_to, img, description]);
};