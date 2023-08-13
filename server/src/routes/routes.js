import express from "express";
import CadastrarUser from "../controller/userControler.js";
import CadastrarAgenda from "../controller/agendaControler.js";
import Logar from "../controller/loginControler.js";
import getAgenda from "../view/agendaView.js";

const router = express.Router();

router.post("/registro", async (req, res) => {
  try {
    const response = await CadastrarUser(req);
    res.status(200).json({ message: response });
  } catch (error) {
    res.status(500).json({ message: "Erro ao realizar o cadastro." + error });
  }
});
router.post("/agendacadastro", async (req, res) => {
  try {
    const response = await CadastrarAgenda(req);
    res.status(200).json({ message: response });
  } catch (error) {
    res.status(500).json({ message: "Erro ao realizar o cadastro." + error });
  }
});
router.post("/login", async (req, res) => {
  try {
    const response = await Logar(req);
    res.status(200).json({ message: response });
  } catch (error) {
    res.status(500).json({ message: "Erro ao realizar o cadastro." + error });
  }
});
router.get("/getagenda", async (req, res) => {
  try {
    const response = await getAgenda(req);
    res.status(200).json(response);
  } catch (error) {
    res.status(500).json({ message: "Erro ao realizar o cadastro." + error });
  }
});

export default router;
