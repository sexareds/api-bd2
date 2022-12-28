import { Router } from 'express';
import { getGames, createGame, updateGame, deleteGame } from '../controllers/games.controller.js';

const router = Router();

router.get('/games/all', getGames)
  .post('/games', createGame)
  .put('/games/:gameId', updateGame)
  .delete('/games/:gameId', deleteGame);

export default router;