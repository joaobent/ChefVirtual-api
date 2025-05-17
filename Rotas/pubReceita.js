import express from 'express';
import {criarReceita}  from '../controllers/pubReceita.js';

const router = express.Router();

router.post('/pubReceitas', criarReceita); // POST /receitas

export default router;
