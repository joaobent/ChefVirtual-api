import pool from '../config/conexao.js';
import { executaQuery } from '../config/dbInstance.js';

export async function getIngredientesPorReceita(idReceita) {
  const conexao = await pool.getConnection();
  try {
    const query = `
      SELECT 
        i.nome AS nomeIngrediente,
        ri.quantidade,
        ri.medida,
        ri.unidade
      FROM ingrediente_receita ri
      JOIN ingrediente i ON ri.ingrediente_id = i.id
      WHERE ri.receita_id = ?
      ORDER BY i.nome;
    `;
    const resultado = await executaQuery(conexao, query, [idReceita]);
    return resultado;
  } catch (error) {
    console.error('Erro ao buscar ingredientes por receita:', error);
    throw error;
  } finally {
    conexao.release();
  }
}


export async function getIngredientes() {
  const conexao = await pool.getConnection();
  try {
    const query = `SELECT * FROM ingrediente ORDER BY nome;`;
    const resultado = await executaQuery(conexao, query);
    return resultado;
  } catch (error) {
    console.error('Erro ao buscar ingredientes:', error);
    throw error;
  } finally {
    conexao.release();
  }
}