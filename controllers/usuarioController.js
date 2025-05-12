import { PostLogin } from "../Consultas/login.js";
import {
  GetAllUsuario, GetUsuarioById, GetUsuarioByName, PatchUsuario, PostUsuario, PutUsuario, DeleteUsuario
} from "../Consultas/usuario.js"

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
  const { tituloReceita } = req.query;

  if (!tituloReceita) {
    return res.status(400).json({ erro: 'Parâmetro "tituloReceita" é obrigatório' });
  }

  try {
    const receitas = await GetUsuarioByName(tituloReceita);
    if (!receitas || receitas.length === 0) {
      return res.status(404).json({ erro: 'Nenhum usuário encontrado com esse título' });
    }
    res.status(200).json(receitas);
  } catch (error) {
    console.error('Erro ao buscar usuário por título:', error);
    res.status(500).json({ erro: 'Erro interno na busca por nome' });
  }
}

export async function getUsuarioById(req, res) {
  const { idUsuario } = req.params;
  if (!idUsuario) {
    return res.status(400).json({ erro: 'Parâmetro "idUsuario" é obrigatório' });
  }

  try {
    const usuario = await GetUsuarioById(idUsuario);
    if (!usuario) {
      return res.status(404).json({ erro: 'Usuário não encontrado' });
    }
    res.status(200).json(usuario);
  } catch (error) {
    console.error(`Erro ao buscar usuário com ID ${idUsuario}:`, error);
    res.status(500).json({ erro: 'Erro interno na busca por ID' });
  }
}

export async function postUsuario(req, res) {
  const { nome, email, imagemUsuario, facebook, instagram, youtube, senha } = req.body;
  try {
    const resultado = await PostUsuario(nome, email, imagemUsuario, facebook, instagram, youtube);
    res.status(201).json({ mensagem: 'Usuário criado com sucesso', id: resultado.insertId });
    const resultLogin = await PostLogin(email, senha, codigoVerificacao, resultado.insertId)
    res.status(201).json({ mensagem: 'Usuário criado com sucesso', id: resultado.insertId });
  } catch (error) {
    console.error('Erro ao criar usuário:', error);
    res.status(500).json({ erro: 'Erro ao criar usuário' });
  }
}

export async function putUsuario(req, res) {
  const { id } = req.params;
  const { nome, email, imagemUsuario, facebook, instagram, youtube } = req.body;
  try {
    await PutUsuario(id, nome, email, imagemUsuario, facebook, instagram, youtube);
    res.status(200).json({ mensagem: 'Usuário atualizado com sucesso' });
  } catch (error) {
    console.error('Erro ao atualizar usuário:', error);
    res.status(500).json({ erro: 'Erro ao atualizar usuário' });
  }
}

export async function patchUsuario(req, res) {
  const { id } = req.params;
  const { nome, email, imagemUsuario, facebook, instagram, youtube } = req.body;
  const dados = {};
  if (nome) dados.nome = nome;
  if (email) dados.email = email;
  if (facebook) dados.facebook = facebook;
  if (instagram) dados.instagram = instagram;
  if (youtube) dados.youtube = youtube;

  if (Object.keys(dados).length === 0) {
    res.status(400).json({ mensagem: 'Ao menos um campo tem de estar preenchido' });
  }
  try {
    await PatchUsuario(id, dados);
    res.status(200).json({ mensagem: 'Usuário atualizado parcialmente com sucesso' });
  } catch (error) {
    console.error('Erro no patch:', error);
    res.status(500).json({ erro: 'Erro ao atualizar parcialmente o usuário' });
  }
}

export async function deleteUsuario(req, res) {
  const { id } = req.params;
  try {
    await DeleteUsuario(id);
    res.status(200).json({ mensagem: 'Usuário deletado com sucesso' });
  } catch (error) {
    console.error('Erro ao deletar usuário:', error);
    res.status(500).json({ erro: 'Erro ao deletar usuário' });
  }
}
