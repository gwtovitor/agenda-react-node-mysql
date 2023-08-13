import db from "../db/db.js";

async function getAgenda(id){
    try{
        const query = 
        `SELECT * FROM agenda WHERE user_id = ?`
        const [rows, fields] = await db.execute(query,[id]);
        return rows
    }catch(err){
        return err
    }
}

export default getAgenda;