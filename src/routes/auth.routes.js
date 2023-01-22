import express from 'express';
import { login } from '../config/passport.js';
import { postLogin, postSignup, confirmMethod } from '../controllers/auth.controller.js';
import { validatePostLogin, validatePostSignUp } from '../helper/validations.js';

const router = express.Router();

router.post('/login', login);
router.post('/signup', postSignup);

export default router;