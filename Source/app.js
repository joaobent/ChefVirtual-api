import express from 'express';
import receitasRotas from '../Rotas/receitasRotas.js'
import categoriaRotas from '../Rotas/categoriaRotas.js'
import comentariosRotas from '../Rotas/comentariosRotas.js'
import favoritoRotas from '../Rotas/favoritoRotas.js'
import loginRotas from '../Rotas/loginRotas,.js'
import nivelRotas from '../Rotas/nivelRotas.js'
import usuarioRouter from '../Rotas/usuarioRotas.js'
import loginRouter from '../Rotas/loginRotas,.js'

const app = express();
const PORT = 3000;

app.use(express.json());
app.use('/api', receitasRotas); // prefixa as rotas das receitas com /api
app.use('/api', categoriaRotas);
app.use('/api', comentariosRotas);
app.use('/api', favoritoRotas);
app.use('/api', nivelRotas);
app.use('/api', usuarioRouter)
app.use('/api', loginRouter)

app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:3000`);
});