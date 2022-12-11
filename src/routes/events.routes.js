import { Router } from 'express';
import { getEvents, getEventById } from '../controllers/events.controller.js';

const router = Router();

router.get('/events/all', getEvents);

router.get('/events/:id', getEventById);

export default router;