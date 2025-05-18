import express from 'express';
import swaggerUi from 'swagger-ui-express'
import swaggerDocument from './swaggerOpt.json' with { type: 'json' };

import receitasRotas from '../Rotas/receitasRotas.js'
import categoriaRotas from '../Rotas/categoriaRotas.js'
import comentariosRotas from '../Rotas/comentariosRotas.js'
import favoritoRotas from '../Rotas/favoritoRotas.js'
import loginRouter from '../Rotas/loginRotas.js'
import codigoVerificacao  from '../Rotas/codigoVerificacao.js';
import usuarioRouter from '../Rotas/usuarioRotas.js'
import pubReceita from '../Rotas/pubReceita.js'
import pool from '../config/conexao.js'
import http from 'http'


const app = express();
const PORT = 3000;



app.use(express.json());
app.use('/api', receitasRotas); // prefixa as rotas das receitas com /api
app.use('/api', categoriaRotas);
app.use('/api', comentariosRotas);
app.use('/api', favoritoRotas);
app.use('/api', codigoVerificacao);
app.use('/api', usuarioRouter)
app.use('/api', loginRouter)
app.use('/api', pubReceita); 
app.use("/swagger", swaggerUi.serve, swaggerUi.setup(swaggerDocument))


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