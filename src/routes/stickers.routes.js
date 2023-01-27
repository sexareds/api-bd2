import { Router } from 'express';
import { getStickers, createSticker, updateSticker, deleteSticker } from '../controllers/stickers.controller.js';
import { verifyAdmin, verifyToken } from '../middleware/auth.js';

const router = Router();

router
  .get('/stickers/all', verifyToken, verifyAdmin, getStickers)
  .post('/stickers', verifyToken, verifyAdmin, createSticker)
  .put('/stickers/:stickerId', verifyToken, verifyAdmin, updateSticker)
  .delete('/stickers/:stickerId', verifyToken, verifyAdmin, deleteSticker);

export default router;