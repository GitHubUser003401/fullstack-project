import express from "express";
import { compileCode } from "../Controllers/Compile.js";
import { protectRoute } from "../Utils/AuthVerify.js";
import { reviewCode } from "../Controllers/Review.js";



const router = express.Router();


router.post("/compile",protectRoute, compileCode);
router.post("/ai-review", protectRoute, reviewCode);

export default router;