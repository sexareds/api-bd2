import { Router } from 'express';
import { getStickers, createSticker, updateSticker, deleteSticker, getUserStickers } from '../controllers/stickers.controller.js';
import { checkDailyReward } from '../controllers/users.controller.js';
import { verifyAdmin, verifyDailyToken, verifyToken } from '../middleware/auth.js';

const router = Router();

router
  .get('/stickers/all', verifyToken, verifyAdmin, getStickers)
  .get('/stickers/user/stickers', verifyToken, getUserStickers)
  .get('/stickers/get-diary-status', verifyToken, checkDailyReward)
  .post('/stickers', verifyToken, verifyAdmin, createSticker)
  .put('/stickers/:stickerId', verifyToken, verifyAdmin, updateSticker)
  .delete('/stickers/:stickerId', verifyToken, verifyAdmin, deleteSticker)

export default router;