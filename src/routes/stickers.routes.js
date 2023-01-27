import { Router } from 'express';
import { getStickers, createSticker, updateSticker, deleteSticker, getStickersPaginated, getStickerById } from '../controllers/stickers.controller.js';

const router = Router();

router
  .get('/stickers/all', getStickers)
  .get('/stickers', getStickersPaginated)
  .get('/stickers/:stickerId', getStickerById)
  .post('/stickers', createSticker)
  .put('/stickers/:stickerId', updateSticker)
  .delete('/stickers/:stickerId', deleteSticker);

export default router;