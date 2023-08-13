import db from "../db/db.js";
import bcrypt from "bcrypt";

async function Logar(values) {
  const email = values.body.email;
  const senha = values.body.senha;
  
  try {
    const [result] = await db.query("SELECT * FROM usuarios WHERE email = ?", [email]);
    if (result.length === 0) {
      return "Usuário ou Senha Inválidos";
    } else {
      const hashedPasswordFromDatabase = result[0].senha; 

      const isPasswordValid = await bcrypt.compare(senha, hashedPasswordFromDatabase);

      if (isPasswordValid) {
        return result[0].id;
      } else {
        return "Usuário ou Senha Inválidos";
      }
    }

  } catch (error) {
    return "Erro ao realizar o login.";
  }
}

export default Logar;
