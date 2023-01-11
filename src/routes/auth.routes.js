import express from 'express';
import { postLogin, postSignup, confirmMethod } from '../controllers/auth.controller.js';
import { validatePostLogin, validatePostSignUp } from '../helper/validations.js';

const router = express.Router();

router.post('/login', validatePostLogin, postLogin);
router.post('/signup', validatePostSignUp, postSignup);
router.get('/confirm/:token', confirmMethod);

export default router;