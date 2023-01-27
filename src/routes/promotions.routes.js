import { Router } from 'express';
import { getPromotions, createPromotion, updatePromotion, deletePromotion} from '../controllers/promotions.controller.js';
import { verifyAdmin, verifyToken } from '../middleware/auth.js';

const router = Router();

router
  .get('/promotions', verifyToken, getPromotions)
  .post('/promotions', verifyToken, verifyAdmin, createPromotion)
  .put('/promotions/:promotionId', verifyToken, verifyAdmin, updatePromotion)
  .delete('/promotions/:promotionId', verifyToken, verifyAdmin, deletePromotion);

export default router;