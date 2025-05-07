import express from 'express';
import receitasRotas from '../Rotas/receitasRotas.js'

const app = express();
const PORT = 3000;

app.use(express.json()); // permite ler JSON no body
app.use('/api', receitasRotas); // prefixa as rotas com /api

app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});