import {pool} from '../Config/database.js'
import {executaQuery} from '../Config/dbInstance.js'

async function GetAllReceitas() {
    const conexao = await pool.getConnection()
    try{
        const query = "SELECT * FROM Receita"
        const res = executaQuery(conexao, query)
        return res;
    }
    catch (ex)
    {
        console.log(ex)
    }
    finally
    {
        conexao.release()
    }
}

async function GetReceitasByName(name) {
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

export {GetAllReceitas, GetReceitasByName}