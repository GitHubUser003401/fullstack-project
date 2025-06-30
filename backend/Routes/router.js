import express from 'express';
const router = express.Router();

import { registerCode, loginCode, anythingCode, ProblemlistCode, createProblemCode, AdminProblemsCode, getProblemById, updateProblemCode, deleteProblemCode } from '../Controllers/controller.js';
import tokenMiddleware from '../Utils/JWTmiddleware.js';
import isAdminMiddleware from '../Utils/Adminauthorization.js';

router.post("/register", registerCode);
router.post("/login", loginCode);
router.get("/anything", tokenMiddleware, anythingCode);
router.get("/problemLists", tokenMiddleware, ProblemlistCode);

router.post("/createProblem", tokenMiddleware, isAdminMiddleware, createProblemCode);
router.get('/adminProblems', tokenMiddleware, isAdminMiddleware, AdminProblemsCode);

router.get('/adminProblems/:id', tokenMiddleware, isAdminMiddleware, getProblemById);
router.put('/updateProblem/:id', tokenMiddleware, isAdminMiddleware, updateProblemCode);
router.delete('/deleteProblem/:id', tokenMiddleware, isAdminMiddleware, deleteProblemCode);
router.get('/ProblemID/:id', tokenMiddleware, getProblemById)


export default router;
