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

// Servir interface web e imagens estáticas
app.use(express.static(path.join(__dirname, '..', 'public')));
app.use('/img', express.static(path.join(__dirname, '..', 'public', 'images')));
app.use('/images', express.static(path.join(__dirname, '..', 'public', 'images')));

// Documentação interativa Swagger
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
app.get('/docs', (req, res) => res.redirect('/api-docs'));

// Página principal do blog
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '..', 'public', 'index.html'));
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
