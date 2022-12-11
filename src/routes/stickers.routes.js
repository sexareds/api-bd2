import { Router } from 'express';
import { getAllStickers, getStickerById, createSticker, updateSticker, deleteSticker } from '../controllers/stickers.controller.js';

const router = Router();

//Router for GET /api/stickers/all
router.get('/stickers/all', getAllStickers);

//Router for GET /api/stickers/:id
router.get('/stickers/:id', getStickerById);

//Router for POST /api/stickers
router.post('/stickers', createSticker);

//Router for PUT /api/stickers/:id
router.put('/stickers/:id', updateSticker);

//Router for DELETE /api/stickers/:id
router.delete('/stickers/:id', deleteSticker);

export default router;