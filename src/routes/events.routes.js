import { Router } from 'express';
import { getEvents, getEventsPaginated, getEventById, createEvent, updateEvent, deleteEvent } from '../controllers/events.controller.js';

const router = Router();

router
  .get('/events/all', getEvents)
  .get('/events', getEventsPaginated)
  .get('/events/:eventId', getEventById)
  .post('/events', createEvent)
  .put('/events/:eventId', updateEvent)
  .delete('/events/:eventId', deleteEvent);

export default router;