import { pool } from '../config/database.js';
import { executaQuery } from '../config/dbInstance.js';

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
        const query = `SELECT * FROM login WHERE id = ?`;
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

async function PostLogin(email, senha, codigo_verificacao_id) {
    const conexao = await pool.getConnection();
    try {
        const query = `INSERT INTO login (email, senha, codigo_verificacao_id) VALUES (?, ?, ?)`;
        const resposta = await executaQuery(conexao, query, [email, senha, codigo_verificacao_id]);
        return resposta;
    } catch (error) {
        console.log(error);
        throw error;
    } finally {
        conexao.release();
    }
}

async function PutLogin(id, email, senha, codigo_verificacao_id) {
    const conexao = await pool.getConnection();
    try {
        const query = `UPDATE login SET email = ?, senha = ?, codigo_verificacao_id = ?  WHERE id = ?`;
        await executaQuery(conexao, query, [email, senha, codigo_verificacao_id, id]);
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
        const query = `UPDATE login SET ${campos} WHERE id = ?`;
        await executaQuery(conexao, query, [...valores, id]);
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
        const query = `DELETE FROM login WHERE id = ?`;
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
