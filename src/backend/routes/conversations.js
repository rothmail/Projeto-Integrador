const express = require('express');
const router = express.Router();
const conversationsController = require('../controllers/conversationsController');
const authMiddleware = require('../middlewares/authMiddleware');

// Todas as rotas de conversas requerem autenticação
router.use(authMiddleware);

router.get('/', conversationsController.getConversations);
router.get('/:id', conversationsController.getConversation);
router.post('/', conversationsController.createConversation);
router.get('/:id/messages', conversationsController.getMessages);
router.post('/:id/messages', conversationsController.sendMessage);
router.put('/messages/:messageId/read', conversationsController.markAsRead);

module.exports = router;
