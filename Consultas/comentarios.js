import pool from '../config/conexao.js'
import { executaQuery } from '../config/dbInstance.js'

export async function GetAllComentarios(idReceita) {
    const conexao = await pool.getConnection()
    try {
        const query = `
SELECT 
  c.usuario_id, 
  c.comentario, 
  u.nome AS nome_usuario,
  ROUND((
    SELECT f.avaliacao 
    FROM favoritos f 
    WHERE f.usuario_id = c.usuario_id 
    LIMIT 1
  ), 1) AS avaliacao
FROM comentarios c
JOIN usuario u ON c.usuario_id = u.id
WHERE c.receita_id = ?;
        `
        const resposta = await executaQuery(conexao, query, [idReceita])

        const res = resposta.map(comentario => ({
            receitaId: idReceita,
            usuarioId: comentario.usuario_id,
            nomeUsuario: comentario.nome_usuario,
            comentario: comentario.comentario,
            avaliacao: comentario.avaliacao ? parseFloat(comentario.avaliacao) : null
        }))

        return res

    } catch (error) {
        console.log(error)
        throw new Error("Erro ao buscar os comentários.")
    } finally {
        conexao.release()
    }
}


export async function PostComentario(receitaId, usuarioId, comentario) {
    const conexao = await pool.getConnection()
    try {
        const query = `INSERT INTO comentarios (usuario_id, receita_id, comentario) VALUES (?, ?, ?);`
        const resposta = await executaQuery(conexao, query, [usuarioId, receitaId, comentario])
        return resposta;
    } catch (error) {
        console.log(error)
        throw new Error("Erro ao realizar operação")
    } finally {
        conexao.release()
    }
}

export async function DeleteComentario(id) {
    const conexao = await pool.getConnection()
    try {
        const query = `DELETE FROM comentarios WHERE id = ?;`
        const resposta = await executaQuery(conexao, query, [id])
        return resposta;
    } catch (error) {
        console.log(error)
    } finally {
        conexao.release()
    }
}

