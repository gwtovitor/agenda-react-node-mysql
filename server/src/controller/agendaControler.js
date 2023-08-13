import db from "../db/db.js";
import Agenda from "../model/contatoModel.js";


async function CadastrarAgenda(dados) {
  
  const nome = dados.body.nome;
  const telefone = dados.body.telefone;
  const email = dados.body.email;
  const userId = dados.body.idUser;

  try {
    const [result] = await db.query("SELECT * FROM agenda WHERE email = ?", [email]);
    const [resultTelefone] = await db.query("SELECT * FROM agenda WHERE telefone = ?", [telefone]);

    if (result.length === 0 && resultTelefone.length === 0) {
      const novaAgenda = await Agenda.create(nome, telefone, email, userId);
      return "Usuario cadastrado com sucesso"
      
    } else {
      return "Email ou Telefone já existem";
    }

  } catch (error) {
    return "Erro ao realizar o cadastro.";
  }
}

export default CadastrarAgenda;
