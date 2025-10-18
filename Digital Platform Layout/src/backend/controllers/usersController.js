const bcrypt = require('bcrypt');
const db = require('../config/database');

/**
 * Obter todos os usuários (lista pública da comunidade)
 */
exports.getAllUsers = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 20;
    const offset = (page - 1) * limit;

    const [users] = await db.query(
      `SELECT 
        u.id, 
        u.name, 
        u.email, 
        u.role, 
        u.avatar, 
        u.bio, 
        u.created_at,
        GROUP_CONCAT(ca.age_range) as children_ages
      FROM users u
      LEFT JOIN children_ages ca ON u.id = ca.user_id
      WHERE u.is_active = TRUE
      GROUP BY u.id
      ORDER BY u.created_at DESC
      LIMIT ? OFFSET ?`,
      [limit, offset]
    );

    const [total] = await db.query(
      'SELECT COUNT(*) as count FROM users WHERE is_active = TRUE'
    );

    res.json({
      success: true,
      users: users.map(user => ({
        ...user,
        children_ages: user.children_ages ? user.children_ages.split(',') : []
      })),
      pagination: {
        page,
        limit,
        total: total[0].count,
        pages: Math.ceil(total[0].count / limit)
      }
    });
  } catch (error) {
    console.error('Get all users error:', error);
    res.status(500).json({ 
      success: false,
      error: 'Erro ao buscar usuários' 
    });
  }
};

/**
 * Obter usuário por ID
 */
exports.getUserById = async (req, res) => {
  try {
    const userId = req.params.id;

    const [users] = await db.query(
      `SELECT 
        u.id, 
        u.name, 
        u.email, 
        u.role, 
        u.avatar, 
        u.bio, 
        u.created_at,
        GROUP_CONCAT(ca.age_range) as children_ages
      FROM users u
      LEFT JOIN children_ages ca ON u.id = ca.user_id
      WHERE u.id = ? AND u.is_active = TRUE
      GROUP BY u.id`,
      [userId]
    );

    if (users.length === 0) {
      return res.status(404).json({ 
        success: false,
        error: 'Usuário não encontrado' 
      });
    }

    const user = {
      ...users[0],
      children_ages: users[0].children_ages ? users[0].children_ages.split(',') : []
    };

    // Buscar estatísticas do usuário
    const [stats] = await db.query(
      `SELECT 
        (SELECT COUNT(*) FROM posts WHERE user_id = ?) as posts_count,
        (SELECT COUNT(*) FROM likes WHERE user_id = ?) as likes_given,
        (SELECT COUNT(*) FROM comments WHERE user_id = ?) as comments_count
      `,
      [userId, userId, userId]
    );

    res.json({
      success: true,
      user,
      stats: stats[0]
    });
  } catch (error) {
    console.error('Get user by ID error:', error);
    res.status(500).json({ 
      success: false,
      error: 'Erro ao buscar usuário' 
    });
  }
};

/**
 * Obter perfil do usuário logado
 */
exports.getMyProfile = async (req, res) => {
  try {
    const [users] = await db.query(
      `SELECT 
        u.id, 
        u.name, 
        u.email, 
        u.role, 
        u.avatar, 
        u.bio, 
        u.created_at,
        u.last_login,
        GROUP_CONCAT(ca.age_range) as children_ages
      FROM users u
      LEFT JOIN children_ages ca ON u.id = ca.user_id
      WHERE u.id = ?
      GROUP BY u.id`,
      [req.userId]
    );

    if (users.length === 0) {
      return res.status(404).json({ 
        success: false,
        error: 'Usuário não encontrado' 
      });
    }

    const user = {
      ...users[0],
      children_ages: users[0].children_ages ? users[0].children_ages.split(',') : []
    };

    res.json({
      success: true,
      user
    });
  } catch (error) {
    console.error('Get my profile error:', error);
    res.status(500).json({ 
      success: false,
      error: 'Erro ao buscar perfil' 
    });
  }
};

/**
 * Atualizar perfil do usuário
 */
exports.updateProfile = async (req, res) => {
  try {
    const { name, bio, role, childrenAges } = req.body;
    const userId = req.userId;

    // Validações
    if (name && name.trim().length < 2) {
      return res.status(400).json({ 
        success: false,
        error: 'Nome deve ter pelo menos 2 caracteres' 
      });
    }

    // Atualizar dados básicos
    const updates = [];
    const values = [];

    if (name) {
      updates.push('name = ?');
      values.push(name.trim());
    }

    if (bio !== undefined) {
      updates.push('bio = ?');
      values.push(bio);
    }

    if (role) {
      const validRoles = ['mae', 'pai', 'responsavel', 'cuidador', 'outro'];
      if (!validRoles.includes(role)) {
        return res.status(400).json({ 
          success: false,
          error: 'Papel inválido' 
        });
      }
      updates.push('role = ?');
      values.push(role);
    }

    if (updates.length > 0) {
      values.push(userId);
      await db.query(
        `UPDATE users SET ${updates.join(', ')}, updated_at = NOW() WHERE id = ?`,
        values
      );
    }

    // Atualizar idades dos filhos
    if (childrenAges && Array.isArray(childrenAges)) {
      // Remover idades antigas
      await db.query('DELETE FROM children_ages WHERE user_id = ?', [userId]);

      // Inserir novas idades
      if (childrenAges.length > 0) {
        const validAges = ['0-2', '3-5', '6-12', '13+'];
        const filteredAges = childrenAges.filter(age => validAges.includes(age));

        if (filteredAges.length > 0) {
          const ageValues = filteredAges.map(age => [userId, age]);
          await db.query(
            'INSERT INTO children_ages (user_id, age_range) VALUES ?',
            [ageValues]
          );
        }
      }
    }

    // Buscar usuário atualizado
    const [users] = await db.query(
      `SELECT 
        u.id, 
        u.name, 
        u.email, 
        u.role, 
        u.avatar, 
        u.bio, 
        u.created_at,
        GROUP_CONCAT(ca.age_range) as children_ages
      FROM users u
      LEFT JOIN children_ages ca ON u.id = ca.user_id
      WHERE u.id = ?
      GROUP BY u.id`,
      [userId]
    );

    const user = {
      ...users[0],
      children_ages: users[0].children_ages ? users[0].children_ages.split(',') : []
    };

    res.json({
      success: true,
      message: 'Perfil atualizado com sucesso',
      user
    });
  } catch (error) {
    console.error('Update profile error:', error);
    res.status(500).json({ 
      success: false,
      error: 'Erro ao atualizar perfil' 
    });
  }
};

/**
 * Alterar senha
 */
exports.changePassword = async (req, res) => {
  try {
    const { currentPassword, newPassword } = req.body;
    const userId = req.userId;

    // Validações
    if (!currentPassword || !newPassword) {
      return res.status(400).json({ 
        success: false,
        error: 'Senha atual e nova senha são obrigatórias' 
      });
    }

    if (newPassword.length < 6) {
      return res.status(400).json({ 
        success: false,
        error: 'Nova senha deve ter pelo menos 6 caracteres' 
      });
    }

    // Buscar usuário
    const [users] = await db.query(
      'SELECT password_hash FROM users WHERE id = ?',
      [userId]
    );

    if (users.length === 0) {
      return res.status(404).json({ 
        success: false,
        error: 'Usuário não encontrado' 
      });
    }

    // Verificar senha atual
    const passwordMatch = await bcrypt.compare(currentPassword, users[0].password_hash);

    if (!passwordMatch) {
      return res.status(401).json({ 
        success: false,
        error: 'Senha atual incorreta' 
      });
    }

    // Hash da nova senha
    const newPasswordHash = await bcrypt.hash(newPassword, 10);

    // Atualizar senha
    await db.query(
      'UPDATE users SET password_hash = ?, updated_at = NOW() WHERE id = ?',
      [newPasswordHash, userId]
    );

    res.json({
      success: true,
      message: 'Senha alterada com sucesso'
    });
  } catch (error) {
    console.error('Change password error:', error);
    res.status(500).json({ 
      success: false,
      error: 'Erro ao alterar senha' 
    });
  }
};

/**
 * Deletar conta
 */
exports.deleteAccount = async (req, res) => {
  try {
    const { password } = req.body;
    const userId = req.userId;

    // Validação
    if (!password) {
      return res.status(400).json({ 
        success: false,
        error: 'Senha é obrigatória para deletar a conta' 
      });
    }

    // Buscar usuário
    const [users] = await db.query(
      'SELECT password_hash FROM users WHERE id = ?',
      [userId]
    );

    if (users.length === 0) {
      return res.status(404).json({ 
        success: false,
        error: 'Usuário não encontrado' 
      });
    }

    // Verificar senha
    const passwordMatch = await bcrypt.compare(password, users[0].password_hash);

    if (!passwordMatch) {
      return res.status(401).json({ 
        success: false,
        error: 'Senha incorreta' 
      });
    }

    // Desativar usuário (soft delete)
    await db.query(
      'UPDATE users SET is_active = FALSE, updated_at = NOW() WHERE id = ?',
      [userId]
    );

    // Alternativa: Hard delete (descomentar se quiser deletar permanentemente)
    // await db.query('DELETE FROM users WHERE id = ?', [userId]);

    res.json({
      success: true,
      message: 'Conta deletada com sucesso'
    });
  } catch (error) {
    console.error('Delete account error:', error);
    res.status(500).json({ 
      success: false,
      error: 'Erro ao deletar conta' 
    });
  }
};

/**
 * Buscar usuários por nome ou email
 */
exports.searchUsers = async (req, res) => {
  try {
    const { q, role, childrenAge, page = 1, limit = 20 } = req.query;
    
    if (!q || q.trim().length < 2) {
      return res.status(400).json({ 
        success: false,
        error: 'Query de busca deve ter pelo menos 2 caracteres' 
      });
    }

    const offset = (parseInt(page) - 1) * parseInt(limit);
    const searchTerm = `%${q.trim()}%`;

    // Construir query dinâmica
    let whereConditions = ['u.is_active = TRUE', '(u.name LIKE ? OR u.email LIKE ?)'];
    let queryParams = [searchTerm, searchTerm];

    if (role) {
      whereConditions.push('u.role = ?');
      queryParams.push(role);
    }

    if (childrenAge) {
      whereConditions.push('ca.age_range = ?');
      queryParams.push(childrenAge);
    }

    const whereClause = whereConditions.join(' AND ');

    const [users] = await db.query(
      `SELECT 
        u.id, 
        u.name, 
        u.email, 
        u.role, 
        u.avatar, 
        u.bio, 
        u.created_at,
        GROUP_CONCAT(DISTINCT ca.age_range) as children_ages
      FROM users u
      LEFT JOIN children_ages ca ON u.id = ca.user_id
      WHERE ${whereClause}
      GROUP BY u.id
      ORDER BY u.name ASC
      LIMIT ? OFFSET ?`,
      [...queryParams, parseInt(limit), offset]
    );

    const [total] = await db.query(
      `SELECT COUNT(DISTINCT u.id) as count 
       FROM users u
       LEFT JOIN children_ages ca ON u.id = ca.user_id
       WHERE ${whereClause}`,
      queryParams
    );

    res.json({
      success: true,
      users: users.map(user => ({
        ...user,
        children_ages: user.children_ages ? user.children_ages.split(',') : []
      })),
      pagination: {
        page: parseInt(page),
        limit: parseInt(limit),
        total: total[0].count,
        pages: Math.ceil(total[0].count / parseInt(limit))
      }
    });
  } catch (error) {
    console.error('Search users error:', error);
    res.status(500).json({ 
      success: false,
      error: 'Erro ao buscar usuários' 
    });
  }
};

/**
 * Obter posts de um usuário específico
 */
exports.getUserPosts = async (req, res) => {
  try {
    const userId = req.params.id;
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const offset = (page - 1) * limit;

    // Verificar se usuário existe
    const [userCheck] = await db.query(
      'SELECT id FROM users WHERE id = ? AND is_active = TRUE',
      [userId]
    );

    if (userCheck.length === 0) {
      return res.status(404).json({ 
        success: false,
        error: 'Usuário não encontrado' 
      });
    }

    // Buscar posts do usuário
    const [posts] = await db.query(
      `SELECT 
        p.id,
        p.content,
        p.image_url,
        p.tag,
        p.likes_count,
        p.comments_count,
        p.created_at,
        u.id as user_id,
        u.name as user_name,
        u.avatar as user_avatar,
        u.role as user_role
      FROM posts p
      INNER JOIN users u ON p.user_id = u.id
      WHERE p.user_id = ?
      ORDER BY p.created_at DESC
      LIMIT ? OFFSET ?`,
      [userId, limit, offset]
    );

    const [total] = await db.query(
      'SELECT COUNT(*) as count FROM posts WHERE user_id = ?',
      [userId]
    );

    res.json({
      success: true,
      posts,
      pagination: {
        page,
        limit,
        total: total[0].count,
        pages: Math.ceil(total[0].count / limit)
      }
    });
  } catch (error) {
    console.error('Get user posts error:', error);
    res.status(500).json({ 
      success: false,
      error: 'Erro ao buscar posts do usuário' 
    });
  }
};

/**
 * Obter atividade recente do usuário
 */
exports.getUserActivity = async (req, res) => {
  try {
    const userId = req.params.id;
    const limit = parseInt(req.query.limit) || 10;

    // Verificar se usuário existe
    const [userCheck] = await db.query(
      'SELECT id FROM users WHERE id = ? AND is_active = TRUE',
      [userId]
    );

    if (userCheck.length === 0) {
      return res.status(404).json({ 
        success: false,
        error: 'Usuário não encontrado' 
      });
    }

    // Buscar posts recentes
    const [recentPosts] = await db.query(
      `SELECT 
        'post' as type,
        p.id,
        p.content as description,
        p.created_at
      FROM posts p
      WHERE p.user_id = ?
      ORDER BY p.created_at DESC
      LIMIT ?`,
      [userId, limit]
    );

    // Buscar comentários recentes
    const [recentComments] = await db.query(
      `SELECT 
        'comment' as type,
        c.id,
        c.content as description,
        c.created_at,
        p.id as post_id
      FROM comments c
      INNER JOIN posts p ON c.post_id = p.id
      WHERE c.user_id = ?
      ORDER BY c.created_at DESC
      LIMIT ?`,
      [userId, limit]
    );

    // Combinar e ordenar atividades
    const activities = [...recentPosts, ...recentComments]
      .sort((a, b) => new Date(b.created_at) - new Date(a.created_at))
      .slice(0, limit);

    res.json({
      success: true,
      activities
    });
  } catch (error) {
    console.error('Get user activity error:', error);
    res.status(500).json({ 
      success: false,
      error: 'Erro ao buscar atividade do usuário' 
    });
  }
};

/**
 * Atualizar avatar do usuário
 */
exports.updateAvatar = async (req, res) => {
  try {
    const { avatar } = req.body;
    const userId = req.userId;

    // Validação
    if (!avatar) {
      return res.status(400).json({ 
        success: false,
        error: 'Avatar é obrigatório' 
      });
    }

    // Validar formato do avatar (emojis ou identificadores de 1-10 caracteres)
    if (avatar.length > 10) {
      return res.status(400).json({ 
        success: false,
        error: 'Avatar deve ter no máximo 10 caracteres' 
      });
    }

    // Atualizar avatar
    await db.query(
      'UPDATE users SET avatar = ?, updated_at = NOW() WHERE id = ?',
      [avatar, userId]
    );

    res.json({
      success: true,
      message: 'Avatar atualizado com sucesso',
      avatar
    });
  } catch (error) {
    console.error('Update avatar error:', error);
    res.status(500).json({ 
      success: false,
      error: 'Erro ao atualizar avatar' 
    });
  }
};
