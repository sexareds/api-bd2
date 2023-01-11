import { Router } from 'express';
import { getPromotions, createPromotion, updatePromotion, deletePromotion } from '../controllers/promotions.controller.js';

const router = Router();

router
  .get('/promotions', getPromotions)
  .post('/promotions', createPromotion)
  .put('/promotions/:promotionId', updatePromotion)
  .delete('/promotions/:promotionId', deletePromotion);

export default router;