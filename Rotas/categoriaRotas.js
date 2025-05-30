import express from 'express';
import {
  getCategorias,
  getCategoriaById,
  postCategoria,
  putCategoria,
  deleteCategoria
} from '../controllers/categoriaController.js'; // Altere se o caminho estiver diferente

const router = express.Router();

router.get('/', getCategorias);
// #swagger.tags = ['Categorias']
// #swagger.description = 'Retorna todas as categorias do banco'

router.get('/:id', getCategoriaById);
// #swagger.tags = ['Categorias']
// #swagger.description = 'Retorna uma categoria específica pelo ID'

router.post('/', postCategoria);
// #swagger.tags = ['Categorias']
// #swagger.description = 'Cria uma nova categoria no banco'

router.put('/:id', putCategoria);
// #swagger.tags = ['Categorias']
// #swagger.description = 'Atualiza uma categoria existente pelo ID'

router.delete('/:id', deleteCategoria);
// #swagger.tags = ['Categorias']
// #swagger.description = 'Deleta uma categoria pelo ID'

export default router;
