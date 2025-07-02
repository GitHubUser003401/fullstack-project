import express from 'express';
import { registerCode } from '../Controller/RegisterCode.js';
import { loginCode } from '../Controller/LoginCode.js';
const router = express.Router();

router.post('/register', registerCode)
router.post('/login', loginCode)

export default router;