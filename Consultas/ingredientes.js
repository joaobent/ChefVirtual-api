import pool from '../config/conexao.js';
import { executaQuery } from '../config/dbInstance.js';

export async function getIngredientes() {
  const conexao = await pool.getConnection();
  try {
    const query = `SELECT id, nome FROM ingrediente ORDER BY nome ASC`;
    const resultado = await executaQuery(conexao, query);
    return resultado;
  } catch (error) {
    throw error;
  } finally {
    conexao.release();
  }
}
