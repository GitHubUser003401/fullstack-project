import express from "express";
import cors from "cors";
import router from "./routes/router.js";
import dotenv from "dotenv";
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