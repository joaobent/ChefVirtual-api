import express from 'express'
import {
    listarFavoritosUsuario,
    adicionarFavorito,
    atualizarFavorito
} from '../controllers/favoritoController.js'

const router = express.Router()

router.get('/GetFavoritos', (req, res) => {
    // #swagger.tags = ['Favoritos']
    // #swagger.description = 'Lista todas as receitas favoritas de um usuário'
    listarFavoritosUsuario(req, res)
})

router.post('/PostFavoritos', 
    adicionarFavorito 
    // #swagger.tags = ['Favoritos']
    // #swagger.description = 'Adicionar favorito a uma receita'
)

router.patch('/PatchFavoritos', (req, res) => {
    // #swagger.tags = ['Favoritos']
    // #swagger.description = 'Atualizar o status de favorito de uma receita (remover ou adicionar favorito se já existir o registro no db)'
    atualizarFavorito(req, res)
})

export default router
