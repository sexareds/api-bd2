import { Router } from 'express';
import { getPlayers, getPlayerById, createPlayer, updatePlayer, deletePlayer } from "../controllers/players.controller.js";

const router = Router();

//method that gets all players from the database
router.get('/players/all', getPlayers);

//method that gets a player by id from the database
router.get('/players/:id', getPlayerById);

//method that creates a new player in the database
router.post('/players', createPlayer);

//method that updates a player by id in the database
router.put('/players/:id', updatePlayer);

//method that deletes a player by id from the database
router.delete('/players/:id', deletePlayer);

export default router;