import express from 'express'
import { padrao } from './servicos/consultas.js';

const app = express();

app.get('/teste', async(req, res) =>{
    const teste = await padrao()
    res.json(teste)
})

app.listen(7777, () => {
    const data = new Date()
    console.log(`Servidor iniciado em ${data}`)
})