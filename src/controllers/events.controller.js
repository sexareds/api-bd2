import { pool } from '../db.js';
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
export const updateEvent = async (req, res) => {
  const { event_name, img, is_active } = req.body;
  try {
    const response = await pool.query('UPDATE events SET event_name = ?, img = ?, is_active = ? WHERE event_id = ?', [event_name, img, is_active, req.params.id]);
    if (!response[0].affectedRows) {
      return res.status(404).json({success: false, message: 'Event not found'});
    }
    res.status(200).json({
      success: true,
      message: 'Event updated successfully',
      body: {
        event: { event_name, img, is_active }
      }
    });
  } catch (e) {
    console.log(e);
    res.status(500).json('Internal Server Error');
  }
};

//method that deletes an event by id from the database
export const deleteEvent = (req, res) => {
  remove(req, res, tableName, tableId);
};