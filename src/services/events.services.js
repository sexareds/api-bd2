import { pool } from '../database/db.js';

export const getEvents = async () => {
  return await pool.query(`CALL get_all('events')`);
};

export const createEvent = async (newEvent) => {
  const eventToInsert = {
    ...newEvent,
    created_at: new Date(),
    updated_at: new Date()
  };
  return await pool.query(
    'INSERT INTO events(event_name, img, is_active, created_at, updated_at) VALUES(?, ?, ?, ?, ?)', 
    Object.values(eventToInsert)
  );
};

export const updateEvent = async (eventId, changes) => {
  const eventToUpdate = {
    ...changes,
    updated_at: new Date()
  };
  return await pool.query(
    'UPDATE events SET event_name = ?, img = ?, is_active = ?, updated_at = ? WHERE event_id = ?',
    [...Object.values(eventToUpdate), eventId]
  );
};

export const deleteEvent = async (eventId) => {
  return await pool.query('DELETE FROM events WHERE event_id = ?', [eventId]);
};

export default { getEvents, createEvent, updateEvent, deleteEvent };