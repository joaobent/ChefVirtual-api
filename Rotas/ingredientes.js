import express from 'express';
import { getIngredientesPorReceita, getIngredientes } from '../Consultas/ingredientes.js';


const router = express.Router();

// POST /api/ingredientes/:idReceita - adiciona ingredientes a uma receita
router.post('/:idReceita', async (req, res) => {
  const idReceita = parseInt(req.params.idReceita);
  const ingredientes = req.body;

  if (!idReceita) {
    return res.status(400).json({ erro: 'ID da receita é obrigatório.' });
  }

  try {
    const resultado = await PostIngredientes(ingredientes, idReceita);
    res.status(201).json(resultado);
  } catch (error) {
    console.error('Erro ao adicionar ingredientes:', error);
    res.status(500).json({ erro: 'Erro ao adicionar ingredientes.' });
  }
});


// GET /api/ingredientes/GetIngredientes?idReceita=1 - lista ingredientes de uma receita
router.get('/GetIngredientes', async (req, res) => {
  const idReceita = parseInt(req.query.idReceita);

  if (!idReceita) {
    return res.status(400).json({ erro: 'ID da receita é obrigatório.' });
  }

  try {
    const ingredientes = await getIngredientesPorReceita(idReceita);
    res.status(200).json(ingredientes);
  } catch (error) {
    console.error('Erro ao buscar ingredientes da receita:', error);
    res.status(500).json({ erro: 'Erro ao buscar ingredientes da receita.' });
  }
});




// GET /api/ingredientes?idReceita=123 => busca ingredientes por receita
// GET /api/ingredientes => busca todos os ingredientes
router.get('/', async (req, res) => {
  const idReceita = parseInt(req.query.idReceita);

  try {
    if (idReceita) {
      const ingredientes = await getIngredientesPorReceita(idReceita);
      return res.status(200).json(ingredientes);
    }

    const todosIngredientes = await getIngredientes();
    res.status(200).json(todosIngredientes);
  } catch (error) {
    console.error('Erro ao buscar ingredientes:', error);
    res.status(500).json({ erro: 'Erro ao buscar ingredientes.' });
  }
});

export default router;
