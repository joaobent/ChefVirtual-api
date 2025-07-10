import pool from '../config/conexao.js';
import { executaQuery } from '../config/dbInstance.js';

export async function getEtapasPorReceita(idReceita) {
  const conexao = await pool.getConnection();
  try {
    const query = `
      SELECT 
        id,
        numeroEtapa,
        descricao,
        receita_id
      FROM etapa
      WHERE receita_id = ?
      ORDER BY numeroEtapa;
    `;
    const resultado = await executaQuery(conexao, query, [idReceita]);
    return resultado;
  } catch (error) {
    console.error('Erro ao buscar etapas da receita:', error);
    throw error;
  } finally {
    conexao.release();
  }
}
