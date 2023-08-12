import express from "express";
import cors from "cors";
import db from "./src/db/db.js";
import Cadastrar from "./src/controller/userControler.js";
const app = express();

app.use(cors("*"));
app.use(express.json());
const server = app.listen(3333, () => console.log('Server is online on port 3333'));
app.use(express.json());
app.use(cors());


app.post("/registro", async (req, res) => {
    try {
      const response = await Cadastrar(req); 
      res.status(200).json({ message: response }); 
    } catch (error) {
      res.status(500).json({ message: "Erro ao realizar o cadastro." + error });
    }
  });
app.get("/", (req, res) => {
         
      
});


