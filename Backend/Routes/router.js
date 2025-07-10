import express from 'express';
import { registerCode } from '../Controller/RegisterCode.js';
import { loginCode } from '../Controller/LoginCode.js';
import { logout } from '../Controller/logoutCode.js';
import { fetchproblemCode } from '../Controller/ProblemfetchCode.js';
import { protectRoute } from '../Utils/AuthController.js';
import { createProblemCode } from '../Controller/ProblemCreation.js';
import { updateProblemCode } from '../Controller/ProblemUpdate.js';
import { deleteProblemCode } from '../Controller/ProblemDelete.js';

const router = express.Router();

router.post('/register', registerCode)
router.post('/login', loginCode)

router.get('/logout', logout)

router.get('/fetchproblem', protectRoute, fetchproblemCode);
router.post('/createproblem', protectRoute, createProblemCode);

router.put('/updateproblem/:id', protectRoute, updateProblemCode);
router.delete('/deleteproblem/:id', protectRoute, deleteProblemCode);


export default router;