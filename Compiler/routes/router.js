import express from "express";
import { compileCode } from "../controllers/control.js";
import tokenMiddleware from "../../Backend/Utils/JWTmiddleware.js";
const router = express.Router();


router.post("/compile",  compileCode);


export default router;