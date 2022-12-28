import { Router } from 'express';
import { getPromotions, createPromotion } from '../controllers/promotions.controller.js';

const router = Router();

router
  .get('/promotions', getPromotions)
  .post('/promotions', createPromotion);

export default router;