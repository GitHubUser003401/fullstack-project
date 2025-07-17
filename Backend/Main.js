import express from 'express';
const app = express();
import DBconnection from "./Database/db.js";
import cors from 'cors';
import router from './Routes/router.js';
import cookieParser from 'cookie-parser';
import { DefaultAdmins } from './Utils/DefaultAdmins.js';


app.use(cors({
    origin: [
        process.env.CLIENT_URL,
        process.env.COMPILER_URL // Compiler URL
    ],
    credentials: true,
}));

app.use(cookieParser()); 

DBconnection().then(() => {
    DefaultAdmins();
});

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/', router);

app.listen(process.env.PORT, () => {
    console.log(`Server is running on ${process.env.PORT}!`);
});
