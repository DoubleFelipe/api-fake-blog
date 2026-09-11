const express = require('express');
const router = express.Router();
const PostController = require('../controllers/postController');

/**
 * @swagger
 * tags:
 *   name: Postagens
 *   description: Gerenciamento completo de postagens do blog (CRUD)
 */

/**
 * @swagger
 * /postagens:
 *   get:
 *     summary: Lista todas as postagens
 *     description: Retorna uma lista de todas as postagens cadastradas no banco de dados, com suporte a filtro opcional por categoria.
 *     tags: [Postagens]
 *     parameters:
 *       - in: query
 *         name: category
 *         schema:
 *           type: string
 *         required: false
 *         description: Filtrar postagens por categoria (ex: games, carros, tecnologia)
 *     responses:
 *       200:
 *         description: Lista de postagens retornada com sucesso.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Postagem'
 *       500:
 *         description: Erro interno no servidor.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErroPadrao'
 */
router.get('/postagens', PostController.getAll);

/**
 * @swagger
 * /postagens/{id}:
 *   get:
 *     summary: Obtém uma postagem por ID
 *     description: Retorna os detalhes de uma postagem específica a partir do seu identificador numérico.
 *     tags: [Postagens]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID numérico da postagem
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Postagem encontrada com sucesso.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Postagem'
 *       400:
 *         description: ID inválido fornecido.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErroPadrao'
 *       404:
 *         description: Postagem não encontrada.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErroPadrao'
 *       500:
 *         description: Erro interno no servidor.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErroPadrao'
 */
router.get('/postagens/:id', PostController.getById);

// Rota de retrocompatibilidade com a versão legada da API (/postagem/:id)
router.get('/postagem/:id', PostController.getById);

/**
 * @swagger
 * /postagens:
 *   post:
 *     summary: Cria uma nova postagem
 *     description: Registra uma nova publicação no banco de dados. Os campos title, description e profileName são obrigatórios.
 *     tags: [Postagens]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/PostagemInput'
 *     responses:
 *       201:
 *         description: Postagem criada com sucesso.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Postagem'
 *       400:
 *         description: Dados de entrada inválidos ou incompletos.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErroPadrao'
 *       500:
 *         description: Erro interno no servidor.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErroPadrao'
 */
router.post('/postagens', PostController.create);

/**
 * @swagger
 * /postagens/{id}:
 *   put:
 *     summary: Atualiza uma postagem existente
 *     description: Altera os dados de uma postagem cadastrada pelo seu ID.
 *     tags: [Postagens]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID da postagem a ser atualizada
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/PostagemInput'
 *     responses:
 *       200:
 *         description: Postagem atualizada com sucesso.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Postagem'
 *       400:
 *         description: ID inválido ou corpo da requisição vazio.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErroPadrao'
 *       404:
 *         description: Postagem não encontrada para o ID informado.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErroPadrao'
 *       500:
 *         description: Erro interno no servidor.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErroPadrao'
 */
router.put('/postagens/:id', PostController.update);

/**
 * @swagger
 * /postagens/{id}:
 *   delete:
 *     summary: Exclui uma postagem por ID
 *     description: Remove permanentemente uma postagem do banco de dados pelo seu identificador.
 *     tags: [Postagens]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID da postagem a ser excluída
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Postagem removida com sucesso.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: success
 *                 statusCode:
 *                   type: integer
 *                   example: 200
 *                 message:
 *                   type: string
 *                   example: Postagem ID 1 excluída com sucesso!
 *       400:
 *         description: ID inválido.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErroPadrao'
 *       404:
 *         description: Postagem não encontrada para o ID informado.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErroPadrao'
 *       500:
 *         description: Erro interno no servidor.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErroPadrao'
 */
router.delete('/postagens/:id', PostController.delete);

/**
 * @swagger
 * /categoria/games:
 *   get:
 *     summary: Lista postagens da categoria games
 *     description: Endpoint legado para compatibilidade com a versão anterior do frontend.
 *     tags: [Postagens]
 *     responses:
 *       200:
 *         description: Lista de postagens de games retornada com sucesso.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Postagem'
 */
router.get('/categoria/games', PostController.getGamesCategory);

module.exports = router;
