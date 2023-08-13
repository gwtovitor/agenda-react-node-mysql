import express from "express";
import cors from "cors";
import db from "./src/db/db.js";
import router from "./src/routes/routes.js";

const app = express();

app.use(cors());
app.use(express.json());

app.use("/", router);

const server = app.listen(3333, () => console.log('Server is online on port 3333'));
