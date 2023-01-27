import { pool } from '../database/db.js';

const getEvents = async () => {
  return await pool.query(`CALL get_all('events')`);
};

export const getEventsPaginated = async (page, limit) => {
  return await pool.query(`CALL get_all_paginated('events', ?, ?)`, [page, limit]);
};

const getEventById = async (eventId) => {
  return await pool.query(`CALL get_by_id('events', ?)`, [eventId]);
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

export default { getEvents, getEventsPaginated, getEventById, createEvent, updateEvent, deleteEvent };