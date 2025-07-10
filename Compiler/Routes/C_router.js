import express from "express";
import { compileCode } from "../Controllers/Compile.js";

const router = express.Router();


router.post("/compile",  compileCode);


export default router;