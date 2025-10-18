const express = require('express');
const router = express.Router();
const usersController = require('../controllers/usersController');
const authMiddleware = require('../middlewares/authMiddleware');

/**
 * ============================================
 * ROTAS PÚBLICAS DE USUÁRIOS
 * ============================================
 */

// GET /api/users - Listar todos os usuários (com paginação e filtros)
router.get('/', usersController.getAllUsers);

// GET /api/users/search - Buscar usuários por nome ou email
router.get('/search', usersController.searchUsers);

/**
 * ============================================
 * ROTAS PROTEGIDAS (Requerem autenticação)
 * ============================================
 * IMPORTANTE: Rotas específicas devem vir ANTES de rotas com parâmetros dinâmicos
 */

// GET /api/users/profile/me - Obter perfil do usuário logado
router.get('/profile/me', authMiddleware, usersController.getMyProfile);

// PUT /api/users/profile - Atualizar perfil do usuário
router.put('/profile', authMiddleware, usersController.updateProfile);

// PUT /api/users/avatar - Atualizar avatar do usuário
router.put('/avatar', authMiddleware, usersController.updateAvatar);

// PUT /api/users/password - Alterar senha
router.put('/password', authMiddleware, usersController.changePassword);

// DELETE /api/users/account - Deletar conta (soft delete)
router.delete('/account', authMiddleware, usersController.deleteAccount);

/**
 * ============================================
 * ROTAS PÚBLICAS COM PARÂMETROS DINÂMICOS
 * ============================================
 * IMPORTANTE: Estas rotas vêm por último para não conflitar com rotas específicas
 */

// GET /api/users/:id - Obter usuário específico por ID (com estatísticas)
router.get('/:id', usersController.getUserById);

// GET /api/users/:id/posts - Obter posts de um usuário específico
router.get('/:id/posts', usersController.getUserPosts);

// GET /api/users/:id/activity - Obter atividade recente do usuário
router.get('/:id/activity', usersController.getUserActivity);

module.exports = router;
