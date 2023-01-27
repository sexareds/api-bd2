import { Router } from 'express';
import { getPromotions, createPromotion } from '../controllers/promotions.controller.js';
import { verifyAdmin, verifyToken } from '../middleware/auth.js';

const router = Router();

router
  .get('/promotions', verifyToken, getPromotions)
  .post('/promotions', verifyToken, verifyAdmin, createPromotion);

export default router;