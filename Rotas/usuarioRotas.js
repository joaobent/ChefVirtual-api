import express from 'express';
const usuarioRouter = express.Router();
import { getUsuarios, getUsuarioByTitle, getUsuarioById, patchUsuario, postUsuario, putUsuario, deleteUsuario } from '../controllers/usuarioController.js';
// Definir as rotas aqui
usuarioRouter.get('/Usuarios', getUsuarios);
usuarioRouter.get('/Usuarios/pesquisa', getUsuarioByTitle);
usuarioRouter.get('/Usuarios/:idUsuario', getUsuarioById);
usuarioRouter.post('/usuarios', postUsuario);        
usuarioRouter.put('/usuarios/:id', putUsuario);         
usuarioRouter.patch('/usuarios/:id', patchUsuario);     
usuarioRouter.delete('/usuarios/:id', deleteUsuario); 

export default usuarioRouter;