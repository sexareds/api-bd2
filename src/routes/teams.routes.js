import { Router } from 'express';
import { getTeams, createTeam, updateTeam, deleteTeam } from '../controllers/teams.controller.js';

const router = Router();

router
  .get('/teams/all', getTeams)
  .post('/teams', createTeam)
  .put('/teams/:teamId', updateTeam)
  .delete('/teams/:teamId', deleteTeam);

export default router;