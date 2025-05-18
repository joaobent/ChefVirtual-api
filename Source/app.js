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

app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument, {
    explorer: true,
    swaggerOptions: {
        docExpansion: 'none',
        defaultModelsExpandDepth: -1,
    }
}));

app.use(express.json());
app.use('/', receitasRotas); // prefixa as rotas das receitas com /api
app.use('/', categoriaRotas);
app.use('/', comentariosRotas);
app.use('/', favoritoRotas);
app.use('/', codigoVerificacao);
app.use('/', usuarioRouter)
app.use('/', loginRouter)
app.use('/', pubReceita); 


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