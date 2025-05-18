import {
    GetTodosFavoritos,
    GetFavoritosPorUsuario,
    InserirFavorito,
    AtualizarFavorito,
    GetFavoritosUsuarioReceita
} from '../Consultas/favorito.js'

export async function listarFavoritosUsuario(req, res) {
    const {usuarioId} = req.query

    if (isNaN(Number(usuarioId)) || Number(usuarioId) < 0)
    {
        return res.status(400).json({ erro: 'ID de usuário inválido' })
    }

    const favoritos = await GetFavoritosPorUsuario(usuarioId)
    res.json(favoritos)
}

export async function adicionarFavorito(req, res) {
    const { usuarioId, receitaId } = req.body
    
    if ((isNaN(Number(usuarioId)) || Number(usuarioId) < 0) && ((isNaN(Number(receitaId)) || Number(receitaId) < 0)))
    {
        return res.status(400).json({ erro: 'Campos obrigatórios ausentes' })
    }

    const favoritosUsuario = await GetFavoritosUsuarioReceita(usuarioId, receitaId)
    
    if (favoritosUsuario.length > 0)
    {
        return res.status(400).json({erro: 'Já existe um registro do usuário para esta receita. Se deseja alterar o status do favorito, procure usar a rota patch'})
    }

    await InserirFavorito(usuarioId, receitaId)
    res.status(201).json({ mensagem: 'Favorito adicionado com sucesso' })
}

export async function atualizarFavorito(req, res) {
    const {usuarioId, receitaId} = req.query
    await AtualizarFavorito(usuarioId, receitaId, novoUsuarioId, novaReceitaId)
    res.json({ mensagem: 'Favorito atualizado com sucesso' })
}
