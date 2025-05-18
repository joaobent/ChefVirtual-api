import pool from '../config/conexao.js'
import { executaQuery } from '../config/dbInstance.js'


export async function GetTodosFavoritos() {
    const conexao = await pool.getConnection()
    try {
        const query = `
            SELECT f.usuario_id, f.receita_id, u.nome AS nomeUsuario, r.titulo AS tituloReceita
            FROM favoritos f
            INNER JOIN usuario u ON f.usuario_id = u.id
            INNER JOIN receita r ON f.receita_id = r.id
        `
        const resultados = await executaQuery(conexao, query)
        return resultados
    } finally {
        conexao.release()
    }
}

export async function GetFavoritosPorUsuario(usuarioId) {
    const conexao = await pool.getConnection()
    try {
        const query = `
            SELECT f.usuario_id, f.receita_id
            FROM favoritos f
            WHERE f.usuario_id = ?
        `
        return await executaQuery(conexao, query, [usuarioId])
    } finally {
        conexao.release()
    }
}

export async function GetFavoritosUsuarioReceita(usuarioId, receitaId) {
    const conexao = await pool.getConnection()
    try {
        const query = `
            SELECT f.usuario_id, f.receita_id
            FROM favoritos f
            WHERE f.usuario_id = ? AND f.receita_id = ?
        `
        return await executaQuery(conexao, query, [usuarioId, receitaId])
    } finally {
        conexao.release()
    }
}

export async function InserirFavorito(usuarioId, receitaId) {
    const conexao = await pool.getConnection()
    try {
        const query = `INSERT INTO favoritos (usuario_id, receita_id) VALUES (?, ?)`
        return await executaQuery(conexao, query, [usuarioId, receitaId])
    } finally {
        conexao.release()
    }
}

export async function AtualizarFavorito(usuarioId, receitaId, novoUsuarioId, novaReceitaId) {
    const conexao = await pool.getConnection()
    try {
        const query = `
            UPDATE favoritos
            SET usuario_id = ?, receita_id = ?
            WHERE usuario_id = ? AND receita_id = ?
        `
        return await executaQuery(conexao, query, [novoUsuarioId, novaReceitaId, usuarioId, receitaId])
    } finally {
        conexao.release()
    }
}
