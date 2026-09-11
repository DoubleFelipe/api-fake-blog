const express = require('express');
const cors = require('cors');
const path = require('path');
const swaggerUi = require('swagger-ui-express');
const swaggerSpec = require('./config/swagger');
const postRoutes = require('./routes/postRoutes');

const app = express();

// Middlewares globais de requisição e segurança
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Servir imagens estáticas legadas
app.use('/img', express.static(path.join(__dirname, '..', 'public', 'images')));
app.use('/images', express.static(path.join(__dirname, '..', 'public', 'images')));

// Documentação interativa Swagger
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
app.get('/docs', (req, res) => res.redirect('/api-docs'));

// Rota raiz de boas-vindas com orientações
app.get('/', (req, res) => {
  res.json({
    name: 'API Fake Blog - Versão 2.0',
    description: 'API refatorada com arquitetura MVC, Supabase (PostgreSQL) e Swagger',
    documentation: '/api-docs',
    endpoints: {
      listarTodas: 'GET /postagens',
      buscarPorId: 'GET /postagens/:id',
      criar: 'POST /postagens',
      atualizar: 'PUT /postagens/:id',
      deletar: 'DELETE /postagens/:id',
      categoriaGames: 'GET /categoria/games'
    }
  });
});

// Rotas da API
app.use('/', postRoutes);

// Middleware para tratamento de rotas não encontradas (404)
app.use((req, res) => {
  res.status(404).json({
    status: 'error',
    statusCode: 404,
    message: `Endpoint ${req.method} ${req.originalUrl} não foi encontrado na API.`,
    documentation: '/api-docs'
  });
});

module.exports = app;
