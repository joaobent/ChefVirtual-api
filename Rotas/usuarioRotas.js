import express from 'express';
import { getUsuarios, getUsuarioByTitle, getUsuarioById, patchUsuario, postUsuario, putUsuario, deleteUsuario, upload, getUsuarioByEmail } from '../controllers/usuarioController.js';
// Definir as rotas aqui

const usuarioRouter = express.Router();

usuarioRouter.get('/usuarios', 
    getUsuarios
    // #swagger.tags = ['Usuários']
    // #swagger.description = 'Retorna todos os Usuários do banco'
);

usuarioRouter.get('/usuarios/pesquisa/nome', 
    getUsuarioByTitle
    // #swagger.tags = ['Usuários']
    // #swagger.description = 'Retorna todos os Usuários do banco buscando por nome'
);

usuarioRouter.get('/usuarios/pesquisa/email', 
    getUsuarioByEmail
    // #swagger.tags = ['Usuários']
    // #swagger.description = 'Retorna todos os Usuários do banco buscando por email'
);

usuarioRouter.get('/usuarios/:idUsuario', 
    getUsuarioById
    // #swagger.tags = ['Usuários']
    // #swagger.description = 'Retorna todos os Usuários do banco buscando por id'
);

usuarioRouter.post('/usuarios', 
    upload.single('imagemUsuario'), 
    postUsuario
    // #swagger.tags = ['Usuários']
    // #swagger.description = 'Adiciona um Usuário no banco'
);
usuarioRouter.put('/usuarios/:id', 
    upload.single('imagemUsuario'),  
    putUsuario
    // #swagger.tags = ['Usuários']
    // #swagger.description = 'Substitui todos os dados de um Usuário no banco'
);         

usuarioRouter.patch('/usuarios/:id', 
    upload.single('imagemUsuario'), 
    patchUsuario
    // #swagger.tags = ['Usuários']
    // #swagger.description = 'Atualiza parcialmente os dados de um Usuário no banco'
);     
usuarioRouter.delete('/usuarios/:id', 
    deleteUsuario
    // #swagger.tags = ['Usuários']
    // #swagger.description = 'Deleta um Usuário a partir de seu id'
); 

export default usuarioRouter;