import pool from "./conexao.js";

export async function padrao(){
    const conexao = await pool.getConnection()
    try{
        const query = "SELECT * FROM Receita"
        const res = executaQuery(conexao, query)
        return res;
    }
    catch (ex){
        console.log(ex)
    }
    finally{
        conexao.release()
    }
}

export async function GetReceitasByName(name) {
    if (typeof name !== 'string')
        return

    const conexao = await pool.getConnection()
    try{
        const query = 
                    `SELECT r.nome, ir.imagem
                    FROM Receita AS r
                    INNER JOIN imagensReceitas AS ir ON r.id = ir.idReceita
                    WHERE r.nome LIKE ?
                    `;

        const search = `%${name}%`
        const res = executaQuery(conexao, query, [search])
        return res;
    }
    catch (ex){
        console.log(ex)
    }
    finally{
        conexao.release()
    }
}

async function executaQuery(conexao, query, params = []){
    const [resultado] = await conexao.query(query, params)
    return resultado
}