import db from "../db/db.js";



async function Logar(values){
    const email = values.body.email;
    const senha = values.body.senha;
    console.log(email)
    console.log(senha)
    try {
        const [result] = await db.query("SELECT * FROM usuarios WHERE email = ? AND senha = ?", [email, senha]);
    
        if (result.length === 0) {
          return "Usuario ou Senha Inválidos"
          
        } else {
            console.log(result)
          return result;
        }
    
      } catch (error) {
        return "Erro ao realizar o cadastro.";
      }

}
export default Logar;