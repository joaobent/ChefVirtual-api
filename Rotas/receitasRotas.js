import express from 'express';
import {
  getReceitas,
  getReceita,
  getReceitasByTitle,
  getReceitasByUser,
  patchReceitas,
  getReceitasByCategoria
} from '../controllers/receitasController.js';
import { GetReceitasBuscaAvancada } from '../Consultas/receitas.js';

const router = express.Router();

// GET - Retorna todas as receitas
// GET - Retorna todas as receitas
router.get('/', (req, res) => {
  // #swagger.tags = ['Receitas']
  // #swagger.description = 'Lista todas as receitas'
  getReceitas(req, res);
});

// GET - Retorna a receita a partir do id informado
router.get('/GetReceita', (req, res) => {
  // #swagger.tags = ['Receitas']
  // #swagger.description = 'Retorna a receita a partir do ID da receita informado'
  getReceita(req, res);
});

// GET - Retorna as receitas referente ao campo de busca
router.get('/BuscaPorTitulo', (req, res) => {
  // #swagger.tags = ['Receitas']
  // #swagger.description = 'Busca receitas por seu título'
  getReceitasByTitle(req, res);
});

router.get('/BuscaPorCategoria', (req, res) => {
  // #swagger.tags = ['Receitas']
  // #swagger.description = 'Busca receitas por sua categoria'
  getReceitasByCategoria(req, res);
});

// GET - Retorna as receitas referente a um usuário específico
router.get('/BuscaPorUsuario', (req, res) => {
  // #swagger.tags = ['Receitas']
  // #swagger.description = 'Retorna receitas de um usuário específico'
  getReceitasByUser(req, res);
});

// PATCH - Atualiza os dados informados no JSON
router.patch('/AtualizarParcial', (req, res) => {
  // #swagger.tags = ['Receitas']
  // #swagger.description = 'Atualiza parcialmente uma receita'
  patchReceitas(req, res);
});

router.get('/BuscaAvancada', (req, res) => {
  // #swagger.tags = ['Receitas']
  // #swagger.description = 'Busca receitas com múltiplos critérios de filtro (ingredientes, nota, tempo, tipo)'
  GetReceitasBuscaAvancada(req, res);
});

export default router;
