import {pool} from '../Config/database.js'
import {executaQuery} from '../Config/dbInstance.js'

async function GetAllReceitas() {
    const conexao = await pool.getConnection()
    try{
        const query = 
                    `SELECT Receita.*, Usuario.* 
                    FROM Receita 
                    INNER JOIN Usuario ON Receita.idUsuario = Usuario.id;
                    `
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

async function GetReceitasByTitle(name) {
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

async function GetReceitasByUser(userId) {
    if (typeof userId !== 'number')
        return

    const conexao = await pool.getConnection()
    try{
        const query = 
                    `SELECT r.nome, ir.imagem, u.nome
                    FROM Receita AS r
                    INNER JOIN imagensReceitas AS ir ON r.id = ir.idReceita
                    INNER JOIN Usuario as u ON r.idUsuario = u.id
                    `;

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

export {GetAllReceitas, GetReceitasByTitle, GetReceitasByUser}