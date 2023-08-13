import db from "../db/db.js";
import Agenda from "../model/contatoModel.js";


async function CadastrarAgenda(dados) {
  const nome = dados.body.nome;
  const telefone = dados.body.telefone;
  const email = dados.body.email;
  const userId = dados.body.userId;
  try {
    const [result] = await db.query("SELECT * FROM agenda WHERE user_id = ? AND (email = ? OR telefone = ?)", [userId, email, telefone]);

    if (result.length === 0) {
      const novaAgenda = await Agenda.create(nome, telefone, email, userId);
      return "Contato cadastrado com sucesso";
    } else {
      return "Email ou Telefone já existem para este usuário";
    }

  } catch (error) {
    return "Erro ao realizar o cadastro.";
  }
}

export default CadastrarAgenda;


async function DeletarContato(id) {


 try {
    const [result] = await db.query("SELECT * FROM agenda WHERE id = ?", [id]);
      if (result.length === 1) {
      const novaAgenda = await Agenda.delete(id);
      return "Contato deletado com sucesso"
      
    } else {
      return "Contato não encontrado";
    }

  } catch (error) {
    return "Erro ao realizar o cadastro.";
  }
}
export {CadastrarAgenda,DeletarContato };
