import express from 'express';
import { PostEtapas } from '../Consultas/pubReceita.js';
import { getEtapasPorReceita } from '../Consultas/etapas.js';

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
  const etapas = req.body;

  console.log('Tipo de etapas na rota:', typeof etapas);
  console.log('Valor de etapas na rota:', etapas);

  try {
    const resultado = await PostEtapas(etapas, idReceita);
    res.status(201).json(resultado);
  } catch (error) {
    console.error(error);
    res.status(500).json({ erro: 'Erro ao adicionar etapas.' });
  }
});


// GET /api/etapas?idReceita=5
router.get('/', async (req, res) => {
  const idReceita = parseInt(req.query.idReceita);

  if (!idReceita) {
    return res.status(400).json({ erro: 'ID da receita é obrigatório.' });
  }

  try {
    const etapas = await getEtapasPorReceita(idReceita);
    res.status(200).json(etapas);
  } catch (error) {
    console.error('Erro ao buscar etapas da receita:', error);
    res.status(500).json({ erro: 'Erro ao buscar etapas da receita.' });
  }
});


export default router;
