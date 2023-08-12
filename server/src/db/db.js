import mysql from 'mysql2/promise';

const db = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: 'ljjvps05',
  database: 'banco',
  port: 3307
});



export default db;