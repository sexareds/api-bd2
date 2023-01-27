import { Router } from 'express';
import { getGames, getGamesPaginated, getGameById, createGame, updateGame, deleteGame } from '../controllers/games.controller.js';

const router = Router();

router
  .get('/games/all', getGames)
  .get('/games', getGamesPaginated)
  .get('/games/:gameId', getGameById)
  .post('/games', createGame)
  .put('/games/:gameId', updateGame)
  .delete('/games/:gameId', deleteGame);

export default router;