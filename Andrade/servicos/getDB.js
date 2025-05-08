import pool from './conexao.js';

const puxarDados = async () => {
    const query = 'SELECT * FROM receita'; // Substitua pela sua consulta SQL desejada
    const query2 = 'SELECT * FROM ingrediente';

    try {
        const [rows] = await pool.query(query);
        const [rows2] = await pool.query(query2);
        return rows, rows2; // Retorna os dados obtidos da consulta

    } catch (error) {
        console.error('Erro ao executar a consulta:', error);
        throw error; // Lança o erro para ser tratado em outro lugar, se necessário
    }

}


export{puxarDados};
