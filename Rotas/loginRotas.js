import express from 'express';
import {
  getLogins,
  getLoginById,
  postLogin,
  putLogin,
  deleteLogin,
  patchLogin,
  confirmarLogin
} from '../controllers/loginController.js';

const loginRouter = express.Router();

loginRouter.get('/GetLogins', 
  getLogins
    // #swagger.tags = ['Login']
    // #swagger.description = 'Retorna todos os registros de login do banco'
);

loginRouter.get('/logins/:idLogin', 
  getLoginById
  // #swagger.tags = ['Login']
  // #swagger.description = 'Retorna um regristro de login do banco a partir do id'
);

loginRouter.get('/ConfirmarLogin', 
  confirmarLogin
  // #swagger.tags = ['Login']
  // #swagger.description = 'Retorna o JWT para a autenticação e efetuação do login a partir do código verificação para o registro de login informado'
);

export default loginRouter;
