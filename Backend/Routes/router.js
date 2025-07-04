import express from 'express';
import { registerCode } from '../Controller/RegisterCode.js';
import { loginCode } from '../Controller/LoginCode.js';
import { logout, protectRoute, verifyAuth } from '../Utils/AuthController.js';
import { ProblemlistCode } from '../Controller/ProblemCode.js';
const router = express.Router();

router.post('/register', registerCode)
router.post('/login', loginCode)

router.get('/verify-auth', verifyAuth);
router.post('/logout', logout);

router.get('/problemfetch', protectRoute, ProblemlistCode)

export default router;