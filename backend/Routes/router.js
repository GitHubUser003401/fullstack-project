import express from 'express';
const router = express.Router();

import { registerCode, loginCode, anythingCode, ProblemlistCode, createProblemCode } from '../Controllers/controller.js';
import tokenMiddleware from '../Utils/JWTmiddleware.js';
import isAdminMiddleware from '../Utils/Adminauthorization.js';

router.post("/register", registerCode);
router.post("/login", loginCode);
router.get("/anything", tokenMiddleware, anythingCode);
router.get("/problemLists", tokenMiddleware, ProblemlistCode);
router.post("/createProblem", tokenMiddleware, isAdminMiddleware, createProblemCode)
export default router;
