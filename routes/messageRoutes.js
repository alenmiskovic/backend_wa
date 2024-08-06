const express = require('express');
const { getRandomMessage, saveFavoriteMessage } = require('../controllers/messageController');
const { authMiddleware } = require('../middleware/authMiddleware');

const router = new express.Router();

router.get('/random', authMiddleware, getRandomMessage);
router.post('/favorites', authMiddleware, saveFavoriteMessage);

module.exports = router;
