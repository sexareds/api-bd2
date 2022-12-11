import { Router } from 'express';
import { getPromotions, createPromotion } from '../controllers/promotions.controller.js';

const router = Router();

// Router GET /promotions/all
router.get('/promotions', getPromotions);

// Router POST /promotions/create
router.post('/promotions', createPromotion);

export default router;