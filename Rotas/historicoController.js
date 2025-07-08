import {
  GetHistoricoByUsuario,
  PostHistorico,
  DeleteHistoricoByUsuario
} from '../Consultas/historico.js';

export async function getHistorico(req, res) {
    const { idUsuario } = req.query;

    if (!idUsuario) {
        return res.status(400).json({ erro: 'Parâmetro "idUsuario" é obrigatório.' });
    }

    try {
        const historico = await GetHistoricoByUsuario(idUsuario);
        if (!historico || historico.length === 0) {
            return res.status(404).json({ erro: 'Nenhum histórico encontrado para este usuário.' });
        }
        res.status(200).json(historico);
    } catch (error) {
        console.error("Erro ao buscar histórico:", error);
        res.status(500).json({ erro: 'Erro interno ao buscar histórico.' });
    }
}

export async function postHistorico(req, res) {
    const { idUsuario, idReceita, nome, descricao } = req.body;

    if (!idUsuario || !idReceita || !nome) {
        return res.status(400).json({ erro: 'Campos obrigatórios: idUsuario, idReceita, nome.' });
    }

    try {
        const novo = await PostHistorico({ idUsuario, idReceita, nome, descricao });
        res.status(201).json({ mensagem: "Item adicionado ao histórico", ...novo });
    } catch (error) {
        console.error("Erro ao adicionar histórico:", error);
        res.status(500).json({ erro: 'Erro interno ao adicionar ao histórico.' });
    }
}

export async function deleteHistorico(req, res) {
    const { idUsuario } = req.params;

    try {
        const apagado = await DeleteHistoricoByUsuario(idUsuario);
        if (apagado) {
            res.status(200).json({ mensagem: 'Histórico apagado com sucesso.' });
        } else {
            res.status(404).json({ erro: 'Histórico não encontrado para este usuário.' });
        }
    } catch (error) {
        console.error("Erro ao apagar histórico:", error);
        res.status(500).json({ erro: 'Erro interno ao apagar histórico.' });
    }
}
