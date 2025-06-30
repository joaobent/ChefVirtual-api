import pool from '../config/conexao.js';
import { executaQuery } from '../config/dbInstance.js';

//Buscar o histórico de um usuário com dados da receita
export async function GetHistoricoByUsuario(idUsuario) {
    const conexao = await pool.getConnection();
    try {
        const query = `
            SELECT 
                h.id AS id,
                h.usuario_id,
                h.receita_id,
                h.data_visualizacao,
                r.titulo,
                r.descricao,
                r.imagem
            FROM historico h
            INNER JOIN receita r ON h.receita_id = r.id
            WHERE h.usuario_id = ?
            ORDER BY h.data_visualizacao DESC
        `;
        const resultado = await executaQuery(conexao, query, [idUsuario]);
        return resultado;
    } catch (error) {
        console.log(error);
        throw new Error("Erro ao buscar histórico.");
    } finally {
        conexao.release();
    }
}

//Inserir item no histórico (sem nome/descrição redundante)
export async function PostHistorico({ idUsuario, idReceita }) {
    const conexao = await pool.getConnection();
    try {
        const query = `
            INSERT INTO historico (usuario_id, receita_id, data_visualizacao)
            VALUES (?, ?, NOW())
        `;
        const resultado = await executaQuery(conexao, query, [idUsuario, idReceita]);
        return {
            id: resultado.insertId,
            idUsuario,
            idReceita
        };
    } catch (error) {
        console.log(error);
        throw new Error("Erro ao inserir item no histórico.");
    } finally {
        conexao.release();
    }
}

// 🗑️ Limpar histórico do usuário
export async function DeleteHistoricoByUsuario(idUsuario) {
    const conexao = await pool.getConnection();
    try {
        const query = `DELETE FROM historico WHERE usuario_id = ?`;
        const resultado = await executaQuery(conexao, query, [idUsuario]);
        return resultado.affectedRows > 0;
    } catch (error) {
        console.log(error);
        throw new Error("Erro ao limpar histórico.");
    } finally {
        conexao.release();
    }
}
