// Consultas/comentarios.js

import pool from '../config/conexao.js'
import { executaQuery } from '../config/dbInstance.js'

export async function GetAllComentarios() {
    const conexao = await pool.getConnection()
    try {
        const query = `SELECT * FROM comentarios;`
        const resposta = await executaQuery(conexao, query)
        const res = resposta.map(comentario => ({
            id: comentario.id,
            receitaId: comentario.receita_id,
            usuarioId: comentario.usuario_id,
            comentario: comentario.comentario
        }))
        return res;

    } catch (error) {
        console.log(error)
    } finally {
        conexao.release()
    }
}


export async function GetComentariosById(id) {
    const conexao = await pool.getConnection()
    try {
        const query = `SELECT * FROM comentario WHERE id = ?;`
        const resposta = await executaQuery(conexao, query, [id])
        const res = resposta.map(comentario => ({
            id: comentario.id,
            receitaId: comentario.receita_id,
            usuarioId: comentario.usuario_id,
            comentario: comentario.comentario
        }))
        return res;

    } catch (error) {
        console.log(error)
    } finally {
        conexao.release()
    }
}


export async function PostComentario(receitaId, usuarioId, comentario) {
    const conexao = await pool.getConnection()
    try {
        const query = `INSERT INTO comentario (receita_id, usuario_id, comentario) VALUES (?, ?, ?);`
        const resposta = await executaQuery(conexao, query, [receitaId, usuarioId, comentario])
        return resposta;
    } catch (error) {
        console.log(error)
    } finally {
        conexao.release()
    }
}

export async function DeleteComentario(id) {
    const conexao = await pool.getConnection()
    try {
        const query = `DELETE FROM comentario WHERE id = ?;`
        const resposta = await executaQuery(conexao, query, [id])
        return resposta;
    } catch (error) {
        console.log(error)
    } finally {
        conexao.release()
    }
}

