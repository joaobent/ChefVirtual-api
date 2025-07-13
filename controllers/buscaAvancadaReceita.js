import { GetReceitasBuscaAvancada } from '../Consultas/receitas.js';

export async function getReceitasBuscaAvancada(req, res) {
  const {
    titulo,
    ingredientes,
    tempoMin,
    tempoMax,
    avaliacaoMin
  } = req.query;

  try {
    const receitas = await GetReceitasBuscaAvancada({
      titulo,
      ingredientes,
      tempoMin,
      tempoMax,
      avaliacaoMin
    });

    if (!receitas || receitas.length === 0) {
      return res.status(404).json({ erro: 'Nenhuma receita encontrada com os filtros aplicados.' });
    }

    res.status(200).json(receitas);
  } catch (error) {
    console.error('Erro na busca avançada de receitas:', error);
    res.status(500).json({ erro: 'Erro interno na busca avançada de receitas' });
  }
}
