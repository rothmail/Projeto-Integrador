const express = require('express');
const router = express.Router();
const postsController = require('../controllers/postsController');
const authMiddleware = require('../middlewares/authMiddleware');

// Rotas públicas
router.get('/', postsController.getPosts);
router.get('/:id', postsController.getPostById);
router.get('/:id/comments', postsController.getComments);

// Rotas protegidas (requerem autenticação)
router.post('/', authMiddleware, postsController.createPost);
router.put('/:id', authMiddleware, postsController.updatePost);
router.delete('/:id', authMiddleware, postsController.deletePost);
router.post('/:id/like', authMiddleware, postsController.toggleLike);
router.post('/:id/comments', authMiddleware, postsController.addComment);
router.delete('/:id/comments/:commentId', authMiddleware, postsController.deleteComment);

module.exports = router;
