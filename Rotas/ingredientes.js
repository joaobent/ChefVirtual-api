import express from 'express';
import { PostIngredientes } from '../Consultas/pubReceita.js';

const router = express.Router();

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