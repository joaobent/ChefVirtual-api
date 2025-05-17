import express from 'express';
import {
  getLogins,
  getLoginById,
  postLogin,
  putLogin,
  deleteLogin,
  patchLogin
} from '../controllers/loginController.js';

const loginRouter = express.Router();

loginRouter.get('/logins', getLogins);
loginRouter.get('/logins/:idLogin', getLoginById);
loginRouter.post('/logins', postLogin);
loginRouter.put('/logins/:id', putLogin);
loginRouter.patch('/logins/:id', patchLogin);
loginRouter.delete('/logins/:id', deleteLogin);

export default loginRouter;
