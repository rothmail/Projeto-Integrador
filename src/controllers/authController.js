const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const db = require('../db/database');

exports.register = async (req, res) => {
    try {
        const { name, email, password, role, childrenAges } = req.body;

        // Validações
        if (!name || !email || !password || !role) {
            return res.status(400).json({
                error: 'Todos os campos são obrigatórios'
            });
        }

        // Verificar se email já existe
        const [existing] = await db.query(
            'SELECT id FROM users WHERE email = ?',
            [email]
        );

        if (existing.length > 0) {
            return res.status(409).json({
                error: 'Email já cadastrado'
            });
        }

        // Hash da senha
        const passwordHash = await bcrypt.hash(password, 10);

        // Gerar avatar
        const nameParts = name.trim().split(' ');
        const avatar = nameParts.length > 1
            ? `${nameParts[0][0]}${nameParts[nameParts.length - 1][0]}`
            : name.substring(0, 2);

        // Inserir usuário
        const [result] = await db.query(
            'INSERT INTO users (name, email, password_hash, role, avatar) VALUES (?, ?, ?, ?, ?)',
            [name, email, passwordHash, role, avatar.toUpperCase()]
        );

        const userId = result.insertId;

        // Inserir idades dos filhos
        if (childrenAges && childrenAges.length > 0) {
            const values = childrenAges.map(age => [userId, age]);
            await db.query(
                'INSERT INTO children_ages (user_id, age_range) VALUES ?',
                [values]
            );
        }

        // Gerar token
        const token = jwt.sign(
            { userId, email, role },
            process.env.JWT_SECRET,
            { expiresIn: process.env.JWT_EXPIRES_IN }
        );

        res.status(201).json({
            success: true,
            message: 'Usuário criado com sucesso',
            token,
            user: {
                id: userId,
                name,
                email,
                role,
                avatar: avatar.toUpperCase()
            }
        });
    } catch (error) {
        console.error('Register error:', error);
        res.status(500).json({ error: 'Erro ao criar usuário' });
    }
};

exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;

        // Validações
        if (!email || !password) {
            return res.status(400).json({
                error: 'Email e senha são obrigatórios'
            });
        }

        // Buscar usuário
        const [users] = await db.query(
            'SELECT * FROM users WHERE email = ? AND is_active = TRUE',
            [email]
        );

        if (users.length === 0) {
            return res.status(401).json({
                error: 'Email ou senha incorretos'
            });
        }

        const user = users[0];

        // Verificar senha
        const passwordMatch = await bcrypt.compare(password, user.password_hash);

        if (!passwordMatch) {
            return res.status(401).json({
                error: 'Email ou senha incorretos'
            });
        }

        // Atualizar último login
        await db.query(
            'UPDATE users SET last_login = NOW() WHERE id = ?',
            [user.id]
        );

        // Gerar token
        const token = jwt.sign(
            { userId: user.id, email: user.email, role: user.role },
            process.env.JWT_SECRET,
            { expiresIn: process.env.JWT_EXPIRES_IN }
        );

        res.json({
            success: true,
            message: 'Login realizado com sucesso',
            token,
            user: {
                id: user.id,
                name: user.name,
                email: user.email,
                role: user.role,
                avatar: user.avatar,
                bio: user.bio
            }
        });
    } catch (error) {
        console.error('Login error:', error);
        res.status(500).json({ error: 'Erro ao fazer login' });
    }
};

exports.me = async (req, res) => {
    try {
        const [users] = await db.query(
            'SELECT id, name, email, role, avatar, bio, created_at FROM users WHERE id = ?',
            [req.userId]
        );

        if (users.length === 0) {
            return res.status(404).json({ error: 'Usuário não encontrado' });
        }

        res.json({ user: users[0] });
    } catch (error) {
        console.error('Me error:', error);
        res.status(500).json({ error: 'Erro ao buscar usuário' });
    }
};