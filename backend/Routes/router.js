import express from 'express';
const router = express.Router();

import { registerCode, loginCode, anythingCode } from '../Controllers/controller.js';
import tokenMiddleware from '../Utils/JWTmiddleware.js';

router.post("/register", registerCode);
router.post("/login", loginCode);
router.get("/anything", tokenMiddleware, anythingCode);

export default router;
