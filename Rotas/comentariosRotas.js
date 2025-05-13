// rotas/comentariosRotas.js

import express from 'express'
import { obterComentarios } from '../controllers/comentariosController.js'

const router = express.Router()


router.get('/comentarios', obterComentarios)


router.get('/comentarios/:id', obterComentarios)


router.post('/comentarios', async (req, res) => {
  const { receitaId, usuarioId, comentario } = req.body
  try {
    res.status(201).json({ mensagem: 'Comentário criado com sucesso' })
  } catch (error) {
    console.error('Erro ao criar comentário:', error)
    res.status(500).json({ erro: 'Erro ao criar comentário' })
  }
})
router.delete('/comentarios/:id', async (req, res) => {
  const { id } = req.params
  try {
    res.status(200).json({ mensagem: 'Comentário deletado com sucesso' })
  } catch (error) {
    console.error('Erro ao deletar comentário:', error)
    res.status(500).json({ erro: 'Erro ao deletar comentário' })
  }
})



export default router
