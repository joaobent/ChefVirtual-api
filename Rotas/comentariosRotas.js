// rotas/comentariosRotas.js

import express from 'express'
import { criarComentario, deletarComentario, obterComentarios } from '../controllers/comentariosController.js'

const router = express.Router()

router.get('/GetComentarios', (req, res) => {
  // #swagger.tags = ['Comentários']
  // #swagger.description = 'Lista todos os comentários de uma receita '
  obterComentarios(req, res);
});

router.post('/PostComentarios', (req, res) => {
  // #swagger.tags = ['Comentários']
  // #swagger.description = 'Inserir um novo comentário a uma receita.'
  criarComentario(req, res)
})

router.delete('/DeleteComentarios', (req, res) => {
  // #swagger.tags = ['Comentários']
  // #swagger.description = 'Inserir um novo comentário a uma receita.'
  deletarComentario(req, res)
})

export default router
