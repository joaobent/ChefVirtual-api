import express from 'express';
import multer from 'multer';
import {postEtapa, postIngrediente, postReceita}  from '../controllers/pubReceita.js';
const router = express.Router();
const upload = multer(); 


router.post('/PublicarReceita', 
    upload.single('imagem'),
    postReceita
    // #swagger.tags = ['Publicação']
    // #swagger.description = 'Realiza a publicação de receita'
);

router.post('/PublicarEtapa/:idReceita', 
    postEtapa
    // #swagger.tags = ['Publicação']
    // #swagger.description = 'Realiza a publicação das etapas de uma receita. Deve ser executada simultaneamente a publicação de receita e ingrediente'
);
router.post('/PublicarIngrediente/:idReceita', 
    postIngrediente
    // #swagger.tags = ['Publicação']
    // #swagger.description = 'Realiza a publicação dos ingredientes de uma receita. Deve ser executada simultaneamente a publicação de receita e etapa'
)

export default router;
