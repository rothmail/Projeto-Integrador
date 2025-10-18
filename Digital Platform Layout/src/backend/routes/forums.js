const express = require('express');
const router = express.Router();
const forumsController = require('../controllers/forumsController');
const authMiddleware = require('../middlewares/authMiddleware');

// Rotas públicas
router.get('/', forumsController.getForums);
router.get('/:type', forumsController.getForumByType);
router.get('/:type/posts', forumsController.getForumPosts);
router.get('/:type/posts/:postId', forumsController.getForumPostById);
router.get('/:type/posts/:postId/replies', forumsController.getReplies);

// Rotas protegidas
router.post('/:type/posts', authMiddleware, forumsController.createForumPost);
router.put('/:type/posts/:postId', authMiddleware, forumsController.updateForumPost);
router.delete('/:type/posts/:postId', authMiddleware, forumsController.deleteForumPost);
router.post('/:type/posts/:postId/replies', authMiddleware, forumsController.addReply);
router.delete('/:type/posts/:postId/replies/:replyId', authMiddleware, forumsController.deleteReply);

module.exports = router;
