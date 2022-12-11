import { Router } from 'express';
import { getGames, getGameById, createGame, updateGame, deleteGame } from '../controllers/games.controller.js';

const router = Router();

// Router GET /api/games/all
router.get('/games/all', getGames);

// Router GET /api/games/:id
router.get('/games/:id', getGameById);

// Router POST /api/games
router.post('/games', createGame);

// Router PUT /api/games/:id
router.put('/games/:id', updateGame);

// Router DELETE /api/games/:id
router.delete('/games/:id', deleteGame);

export default router;