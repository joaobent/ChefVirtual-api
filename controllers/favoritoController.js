import {
    GetTodosFavoritos,
    GetFavoritosPorUsuario,
    InserirFavorito,
    AtualizarFavorito
} from '../Consultas/favorito.js'

export async function listarTodosFavoritos(req, res) {
    const favoritos = await GetTodosFavoritos()
    res.json(favoritos)
}

export async function listarFavoritosUsuario(req, res) {
    const usuarioId = parseInt(req.params.usuarioId)
    if (isNaN(usuarioId)) return res.status(400).json({ erro: 'ID de usuário inválido' })

    const favoritos = await GetFavoritosPorUsuario(usuarioId)
    res.json(favoritos)
}

export async function adicionarFavorito(req, res) {
    const { usuario_id, receita_id } = req.body
    if (!usuario_id || !receita_id) return res.status(400).json({ erro: 'Campos obrigatórios ausentes' })

    await InserirFavorito(usuario_id, receita_id)
    res.status(201).json({ mensagem: 'Favorito adicionado com sucesso' })
}

export async function atualizarFavorito(req, res) {
    const usuarioId = parseInt(req.params.usuarioId)
    const receitaId = parseInt(req.params.receitaId)
    const { novoUsuarioId, novaReceitaId } = req.body

    if (!novoUsuarioId || !novaReceitaId) return res.status(400).json({ erro: 'Campos obrigatórios ausentes' })

    await AtualizarFavorito(usuarioId, receitaId, novoUsuarioId, novaReceitaId)
    res.json({ mensagem: 'Favorito atualizado com sucesso' })
}
