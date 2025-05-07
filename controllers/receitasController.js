import {GetAllReceitas, GetReceitasByName} from '../Consultas/receitas.js'

export async function getReceitas(req, res) {
    try {
      const receitas = await GetAllReceitas();
      res.json(receitas);
    } catch (error) {
      console.log(error)
      res.status(500).json({ erro: 'Erro ao buscar receitas', error });
    }
}
  
export async function getReceitasByName(req, res) {
    const { tituloReceita } = req.query;
    try {
      const receitas = await GetReceitasByName(tituloReceita);
      res.json(receitas);
    } catch (error) {
      res.status(500).json({ erro: 'Erro na busca por nome', error });
    }
}