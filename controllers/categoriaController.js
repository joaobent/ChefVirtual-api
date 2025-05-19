import {
  GetAllCategorias,
  GetCategoriaById,
  PostCategoria,
  PutCategoria,
  DeleteCategoria
} from '../Consultas/categoria.js';

// ** Controlador para listar todas as categorias **
export async function getCategorias(req, res) {
  try {
      const categorias = await GetAllCategorias();
      if (!categorias || categorias.length === 0) {
          return res.status(404).json({ erro: 'Nenhuma categoria encontrada' });
      }
      res.status(200).json(categorias);
  } catch (error) {
      console.error('Erro ao buscar categorias:', error);
      res.status(500).json({ erro: 'Erro interno ao buscar categorias' });
  }
}

// ** Controlador para obter uma categoria pelo ID **
export async function getCategoriaById(req, res) {
  const { id } = req.params;
  if (!id) {
      return res.status(400).json({ erro: 'Parâmetro "id" é obrigatório' });
  }

  try {
      const categoria = await GetCategoriaById(id);
      if (!categoria) {
          return res.status(404).json({ erro: 'Categoria não encontrada' });
      }
      res.status(200).json(categoria);
  } catch (error) {
      console.error(`Erro ao buscar categoria com ID ${id}:`, error);
      res.status(500).json({ erro: 'Erro interno na busca por ID' });
  }
}

// ** Controlador para criar uma nova categoria **
export async function postCategoria(req, res) {
  const { nome } = req.body;
  if (!nome) {
      return res.status(400).json({ erro: 'O nome da categoria é obrigatório.' });
  }

  try {
      const novaCategoria = await PostCategoria(nome);
      res.status(201).json({ mensagem: 'Categoria criada com sucesso', ...novaCategoria });
  } catch (error) {
      console.error('Erro ao criar categoria:', error);
      res.status(500).json({ erro: error.message });
  }
}

// ** Controlador para atualizar uma categoria existente **
export async function putCategoria(req, res) {
  const { id } = req.params;
  const { nome } = req.body;

  if (!nome) {
      return res.status(400).json({ erro: 'O nome da categoria é obrigatório.' });
  }

  try {
      const atualizado = await PutCategoria(id, nome);
      if (atualizado) {
          res.status(200).json({ mensagem: 'Categoria atualizada com sucesso.' });
      } else {
          res.status(404).json({ erro: 'Categoria não encontrada.' });
      }
  } catch (error) {
      console.error('Erro ao atualizar categoria:', error);
      res.status(500).json({ erro: 'Erro ao atualizar categoria' });
  }
}

// ** Controlador para deletar uma categoria **
export async function deleteCategoria(req, res) {
  const { id } = req.params;
  try {
      const deletado = await DeleteCategoria(id);
      if (deletado) {
          res.status(200).json({ mensagem: 'Categoria deletada com sucesso.' });
      } else {
          res.status(404).json({ erro: 'Categoria não encontrada.' });
      }
  } catch (error) {
      console.error('Erro ao deletar categoria:', error);
      res.status(500).json({ erro: 'Erro ao deletar categoria' });
  }
}
