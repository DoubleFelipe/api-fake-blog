const supabase = require('../config/supabase');

/**
 * Utilitário para converter registro do PostgreSQL (snake_case)
 * para a estrutura esperada pelo frontend em JavaScript (camelCase).
 */
function mapFromDatabase(row) {
  if (!row) return null;
  return {
    id: row.id,
    thumbImage: row.thumb_image,
    thumbImageAltText: row.thumb_image_alt_text,
    title: row.title,
    description: row.description,
    profileThumbImage: row.profile_thumb_image,
    profileName: row.profile_name,
    postDate: row.post_date,
    category: row.category,
    createdAt: row.created_at
  };
}

/**
 * Utilitário para converter payload JavaScript (camelCase)
 * para os campos da tabela no PostgreSQL (snake_case).
 */
function mapToDatabase(data) {
  const mapped = {};
  if (data.thumbImage !== undefined) mapped.thumb_image = data.thumbImage;
  if (data.thumbImageAltText !== undefined) mapped.thumb_image_alt_text = data.thumbImageAltText;
  if (data.title !== undefined) mapped.title = data.title;
  if (data.description !== undefined) mapped.description = data.description;
  if (data.profileThumbImage !== undefined) mapped.profile_thumb_image = data.profileThumbImage;
  if (data.profileName !== undefined) mapped.profile_name = data.profileName;
  if (data.postDate !== undefined) mapped.post_date = data.postDate;
  if (data.category !== undefined) mapped.category = data.category;
  return mapped;
}

class PostModel {
  /**
   * Lista todas as postagens cadastradas no Supabase.
   * Suporta filtro opcional por categoria.
   */
  static async findAll({ category } = {}) {
    let query = supabase
      .from('posts')
      .select('*')
      .order('id', { ascending: true });

    if (category) {
      query = query.ilike('category', `%${category}%`);
    }

    const { data, error } = await query;

    if (error) {
      throw new Error(`Erro ao buscar postagens no Supabase: ${error.message}`);
    }

    return (data || []).map(mapFromDatabase);
  }

  /**
   * Busca uma postagem específica por ID.
   */
  static async findById(id) {
    const { data, error } = await supabase
      .from('posts')
      .select('*')
      .eq('id', id)
      .maybeSingle();

    if (error) {
      throw new Error(`Erro ao buscar postagem ID ${id}: ${error.message}`);
    }

    return mapFromDatabase(data);
  }

  /**
   * Cria uma nova postagem no banco de dados.
   */
  static async create(postData) {
    const dbPayload = mapToDatabase(postData);

    const { data, error } = await supabase
      .from('posts')
      .insert([dbPayload])
      .select()
      .single();

    if (error) {
      throw new Error(`Erro ao inserir postagem no Supabase: ${error.message}`);
    }

    return mapFromDatabase(data);
  }

  /**
   * Atualiza uma postagem existente pelo ID.
   */
  static async update(id, postData) {
    const dbPayload = mapToDatabase(postData);

    const { data, error } = await supabase
      .from('posts')
      .update(dbPayload)
      .eq('id', id)
      .select()
      .maybeSingle();

    if (error) {
      throw new Error(`Erro ao atualizar postagem ID ${id}: ${error.message}`);
    }

    return mapFromDatabase(data);
  }

  /**
   * Remove uma postagem existente pelo ID.
   */
  static async delete(id) {
    // Primeiro verificamos se o registro existe para garantir o retorno adequado
    const existing = await this.findById(id);
    if (!existing) {
      return null;
    }

    const { error } = await supabase
      .from('posts')
      .delete()
      .eq('id', id);

    if (error) {
      throw new Error(`Erro ao excluir postagem ID ${id}: ${error.message}`);
    }

    return existing;
  }
}

module.exports = PostModel;
