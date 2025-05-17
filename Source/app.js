import express from 'express';
import swaggerUi from 'swagger-ui-express'
import swaggerDocument from './swaggerOpt.json' with { type: 'json' };

import receitasRotas from '../Rotas/receitasRotas.js'
import categoriaRotas from '../Rotas/categoriaRotas.js'
import comentariosRotas from '../Rotas/comentariosRotas.js'
import favoritoRotas from '../Rotas/favoritoRotas.js'
import loginRouter from '../Rotas/loginRotas.js'
<<<<<<< HEAD
import codigoVerificacao  from '../Rotas/codigoVerificacao.js';
import usuarioRouter from '../Rotas/usuarioRotas.js'

=======
>>>>>>> 923c6d138c9a667e1cf9a91916fa4cc99a2d3173
import pool from '../config/conexao.js'
import http from 'http'
//import nivelRotas from '../Rotas/nivelRotas.js'
import usuarioRouter from '../Rotas/usuarioRotas.js'
const app = express();
const PORT = 3000;



app.use(express.json());
app.use('/', receitasRotas); // prefixa as rotas das receitas com /api
app.use('/', categoriaRotas);
app.use('/', comentariosRotas);
app.use('/', favoritoRotas);
app.use('/', codigoVerificacao);
app.use('/', usuarioRouter)
app.use('/', loginRouter)



const server = http.createServer(app);
server.listen(PORT, async () => {
  console.log("🟡 Inicializando servidor...");
  try {
    const connection = await pool.getConnection();
    connection.ping();
    connection.release();
    console.log("🟢 Conexão ao banco de dados realizada com sucesso!");
  }
  catch {
    console.error("🔴 Tentativa de conxão ao banco de dados falha!");
    server.close();
    return;
  }
  console.log("🟢 Servidor iniciado!");
});


// app.listen(PORT, () => {
//   console.log(`Servidor rodando em http://localhost:3000`);

// });
app.use('/api', receitasRotas);
app.use('/api', categoriaRotas);
app.use('/api', comentariosRotas);
app.use('/api', favoritoRotas);
//app.use('/api', nivelRotas);
app.use('/api', usuarioRouter)
app.use('/api', loginRouter)


app.use("/swagger", swaggerUi.serve, swaggerUi.setup(swaggerDocument))

app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:3000`);
});
