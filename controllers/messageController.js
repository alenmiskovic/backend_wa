const Message = require('../models/messageModel');
const User = require('../models/userModel');

const motivationalMessages = [
    "Keep pushing forward!",
    "Believe in yourself!",
    "You can do it!",
    "Stay positive!",
    "Never give up!"
];

exports.getRandomMessage = async (req, res) => {
    const randomIndex = Math.floor(Math.random() * motivationalMessages.length);
    const messageContent = motivationalMessages[randomIndex];

    let message = await Message.findOne({ content: messageContent });
    if (!message) {
        message = new Message({ content: messageContent });
        await message.save();
    }

    res.json({ message: messageContent });
};

exports.saveFavoriteMessage = async (req, res) => {
    const { userId, message } = req.body;
    try {
        const user = await User.findById(userId);
        const messageDoc = await Message.findOne({ content: message });
        
        if (!messageDoc) {
            return res.status(404).json({ success: false, error: "Message not found" });
        }

        user.favorites.push(messageDoc._id);
        await user.save();
        res.json({ success: true });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
};
