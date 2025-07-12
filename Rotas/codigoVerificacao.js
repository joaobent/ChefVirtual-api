
import express from 'express';
import {
  listarCodigos,
  buscarCodigoPorId,
  criarCodigo,
  atualizarCodigo,
  deletarCodigo,
  buscarCodigoPorEmail
} from '../controllers/codigoVerificacaoController.js';

const router = express.Router();

router.get('/codigo', 
  listarCodigos
  // #swagger.tags = ['Verificação']
  // #swagger.description = 'Realiza a busca de todos os códigos de verificação.'
);

router.get('/GetCodigoPorEmail', 
  buscarCodigoPorEmail
  // #swagger.tags = ['Verificação']
  // #swagger.description = 'Realiza a busca do código de verificação a partir do login realizado.'
);

router.get('/codigo/:id', 
  buscarCodigoPorId
  // #swagger.tags = ['Verificação']
  // #swagger.description = 'Realiza a busca do código de verificação por seu id.'
);

router.post('/codigo', 
  criarCodigo
  // #swagger.tags = ['Verificação']
  // #swagger.description = 'Cria um código de verificação a partir de um login realizado.'
);

router.put('/codigo/:id', 
  atualizarCodigo
  // #swagger.tags = ['Verificação']
  // #swagger.description = 'Realiza a atualização do código de verificação (se em algum momento for necessário).'
);

router.delete('/codigo/:id', 
  deletarCodigo
  // #swagger.tags = ['Verificação']
  // #swagger.description = 'Deleta o código de verificação após o usuário verificar sua conta com seu devido código. Feito isso para diminuir registros no banco'
);

export default router;
