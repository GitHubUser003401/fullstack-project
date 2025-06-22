import express from 'express';
const router = express.Router();

import { registerCode, loginCode } from '../Controllers/controller.js';

router.get("/", (req, res) => {
    res.send("Hello, World!, from the backend!");
});
router.get("/anything", (req, res) => {
    res.send("This is anything!");
});

router.post("/register", registerCode);

router.post("/login", loginCode);

export default router;
