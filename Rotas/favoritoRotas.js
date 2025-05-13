import express from 'express'
import {
    listarTodosFavoritos,
    listarFavoritosUsuario,
    adicionarFavorito,
    atualizarFavorito
} from '../controllers/favoritoController.js'

const router = express.Router()

router.get('/favoritos', listarTodosFavoritos)
router.get('/favoritos/:usuarioId', listarFavoritosUsuario)
router.post('/favoritos', adicionarFavorito)
router.patch('/favoritos/:usuarioId/:receitaId', atualizarFavorito)

export default router
