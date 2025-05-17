import pool from '../config/conexao.js';
import { executaQuery } from '../config/dbInstance.js';

export async function PostReceita(titulo, descricao, imagem, tempo_preparo) {
  const conexao = await pool.getConnection();
  try {
    const query = `INSERT INTO receita (titulo, descricao, imagem, tempo_preparo) VALUES (?, ?, ?, ?)`;
    const resultado = await executaQuery(conexao, query, [titulo, descricao, imagem, tempo_preparo]);

    return {
      id: resultado.insertId,
      titulo,
      descricao,
      imagem,
      tempo_preparo,
    };
  } catch (error) {
    console.log(error);
    throw error;
  } finally {
    conexao.release();
  }
}
