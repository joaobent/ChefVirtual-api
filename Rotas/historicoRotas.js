// routes/historicoRotas.js
import express from 'express';
import {
  getHistorico,
  postHistorico,
  deleteHistorico
} from '../controllers/historicoController.js';

const historicoRouter = express.Router();

/* 
  #swagger.tags = ['Histórico']
  #swagger.description = 'Retorna o histórico de receitas visualizadas por um usuário específico'
  #swagger.parameters['idUsuario'] = {
    in: 'query',
    description: 'ID do usuário',
    required: true,
    type: 'integer'
  }
*/
historicoRouter.get('/historico', getHistorico);

/* 
  #swagger.tags = ['Histórico']
  #swagger.description = 'Adiciona uma nova visualização ao histórico do usuário'
  #swagger.requestBody = {
    required: true,
    content: {
      "application/json": {
        schema: {
          type: 'object',
          required: ['idUsuario', 'idReceita'],
          properties: {
            idUsuario: { type: 'integer', example: 1 },
            idReceita: { type: 'integer', example: 10 }
          }
        }
      }
    }
  }
*/
historicoRouter.post('/historico', postHistorico);

/* 
  #swagger.tags = ['Histórico']
  #swagger.description = 'Remove todos os registros de histórico do usuário informado'
  #swagger.parameters['idUsuario'] = {
    in: 'path',
    description: 'ID do usuário',
    required: true,
    type: 'integer'
  }
*/
historicoRouter.delete('/historico/:idUsuario', deleteHistorico);

export default historicoRouter;
