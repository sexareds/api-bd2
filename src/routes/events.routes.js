import { Router } from 'express';
import { getEvents, getEventById, createEvent, updateEvent, deleteEvent } from '../controllers/events.controller.js';

const router = Router();

//router that gets all events
router.get('/events/all', getEvents);

//router that gets an event by id
router.get('/events/:id', getEventById);

//router that creates a new event
router.post('/events', createEvent);

//router that updates an event by id
router.put('/events/:id', updateEvent);

//router that deletes an event by id
router.delete('/events/:id', deleteEvent);

export default router;