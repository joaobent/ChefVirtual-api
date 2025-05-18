import pool from '../config/conexao.js';
import { executaQuery } from '../config/dbInstance.js';

export async function PostReceita(titulo, descricao, imagem, tempo_preparo, idUsuario) {
  const conexao = await pool.getConnection();
  try {
    const palavrasQuery = await executaQuery(conexao, `SELECT nome FROM palavrarestrita`);
    const palavras = palavrasQuery.map(row => row.nome.toLowerCase());

    const campos = [titulo, descricao].join(' ').toLowerCase();
    const palavraProibida = palavras.find(p => campos.includes(p));

    if (palavraProibida) {
      throw new Error(`Não é permitido a inserção de palavras inadequadas na receita.`);
    }

    const query = `INSERT INTO receita (titulo, descricao, imagem, tempo_preparo) VALUES (?, ?, ?, ?)`;
    const resultado = await executaQuery(conexao, query, [titulo, descricao, imagem, tempo_preparo]);

    return {
      id: resultado.insertId,
      idUsuario: idUsuario,
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

export async function PostEtapas(etapas, idReceita) {
  const conexao = await pool.getConnection();
  try {
    const palavrasQuery = await executaQuery(conexao, `SELECT nome FROM palavrarestrita`);
    const palavras = palavrasQuery.map(row => row.nome.toLowerCase());

    for (const etapa of etapas) {
      const campos = etapa.descricao.toLowerCase();
      const proibida = palavras.find(p => campos.includes(p));
      if (proibida) {
        throw new Error(`A palavra "${proibida}" não é permitida na descrição das etapas.`);
      }
    }

    const values = etapas.map(() => '(?, ?, ?)').join(', ');
    const parametros = etapas.flatMap(etapa => [etapa.numeroEtapa, etapa.descricao, idReceita]);

    const query = `INSERT INTO etapa (numeroEtapa, descricao, receita_id) VALUES ${values}`;
    const resultado = await executaQuery(conexao, query, parametros);

    return {
      mensagem: 'Etapas inseridas com sucesso.',
      etapasInseridas: etapas.length,
      idReceita: idReceita,
    };
  }
  catch (error)
  {
    console.log(error);
    throw error;
  }
  finally
  {
    conexao.release();
  }
}

export async function PostIngredientes(ingredientes, idReceita) {
  const conexao = await pool.getConnection();
  try {

    const values = ingredientes.map(() => '(?, ?, ?, ?, ?)').join(', ');
    const parametros = ingredientes.flatMap(ingrediente => [ingrediente.idIngredienteDb, idReceita, ingrediente.quantidade, ingrediente.medida, ingrediente.unidade]);

    const query = `INSERT INTO ingrediente_receita (ingrediente_id, receita_id, quantidade, medida, unidade) VALUES ${values}`;
    const resultado = await executaQuery(conexao, query, parametros);

    return {
      mensagem: 'Ingredientes inseridos com sucesso na receita.',
      IngredientesInseridos: ingredientes.length,
      idReceita: idReceita,
    };
  }
  catch(error)
  {
    console.log(error);
    throw error;
  }
  finally
  {
    conexao.release();
  }
}
