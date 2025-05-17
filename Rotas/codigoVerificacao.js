
import express from 'express';
import {
  listarCodigos,
  buscarCodigoPorId,
  criarCodigo,
  atualizarCodigo,
  deletarCodigo
} from '../controllers/codigoVerificacaoController.js';

const router = express.Router();

router.get('/codigo', listarCodigos);
router.get('/codigo/:id', buscarCodigoPorId);
router.post('/codigo', criarCodigo);
router.put('/codigo/:id', atualizarCodigo);
router.delete('/codigo/:id', deletarCodigo);

export default router;
