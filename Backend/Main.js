import express from 'express';
const app = express();
import DBconnection from "./Database/db.js";
import cors from 'cors';
import router from './Routes/router.js';
import cookieParser from 'cookie-parser';


app.use(cors({
    origin: process.env.CLIENT_URL,
    credentials: true,
}));

app.use(cookieParser()); 

DBconnection();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/', router);

app.listen(process.env.PORT, () => {
    console.log(`Server is running on ${process.env.PORT}!`);
});
