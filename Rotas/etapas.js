import express from 'express';
import { PostEtapas } from '../Consultas/pubReceita.js';

const router = express.Router();

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