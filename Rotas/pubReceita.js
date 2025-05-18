import express from 'express';
import {postEtapa, postIngrediente, postReceita}  from '../controllers/pubReceita.js';

const router = express.Router();

router.post('/PublicarReceita', 
    postReceita
    // #swagger.tags = ['Publicação']
    // #swagger.description = 'Realiza a publicação de receita'
);

router.post('/PublicarEtapa', 
    postEtapa
    // #swagger.tags = ['Publicação']
    // #swagger.description = 'Realiza a publicação das etapas de uma receita. Deve ser executada simultaneamente a publicação de receita e ingrediente'
);
router.post('/PublicarIngrediente', 
    postIngrediente
    // #swagger.tags = ['Publicação']
    // #swagger.description = 'Realiza a publicação dos ingredientes de uma receita. Deve ser executada simultaneamente a publicação de receita e etapa'
)

export default router;
