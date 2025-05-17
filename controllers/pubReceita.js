
import {PostReceita} from '../Consultas/pubReceita.js';

export async function criarReceita(req, res) {
  const { titulo, descricao, imagem, tempo_preparo} = req.body;

  if (!titulo || !descricao || !imagem || !tempo_preparo) {
    return res.status(400).json({ erro: 'Preencha todos os campos obrigatórios: título, descrição, imagem, tempo de preparo.' });
  }

  try {
    const novaReceita = await PostReceita(titulo, descricao, imagem, tempo_preparo);
    res.status(201).json({ mensagem: 'Receita publicada com sucesso', ...novaReceita });
  } catch (error) {
    res.status(500).json({ erro: 'Erro ao publicar a receita' });
  }
}


