import express from "express";
import { compileCode, validateCompileRequest } from "../Controllers/Compile.js";
import { protectRoute } from "../Utils/AuthVerify.js";
import { limiter, reviewCode } from "../Controllers/Review.js";



const router = express.Router();


router.post("/compile", protectRoute, validateCompileRequest, compileCode);
router.post("/ai-review", protectRoute, limiter, reviewCode);

export default router;