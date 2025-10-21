const express = require('express');
const router = express.Router();
const eventsController = require('../controllers/eventsController');
const authMiddleware = require('../middlewares/authMiddleware');

// Rotas públicas
router.get('/', eventsController.getEvents);
router.get('/:id', eventsController.getEventById);

// Rotas protegidas
router.post('/', authMiddleware, eventsController.createEvent);
router.put('/:id', authMiddleware, eventsController.updateEvent);
router.delete('/:id', authMiddleware, eventsController.deleteEvent);
router.post('/:id/rsvp', authMiddleware, eventsController.toggleRSVP);
router.get('/:id/participants', eventsController.getParticipants);

module.exports = router;
