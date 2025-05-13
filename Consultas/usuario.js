import pool from '../config/conexao.js'
import { executaQuery } from '../config/dbInstance.js'

async function GetAllUsuario() {
    const conexao = await pool.getConnection()
    try {
        const query = `SELECT usuario.id, usuario.nome, usuario.email, usuario.facebook, usuario.instagram, usuario.youtube, login.senha, codigo_verificacao.codigo_verificacao FROM usuario INNER JOIN login ON usuario.id = login.id_usuario INNER JOIN codigo_verificacao ON login.codigo_verificacao_id = codigo_verificacao.id;`;
        const resposta = await executaQuery(conexao, query)
        const res = resposta.map(usuario => ({
            id: usuario.id,
            nome: usuario.nome,
            email: usuario.email,
            facebook: usuario.facebook,
            instagram: usuario.instagram,
            youtube: usuario.youtube,
            senha: usuario.senha,
            codigoVerificacao: usuario.codigo_verificacao
        }))
        return res;
    } catch (error) {
        console.log(error)
    } finally {
        conexao.release()
    }
}


async function GetUsuarioByName(name) {
    const conexao = await pool.getConnection()
    try {
        const query = `SELECT usuario.id, usuario.nome, usuario.email, usuario.facebook, usuario.instagram, usuario.youtube, login.senha, codigo_verificacao.codigo_verificacao FROM usuario INNER JOIN login ON usuario.id = login.id_usuario INNER JOIN codigo_verificacao ON login.codigo_verificacao_id = codigo_verificacao.id WHERE usuario.nome LIKE ?;`;
        const search = `%${name}%`
        const resposta = await executaQuery(conexao, query, [search])
        const res = resposta.map(usuario => ({
            id: usuario.id,
            nome: usuario.nome,
            email: usuario.email,
            facebook: usuario.facebook,
            instagram: usuario.instagram,
            youtube: usuario.youtube,
            imagemUsuario: usuario.imagemUsuario
        }))
        return res;
    } catch (error) {
        console.log(error)
    } finally {
        conexao.release()
    }
}

async function GetUsuarioByEmail(email) {
    const conexao = await pool.getConnection()
    try {
        const query = `SELECT usuario.id, usuario.nome, usuario.email, usuario.facebook, usuario.instagram, usuario.youtube, login.senha, codigo_verificacao.codigo_verificacao FROM usuario INNER JOIN login ON usuario.id = login.id_usuario INNER JOIN codigo_verificacao ON login.codigo_verificacao_id = codigo_verificacao.id WHERE usuario.email LIKE ?;`;
        const search = `%${email}%`
        const resposta = await executaQuery(conexao, query, [search])
        const res = resposta.map(usuario => ({
            id: usuario.id,
            nome: usuario.nome,
            email: usuario.email,
            facebook: usuario.facebook,
            instagram: usuario.instagram,
            youtube: usuario.youtube,
            imagemUsuario: usuario.imagemUsuario
        }))
        return res;
    } catch (error) {
        console.log(error)
    } finally {
        conexao.release()
    }
}

async function GetUsuarioById(id) {
    const conexao = await pool.getConnection()
    try {
        const query = `SELECT usuario.id, usuario.nome, usuario.email, usuario.facebook, usuario.instagram, usuario.youtube, login.senha, codigo_verificacao.codigo_verificacao FROM usuario INNER JOIN login ON usuario.id = login.id_usuario INNER JOIN codigo_verificacao ON login.codigo_verificacao_id = codigo_verificacao.id WHERE usuario.id = ?;`;
        const resposta = await executaQuery(conexao, query, [id])
        const res = resposta.map(usuario => ({
            id: usuario.id,
            nome: usuario.nome,
            email: usuario.email,
            facebook: usuario.facebook,
            instagram: usuario.instagram,
            youtube: usuario.youtube,
            imagemUsuario: usuario.imagemUsuario
        }))
        return res;
    } catch (error) {
        console.log(error)
    } finally {
        conexao.release()
    }
}


async function PostUsuario(nome, email, imagem, facebook, instagram, youtube) {
    const conexao = await pool.getConnection();
    try {
        const query = `INSERT INTO usuario (nome, email, imagem, facebook, instagram, youtube) VALUES (?, ?, ?, ?, ?, ?)`;
        const resposta = await executaQuery(conexao, query, [nome, email, imagem, facebook, instagram, youtube]);
        return resposta;
    } catch (error) {
        console.log(error);
        throw error;
    } finally {
        conexao.release();
    }
}



async function PutUsuario(id, nome, email, imagem, facebook, instagram, youtube) {
    const conexao = await pool.getConnection();
    try {
        const query = `UPDATE usuario SET nome = ?, email = ?, imagem = ?, facebook = ?, instagram = ?, youtube = ? WHERE id = ?`;
        await executaQuery(conexao, query, [nome, email, imagem, facebook, instagram, youtube, id]);
    } catch (error) {
        console.log(error);
        throw error;
    } finally {
        conexao.release();
    }
}


async function PatchUsuario(id, dados) {
    const conexao = await pool.getConnection();
    try {
        const campos = Object.keys(dados).map(campo => `${campo} = ?`).join(', ');
        const valores = Object.values(dados);
        const query = `UPDATE usuario SET ${campos} WHERE id = ?`;
        await executaQuery(conexao, query, [...valores, id]);
    } catch (error) {
        console.log(error);
        throw error;
    } finally {
        conexao.release();
    }
}

async function DeleteUsuario(id) {
    const conexao = await pool.getConnection();
    try {
        const query = `DELETE FROM usuario WHERE id = ?`;
        await executaQuery(conexao, query, [id]);
    } catch (error) {
        console.log(error);
        throw error;
    } finally {
        conexao.release();
    }
}



export {
    GetAllUsuario, GetUsuarioById, GetUsuarioByName, PatchUsuario, PostUsuario, PutUsuario, DeleteUsuario, GetUsuarioByEmail
}