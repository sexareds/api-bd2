import { getAll, getById, create, remove } from '../helper/methods.js';

const tableName = 'events';
const tableId = 'event_id';

//method that gets all events from the database
export const getEvents = (req, res) => {
  getAll(req, res, tableName);
};

//method that gets an event by id from the database
export const getEventById = (req, res) => {
  getById(req, res, tableName, tableId);
};

//method that creates a new event in the database
export const createEvent = (req, res) => {
  const { event_name, img, is_active } = req.body;
  create(req, res, tableName, 'event_name, img, is_active', [event_name, img, is_active]);
};

//method that updates an event by id in the database
export const updateEvent = (req, res) => {
  const { event_name, img, is_active } = req.body;
  const columns = 'event_name = ?, img = ?, is_active = ?';
  update(req, res, tableName, tableId, [event_name, img, is_active], columns);  
};

//method that deletes an event by id from the database
export const deleteEvent = (req, res) => {
  remove(req, res, tableName, tableId);
};