const express = require('express');
const router = express.Router();
const resourcesController = require('../controllers/resourcesController');
const authMiddleware = require('../middlewares/authMiddleware');

// Rotas públicas
router.get('/', resourcesController.getResources);
router.get('/:id', resourcesController.getResourceById);

// Rotas protegidas
router.post('/:id/bookmark', authMiddleware, resourcesController.toggleBookmark);
router.get('/bookmarks/my', authMiddleware, resourcesController.getMyBookmarks);
router.post('/:id/view', resourcesController.incrementView);

module.exports = router;
