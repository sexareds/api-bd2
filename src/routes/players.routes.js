import { Router } from 'express';
import { getPlayers, createPlayer, updatePlayer, deletePlayer } from "../controllers/players.controller.js";

const router = Router();

router
  .get('/players/all', getPlayers)
  .post('/players', createPlayer)
  .put('/players/:playerId', updatePlayer)
  .delete('/players/:playerId', deletePlayer);

export default router;