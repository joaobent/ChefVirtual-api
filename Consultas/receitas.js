import {pool} from '../Config/database.js'
import {executaQuery} from '../Config/dbInstance.js'

async function GetAllReceitas() {
    const conexao = await pool.getConnection()
    try{
        const query = 
                    `
                    SELECT 
                        r.*, 
                        u.*, 
                        ir.imagem as imagemReceita, 
                        iu.imagem as imagemUsuario
                    FROM Receita AS r
                    INNER JOIN imagensReceitas AS ir ON r.id = ir.idReceita
                    INNER JOIN Usuario AS u ON r.idUsuario = u.id
                    INNER JOIN imagensUsuarios as iu ON u.id = iu.idUsuario;
                    `
        const resQuery = await executaQuery(conexao, query)
        const res = resQuery.map(r => ({
            tituloReceita: r.tituloReceita,
            imagemReceita: r.imagemReceita,
            usuario: {
                id: r.idUsuario,
                nome: r.nome,
                email: r.email,
                idade: r.idade,
                facebook: r.facebook,
                instagram: r.instagram,
                youtube: r.youtube,
                imagemUsuario: r.imagemUsuario
            }
        }))

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