
import {PostEtapas, PostIngredientes, PostReceita} from '../Consultas/pubReceita.js';

export async function postReceita(req, res) {
  const { titulo, descricao, imagem, tempo_preparo, idUsuario} = req.body;

  if (!titulo || !descricao || !imagem || !tempo_preparo || !idUsuario) {
    return res.status(400).json({ erro: 'Preencha todos os campos obrigatórios: título, descrição, imagem, tempo de preparo.' });
  }

  try {
    const novaReceita = await PostReceita(titulo, descricao, imagem, tempo_preparo, idUsuario);
    res.status(201).json({ mensagem: 'Receita publicada com sucesso', ...novaReceita });
  } catch (error) {
    res.status(500).json({ erro: 'Erro ao publicar a receita' });
  }
}

export async function postEtapa(req, res) {
  const { idReceita, etapas } = req.body;

  if (!idReceita || !Array.isArray(etapas) || etapas.length === 0) {
    return res.status(400).json({ erro: 'ID da receita e etapas são obrigatórios.' });
  }

  try {
    const resultado = await PostEtapas(etapas, idReceita);
    res.status(201).json({ mensagem: 'Etapas adicionadas com sucesso.', resultado });
  } catch (error) {
    console.error(error);
    res.status(500).json({ erro: 'Erro ao adicionar as etapas.' });
  }
}

export async function postIngrediente(req, res) {
  const { idReceita, ingredientes} = req.body;

  if (!idReceita || !Array.isArray(ingredientes) || ingredientes.length === 0) {
    return res.status(400).json({ erro: 'ID da receita e etapas são obrigatórios.' });
  }

  try {
    const resultado = await PostIngredientes(ingredientes, idReceita);
    res.status(201).json({ mensagem: 'Etapas adicionadas com sucesso.', resultado });
  } catch (error) {
    console.error(error);
    res.status(500).json({ erro: 'Erro ao adicionar as ingredientes.' });
  }
}




