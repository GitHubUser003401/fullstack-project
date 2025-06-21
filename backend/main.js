import express from 'express';
const app = express();
import DBconnection from "./Database/db.js";
import cors from 'cors';
import router from './Routes/router.js';
import dotenv from 'dotenv';
dotenv.config();

app.use(cors()); 
DBconnection();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/", router);

app.listen(process.env.PORT, () => {
    console.log(`Server is running on ${process.env.PORT}!`);
});
