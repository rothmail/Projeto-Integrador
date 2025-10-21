const express = require('express');
const router = express.Router();
const notificationsController = require('../controllers/notificationsController');
const authMiddleware = require('../middlewares/authMiddleware');

// Todas as rotas de notificações requerem autenticação
router.use(authMiddleware);

router.get('/', notificationsController.getNotifications);
router.get('/unread', notificationsController.getUnreadCount);
router.put('/:id/read', notificationsController.markAsRead);
router.put('/read-all', notificationsController.markAllAsRead);
router.delete('/:id', notificationsController.deleteNotification);

module.exports = router;
