import { Router } from 'express';
import { getTeams, getTeamsPaginated, getTeamById, createTeam, updateTeam, deleteTeam } from '../controllers/teams.controller.js';

const router = Router();

router
  .get('/teams/all', getTeams)
  .get('/teams', getTeamsPaginated)
  .get('/teams/:teamId', getTeamById)
  .post('/teams', createTeam)
  .put('/teams/:teamId', updateTeam)
  .delete('/teams/:teamId', deleteTeam);

export default router;