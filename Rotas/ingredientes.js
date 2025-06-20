import express from 'express';
import { PostIngredientes } from '../Consultas/pubReceita.js';

const router = express.Router();

/**
 * POST /api/ingredientes/{idReceita}
 * @tags Publicação
 * @summary Adicionar ingredientes a uma receita
 * @param {integer} idReceita.path.required - ID da receita à qual os ingredientes serão adicionados
 * @body {array<object>} request.body.required - Array de ingredientes a serem adicionados
 * @body {integer} request.body.idIngredienteDb - ID do ingrediente no banco de dados
 * @body {number} request.body.quantidade - Quantidade do ingrediente
 * @body {string} request.body.medida - Medida do ingrediente (ex: "xícara", "gramas")
 * @body {string} request.body.unidade - Unidade do ingrediente (ex: "un", "ml")
 * @response 201 {string} Ingredientes adicionados com sucesso
 * @response 500 {string} Erro ao adicionar ingredientes
 */

router.post('/:idReceita', async (req, res) => {
  const idReceita = parseInt(req.params.idReceita);
  const ingredientes = req.body;

  try {
    const resultado = await PostIngredientes(ingredientes, idReceita);
    res.status(201).json(resultado);
  } catch (error) {
    console.error(error);
    res.status(500).json({ erro: 'Erro ao adicionar ingredientes.' });
  }
});

export default router;