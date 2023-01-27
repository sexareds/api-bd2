import { Router } from 'express';
import { getTeams, getTeamsPaginated, getTeamById, createTeam, updateTeam, deleteTeam } from '../controllers/teams.controller.js';
import { verifyAdmin, verifyToken } from '../middleware/auth.js';


const router = Router();

router
  .get('/teams/all', verifyToken, getTeams)
  .get('/teams', verifyToken, getTeamsPaginated)
  .get('/teams/:teamId', verifyToken, getTeamById)
  .post('/teams', verifyToken, verifyAdmin, createTeam)
  .put('/teams/:teamId', verifyToken, verifyAdmin, updateTeam)
  .delete('/teams/:teamId', verifyToken, verifyAdmin, deleteTeam);

export default router;