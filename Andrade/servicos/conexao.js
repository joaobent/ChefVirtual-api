import mysql from 'mysql2/promise';

const pool = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: 'Joao@2008',  
  database: 'fslab', 
});

export default pool;