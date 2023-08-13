// Importe o módulo de banco de dados aqui (substitua pelo caminho correto)
import db from "../db/db.js";

const Agenda = {
    create: async (nome, telefone, email, userId) => {
        const query = 
        `INSERT INTO agenda (nome, telefone, email, id_users)
        VALUES (?, ?, ?, ?)`;
        try {
            const [rows, fields] = await db.execute(query, [nome, telefone, email, userId]);
            return rows.insertId;
        } catch (err) {
            console.error("Erro ao criar contato na agenda", err);
            throw err;
        }
    }
};

export default Agenda;
