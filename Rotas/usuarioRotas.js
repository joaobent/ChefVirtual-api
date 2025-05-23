import express from 'express';
import { getUsuarios, getUsuarioByTitle, getUsuarioById, patchUsuario, postUsuario, putUsuario, deleteUsuario, upload, getUsuarioByEmail } from '../controllers/usuarioController.js';
// Definir as rotas aqui

const usuarioRouter = express.Router();

usuarioRouter.get('/', 
    getUsuarios
    // #swagger.tags = ['Usuários']
    // #swagger.description = 'Retorna todos os Usuários do banco'
);

usuarioRouter.get('/', 
    getUsuarioByTitle
    // #swagger.tags = ['Usuários']
    // #swagger.description = 'Retorna todos os Usuários do banco buscando por nome'
);

usuarioRouter.get('/', 
    getUsuarioByEmail
    // #swagger.tags = ['Usuários']
    // #swagger.description = 'Retorna todos os Usuários do banco buscando por email'
);

usuarioRouter.get('/', 
    getUsuarioById
    // #swagger.tags = ['Usuários']
    // #swagger.description = 'Retorna todos os Usuários do banco buscando por id'
);

usuarioRouter.post('/', 
    upload.single('imagemUsuario'), 
    postUsuario
    // #swagger.tags = ['Usuários']
    // #swagger.description = 'Adiciona um Usuário no banco'
);
usuarioRouter.put('/', 
    upload.single('imagemUsuario'),  
    putUsuario
    // #swagger.tags = ['Usuários']
    // #swagger.description = 'Substitui todos os dados de um Usuário no banco'
);         

usuarioRouter.patch('/', 
    upload.single('imagemUsuario'), 
    patchUsuario
    // #swagger.tags = ['Usuários']
    // #swagger.description = 'Atualiza parcialmente os dados de um Usuário no banco'
);     
usuarioRouter.delete('/', 
    deleteUsuario
    // #swagger.tags = ['Usuários']
    // #swagger.description = 'Deleta um Usuário a partir de seu id'
); 

export default usuarioRouter;