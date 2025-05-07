import express from 'express'
import { GetReceitasByName, padrao } from './servicos/consultas.js'

const app = express();

app.get('/teste', async(req, res) =>{
    const teste = await Receitac
    res.json(teste)
})

app.get('/pesquisa', async(req, res) => {
    const nome = req.query.nome;

    if(typeof nome !== 'string')
        return res.status(400).json({erro: "Teste"})

    try{
        const resultado = await GetReceitasByName(nome)
        res.json(resultado)
    }
    catch{
        res.status(500).json({erro: "Erro interno de servidor"})
    }
})

app.listen(7777, () => {
    const data = new Date()
    console.log(`Servidor iniciado em ${data}`)
})