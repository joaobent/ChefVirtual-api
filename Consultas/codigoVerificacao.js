import crypto from 'crypto';
import { pool } from '../config/database.js';
import { executaQuery } from '../config/dbInstance.js';

async function GeraCodigoVerificacao(tamanho = 6) {
    try {
        const codigoAleatorio = crypto.randomBytes(Math.ceil(tamanho / 2)).toString('hex').slice(0, tamanho);
        return codigoAleatorio;
    } catch (error) {
        console.log(error);
        throw error;
    }
}

async function GetAllCodigosVerificacao() {
    const conexao = await pool.getConnection();
    try {
        const query = `SELECT * FROM codigo_verificacao`;
        const resposta = await executaQuery(conexao, query);
        const res = resposta.map(codigo => ({
            id: codigo.id,
            codigo_verificacao: codigo.codigo_verificacao
        }));
        return res;
    } catch (error) {
        console.log(error);
        throw error;
    } finally {
        conexao.release();
    }
}

async function GetCodigoVerificacaoById(id) {
    const conexao = await pool.getConnection();
    try {
        const query = `SELECT * FROM codigo_verificacao WHERE id = ?`;
        const resposta = await executaQuery(conexao, query, [id]);
        const res = resposta.map(codigo => ({
            id: codigo.id,
            codigo_verificacao: codigo.codigo_verificacao
        }));
        return res;
    } catch (error) {
        console.log(error);
        throw error;
    } finally {
        conexao.release();
    }
}

async function PostCodigoVerificacao() {
    const conexao = await pool.getConnection();
    try {
        const query = `INSERT INTO codigo_verificacao (codigo_verificacao) VALUES (?)`;
        const codigo_verificacao = await GeraCodigoVerificacao()
        const resposta = await executaQuery(conexao, query, [codigo_verificacao]);
        return resposta;
    } catch (error) {
        console.log(error);
        throw error;
    } finally {
        conexao.release();
    }
}

async function PutCodigoVerificacao(id) {
    const conexao = await pool.getConnection();
    try {
        const query = `UPDATE codigo_verificacao SET codigo_verificacao = ? WHERE id = ?`;
        const codigo_verificacao = await GeraCodigoVerificacao()
        await executaQuery(conexao, query, [codigo_verificacao, id]);
    } catch (error) {
        console.log(error);
        throw error;
    } finally {
        conexao.release();
    }
}

async function DeleteCodigoVerificacao(id) {
    const conexao = await pool.getConnection();
    try {
        const query = `DELETE FROM codigo_verificacao WHERE id = ?`;
        await executaQuery(conexao, query, [id]);
    } catch (error) {
        console.log(error);
        throw error;
    } finally {
        conexao.release();
    }
}

export {
    GetAllCodigosVerificacao,
    GetCodigoVerificacaoById,
    PostCodigoVerificacao,
    PutCodigoVerificacao,
    DeleteCodigoVerificacao,
    GeraCodigoVerificacao
};
