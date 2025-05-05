import express from 'express';
import cors from 'cors';

const app = express()
const port = 9000

app.use(cors());
app.use(express.json());

app.get('/visualizar_receita', async (req,res) =>{


})



app.listen(port, () => {
    const data = new Date();
    console.log(`Server iniciado com sucesso na rota ${port} - ${data}`);
  });