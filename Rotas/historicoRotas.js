// routes/historicoRotas.js
import express from 'express';
import {
  getHistorico,
  postHistorico,
  deleteHistorico
} from '../controllers/historicoController.js';

const historicoRouter = express.Router();

// GET: Buscar histórico por ID do usuário (via query string)
historicoRouter.get('/historico',
  getHistorico
  // #swagger.tags = ['Histórico']
  // #swagger.description = 'Retorna o histórico de receitas visualizadas por um usuário específico'
  // #swagger.parameters['idUsuario'] = { description: 'ID do usuário', in: 'query', required: true, type: 'integer' }
);

// POST: Adicionar item ao histórico
historicoRouter.post('/historico',
  postHistorico
  // #swagger.tags = ['Histórico']
  // #swagger.description = 'Adiciona uma nova visualização ao histórico do usuário'
  // #swagger.parameters['body'] = {
  //   in: 'body',
  //   required: true,
  //   schema: {
  //     idUsuario: 1,
  //     idReceita: 10,
  //     nome: 'Bolo de Cenoura',
  //     descricao: 'Delicioso bolo com cobertura de chocolate.'
  //   }
  // }
);

// DELETE: Limpar histórico de um usuário pelo ID
historicoRouter.delete('/historico/:idUsuario',
  deleteHistorico
  // #swagger.tags = ['Histórico']
  // #swagger.description = 'Remove todos os registros de histórico do usuário informado'
  // #swagger.parameters['idUsuario'] = { description: 'ID do usuário', in: 'path', required: true, type: 'integer' }
);

export default historicoRouter;
