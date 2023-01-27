import { Router } from 'express';
import { getUsers, getUsersPaginated, getUserById, createUser, updateUser, deleteUser } from '../controllers/users.controller.js';

const router = Router();

router
  .get('/users/all', getUsers)
  .get('/users', getUsersPaginated)
  .get('/users/:userId', getUserById)
  .post('/users', createUser)
  .put('/users/:userId', updateUser)
  .delete('/users/:userId', deleteUser);

export default router;