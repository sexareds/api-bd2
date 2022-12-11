import { getAll, getById, create, update, remove } from '../helper/methods.js';

const TABLE_NAME = 'promotions';
const TABLE_ID = 'promotion_id';
const COLUMNS = 'alias, promotion_type, redirect_to, img, description';

// GET all promotions
export const getPromotions = (req, res) => {
  getAll(req, res, TABLE_NAME);
};

// method that creates a new promotion in the database
export const createPromotion = (req, res) => {
  const { alias, promotion_type, redirect_to, img, description } = req.body;
  create(req, res, TABLE_NAME, COLUMNS, [alias, promotion_type, redirect_to, img, description]);
};