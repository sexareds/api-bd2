import express from 'express';
import { login, signup } from '../config/passport.js';

const router = express.Router();

router.post('/login', login);
router.post('/signup', signup);

export default router;