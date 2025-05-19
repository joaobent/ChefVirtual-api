import pool from '../config/conexao.js';
import { executaQuery } from '../config/dbInstance.js';

// Função para obter todas as categorias
export async function GetAllCategorias() {
    const conexao = await pool.getConnection();
    try {
        const query = `SELECT * FROM categoria`;
        const resposta = await executaQuery(conexao, query);
        return resposta.map(categoria => ({
            id: categoria.id,
            nome: categoria.nome
        }));
    } catch (error) {
        console.log(error);
        throw new Error("Erro ao buscar categorias.");
    } finally {
        conexao.release();
    }
}

// Função para obter uma categoria pelo ID
export async function GetCategoriaById(id) {
    const conexao = await pool.getConnection();
    try {
        const query = `SELECT * FROM categoria WHERE id = ?`;
        const resposta = await executaQuery(conexao, query, [id]);

        if (resposta.length === 0) {
            throw new Error("Categoria não encontrada.");
        }

        const categoria = resposta[0];
        return {
            id: categoria.id,
            nome: categoria.nome
        };
    } catch (error) {
        console.log(error);
        throw new Error("Erro ao buscar categoria.");
    } finally {
        conexao.release();
    }
}

// Função para criar uma nova categoria
export async function PostCategoria(nome) {
    const conexao = await pool.getConnection();
    try {
        const query = `INSERT INTO categoria (nome) VALUES (?)`;
        const resultado = await executaQuery(conexao, query, [nome]);
        return {
            id: resultado.insertId,
            nome: nome
        };
    } catch (error) {
        console.log(error);
        throw new Error("Erro ao criar categoria.");
    } finally {
        conexao.release();
    }
}

// Função para atualizar uma categoria existente
export async function PutCategoria(id, nome) {
    const conexao = await pool.getConnection();
    try {
        const query = `UPDATE categoria SET nome = ? WHERE id = ?`;
        const resultado = await executaQuery(conexao, query, [nome, id]);
        return resultado.affectedRows > 0;
    } catch (error) {
        console.log(error);
        throw new Error("Erro ao atualizar categoria.");
    } finally {
        conexao.release();
    }
}

// Função para deletar uma categoria
export async function DeleteCategoria(id) {
    const conexao = await pool.getConnection();
    try {
        const query = `DELETE FROM categoria WHERE id = ?`;
        const resultado = await executaQuery(conexao, query, [id]);
        return resultado.affectedRows > 0;
    } catch (error) {
        console.log(error);
        throw new Error("Erro ao deletar categoria.");
    } finally {
        conexao.release();
    }
}
