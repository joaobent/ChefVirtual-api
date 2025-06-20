import express from 'express';
import { PostEtapas } from '../Consultas/pubReceita.js';

const router = express.Router();

/**
 * POST /api/etapas/{idReceita}
 * @tags Publicação
 * @summary Adicionar etapas a uma receita
 * @param {integer} idReceita.path.required - ID da receita à qual as etapas serão adicionadas
 * @body {array<object>} request.body.required - Array de etapas a serem adicionadas
 * @body {integer} request.body.numeroEtapa - Número da etapa
 * @body {string} request.body.descricao - Descrição da etapa
 * @response 201 {string} Etapas adicionadas com sucesso
 * @response 500 {string} Erro ao adicionar etapas
 */

router.post('/:idReceita', async (req, res) => {
  const idReceita = parseInt(req.params.idReceita);
  const etapas = req.body;

  try {
    const resultado = await PostEtapas(etapas, idReceita);
    res.status(201).json(resultado);
  } catch (error) {
    console.error(error);
    res.status(500).json({ erro: 'Erro ao adicionar etapas.' });
  }
});

export default router;