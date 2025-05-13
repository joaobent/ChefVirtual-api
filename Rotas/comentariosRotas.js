// rotas/comentariosRotas.js

import express from 'express'
import { obterComentarios } from '../controllers/comentariosController.js'

const router = express.Router()

// Rota GET para pegar todos os comentários
router.get('/comentarios', obterComentarios)
// Rota GET para pegar um comentário específico por ID
router.get('/comentarios/:id', obterComentarios)
// Rota POST para criar um novo comentário
router.post('/comentarios', async (req, res) => {
  const { receitaId, usuarioId, comentario } = req.body
  try {
    // Aqui você pode adicionar a lógica para criar um novo comentário no banco de dados
    // Exemplo: await criarComentarioNoBanco(receitaId, usuarioId, comentario)
    res.status(201).json({ mensagem: 'Comentário criado com sucesso' })
  } catch (error) {
    console.error('Erro ao criar comentário:', error)
    res.status(500).json({ erro: 'Erro ao criar comentário' })
  }
})
// Rota DELETE para deletar um comentário específico por ID
router.delete('/comentarios/:id', async (req, res) => {
  const { id } = req.params
  try {
    // Aqui você pode adicionar a lógica para deletar um comentário no banco de dados
    // Exemplo: await deletarComentarioNoBanco(id)
    res.status(200).json({ mensagem: 'Comentário deletado com sucesso' })
  } catch (error) {
    console.error('Erro ao deletar comentário:', error)
    res.status(500).json({ erro: 'Erro ao deletar comentário' })
  }
})



export default router
