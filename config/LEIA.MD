Deve ser criado no repositório de cada um, um arquivo (Dentro desta pasta) chamado: database.js

Ele deve conter a seguinte estrutura:

import mysql from 'mysql2/promise'

const pool = mysql.createPool(
    {
        host: 'seu_host', 
        user: 'seu_user',
        password: 'sua_password',
        database: 'seu_db',
        waitForConnections: true,
    }
)

export default pool;

Ele deve ser criado para fazer a SUA CONEXAO com seu DB local.

IMPORTANTE: NÃO ESQUECA DE ADICIONAR O ARQUIVO NO .gitignore CASO AINDA NÃO ESTEJA.