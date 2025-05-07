import mysql from 'mysql2/promise'

const pool = mysql.createPool(
    {
        host: 'localhost',
        user: 'root',
        password: 'TESTE',
        database: 'fslab'
    }
)

export default pool;