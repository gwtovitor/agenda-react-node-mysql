// Importe o módulo de banco de dados aqui (substitua pelo caminho correto)
import db from "../db/db.js";

const Agenda = {
    create: async (nome, telefone, email, userId) => {
        const query = 
        `INSERT INTO agenda (nome, telefone, email, user_id)
        VALUES (?, ?, ?, ?)`;
        try {
            const [rows, fields] = await db.execute(query, [nome, telefone, email, userId]);
            return rows.insertId;
        } catch (err) {
            console.error("Erro ao criar contato na agenda", err);
            throw err;
        }
    },
    delete: async (id) => {
        const query = 
          `DELETE FROM agenda WHERE id = ?`;
        try {
          const [rows, fields] = await db.execute(query, [id]);
          return rows.affectedRows;
        } catch (err) {
          console.error("Erro ao excluir contato da agenda", err);
          throw err;
        }
      }
      
};

export default Agenda;
