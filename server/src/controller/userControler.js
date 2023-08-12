import db from "../db/db.js";

async function Cadastrar(dados) {
  const email = dados.body.email;
  const senha = dados.body.senha;
  const telefone = dados.body.telefone;
  const nome = dados.body.nome;
  try {
    const [result] = await db.query("SELECT * FROM usuarios WHERE email = ?", [email]);
    const [resultTelefone] = await db.query("SELECT * FROM usuarios WHERE telefone = ?", [telefone]);

    if (result.length === 0 && resultTelefone.length === 0) {
      await db.query(
        "INSERT INTO usuarios (email, senha, telefone, createAt, nome) VALUES (?, ?, ?, NOW(), ?)",
        [email, senha, telefone, nome]
      );
      return "Usuario cadastrado com sucesso"
      
    } else {
      return "Email ou Telefone já existem";
    }

  } catch (error) {
    return "Erro ao realizar o cadastro.";
  }
}

export default Cadastrar;
