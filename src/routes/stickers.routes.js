import { Router } from 'express';
import { getStickers, createSticker, updateSticker, deleteSticker, getUserStickers, getStickersPaginated, getStickerById } from '../controllers/stickers.controller.js';
import { checkDailyReward } from '../controllers/users.controller.js';
import { verifyAdmin, verifyToken } from '../middleware/auth.js';

const router = Router();

router
  .get('/stickers/all', verifyToken, verifyAdmin, getStickers)
  .get('/stickers/user/stickers', verifyToken, getUserStickers)
  .get('/stickers/get-diary-status', verifyToken, checkDailyReward)
  .get('/stickers', verifyToken, getStickersPaginated)
  .get('/stickers/:stickerId', verifyToken, getStickerById)
  .post('/stickers', verifyToken, verifyAdmin, createSticker)
  .put('/stickers/:stickerId', verifyToken, verifyAdmin, updateSticker)
  .delete('/stickers/:stickerId', verifyToken, verifyAdmin, deleteSticker)

export default router;