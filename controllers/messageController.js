const Message = require('../models/messageModel');
const User = require('../models/userModel');

exports.getRandomMessage = async (req, res) => {
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
};

exports.saveFavoriteMessage = async (req, res) => {
  const { message } = req.body;
  const userId = req.user._id;

  try {
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ success: false, error: 'User not found' });
    }

    const messageDoc = await Message.findOne({ text: message });
    if (!messageDoc) {
      return res.status(404).json({ success: false, error: 'Message not found' });
    }

    if (!user.favorites.includes(messageDoc._id)) {
      user.favorites.push(messageDoc._id);
      await user.save();
    }

    res.json({ success: true, message: 'Message saved to favorites' });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

exports.getFavoriteMessages = async (req, res) => {
  const userId = req.user._id;

  try {
    const user = await User.findById(userId).populate('favorites');
    if (!user) {
      return res.status(404).json({ success: false, error: 'User not found' });
    }

    res.json({ success: true, favorites: user.favorites });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};
