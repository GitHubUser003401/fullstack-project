import express from "express";
import { compileCode } from "../Controllers/Compile.js";
import { protectRoute } from "../Utils/AuthVerify.js";



const router = express.Router();


router.post("/compile",protectRoute, compileCode);


export default router;