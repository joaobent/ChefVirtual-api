import express from 'express';
import { getReceitas, getReceitasByTitle, getReceitasByUser } from '../Controllers/receitasController.js';

const router = express.Router();
router.get('/Receitas', getReceitas); // GET - Retorna todas as receitas
router.get('/Receitas/Busca', getReceitasByTitle); // GET - Retorna as receitas referente ao campo de busca
router.get('/Receitas/BuscaUsuario', getReceitasByUser) // GET - Retorna as receitas referente a um usuario especifico
export default router;