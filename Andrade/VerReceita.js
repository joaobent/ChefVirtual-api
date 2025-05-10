import express from 'express';
import cors from 'cors';
import { puxarDados } from './servicos/getDB.js';


const app = express()
const port = 9000

app.use(cors());
app.use(express.json());

app.get('/VerReceita', async (req, res) =>{
  try {
    const dados = await puxarDados(); // Chama a função para obter os dados
    res.json(dados); // Retorna os dados como resposta JSON
  } catch (error) {
    console.error('Erro ao obter dados:', error);
    res.status(500).json({ error: 'Erro ao obter dados' });
  }
  

})



app.listen(port, () => {
    const data = new Date();
    console.log(`Server iniciado com sucesso na rota ${port} - ${data}`);
  });