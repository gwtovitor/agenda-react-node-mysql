import express from "express";
import CadastrarUser from "../controller/userControler.js";
import {CadastrarAgenda, DeletarContato} from "../controller/agendaControler.js";
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
    const userID = req.query.id;
    const response = await getAgenda(userID);
    res.status(200).json(response);
  } catch (error) {
    res.status(500).json({ message: "Erro ao realizar o cadastro." + error });
  }
});
router.post("/salvaagenda", async (req, res) => {
  try {
    const response = await CadastrarAgenda(req);
    res.status(200).json(response);
  } catch (error) {
    res.status(500).json({ message: "Erro ao realizar o cadastro." + error });
  }
});
router.delete("/deletarAgenda", async (req, res) => {
  try {
    const { id } = req.query;
    const response = await DeletarContato(id);
    res.status(200).json(response);
  } catch (error) {
    res.status(500).json({ message: "Erro ao excluir o contato." });
  }
});


export default router;
