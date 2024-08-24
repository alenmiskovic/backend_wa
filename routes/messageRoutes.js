const express = require('express');
const router = express.Router();
const Message = require('../models/messageModel');
const { saveFavoriteMessage } = require('../controllers/messageController');
const authenticateToken = require('../middleware/authenticateToken');

// Ruta za dobivanje nasumične motivacijske poruke
router.get('/random', async (req, res) => {
  try {
    const messages = await Message.find();
    const randomIndex = Math.floor(Math.random() * messages.length);
    const randomMessage = messages[randomIndex];
    
    if (randomMessage) {
      res.json({ message: randomMessage.text });
    } else {
      res.status(404).json({ message: 'No messages found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Error retrieving messages' });
  }
});

// Ruta za spremanje poruke u favorite
router.post('/favorites', authenticateToken, saveFavoriteMessage);

module.exports = router;
