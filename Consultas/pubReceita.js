import pool from '../config/conexao.js';
import { executaQuery } from '../config/dbInstance.js';

export async function PostReceita(titulo, descricao, imagem, tempo_preparo, idUsuario, qtn_pessoas) {
  const conexao = await pool.getConnection();
  try {
    const palavrasQuery = await executaQuery(conexao, `SELECT nome FROM palavrarestrita`);
    const palavras = palavrasQuery.map(row => row.nome.toLowerCase());

    const campos = [titulo, descricao].join(' ').toLowerCase();
    const palavraProibida = palavras.find(p => campos.includes(p));

    if (palavraProibida) {
      throw new Error(`Não é permitido a inserção de palavras inadequadas na receita.`);
    }

    const query = `INSERT INTO receita (titulo, descricao, imagem, usuario_id, tempo_preparo, qtn_pessoas ) VALUES (?, ?, ?, ?, ?, ?)`;
    const resultado = await executaQuery(conexao, query, [titulo, descricao, imagem, idUsuario, tempo_preparo, qtn_pessoas, ]);

    return {
      id: resultado.insertId,
      idUsuario: idUsuario,
      titulo,
      descricao,
      imagem,
      tempo_preparo,
      qtn_pessoas,
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
    // Busca todos os ingredientes existentes no banco
    const ingredientesExistentes = await executaQuery(conexao, `SELECT id, nome FROM ingrediente`);
    const mapIngredientes = new Map(
      ingredientesExistentes.map((ing) => [ing.nome.toLowerCase(), ing.id])
    );

    const ingredientesFinal = [];

    // Para cada ingrediente recebido, verifica se já existe ou precisa ser inserido
    for (const ing of ingredientes) {
      const nomeNormalizado = ing.nome.trim().toLowerCase();
      let idIngrediente;

      if (mapIngredientes.has(nomeNormalizado)) {
        // Já existe
        idIngrediente = mapIngredientes.get(nomeNormalizado);
      } else {
        // Não existe, insere novo ingrediente e pega o ID
        const insertIng = await executaQuery(
          conexao,
          `INSERT INTO ingrediente (nome) VALUE (?)`,
          [ing.nome]
        );
        idIngrediente = insertIng.insertId;
        mapIngredientes.set(nomeNormalizado, idIngrediente); // Atualiza o mapa para evitar duplicações
      }

      ingredientesFinal.push({
        idIngredienteDb: idIngrediente,
        quantidade: ing.quantidade,
        medida: ing.medida,
        unidade: ing.unidade,
      });
    }

    // Monta a query para inserir na tabela ingrediente_receita
    const values = ingredientesFinal.map(() => '(?, ?, ?, ?, ?)').join(', ');
    const parametros = ingredientesFinal.flatMap(ing =>
      [ing.idIngredienteDb, idReceita, ing.quantidade, ing.medida, ing.unidade]
    );

    const query = `
      INSERT INTO ingrediente_receita 
      (ingrediente_id, receita_id, quantidade, medida, unidade) 
      VALUES ${values}
    `;
    await executaQuery(conexao, query, parametros);

    return {
      mensagem: 'Ingredientes inseridos com sucesso na receita.',
      IngredientesInseridos: ingredientesFinal.length,
      idReceita: idReceita,
    };
  } catch (error) {
    console.log(error);
    throw error;
  } finally {
    conexao.release();
  }
}
