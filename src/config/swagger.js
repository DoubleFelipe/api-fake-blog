const swaggerJSDoc = require('swagger-jsdoc');

const swaggerDefinition = {
  openapi: '3.0.0',
  info: {
    title: 'API Fake Blog - Documentação OpenAPI',
    version: '2.0.0',
    description:
      'API RESTful para gerenciamento de postagens de blog, refatorada com arquitetura MVC, banco de dados Supabase (PostgreSQL) e documentação interativa Swagger.',
    contact: {
      name: 'Suporte da API',
      url: 'https://github.com/diegocandido/api-fake-blog'
    }
  },
  servers: [
    {
      url: 'http://localhost:{port}',
      description: 'Servidor Local de Desenvolvimento',
      variables: {
        port: {
          default: '8080'
        }
      }
    }
  ],
  components: {
    schemas: {
      Postagem: {
        type: 'object',
        properties: {
          id: {
            type: 'integer',
            example: 1,
            description: 'Identificador único da postagem gerado pelo banco'
          },
          thumbImage: {
            type: 'string',
            format: 'uri',
            example: 'https://exemplo.com/imagem.jpg',
            description: 'URL da imagem de destaque'
          },
          thumbImageAltText: {
            type: 'string',
            example: 'Texto alternativo para acessibilidade',
            description: 'Descrição alternativa da imagem'
          },
          title: {
            type: 'string',
            example: 'Google Notícias completa 20 anos',
            description: 'Título da publicação'
          },
          description: {
            type: 'string',
            example: 'Na última semana, o Google apresentou...',
            description: 'Conteúdo principal ou descrição da postagem'
          },
          profileThumbImage: {
            type: 'string',
            example: '/images/profile-1.jpg',
            description: 'Caminho ou URL do avatar do autor'
          },
          profileName: {
            type: 'string',
            example: 'Fernando Silva',
            description: 'Nome do autor da postagem'
          },
          postDate: {
            type: 'string',
            example: '1/03/2022',
            description: 'Data formatada da postagem'
          },
          category: {
            type: 'string',
            example: 'tecnologia',
            description: 'Categoria da postagem (ex: games, tecnologia, carros)'
          },
          createdAt: {
            type: 'string',
            format: 'date-time',
            example: '2026-09-11T10:00:00.000Z',
            description: 'Data de criação no banco de dados'
          }
        }
      },
      PostagemInput: {
        type: 'object',
        required: ['title', 'description', 'profileName'],
        properties: {
          title: {
            type: 'string',
            example: 'Título da Nova Postagem',
            description: 'Título obrigatório'
          },
          description: {
            type: 'string',
            example: 'Texto detalhado da postagem com todas as informações.',
            description: 'Conteúdo obrigatório'
          },
          profileName: {
            type: 'string',
            example: 'Maria Oliveira',
            description: 'Nome do autor (obrigatório)'
          },
          thumbImage: {
            type: 'string',
            example: 'https://exemplo.com/banner.jpg',
            description: 'URL da imagem de capa'
          },
          thumbImageAltText: {
            type: 'string',
            example: 'Banner ilustrativo',
            description: 'Texto alternativo da imagem'
          },
          profileThumbImage: {
            type: 'string',
            example: '/images/profile-1.jpg',
            description: 'Avatar do autor'
          },
          postDate: {
            type: 'string',
            example: '11/09/2026',
            description: 'Data da postagem'
          },
          category: {
            type: 'string',
            example: 'games',
            description: 'Categoria (ex: games, carros, tecnologia)'
          }
        }
      },
      ErroPadrao: {
        type: 'object',
        properties: {
          status: {
            type: 'string',
            example: 'error'
          },
          statusCode: {
            type: 'integer',
            example: 400
          },
          message: {
            type: 'string',
            example: 'O campo title é obrigatório.'
          }
        }
      }
    }
  }
};

const options = {
  swaggerDefinition,
  apis: ['./src/routes/*.js', './src/app.js']
};

const swaggerSpec = swaggerJSDoc(options);

module.exports = swaggerSpec;
