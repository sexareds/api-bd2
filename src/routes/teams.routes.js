import { Router } from 'express';
import { getTeams, getTeamById, createTeam, updateTeam, deleteTeam } from '../controllers/teams.controller.js';

const router = Router();

//Router for getting all teams
router.get('/teams/all', getTeams);

//Router for getting a team by id
router.get('/teams/:id', getTeamById);

//Router for creating a new team
router.post('/teams', createTeam);

//Router for updating a team by id
router.put('/teams/:id', updateTeam);

//Router for deleting a team by id
router.delete('/teams/:id', deleteTeam);

export default router;