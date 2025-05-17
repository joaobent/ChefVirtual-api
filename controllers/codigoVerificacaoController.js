import {
  GetAllCodigosVerificacao,
  GetCodigoVerificacaoById,
  PostCodigoVerificacao,
  PutCodigoVerificacao,
  DeleteCodigoVerificacao
} from '../Consultas/codigoVerificacao.js';

async function listarCodigos(req, res) {
  try {
    const codigos = await GetAllCodigosVerificacao();
    res.status(200).json(codigos);
  } catch (error) {
    res.status(500).json({ erro: 'Erro ao buscar códigos de verificação' });
  }
}

async function buscarCodigoPorId(req, res) {
  const id = parseInt(req.params.id);
  if (isNaN(id)) return res.status(400).json({ erro: 'ID inválido' });

  try {
    const codigo = await GetCodigoVerificacaoById(id);
    if (!codigo) {
      return res.status(404).json({ erro: 'Código com o ID informado não foi encontrado' });
    }
    res.status(200).json(codigo);
  } catch (error) {
    res.status(500).json({ erro: 'Erro ao buscar o código' });
  }
}

async function criarCodigo(req, res) {
  try {
    const resultado = await PostCodigoVerificacao();
    res.status(201).json({ mensagem: 'Código criado com sucesso', ...resultado });
  } catch (error) {
    res.status(500).json({ erro: 'Erro ao criar o código' });
  }
}

async function atualizarCodigo(req, res) {
  const id = parseInt(req.params.id);
  if (isNaN(id)) return res.status(400).json({ erro: 'ID inválido' });

  try {
    const codigoExistente = await GetCodigoVerificacaoById(id);
    if (!codigoExistente) {
      return res.status(404).json({ erro: 'Código com o ID informado não foi encontrado' });
    }

    const novoCodigo = await PutCodigoVerificacao(id);
    res.status(200).json({ mensagem: 'Código atualizado com sucesso', id });
  } catch (error) {
    res.status(500).json({ erro: 'Erro ao atualizar o código' });
  }
}

async function deletarCodigo(req, res) {
  const id = parseInt(req.params.id);
  if (isNaN(id)) return res.status(400).json({ erro: 'ID inválido' });

  try {
    const codigoExistente = await GetCodigoVerificacaoById(id);
    if (!codigoExistente) {
      return res.status(404).json({ erro: 'Código com o ID informado não foi encontrado' });
    }

    await DeleteCodigoVerificacao(id);
    res.status(200).json({ mensagem: 'Código deletado com sucesso', id });
  } catch (error) {
    res.status(500).json({ erro: 'Erro ao deletar o código' });
  }
}

export {
  listarCodigos,
  buscarCodigoPorId,
  criarCodigo,
  atualizarCodigo,
  deletarCodigo
};
