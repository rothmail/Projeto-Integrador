const db = require('../config/database');

exports.getPosts = async (req, res) => {
    try {
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 20;
        const offset = (page - 1) * limit;

        const [posts] = await db.query(
            `SELECT * FROM v_posts_with_user 
       ORDER BY created_at DESC 
       LIMIT ? OFFSET ?`,
            [limit, offset]
        );

        const [total] = await db.query('SELECT COUNT(*) as count FROM posts');

        res.json({
            posts,
            pagination: {
                page,
                limit,
                total: total[0].count,
                pages: Math.ceil(total[0].count / limit)
            }
        });
    } catch (error) {
        console.error('Get posts error:', error);
        res.status(500).json({ error: 'Erro ao buscar posts' });
    }
};

exports.createPost = async (req, res) => {
    try {
        const { content, imageUrl, tag } = req.body;

        if (!content) {
            return res.status(400).json({ error: 'Conteúdo é obrigatório' });
        }

        const [result] = await db.query(
            'INSERT INTO posts (user_id, content, image_url, tag) VALUES (?, ?, ?, ?)',
            [req.userId, content, imageUrl || null, tag || 'geral']
        );

        const [post] = await db.query(
            'SELECT * FROM v_posts_with_user WHERE id = ?',
            [result.insertId]
        );

        res.status(201).json({
            success: true,
            message: 'Post criado com sucesso',
            post: post[0]
        });
    } catch (error) {
        console.error('Create post error:', error);
        res.status(500).json({ error: 'Erro ao criar post' });
    }
};

exports.likePost = async (req, res) => {
    try {
        const postId = req.params.id;

        // Verificar se já curtiu
        const [existing] = await db.query(
            'SELECT id FROM likes WHERE user_id = ? AND post_id = ?',
            [req.userId, postId]
        );

        if (existing.length > 0) {
            // Descurtir
            await db.query(
                'DELETE FROM likes WHERE user_id = ? AND post_id = ?',
                [req.userId, postId]
            );

            return res.json({
                success: true,
                message: 'Like removido',
                liked: false
            });
        } else {
            // Curtir
            await db.query(
                'INSERT INTO likes (user_id, post_id) VALUES (?, ?)',
                [req.userId, postId]
            );

            return res.json({
                success: true,
                message: 'Post curtido',
                liked: true
            });
        }
    } catch (error) {
        console.error('Like post error:', error);
        res.status(500).json({ error: 'Erro ao curtir post' });
    }
};

exports.addComment = async (req, res) => {
    try {
        const postId = req.params.id;
        const { content } = req.body;

        if (!content) {
            return res.status(400).json({ error: 'Conteúdo é obrigatório' });
        }

        const [result] = await db.query(
            'INSERT INTO comments (post_id, user_id, content) VALUES (?, ?, ?)',
            [postId, req.userId, content]
        );

        const [comment] = await db.query(
            `SELECT c.*, u.name as user_name, u.avatar as user_avatar 
       FROM comments c 
       INNER JOIN users u ON c.user_id = u.id 
       WHERE c.id = ?`,
            [result.insertId]
        );

        res.status(201).json({
            success: true,
            message: 'Comentário adicionado',
            comment: comment[0]
        });
    } catch (error) {
        console.error('Add comment error:', error);
        res.status(500).json({ error: 'Erro ao adicionar comentário' });
    }
};