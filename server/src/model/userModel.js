import db from "../db/db.js";


const User = {
    create: async (nome, telefone, email, senha) => {
        const query = 
        `INSERT INTO usuarios (nome, telefone, email, createAt, senha)
        VALUES (?,?,?,NOW(),?)`;
        try{
            const [rows, fields] = await db.execute(query, [nome, telefone, email, senha])
            return rows.insertId;
        }catch(err){
            console.error("Erro ao criar contato", err)
            throw err
        }
    }
}

export default User;