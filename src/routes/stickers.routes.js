import { Router } from 'express';
import { getStickers, createSticker, updateSticker, deleteSticker } from '../controllers/stickers.controller.js';

const router = Router();

router
  .get('/stickers/all', getStickers)
  .post('/stickers', createSticker)
  .put('/stickers/:stickerId', updateSticker)
  .delete('/stickers/:stickerId', deleteSticker);

export default router;