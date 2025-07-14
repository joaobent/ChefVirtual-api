import { 
  DeleteLogin, PostLogin, PutLogin, PatchLogin 
} from "../Consultas/login.js";

import {
  GetAllUsuario,
  GetUsuarioById,
  GetUsuarioByName,
  GetUsuarioByEmail,
  PatchUsuario,
  PostUsuario,
  PutUsuario,
  DeleteUsuario
} from "../Consultas/usuario.js";

import multer from 'multer';

const storage = multer.memoryStorage();
export const upload = multer({ storage });

export async function getUsuarios(req, res) {
  try {
    const usuarios = await GetAllUsuario();
    if (!usuarios || usuarios.length === 0) {
      return res.status(404).json({ erro: 'Nenhum usuário encontrado' });
    }
    res.status(200).json(usuarios);
  } catch (error) {
    console.error('Erro ao buscar usuários:', error);
    res.status(500).json({ erro: 'Erro interno ao buscar usuários' });
  }
}

export async function getUsuarioByTitle(req, res) {
  const { nome } = req.query;
  if (!nome) {
    return res.status(400).json({ erro: 'Parâmetro "nome" é obrigatório' });
  }

  try {
    const usuario = await GetUsuarioByName(nome);
    if (!usuario || usuario.length === 0) {
      return res.status(404).json({ erro: 'Nenhum usuário encontrado com esse nome' });
    }
    res.status(200).json(usuario);
  } catch (error) {
    console.error('Erro ao buscar usuário por nome:', error);
    res.status(500).json({ erro: 'Erro interno na busca por nome' });
  }
}

export async function getUsuarioByEmail(req, res) {
  const { email } = req.query;
  if (!email) {
    return res.status(400).json({ erro: 'Parâmetro "email" é obrigatório' });
  }

  try {
    const usuario = await GetUsuarioByEmail(email);
    if (!usuario || usuario.length === 0) {
      return res.status(404).json({ erro: 'Nenhum usuário encontrado com esse email' });
    }
    res.status(200).json(usuario);
  } catch (error) {
    console.error('Erro ao buscar usuário por email:', error);
    res.status(500).json({ erro: 'Erro interno na busca por email' });
  }
}

export async function getUsuarioById(req, res) {
  const { id } = req.params;
  if (!id) {
    return res.status(400).json({ erro: 'Parâmetro "id" é obrigatório' });
  }

  try {
    const usuario = await GetUsuarioById(id);
    if (!usuario || usuario.length === 0) {
      return res.status(404).json({ erro: 'Usuário não encontrado' });
    }
    res.status(200).json(usuario[0]);
  } catch (error) {
    console.error(`Erro ao buscar usuário com ID ${id}:`, error);
    res.status(500).json({ erro: 'Erro interno na busca por ID' });
  }
}

export async function postUsuario(req, res) {
  const { nome, email, facebook, instagram, youtube, senha } = req.body;
  const imagemUsuario = req.file ? req.file.buffer : null;

  try {
    // Verifica se email já existe
    const usuarioExistente = await GetUsuarioByEmail(email);
    if (usuarioExistente && usuarioExistente.length > 0) {
      return res.status(409).json({ erro: 'Email já registrado' });
    }

    // Cria usuário
    const resultado = await PostUsuario(nome, email, imagemUsuario, facebook, instagram, youtube);

    // Cria login
    const resultadoLogin = await PostLogin(email, senha, resultado.insertId);

    res.status(201).json({
      mensagem: 'Usuário e login criados com sucesso',
      idUsuario: resultado.insertId,
      idLogin: resultadoLogin.insertId
    });

  } catch (error) {
    console.error('Erro ao criar usuário:', error);
    res.status(500).json({ erro: 'Erro interno ao criar usuário' });
  }
}

export async function putUsuario(req, res) {
  const { id } = req.params;
  const { nome, email, facebook, instagram, youtube, senha } = req.body;
  const imagemUsuario = req.file ? req.file.buffer : null;

  try {
    await PutUsuario(id, nome, email, imagemUsuario, facebook, instagram, youtube);
    await PutLogin(id, email, senha);
    res.status(200).json({ mensagem: 'Usuário atualizado com sucesso' });
  } catch (error) {
    console.error('Erro ao atualizar usuário:', error);
    res.status(500).json({ erro: 'Erro ao atualizar usuário' });
  }
}

export async function patchUsuario(req, res) {
  const { id } = req.params;
  const { nome, email, facebook, instagram, youtube, senha } = req.body;
  const imagemUsuario = req.file ? req.file.buffer : null;

  const dadosUsuario = {};
  if (nome) dadosUsuario.nome = nome;
  if (email) dadosUsuario.email = email;
  if (facebook) dadosUsuario.facebook = facebook;
  if (instagram) dadosUsuario.instagram = instagram;
  if (youtube) dadosUsuario.youtube = youtube;
  if (imagemUsuario) dadosUsuario.imagem = imagemUsuario;

  const dadosLogin = {};
  if (email) dadosLogin.email = email;
  if (senha) dadosLogin.senha = senha;

  if (Object.keys(dadosUsuario).length === 0 && Object.keys(dadosLogin).length === 0) {
    return res.status(400).json({ mensagem: 'Ao menos um campo deve ser preenchido' });
  }

  try {
    if (Object.keys(dadosLogin).length > 0) {
      await PatchLogin(id, dadosLogin);
    }
    if (Object.keys(dadosUsuario).length > 0) {
      await PatchUsuario(id, dadosUsuario);
    }
    res.status(200).json({ mensagem: 'Usuário atualizado parcialmente com sucesso' });
  } catch (error) {
    console.error('Erro ao atualizar usuário parcialmente:', error);
    res.status(500).json({ erro: 'Erro ao atualizar parcialmente o usuário' });
  }
}

export async function deleteUsuario(req, res) {
  const { id } = req.params;
  if (!id) {
    return res.status(400).json({ erro: 'Parâmetro "id" é obrigatório' });
  }

  try {
    await DeleteLogin(id);
    await DeleteUsuario(id);
    res.status(200).json({ mensagem: 'Usuário deletado com sucesso' });
  } catch (error) {
    console.error('Erro ao deletar usuário:', error);
    res.status(500).json({ erro: 'Erro ao deletar usuário' });
  }
}
