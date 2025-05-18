import crypto from 'crypto';
import pool from '../config/conexao.js';
import { executaQuery } from '../config/dbInstance.js';

// Gera código aleatório
async function GeraCodigoVerificacao(tamanho = 6) {
  try {
    const codigoAleatorio = crypto.randomBytes(Math.ceil(tamanho / 2)).toString('hex').slice(0, tamanho);
    return codigoAleatorio;
  } catch (error) {
    console.log(error);
    throw error;
  }
}

// Retorna todos os códigos
async function GetAllCodigosVerificacao() {
  const conexao = await pool.getConnection();
  try {
    const query = `SELECT * FROM codigo_verificacao`;
    const resposta = await executaQuery(conexao, query);
    const res = resposta.map(codigo => ({
      id: codigo.id,
      codigo_verificacao: codigo.codigo_verificacao
    }));
    return res;
  } catch (error) {
    console.log(error);
    throw error;
  } finally {
    conexao.release();
  }
}

async function GetCodigoVerificacaoByEmail(email) {
  const conexao = await pool.getConnection();
  try {
    const query = `
                  SELECT 
                    c.* 
                  FROM codigo_verificacao AS c
                  INNER JOIN login AS l ON l.codigo_verificacao_id = c.id
                  WHERE l.email = ?
                  ORDER BY c.id DESC
                  LIMIT 1
                  `
    const resposta = await executaQuery(conexao, query, [email]);

    if (resposta.length === 0) 
      throw new Error('Código de verificação não encontrado para o login informado')

    const codigo = resposta[0];

    console.log(codigo.codigo_verificacao)
    return {
      id: codigo.id,
      codigo_verificacao: codigo.codigo_verificacao
    };
  } catch (error) {
    console.log(error);
    throw error;
  } finally {
    conexao.release();
  }
}

// Retorna um código pelo ID
async function GetCodigoVerificacaoById(id) {
  const conexao = await pool.getConnection();
  try {
    const query = `SELECT * FROM codigo_verificacao WHERE id = ?`;
    const resposta = await executaQuery(conexao, query, [id]);

    if (resposta.length === 0) return null;

    const codigo = resposta[0];
    return {
      id: codigo.id,
      codigo_verificacao: codigo.codigo_verificacao
    };
  } catch (error) {
    console.log(error);
    throw error;
  } finally {
    conexao.release();
  }
}

// Cria um novo código e retorna o ID e o código
async function PostCodigoVerificacao() {
  const conexao = await pool.getConnection();
  try {
    const query = `INSERT INTO codigo_verificacao (codigo_verificacao) VALUES (?)`;
    const codigo_verificacao = await GeraCodigoVerificacao();
    
    const resultado = await executaQuery(conexao, query, [codigo_verificacao]);

    return {
      id: resultado.insertId, // Agora isso funciona
      codigo_verificacao
    };
  } catch (error) {
    console.log(error);
    throw error;
  } finally {
    conexao.release();
  }
}


// Atualiza um código existente e retorna true/false
async function PutCodigoVerificacao(id) {
  const conexao = await pool.getConnection();
  try {
    const query = `UPDATE codigo_verificacao SET codigo_verificacao = ? WHERE id = ?`;
    const codigo_verificacao = await GeraCodigoVerificacao();
    const resultado = await executaQuery(conexao, query, [codigo_verificacao, id]);
    return resultado.affectedRows > 0;
  } catch (error) {
    console.log(error);
    throw error;
  } finally {
    conexao.release();
  }
}

// Deleta um código e retorna true/false
async function DeleteCodigoVerificacao(id) {
  const conexao = await pool.getConnection();
  try {
    const query = `DELETE FROM codigo_verificacao WHERE id = ?`;
    const resultado = await executaQuery(conexao, query, [id]);
    return resultado.affectedRows > 0;
  } catch (error) {
    console.log(error);
    throw error;
  } finally {
    conexao.release();
  }
}

// Exporta todas as funções
export {
  GetAllCodigosVerificacao,
  GetCodigoVerificacaoByEmail,
  GetCodigoVerificacaoById,
  PostCodigoVerificacao,
  PutCodigoVerificacao,
  DeleteCodigoVerificacao,
  GeraCodigoVerificacao
};
