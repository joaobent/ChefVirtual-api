import express from 'express';
import { getReceitas, getReceitasByName } from '../Controllers/receitasController.js';

const router = express.Router();

// GET - Retorna todas as receitas
router.get('/Receitas', getReceitas);

// GET - Retorna as receitas referente ao campo de busca
router.get('/Receitas/Busca', getReceitasByName);


export default router;