import {
  GetAllLogins,
  GetLoginById,
  PostLogin,
  PutLogin,
  DeleteLogin,
  PatchLogin,
  ConfirmarLogin
} from "../Consultas/login.js";

export async function getLogins(req, res) {
  try {
    const logins = await GetAllLogins();
    if (!logins || logins.length === 0) {
      return res.status(404).json({ erro: 'Nenhum login encontrado' });
    }
    res.status(200).json(logins);
  } catch (error) {
    console.error('Erro ao buscar logins:', error);
    res.status(500).json({ erro: 'Erro interno ao buscar logins' });
  }
}

export async function getLoginById(req, res) {
  const { idLogin } = req.params;
  if (!idLogin) {
    return res.status(400).json({ erro: 'Parâmetro "idLogin" é obrigatório' });
  }

  try {
    const login = await GetLoginById(idLogin);
    if (!login) {
      return res.status(404).json({ erro: 'Login não encontrado' });
    }
    res.status(200).json(login);
  } catch (error) {
    console.error(`Erro ao buscar login com ID ${idLogin}:`, error);
    res.status(500).json({ erro: 'Erro interno na busca por ID' });
  }
}

export async function confirmarLogin(req, res) {
  const { email, senha } = req.query;
  if (typeof email === 'string' && email.includes('@') && email.includes('.') && !senha) {
    return res.status(400).json({ erro: 'Parâmetros estão faltantes' });
  }

  try {
    const { token, id } = await ConfirmarLogin(email, senha);

    res.cookie('token', token, {
      httpOnly: false,
      secure: true,
      sameSite: 'None',
      maxAge: 3600000
    });
    res.cookie('id', id, {
      httpOnly: false,
      secure: true,
      sameSite: 'None',
      maxAge: 3600000
    });

    res.status(200).json({ mensagem: 'Login confirmado com sucesso', token: token, idUsuario: id });
  }
  catch (error) {
    res.status(400).json({ erro: error.message });
  }
}


export async function postLogin(req, res) {
  const { email, senha } = req.body;
  try {
    const resultado = await PostLogin(email, senha);
    res.status(201).json({ mensagem: 'Login criado com sucesso', id: resultado.insertId });
  } catch (error) {
    console.error('Erro ao criar login:', error);
    res.status(500).json({ erro: error.message });
  }
}

export async function putLogin(req, res) {
  const { id } = req.params;
  const { email, senha, codigo_verificacao_id } = req.body;
  try {
    await PutLogin(id, email, senha, codigo_verificacao_id);
    res.status(200).json({ mensagem: 'Login atualizado com sucesso' });
  } catch (error) {
    console.error('Erro ao atualizar login:', error);
    res.status(500).json({ erro: 'Erro ao atualizar login' });
  }
}

export async function patchLogin(req, res) {
  const { id } = req.params;
  const { email, senha, codigo_verificacao_id } = req.body;
  const dados = {};
  if (email) dados.email = email;
  if (senha) dados.senha = senha;
  if (codigo_verificacao_id) dados.codigo_verificacao_id = codigo_verificacao_id;

  if (Object.keys(dados).length === 0) {
    res.status(400).json({ mensagem: 'Ao menos um campo tem de estar preenchido' });
  }
  try {
    await PatchLogin(id, dados);
    res.status(200).json({ mensagem: 'Usuário atualizado parcialmente com sucesso' });
  } catch (error) {
    console.error('Erro no patch:', error);
    res.status(500).json({ erro: 'Erro ao atualizar parcialmente o usuário' });
  }
}

export async function deleteLogin(req, res) {
  const { id } = req.params;
  try {
    await DeleteLogin(id);
    res.status(200).json({ mensagem: 'Login deletado com sucesso' });
  } catch (error) {
    console.error('Erro ao deletar login:', error);
    res.status(500).json({ erro: 'Erro ao deletar login' });
  }
}
