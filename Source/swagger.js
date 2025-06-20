import swaggerAutogen from 'swagger-autogen';

const outputFile = './swaggerOpt.json';
const endpointsFiles = [
  './app.js', // Arquivo principal com uso das rotas
  './Rotas/etapas.js',
  './Rotas/ingredientes.js',
];

const doc = {
  //basePath: "/api",
  info: {
    title: 'API Chef Virtual',
    description: 'Documentação da API Chef Virtual',
  },
  host: 'https://chefvirtual.dev.vilhena.ifro.edu.br/api/',
  schemes: ['http'],
  tags: [
    { name: 'Receitas', description: 'Operações relacionadas às receitas' },
    { name: 'Comentários', description: 'Operações relacionadas aos comentários' },
    { name: 'Favoritos', description: 'Operações relacionadas aos favoritos' },
    { name: 'Usuários', description: 'Operações relacionadas aos usuários' },
    { name: 'Login', description: 'Operações relacionadas ao login' },
    { name: 'Verificação', description: 'Operações relacionadas ao código de verificação.\nController relacionado com o fluxo de login' },
    { name: 'Publicação', description: 'Operações relacionadas à publicação de receitas' },
    { name: 'Categorias', description: 'Operações relacionadas às categorias' },
    { name: 'Etapas', description: 'Operações relacionadas às etapas das receitas' },
    { name: 'Ingredientes', description: 'Operações relacionadas aos ingredientes das receitas' }
  ],
  definitions: {
    ReceitaPatch: {
      titulo: "Novo título da receita",
      ingredientes: "Lista atualizada de ingredientes",
      modoPreparo: "Novo modo de preparo"
    },
    ComentarioInput: {
      usuarioId: "123",
      receitaId: "456",
      texto: "Receita excelente!"
    },
    UsuarioLogin: {
      email: "usuario@email.com",
      senha: "senhaSegura123"
    },
    UsuarioCadastro: {
      nome: "Fulano da Silva",
      email: "fulano@email.com",
      senha: "senha123"
    },
    CategoriaInput: {
      type: "object",
      properties: {
        nome: {
          type: "string",
          example: "Sobremesas"
        }
      }
  
    }
  }
  
};

swaggerAutogen({ openapi: '3.0.0' })(outputFile, endpointsFiles, doc);
