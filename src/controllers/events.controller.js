import { getAll, getById, create, remove } from '../helper/methods.js';

const TABLE_NAME = 'events';
const TABLE_ID = 'event_id';
const COLUMNS = 'event_name, img, is_active';

//method that gets all events from the database
export const getEvents = (req, res) => {
  getAll(req, res, TABLE_NAME);
};

//method that gets an event by id from the database
export const getEventById = (req, res) => {
  getById(req, res, TABLE_NAME, TABLE_ID);
};

//method that creates a new event in the database
export const createEvent = (req, res) => {
  const { event_name, img, is_active } = req.body;
  create(req, res, TABLE_NAME, COLUMNS, [event_name, img, is_active]);
};

//method that updates an event by id in the database
export const updateEvent = (req, res) => {
  const { event_name, img, is_active } = req.body;
  const columns = 'event_name = ?, img = ?, is_active = ?';
  update(req, res, TABLE_NAME, TABLE_ID, [event_name, img, is_active], columns);  
};

//method that deletes an event by id from the database
export const deleteEvent = (req, res) => {
  remove(req, res, TABLE_NAME, TABLE_ID);
};