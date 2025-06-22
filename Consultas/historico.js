import pool from '../config/conexao.js';
import { executaQuery } from '../config/dbInstance.js';

// Buscar o histórico de um usuário
export async function GetHistoricoByUsuario(idUsuario) {
    const conexao = await pool.getConnection();
    try {
        const query = `SELECT * FROM historico WHERE idUsuario = ? ORDER BY dataVisualizacao DESC`;
        const resultado = await executaQuery(conexao, query, [idUsuario]);
        return resultado;
    } catch (error) {
        console.log(error);
        throw new Error("Erro ao buscar histórico.");
    } finally {
        conexao.release();
    }
}

// Inserir item no histórico
export async function PostHistorico({ idUsuario, idReceita, nome, descricao }) {
    const conexao = await pool.getConnection();
    try {
        const query = `INSERT INTO historico (idUsuario, idReceita, nome, descricao, dataVisualizacao) VALUES (?, ?, ?, ?, NOW())`;
        const resultado = await executaQuery(conexao, query, [idUsuario, idReceita, nome, descricao]);
        return { id: resultado.insertId, idUsuario, idReceita, nome, descricao };
    } catch (error) {
        console.log(error);
        throw new Error("Erro ao inserir item no histórico.");
    } finally {
        conexao.release();
    }
}

// Limpar histórico do usuário
export async function DeleteHistoricoByUsuario(idUsuario) {
    const conexao = await pool.getConnection();
    try {
        const query = `DELETE FROM historico WHERE idUsuario = ?`;
        const resultado = await executaQuery(conexao, query, [idUsuario]);
        return resultado.affectedRows > 0;
    } catch (error) {
        console.log(error);
        throw new Error("Erro ao limpar histórico.");
    } finally {
        conexao.release();
    }
}
