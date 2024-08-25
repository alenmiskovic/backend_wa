const express = require('express');
const router = express.Router();
const {
  getRandomMessage,
  saveFavoriteMessage,
  getFavoriteMessages,
  deleteFavoriteMessage
} = require('../controllers/messageController');
const authenticateToken = require('../middleware/authenticateToken');

// Ruta za dobivanje nasumične motivacijske poruke
router.get('/random', authenticateToken, getRandomMessage);

// Ruta za spremanje poruke u favorite
router.post('/favorites', authenticateToken, saveFavoriteMessage);

// Ruta za dohvaćanje omiljenih poruka
router.get('/favorites', authenticateToken, getFavoriteMessages);

// Ruta za brisanje poruke iz favorita
router.delete('/favorites', authenticateToken, deleteFavoriteMessage);

module.exports = router;
