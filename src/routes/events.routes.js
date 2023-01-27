import { Router } from 'express';
import { getEvents, createEvent, updateEvent, deleteEvent } from '../controllers/events.controller.js';
import { verifyAdmin, verifyToken } from '../middleware/auth.js';

const router = Router();

router
  .get('/events/all', verifyToken, getEvents)
  .post('/events', verifyToken, verifyAdmin, createEvent)
  .put('/events/:eventId', verifyToken, verifyAdmin, updateEvent)
  .delete('/events/:eventId', verifyToken, verifyAdmin, deleteEvent);

export default router;