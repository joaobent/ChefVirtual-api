import { pool } from '../config/database.js';
import { executaQuery } from '../config/dbInstance.js';
import { DeleteCodigoVerificacao, GeraCodigoVerificacao, PostCodigoVerificacao, PutCodigoVerificacao } from './codigoVerificacao.js';

async function GetAllLogins() {
    const conexao = await pool.getConnection();
    try {
        const query = `SELECT * FROM login`;
        const resposta = await executaQuery(conexao, query);
        const res = resposta.map(login => ({
            id: login.id,
            email: login.email,
            senha: login.senha,
            codigo_verificacao_id: login.codigo_verificacao_id
        }));
        return res;
    } catch (error) {
        console.log(error);
        throw error;
    } finally {
        conexao.release();
    }
}

async function GetLoginById(id) {
    const conexao = await pool.getConnection();
    try {
        const query = `SELECT * FROM login WHERE id_usuario = ?`;
        const resposta = await executaQuery(conexao, query, [id]);
        const res = resposta.map(login => ({
            id: login.id,
            email: login.email,
            senha: login.senha,
            codigo_verificacao_id: login.codigo_verificacao_id
        }));
        return res;
    } catch (error) {
        console.log(error);
        throw error;
    } finally {
        conexao.release();
    }
}

async function PostLogin(email, senha, usuario) {
    const conexao = await pool.getConnection();
    try {
        const query = `INSERT INTO login (email, senha, codigo_verificacao_id, id_usuario) VALUES (?, ?, ?, ?)`;
        const codigo_verificacao = await PostCodigoVerificacao();
        const resposta = await executaQuery(conexao, query, [email, senha, codigo_verificacao.id, usuario]);
        return resposta;
    } catch (error) {
        console.log(error);
        throw error;
    } finally {
        conexao.release();
    }
}

async function PutLogin(id, email, senha) {
    const conexao = await pool.getConnection();
    try {
        const query = `UPDATE login SET email = ?, senha = ? WHERE id_usuario = ?`;
        await executaQuery(conexao, query, [email, senha, id]);
        const resultado = await GetLoginById(id);
        await PutCodigoVerificacao(resultado[0].codigo_verificacao_id);
    } catch (error) {
        console.log(error);
        throw error;
    } finally {
        conexao.release();
    }
}

async function PatchLogin(id, dados) {
    const conexao = await pool.getConnection();
    try {
        const campos = Object.keys(dados).map(campo => `${campo} = ?`).join(', ');
        const valores = Object.values(dados);
        const query = `UPDATE login SET ${campos} WHERE id_usuario = ?`;
        await executaQuery(conexao, query, [...valores, id]);
        const resultado = await GetLoginById(id);
        await PutCodigoVerificacao(resultado[0].codigo_verificacao_id);
    } catch (error) {
        console.log(error);
        throw error;
    } finally {
        conexao.release();
    }
}

async function DeleteLogin(id) {
    const conexao = await pool.getConnection();
    try {
        const resultado = GetLoginById(id);
        await DeleteCodigoVerificacao(resultado.id)
        const query = `DELETE FROM login WHERE id_usuario = ?`;
        await executaQuery(conexao, query, [id]);
    } catch (error) {
        console.log(error);
        throw error;
    } finally {
        conexao.release();
    }
}

export {
    GetAllLogins, GetLoginById, PostLogin, PutLogin, PatchLogin, DeleteLogin
};
