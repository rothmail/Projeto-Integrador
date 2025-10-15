const express = require('express');
const router = express.Router();
const postsController = require('../controllers/postController');
const authMiddleware = require('../middlewares/authMiddlewares');

router.get('/', postsController.getPosts);
router.post('/', authMiddleware, postsController.createPost);
router.post('/:id/like', authMiddleware, postsController.likePost);
router.post('/:id/comments', authMiddleware, postsController.addComment);

module.exports = router;