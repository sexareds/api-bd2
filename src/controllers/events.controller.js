import { pool } from '../db.js';

//method that gets all events from the database
export const getEvents = async (req, res) => {
  try {
    const response = await pool.query('SELECT * FROM events');
    if (!response[0].length) {
      return res.status(404).json({success: false, message: 'No events found'});
    }
    res.status(200).json(response[0]);
  } catch (e) {
    console.log(e);
  }
}

//method that gets an event by id from the database
export const getEventById = async (req, res) => {
  try {
    const event_id = req.params.id;
    const response = await pool.query('SELECT * FROM events WHERE event_id = ?', [event_id]);
    if (!response[0].length) {
      return res.status(404).json({success: false, message: 'Event not found'});
    }
    res.status(200).json(response[0]);
  } catch (e) {
    console.log(e);
    res.status(500).json('Internal Server Error');
  }
};
