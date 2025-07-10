import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import router from "./Routes/C_router.js";
dotenv.config();

const app = express();


app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/", router)


app.get("/", (req, res) => {
    res.send("Compiler server is running");
});

app.listen(process.env.PORT, () => {
    console.log(`Compiler server is running on port ${process.env.PORT}`);
});