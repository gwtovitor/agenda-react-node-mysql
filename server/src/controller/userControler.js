import db from "../db/db.js";
import User from "../model/userModel.js";
import bcrypt from "bcrypt";

async function CadastrarUser(dados) {
  const email = dados.body.email;
  const senha = dados.body.senha;
  const telefone = dados.body.telefone;
  const nome = dados.body.nome;

  try {
    const [result] = await db.query("SELECT * FROM usuarios WHERE email = ?", [email]);
    const [resultTelefone] = await db.query("SELECT * FROM usuarios WHERE telefone = ?", [telefone]);

    if (result.length === 0 && resultTelefone.length === 0) {
      const saltRounds = 10; // Número de iterações para o bcrypt
      const hashedPassword = await bcrypt.hash(senha, saltRounds); // Faz o hash da senha

      const novoUsuario = await User.create(nome, telefone, email, hashedPassword); // Salva a senha hasheada no banco de dados
      return "Usuário cadastrado com sucesso";
    } else {
      return "Email ou Telefone já existem";
    }

  } catch (error) {
    return "Erro ao realizar o cadastro.";
  }
}

export default CadastrarUser;
