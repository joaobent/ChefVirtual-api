IMPORTANTE: NÃO ESQUECA DE ADICIONAR O ARQUIVO NO .gitignore CASO AINDA NÃO ESTEJA.

Conexão do ava

import mysql from 'mysql2/promise'

const pool = mysql.createPool(
    {
        host: '200.129.130.149', 
        user: 'chefvirtual',
        port: 20002,
        password: '12345678',
        database: 'chefvirtual_db',
        waitForConnections: true,
    }
)


export default pool;