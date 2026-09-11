const PostModel = require('../models/postModel');

class PostController {
  /**
   * GET /postagens
   * Lista todas as postagens cadastradas no banco de dados.
   */
  static async getAll(req, res) {
    try {
      const { category } = req.query;
      const posts = await PostModel.findAll({ category });
      return res.status(200).json(posts);
    } catch (error) {
      console.error('[PostController.getAll Error]:', error.message);
      return res.status(500).json({
        status: 'error',
        statusCode: 500,
        message: 'Erro interno do servidor ao listar postagens.',
        details: error.message
      });
    }
  }

  /**
   * GET /postagens/:id e GET /postagem/:id
   * Busca uma postagem específica por seu identificador.
   */
  static async getById(req, res) {
    try {
      const { id } = req.params;

      if (!id || isNaN(Number(id))) {
        return res.status(400).json({
          status: 'error',
          statusCode: 400,
          message: 'O parâmetro "id" deve ser um número válido.'
        });
      }

      const post = await PostModel.findById(Number(id));

      if (!post) {
        return res.status(404).json({
          status: 'error',
          statusCode: 404,
          message: `Nenhuma postagem encontrada com o ID ${id}.`
        });
      }

      return res.status(200).json(post);
    } catch (error) {
      console.error('[PostController.getById Error]:', error.message);
      return res.status(500).json({
        status: 'error',
        statusCode: 500,
        message: 'Erro interno do servidor ao buscar a postagem.',
        details: error.message
      });
    }
  }

  /**
   * POST /postagens
   * Cria uma nova postagem após validação dos campos obrigatórios.
   */
  static async create(req, res) {
    try {
      const {
        title,
        description,
        profileName,
        thumbImage,
        thumbImageAltText,
        profileThumbImage,
        postDate,
        category
      } = req.body;

      // Validação de campos obrigatórios
      if (!title || typeof title !== 'string' || !title.trim()) {
        return res.status(400).json({
          status: 'error',
          statusCode: 400,
          message: 'O campo "title" é obrigatório e deve ser uma string não vazia.'
        });
      }

      if (!description || typeof description !== 'string' || !description.trim()) {
        return res.status(400).json({
          status: 'error',
          statusCode: 400,
          message: 'O campo "description" é obrigatório e deve ser uma string não vazia.'
        });
      }

      if (!profileName || typeof profileName !== 'string' || !profileName.trim()) {
        return res.status(400).json({
          status: 'error',
          statusCode: 400,
          message: 'O campo "profileName" é obrigatório e deve ser uma string não vazia.'
        });
      }

      const newPost = await PostModel.create({
        title: title.trim(),
        description: description.trim(),
        profileName: profileName.trim(),
        thumbImage: thumbImage || null,
        thumbImageAltText: thumbImageAltText || null,
        profileThumbImage: profileThumbImage || null,
        postDate: postDate || new Date().toLocaleDateString('pt-BR'),
        category: category || 'general'
      });

      return res.status(201).json(newPost);
    } catch (error) {
      console.error('[PostController.create Error]:', error.message);
      return res.status(500).json({
        status: 'error',
        statusCode: 500,
        message: 'Erro interno do servidor ao criar postagem.',
        details: error.message
      });
    }
  }

  /**
   * PUT /postagens/:id
   * Atualiza uma postagem existente pelo seu identificador.
   */
  static async update(req, res) {
    try {
      const { id } = req.params;

      if (!id || isNaN(Number(id))) {
        return res.status(400).json({
          status: 'error',
          statusCode: 400,
          message: 'O parâmetro "id" deve ser um número válido.'
        });
      }

      // Verifica se o corpo da requisição não está vazio
      if (!req.body || Object.keys(req.body).length === 0) {
        return res.status(400).json({
          status: 'error',
          statusCode: 400,
          message: 'É necessário fornecer ao menos um campo para atualização.'
        });
      }

      // Verifica existência prévia
      const existing = await PostModel.findById(Number(id));
      if (!existing) {
        return res.status(404).json({
          status: 'error',
          statusCode: 404,
          message: `Postagem com ID ${id} não encontrada para atualização.`
        });
      }

      const updatedPost = await PostModel.update(Number(id), req.body);

      return res.status(200).json(updatedPost);
    } catch (error) {
      console.error('[PostController.update Error]:', error.message);
      return res.status(500).json({
        status: 'error',
        statusCode: 500,
        message: 'Erro interno do servidor ao atualizar a postagem.',
        details: error.message
      });
    }
  }

  /**
   * DELETE /postagens/:id
   * Remove uma postagem existente pelo seu identificador.
   */
  static async delete(req, res) {
    try {
      const { id } = req.params;

      if (!id || isNaN(Number(id))) {
        return res.status(400).json({
          status: 'error',
          statusCode: 400,
          message: 'O parâmetro "id" deve ser um número válido.'
        });
      }

      const deletedPost = await PostModel.delete(Number(id));

      if (!deletedPost) {
        return res.status(404).json({
          status: 'error',
          statusCode: 404,
          message: `Postagem com ID ${id} não encontrada para exclusão.`
        });
      }

      return res.status(200).json({
        status: 'success',
        statusCode: 200,
        message: `Postagem ID ${id} excluída com sucesso!`,
        data: deletedPost
      });
    } catch (error) {
      console.error('[PostController.delete Error]:', error.message);
      return res.status(500).json({
        status: 'error',
        statusCode: 500,
        message: 'Erro interno do servidor ao excluir a postagem.',
        details: error.message
      });
    }
  }

  /**
   * GET /categoria/games
   * Rota de suporte para compatibilidade retroativa com clientes existentes.
   */
  static async getGamesCategory(req, res) {
    try {
      const posts = await PostModel.findAll({ category: 'games' });
      return res.status(200).json(posts);
    } catch (error) {
      console.error('[PostController.getGamesCategory Error]:', error.message);
      return res.status(500).json({
        status: 'error',
        statusCode: 500,
        message: 'Erro ao listar postagens da categoria games.',
        details: error.message
      });
    }
  }
}

module.exports = PostController;
