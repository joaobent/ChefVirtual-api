import express from 'express';
import {
    GetAllCategorias,
    GetCategoriaById,
    PostCategoria,
    PutCategoria,
    DeleteCategoria
} from '../Consultas/categoria.js';

const router = express.Router();

// Rota para obter todas as categorias
router.get('/Categorias', 
    GetAllCategorias
    // #swagger.tags = ['Categorias']
    // #swagger.description = 'Retorna todas as categorias do banco'
);

// Rota para obter uma categoria pelo ID
router.get('/Categorias:id', 
    GetCategoriaById
    // #swagger.tags = ['Categorias']
    // #swagger.description = 'Retorna uma categoria específica pelo ID'
);

// Rota para criar uma nova categoria
router.post('/Categorias', 
    PostCategoria
    // #swagger.tags = ['Categorias']
    // #swagger.description = 'Cria uma nova categoria no banco'
);

// Rota para atualizar uma categoria existente
router.put('/Categorias:id', 
    PutCategoria
    // #swagger.tags = ['Categorias']
    // #swagger.description = 'Atualiza uma categoria existente pelo ID'
);

// Rota para deletar uma categoria
router.delete('/Categorias:id', 
    DeleteCategoria
    // #swagger.tags = ['Categorias']
    // #swagger.description = 'Deleta uma categoria pelo ID'
);

export default router;
