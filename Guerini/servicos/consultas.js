import pool from "./conexao.js";

export async function padrao(){
    const conexao = await pool.getConnection()
    const query = "SELECT * FROM Receita"
    const res = executaQuery(conexao, query)
    conexao.release()
    return res;
}

async function executaQuery(conexao, query){
    const resultado_query = await conexao.query(query)
    const resposta = resultado_query[0]
    return resposta
}