import {GetAllReceitas, GetReceita, GetReceitasByCategoria, GetReceitasByTitle, GetReceitasByUser, UpdateReceitasPartial} from '../Consultas/receitas.js'

export async function getReceitas(req, res) {
  try {
    const receitas = await GetAllReceitas();
    if(receitas.length !== 0) {
      res.json(receitas);
    }
    else{
      res.status(404).json({"erro": "Nenhuma receita encontrada"});
    }
  } catch (error) {
    console.log(error)
    res.status(500).json({ erro: 'Erro ao buscar receitas', error });
  }
}

export async function getReceita(req, res) {
  const {idReceita} = req.query;

  if (idReceita == null && isNaN(Number(idReceita)))
  {
    res.status(400).json({ mensagem: 'Identificador de receita nulo'})
  }

  try
  {
    const result = await GetReceita(idReceita)
    if (result.length !==0) {
      res.status(200).json(result)
    }
    else{
      res.status(404).json({"erro": "Nenhuma receita encontrada"});
    }
  }
  catch (error)
  {
    res.status(500).json({erro: error})
  }

}

export async function getReceitasByTitle(req, res) {
  const { tituloReceita } = req.query;

  if (!tituloReceita) {
    return res.status(400).json({ erro: 'O parâmetro tituloReceita é obrigatório.' });
  }

  try {
    const receitas = await GetReceitasByTitle(tituloReceita);
    if(receitas.length !== 0){
      res.json(receitas);
    }
    else{
      res.status(404).json({"erro": "Nenhuma receita encontrada"});
    }
  } catch (error) {
    res.status(500).json({ erro: 'Erro na busca por receita', error });
  }
}

export async function getReceitasByCategoria(req, res) {
  const {idCategoria} = req.query;

  if (!idCategoria || isNaN(Number(idCategoria))){
    return res.status(400).json({ erro: 'O parâmetro idUsuario é inválido.' });
  }

  try
  {
    const receitas = await GetReceitasByCategoria(idCategoria)
    if (receitas.length !== 0){
      res.json(receitas)
    }
    else{
      return res.status(404).json({ erro: 'Nenhuma receita encontrada para a categoria' });
    }
  }
  catch (error){
    res.status(500).json({erro: 'Erro na busca', error})
  }
}


export async function getReceitasByUser(req, res) {
  const {idUsuario} = req.query;

  if (!idUsuario || isNaN(Number(idUsuario))){
    return res.status(400).json({ erro: 'O parâmetro idUsuario é obrigatório.' });
  }

  try
  {
    const receitas = await GetReceitasByUser(idUsuario)
    res.json(receitas)
  }
  catch (error){
    res.status(500).json({erro: 'Erro na busca', error})
  }
}

export async function patchReceitas(req, res) {
  const { idUsuario } = req.query;
  const dados = req.body;

  if (!idUsuario || isNaN(Number(idUsuario))) {
    return res.status(400).json({ erro: 'O parâmetro idUsuario é obrigatório na query.' });
  }

  if (!dados || typeof dados !== 'object' || Object.keys(dados).length === 0) {
    return res.status(400).json({ erro: 'O corpo da requisição está vazio.' });
  }

  if (!dados.idReceita || isNaN(Number(dados.idReceita))) {
    return res.status(400).json({ erro: 'O campo "id" da receita é obrigatório no corpo da requisição.' });
  }

  try {
    const resultado = await UpdateReceitasPartial(Number(idUsuario), dados);

    if (resultado?.sucesso) {
      res.status(200).json({ mensagem: 'Receita atualizada com sucesso!' });
    } else {
      res.status(404).json({ erro: 'Receita não encontrada ou não pertence ao usuário.' });
    }
  } catch (error) {
    res.status(500).json({ erro: 'Erro ao atualizar a receita.', detalhes: error.message });
  }
}