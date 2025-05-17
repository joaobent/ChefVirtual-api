import pool from '../config/conexao.js'
import { executaQuery } from '../config/dbInstance.js'

async function GetAllReceitas() {
    const conexao = await pool.getConnection()
    try {
        const query =
                `
                    SELECT 
                        r.id, r.titulo, r.imagem, 
                        u.id AS usuarioId, u.nome
                    FROM receita AS r
                    INNER JOIN usuario AS u ON r.usuario_id = u.id
                    ORDER BY r.id DESC
                `
        const resQuery = await executaQuery(conexao, query)
        const receitas = resQuery.map(row => ({
            id: row.id,
            tituloReceita: row.titulo,
            descricao: row.descricao,
            tempoPreparo: row.tempo_preparo,
            usuario: {
                id: row.usuarioId,
                nome: row.nome,
            },
            imagemReceita: row.imagem ? row.imagem.toString('base64') : null,
    }));
        return receitas;
    }
    catch (ex) {
        console.log(ex)
    }
    finally {
        conexao.release()
    }
}

async function GetReceita(receitaid) {
    const conexao = await pool.getConnection();
    try {
const query = `
            SELECT 
                r.titulo, r.descricao, r.imagem, r.tempo_preparo,
                u.id AS userId, u.nome AS usuarioNome,
                i.nome AS ingredienteNome,
                ir.quantidade, ir.medida,
                e.numeroEtapa, e.descricao AS etapaDescricao,
                ROUND(AVG(f.avaliacao), 1) AS mediaAvaliacao,
                COUNT(f.usuario_id) AS totalFavoritos
            FROM receita AS r
            INNER JOIN ingrediente_receita AS ir ON r.id = ir.receita_id
            INNER JOIN ingrediente AS i ON ir.ingrediente_id = i.id
            INNER JOIN usuario AS u ON r.usuario_id = u.id
            INNER JOIN etapa AS e ON r.id = e.receita_id
            LEFT JOIN favoritos AS f ON r.id = f.receita_id
            WHERE r.id = ?
            GROUP BY 
            r.id, r.titulo, r.descricao, r.imagem, r.tempo_preparo,
            u.id, u.nome,
            i.nome,
            ir.quantidade, ir.medida,
            e.numeroEtapa, e.descricao;
        `;

        const resQuery = await executaQuery(conexao, query, [receitaid]);

        if (!resQuery || resQuery.length === 0) {
            return resQuery;
        }

        const row = resQuery[0];

        const etapasMap = new Map();
        const ingredientesMap = new Map();

        for (const linha of resQuery) {
            const chaveIngrediente = `${linha.ingredienteNome}-${linha.quantidade}-${linha.medida}`;

            if (!ingredientesMap.has(chaveIngrediente)) {
                ingredientesMap.set(chaveIngrediente, {
                    nomeIngrediente: linha.ingredienteNome,
                    quantidade: linha.quantidade,
                    medida: linha.medida
                });
            }

            const chaveEtapa = `${linha.numeroEtapa}`;

            if (!etapasMap.has(chaveEtapa)) {
                etapasMap.set(chaveEtapa, {
                    numeroEtapa: linha.numeroEtapa,
                    descricao: linha.etapaDescricao
                });
            }
        }

        const resultado = {
            tituloReceita: row.titulo,
            descricao: row.descricao,
            tempoPreparo: row.tempo_preparo,
            favoritos: {
                totalFavoritos: row.totalFavoritos || 0,
                mediaFavoritos: parseFloat(row.mediaAvaliacao) || 0
            },
            usuario: {
                id: row.userId,
                nome: row.usuarioNome
            },
            ingredientes: Array.from(ingredientesMap.values()),
            etapas: Array.from(etapasMap.values()),
            imagemReceita: (row.imagem && row.imagem.length > 0) ? row.imagem.toString('base64') : null

        };

        return resultado;
    } catch (ex) {
        console.error('Erro ao buscar receita:', ex);
        throw ex;
    } finally {
        conexao.release();
    }
}


async function GetReceitasByTitle(name) {

    const conexao = await pool.getConnection()
    try {
        const query =
            `   SELECT 
                    r.titulo, r.imagem, 
                    u.id AS usuarioId, u.nome
                FROM receita AS r
                INNER JOIN usuario AS u ON r.usuario_id = u.id
                WHERE r.titulo LIKE ?
                ORDER BY r.id DESC
            `;

        const search = `%${name}%`
        const resQuery = await executaQuery(conexao, query, [search])
        
        const receitas = resQuery.map(row => ({
            id: row.id,
            tituloReceita: row.titulo,
            tempoPreparo: row.tempo_preparo,
            usuario: {
                id: row.usuarioId,
                nome: row.nome,
            },
            imagemReceita: row.imagem ? row.imagem.toString('base64') : null,
        }));

        return receitas;
    }
    catch (ex) {
        console.log(ex)
    }
    finally {
        conexao.release()
    }
}

async function GetReceitasByCategoria(idCategoria) {
    const conexao = await pool.getConnection()
    try {
        const query =
            `
                SELECT 
                    r.id, r.titulo, r.imagem, 
                    u.id AS usuarioId, u.nome
                FROM receita AS r
                INNER JOIN usuario AS u ON r.usuario_id = u.id
                INNER JOIN categoria_receita as cr
                WHERE r.id = cr.receita_id AND cr.categoria_id = ?
                ORDER BY r.id DESC
            `

        const resQuery = await executaQuery(conexao, query, [idCategoria])
        
        const receitas = resQuery.map(row => ({
            id: row.id,
            tituloReceita: row.titulo,
            descricao: row.descricao,
            tempoPreparo: row.tempo_preparo,
            usuario: {
                id: row.usuarioId,
                nome: row.nome,
            },
            imagemReceita: row.imagem ? row.imagem.toString('base64') : null,
            }));

        return receitas;
    }
    catch (ex) {
        console.log(ex)
    }
    finally {
        conexao.release()
    }
}

async function GetReceitasByUser(userId) {
    const conexao = await pool.getConnection()
    try {
        const query =
            `
            SELECT 
                r.id, r.titulo, r.descricao, r.tempo_preparo, r.imagem,
                u.nome, u.id AS usuarioId
            FROM receita AS r
            INNER JOIN usuario as u ON r.usuario_id = u.id
            WHERE r.usuario_id = ?
            `;

        const resQuery = await executaQuery(conexao, query, [userId])

        const receitas = resQuery.map(row => ({
            id: row.id,
            tituloReceita: row.titulo,
            descricao: row.descricao,
            tempoPreparo: row.tempo_preparo,
            usuario: {
                id: row.usuarioId,
                nome: row.nome,
            },
            imagemReceita: row.imagem ? row.imagem.toString('base64') : null,
        }));

        return receitas;
    }
    catch (ex) {
        console.log(ex)
    }
    finally {
        conexao.release()
    }
}

async function UpdateReceitasPartial(userId, dados) {
    if (typeof userId !== 'number')
        return

    const conexao = await pool.getConnection()
    try {
        const campos = Object.keys(dados).map(campo => `${campo} = ?`).join(', ');
        const valores = Object.values(dados);

        console.log(`Campos: ${campos}`)
        console.log(`Valores: ${valores}`)

        const query = `UPDATE Receita SET ${campos} WHERE id = ?`;
        await executaQuery(conexao, query, [...valores, userId]);

        const res = executaQuery(conexao, query)
        return res;
    }
    catch (ex) {
        console.log(ex)
    }
    finally {
        conexao.release()
    }
}

export {
    GetAllReceitas, GetReceitasByTitle, GetReceitasByUser, GetReceita, GetReceitasByCategoria,
    UpdateReceitasPartial
}