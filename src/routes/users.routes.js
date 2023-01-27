import { Router } from 'express';
import { getUsers, getUsersPaginated, getUserById, createUser, updateUser, deleteUser } from '../controllers/users.controller.js';
import { verifyAdmin, verifyToken } from '../middleware/auth.js';	

const router = Router();

router
  .get('/users/all', verifyToken, verifyAdmin, getUsers)
  .get('/users', verifyToken, verifyAdmin, getUsersPaginated)
  .get('/users/:userId', verifyToken, verifyAdmin, getUserById)
  .post('/users', verifyToken, verifyAdmin, createUser)
  .put('/users/:userId', verifyToken, verifyAdmin, updateUser)
  .delete('/users/:userId', verifyToken, verifyAdmin, deleteUser);

export default router;