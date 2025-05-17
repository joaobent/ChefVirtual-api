import {GetAllReceitas, GetReceita, GetReceitasByTitle, GetReceitasByUser, UpdateReceitasPartial} from '../Consultas/receitas.js'

export async function getReceitas(req, res) {
  try {
    const receitas = await GetAllReceitas();
    if(receitas && receitas.length > 0) {
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
    console.log(parseInt(idReceita))
    const result = await GetReceita(idReceita)
    if (result) {
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
    if(receitas.lenght > 0){
      res.json(receitas);
    }
    else{
      res.status(404).json({"erro": "Nenhuma receita encontrada"});
    }
  } catch (error) {
    res.status(500).json({ erro: 'Erro na busca por receita', error });
  }
}


export async function getReceitasByUser(req, res) {
  const {idUsuario} = req.query;

  try{
    const receitas = await GetReceitasByUser(idUsuario)
    res.json(receitas)
  }
  catch (error){
    res.status(500).json({erro: 'Erro na busca', error})
  }
}

export async function patchReceitas(req, res) {
  const {idUsuario} = req.params;
  const dados = req.body;

  if (!dados || (Array.isArray(dados) && dados.length === 0) || (typeof dados === 'object' && Object.keys(dados).length === 0)) {
    return res.status(400).json({ erro: 'Dados para atualização de receita não podem estar vazios.' });
  }

  try
  {
    const res = await UpdateReceitasPartial(idUsuario, dados)
    if (res.affectedRows > 0){
      res.status(200).json({ mensagem: 'Receita atualizada com sucesso!' })
    }
    else{
      res.status(404).json({"erro": "Nenhuma receita encontrada"});
    }
  }
  catch (error)
  {
    res.status(500).json({erro: 'Erro na busca', error})
  }

}