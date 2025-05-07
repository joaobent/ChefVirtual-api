import {GetAllReceitas, GetReceitasByTitle, GetReceitasByUser} from '../Consultas/receitas.js'

export async function getReceitas(req, res) {
  try {
    const receitas = await GetAllReceitas();
    res.json(receitas);
  } catch (error) {
    console.log(error)
    res.status(500).json({ erro: 'Erro ao buscar receitas', error });
  }
}
  
export async function getReceitasByTitle(req, res) {
  const { tituloReceita } = req.query;
  try {
    const receitas = await GetReceitasByTitle(tituloReceita);
    res.json(receitas);
  } catch (error) {
    res.status(500).json({ erro: 'Erro na busca por titulo', error });
  }
}

export async function getReceitasByUser(req, res) {
  const {idUsuario} = req.query;
  
  try{
    const receitas = await GetReceitasByUser(idUsuario)
    res.json(receitas)
  }
  catch (error){
    res.status(500).json({erro: 'Erro na busca por usuario', error})
  }
}