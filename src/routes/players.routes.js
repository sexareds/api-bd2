import { Router } from 'express';
import { getPlayers, createPlayer, updatePlayer, deletePlayer } from "../controllers/players.controller.js";
import { verifyToken, verifyAdmin } from "../middleware/auth.js";

const router = Router();

router
  .get('/players/all', verifyToken, getPlayers)
  .post('/players', verifyToken, verifyAdmin, createPlayer)
  .put('/players/:playerId', verifyToken, verifyAdmin, updatePlayer)
  .delete('/players/:playerId', verifyToken, verifyAdmin, deletePlayer);

export default router;