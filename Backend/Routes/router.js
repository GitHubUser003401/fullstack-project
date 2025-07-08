import express from 'express';
import { registerCode } from '../Controller/RegisterCode.js';
import { loginCode } from '../Controller/LoginCode.js';
import { logout } from '../Controller/logoutCode.js';
import { fetchproblemCode } from '../Controller/ProblemfetchCode.js';
import { protectRoute } from '../Utils/AuthController.js';

const router = express.Router();

router.post('/register', registerCode)
router.post('/login', loginCode)

router.get('/logout', logout)

router.get('/fetchproblem', protectRoute, fetchproblemCode);

export default router;