import { Router } from 'express';
import { getUsers, getUserById, createUser, updateUser, deleteUser } from '../controllers/users.controller.js';

const router = Router();

//router that gets all users
router.get('/users/all', getUsers);

//router that gets an user by id
router.get('/users/:id', getUserById);

//router that creates a new user
router.post('/users', createUser);

//router that updates an user by id
router.put('/users/:id', updateUser);

//router that deletes an user by id
router.delete('/users/:id', deleteUser);

export default router;