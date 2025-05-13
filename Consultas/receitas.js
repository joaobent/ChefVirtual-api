import pool from '../config/conexao.js'
import { executaQuery } from '../config/dbInstance.js'

async function GetAllReceitas() {
    const conexao = await pool.getConnection()
    try {
        const query =
            `
                    SELECT 
                        r.*, 
                        u.id, u.nome, u.email, u.facebook, u.instagram, u.youtube, u.imagem AS imagemUsuario,

                        e.id AS etapaId,
                        e.numeroEtapa,
                        e.descricao AS etapaDescricao
                        
                        
                    FROM receita AS r
                    INNER JOIN usuario AS u ON r.usuario_id = u.id
                    LEFT JOIN etapa AS e ON r.id = e.receita_id
                    ORDER BY r.id DESC
                    `
        const resQuery = await executaQuery(conexao, query)
        const res = resQuery.map(r => ({
            tituloReceita: r.titulo,
            imagemReceita: r.imagem,
            descricao: r.descricao,
            //TODO: Fazer depos favoritos: r.favoritos,
            usuario: {
                id: r.id,
                nome: r.nome,
            },
            etapas: {
                id: r.etapaId,
                numeroEtapa: r.numeroEtapa,
                descricao: r.etapaDescricao
            }

        }))
        console.log(res)

        return res;
    }
    catch (ex) {
        console.log(ex)
    }
    finally {
        conexao.release()
    }
}

async function GetReceitasByTitle(name) {
    if (typeof name !== 'string')
        return

    const conexao = await pool.getConnection()
    try {
        const query =
            `SELECT r.nome
                    FROM receita AS r
                    WHERE r.nome LIKE ?
                    `;

        const search = `%${name}%`
        const res = await executaQuery(conexao, query, [search])
        return res;
    }
    catch (ex) {
        console.log(ex)
    }
    finally {
        conexao.release()
    }
}

async function GetReceitasByUser(userId) {
    if (typeof userId !== 'number')
        return

    const conexao = await pool.getConnection()
    try {
        const query =
            `SELECT r.nome, u.nome
                    FROM receita AS r
                    INNER JOIN usuario as u ON r.usuario_id = u.id
                    `;

        const res = executaQuery(conexao, query)
        return res;
    }
    catch (ex) {
        console.log(ex)
    }
    finally {
        conexao.release()
    }
}

async function UpdateReceitasPartial(userId, dados) {
    if (typeof userId !== 'number')
        return

    const conexao = await pool.getConnection()
    try {
        const campos = Object.keys(dados).map(campo => `${campo} = ?`).join(', ');
        const valores = Object.values(dados);

        console.log(`Campos: ${campos}`)
        console.log(`Valores: ${valores}`)

        const query = `UPDATE Receita SET ${campos} WHERE id = ?`;
        await executaQuery(conexao, query, [...valores, userId]);

        const res = executaQuery(conexao, query)
        return res;
    }
    catch (ex) {
        console.log(ex)
    }
    finally {
        conexao.release()
    }
}

export {
    GetAllReceitas, GetReceitasByTitle, GetReceitasByUser,
    UpdateReceitasPartial
}