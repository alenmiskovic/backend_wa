const express = require('express');
const router = express.Router();
const {
  getRandomMessage,
  saveFavoriteMessage,
  getFavoriteMessages // Ovdje se ispravno uvozi funkcija
} = require('../controllers/messageController');
const authenticateToken = require('../middleware/authenticateToken');

// Ruta za dobivanje nasumične motivacijske poruke
router.get('/random', authenticateToken, getRandomMessage);

// Ruta za spremanje poruke u favorite
router.post('/favorites', authenticateToken, saveFavoriteMessage);

// Ruta za dohvaćanje omiljenih poruka
router.get('/favorites', authenticateToken, getFavoriteMessages);

module.exports = router;
