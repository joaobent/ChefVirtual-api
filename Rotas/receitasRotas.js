import express from 'express';
import { getReceitas, getReceitasByTitle, getReceitasByUser } from '../Controllers/receitasController.js';

const router = express.Router();

// GET - Retorna todas as receitas
router.get('/Receitas', getReceitas);

// GET - Retorna as receitas referente ao campo de busca
router.get('/Receitas/Busca', getReceitasByTitle);

// GET - Retorna as receitas referente a um usuario especifico
router.get('/Receitas/BuscaUsuario', getReceitasByUser)
export default router;