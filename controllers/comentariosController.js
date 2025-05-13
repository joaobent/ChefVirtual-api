import { GetAllComentarios } from '../Consultas/comentarios.js'

export const obterComentarios = async (req, res) => {
  try {
    const comentarios = await GetAllComentarios()
    res.status(200).json(comentarios)
  } catch (error) {
    console.error('Erro ao buscar comentários:', error)
    res.status(500).json({ erro: 'Erro ao buscar comentários' })
  }
}
export const obterComentariosPorId = async (req, res) => {
  const { id } = req.params
  try {
    const comentarios = await GetAllComentarios()
    const comentario = comentarios.find(comentario => comentario.id === parseInt(id))
    if (!comentario) {
      return res.status(404).json({ erro: 'Comentário não encontrado' })
    }
    res.status(200).json(comentario)
  } catch (error) {
    console.error('Erro ao buscar comentário:', error)
    res.status(500).json({ erro: 'Erro ao buscar comentário' })
  }
}

export const criarComentario = async (req, res) => {
  const { receitaId, usuarioId, comentario } = req.body
  try {
    res.status(201).json({ mensagem: 'Comentário criado com sucesso' })
  } catch (error) {
    console.error('Erro ao criar comentário:', error)
    res.status(500).json({ erro: 'Erro ao criar comentário' })
  }
}


export const deletarComentario = async (req, res) => {
  const { id } = req.params
  try {
    res.status(200).json({ mensagem: 'Comentário deletado com sucesso' })
  } catch (error) {
    console.error('Erro ao deletar comentário:', error)
    res.status(500).json({ erro: 'Erro ao deletar comentário' })
  }
}