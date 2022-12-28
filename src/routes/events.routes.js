import { Router } from 'express';
import { getEvents, createEvent, updateEvent, deleteEvent } from '../controllers/events.controller.js';

const router = Router();

router
  .get('/events/all', getEvents)
  .post('/events', createEvent)
  .put('/events/:eventId', updateEvent)
  .delete('/events/:eventId', deleteEvent);

export default router;