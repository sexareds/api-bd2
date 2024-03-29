import { Router } from 'express';
import { getGames, getGamesPaginated, getGameById, createGame, updateGame, deleteGame } from '../controllers/games.controller.js';
import { verifyAdmin, verifyToken } from '../middleware/auth.js';


const router = Router();

router
  .get('/games/all', verifyToken, getGames)
  .get('/games', verifyToken, getGamesPaginated)
  .get('/games/:gameId', verifyToken, getGameById)
  .post('/games', verifyToken, verifyAdmin, createGame)
  .put('/games/:gameId', verifyToken, verifyAdmin, updateGame)
  .delete('/games/:gameId', verifyToken, verifyAdmin, deleteGame);

export default router;