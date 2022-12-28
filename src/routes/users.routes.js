import { Router } from 'express';
import { getUsers, createUser, updateUser, deleteUser } from '../controllers/users.controller.js';

const router = Router();

router
  .get('/users/all', getUsers)
  .post('/users', createUser)
  .put('/users/:userId', updateUser)
  .delete('/users/:userId', deleteUser);

export default router;