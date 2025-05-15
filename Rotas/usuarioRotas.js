import express from 'express';
const usuarioRouter = express.Router();
import { getUsuarios, getUsuarioByTitle, getUsuarioById, patchUsuario, postUsuario, putUsuario, deleteUsuario, upload, getUsuarioByEmail } from '../controllers/usuarioController.js';
// Definir as rotas aqui

usuarioRouter.get('/usuarios', getUsuarios);
usuarioRouter.get('/usuarios/pesquisa/nome', getUsuarioByTitle);
usuarioRouter.get('/usuarios/pesquisa/email', getUsuarioByEmail);
usuarioRouter.get('/usuarios/:idUsuario', getUsuarioById);
usuarioRouter.post('/usuarios', upload.single('imagemUsuario'), postUsuario);   
usuarioRouter.put('/usuarios/:id', upload.single('imagemUsuario'),  putUsuario);         
usuarioRouter.patch('/usuarios/:id', upload.single('imagemUsuario'), patchUsuario);     
usuarioRouter.delete('/usuarios/:id', deleteUsuario); 

export default usuarioRouter;