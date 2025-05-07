import pool from "./conexao.js";

const ReceitaController = {
    async getAll(req, res) {
      const conexao = await pool.getConnection()
      try{
          const query = "SELECT * FROM Receita"
          const res = executaQuery(conexao, query)
          return res;
      }
      catch (ex){
          console.log(ex)
      }
      finally{
          conexao.release()
      }
    },
  
    async getById(req, res) {
      const { id } = req.params;
      try {
        const receita = await ReceitaService.getReceitaById(id);
        if (!receita) {
          return res.status(404).json({ message: 'Receita não encontrada' });
        }
        res.status(200).json(receita);
      } catch (error) {
        res.status(500).json({ message: 'Erro ao buscar receita', error });
      }
    },
  
    async create(req, res) {
      const { nome, descricao } = req.body;
      try {
        const newReceitaId = await ReceitaService.createReceita(nome, descricao);
        res.status(201).json({ id: newReceitaId, nome, descricao });
      } catch (error) {
        res.status(500).json({ message: 'Erro ao criar receita', error });
      }
    },
  
    // Outros controladores conforme necessário
  };
  
  module.exports = ReceitaController;