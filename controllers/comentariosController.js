import { DeleteComentario, GetAllComentarios, PostComentario } from '../Consultas/comentarios.js'

export const obterComentarios = async (req, res) => {
  const {idReceita} = req.query;

  if ((!idReceita && idReceita >= 0) && isNaN(Number(idReceita))){
    return res.status(400).json({ erro: 'O parâmetro id é obrigatório.' });
  }

  try {
    const comentarios = await GetAllComentarios(idReceita)

    if (comentarios.length > 0)
    {
      res.status(201).json(comentarios)
    }
    else
    {
      res.status(404).json({erro: 'Não há comentários para esta receita.'})
    }
  } catch (error) {
    res.status(500).json({ error })
  }
}

export const criarComentario = async (req, res) => {
  const { receitaId, usuarioId, comentario } = req.body

  if ((!receitaId && receitaId >=0) && (!usuarioId && usuarioId >= 0) && (!comentario && comentario>0)) {
    return res.status(400).json({ erro: 'Todos os campos devem ser preenchidos' });
  }

  try {
    const resultado  = await PostComentario(receitaId, usuarioId, comentario)
    if (resultado .affectedRows > 0)
    {
      return res.status(201).json("Comentario criado com sucesso")
    }
    else
    {
      throw new Error("Comentário não foi criado.")
    }

  } catch (error) {
    res.status(500).json({ erro: 'Erro ao criar comentário' })
  }
}


export const deletarComentario = async (req, res) => {
  const { id } = req.query

  if (isNaN(Number(id)) || Number(id) < 0)
  {
    return res.status(400).json({ erro: 'O campo id deve possuir um valor válido' });
  }

  try
  {
    const resultado  = await DeleteComentario(id)

    if (resultado .affectedRows > 0)
    {
      return res.status(201).json("Comentario deetado com sucesso")
    }
    else
    {
      return res.status(404).json("Não foi encontrado um comentário para este id")
    }
  } catch (error) {
    console.error('Erro ao deletar comentário:', error)
    res.status(500).json({ erro: 'Erro ao deletar comentário' })
  }
}