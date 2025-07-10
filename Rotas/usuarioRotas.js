import express from 'express';
import {
  getUsuarios,
  getUsuarioByTitle,
  getUsuarioById,
  patchUsuario,
  postUsuario,
  putUsuario,
  deleteUsuario,
  upload,
  getUsuarioByEmail
} from '../controllers/usuarioController.js';

const usuarioRouter = express.Router();

usuarioRouter.get('/getAll', getUsuarios);
// #swagger.tags = ['Usuários']
// #swagger.description = 'Retorna todos os Usuários do banco'

usuarioRouter.get('/getByName', getUsuarioByTitle);
// #swagger.tags = ['Usuários']
// #swagger.description = 'Retorna todos os Usuários do banco buscando por nome'

usuarioRouter.get('/getByEmail', getUsuarioByEmail);
// #swagger.tags = ['Usuários']
// #swagger.description = 'Retorna todos os Usuários do banco buscando por email'

usuarioRouter.get('/getById/:id', getUsuarioById);
// #swagger.tags = ['Usuários']
// #swagger.description = 'Retorna todos os Usuários do banco buscando por id'

usuarioRouter.post('/', upload.single('imagemUsuario'), postUsuario);
// #swagger.tags = ['Usuários']
// #swagger.description = 'Adiciona um Usuário no banco'

usuarioRouter.put('/:id', upload.single('imagemUsuario'), putUsuario);
// #swagger.tags = ['Usuários']
// #swagger.description = 'Substitui todos os dados de um Usuário no banco'

usuarioRouter.patch('/:id', upload.single('imagemUsuario'), patchUsuario);
// #swagger.tags = ['Usuários']
// #swagger.description = 'Atualiza parcialmente os dados de um Usuário no banco'

usuarioRouter.delete('/:id', deleteUsuario);
// #swagger.tags = ['Usuários']
// #swagger.description = 'Deleta um Usuário a partir de seu id'

export default usuarioRouter;
