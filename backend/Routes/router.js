import express from 'express';
const router = express.Router();

import { registerCode, loginCode, anythingCode, ProblemlistCode } from '../Controllers/controller.js';
import tokenMiddleware from '../Utils/JWTmiddleware.js';

router.post("/register", registerCode);
router.post("/login", loginCode);
router.get("/anything", tokenMiddleware, anythingCode);
router.get("/problemLists", tokenMiddleware, ProblemlistCode);
export default router;
